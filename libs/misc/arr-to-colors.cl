// по входному массива и выбранной колонке строит массив цветов
// input - массив

// color_func - функция раскрашивания
// base_color - базовый цвет для смешивания с функцией раскрашивания linear
feature "arr_to_colors" {
  root: object
     output=@color_arr->output 

    {{ x-param-option name="help" option="priority" value=0 }}
    {{ x-param-vector name="minmax" }}
    {{ x-param-vector name="minmax_computed" }}
    {{ x-param-option name="minmax_computed" option="readonly" value=true }}

    {{ x-param-option name="recalculate" option="priority" value=110 }}    

    {{ x-param-option name="datafunc" option="priority" value=120 }}
    {{ x-param-combo name="datafunc" values=["linear","log","sqrt", "sqrt4", "sqrt8"] 
        titles=["Линейная","Логарифм","Корень","Корень^4","Корень^8"]
    }}

    data_func_f =( m_eval "(type) => {
        let t = { log: (x) => Math.log(1+x),
         sqrt: (x) => Math.sqrt(x),
         sqrt4: (x) => Math.sqrt( Math.sqrt(x) ),
         sqrt8: (x) => Math.sqrt( Math.sqrt( Math.sqrt(x) ))
        };
        return t[type] || ((x)=>x);
      }" @root->datafunc)

    {{ x-param-option name="colorfunc" option="priority" value=130 }}
    {{ x-param-combo name="colorfunc" values=["linear","one","bgr","custom"]
        titles=["Простой","Радуга","Синий-зеленый-красный","Своя палитра"]
    }}

    base_color=[0,1,0]

    //{{ x-param-df name="custom_palette_df" columns="R,G,B"}}
    {{ x-param-text name="custom_palette_df"}}
    //custom_palette=[ [0,0,0], [1,1,1] ]
    //custom_palette_df=(parse_csv input="R,G,B\n0,0,0\n1,1,1")
    custom_palette_df=`0,0,0\n0,1,0\n1,1,1`
    custom_palette=( + "R,G,B\n" @root->custom_palette_df | parse_csv | df_to_rows_arrays)

    {{ x-param-option name="custom_palette_df" option="hint" value="Введите цвета палитры построчно. В каждой строке указывается три числа, от 0 до 1, через запятую. Они означают цветовые компоненты R,G,B." }}
    {{ x-param-option name="custom_palette_df" option="priority" value=140 }}
    {{ x-param-option name="custom_palette_df" option="visible" value=(@root->colorfunc == "custom") }}

    //color_func_f=(coloring_func_tabl palette_table=@palettes->one)
    //color_func_f=(coloring_func_tabl palette_table=(@palettes | geta @root->colorfunc) )
    //color_func_f2=(coloring_func_tabl palette_table=(@palettes | geta @root->colorfunc default=@palettes->white))


    color_func_f = ( object
                  linear=(color_func_base_color @root->base_color) 
                  one=(coloring_func_tabl palette_table=@palettes->one)
                  bgr=(coloring_func_tabl palette_table=@palettes->bgr)
                  custom=(coloring_func_tabl palette_table=@root->custom_palette)
                  output=@.
                  | geta @root->colorfunc)
    

    minmax_computed=@mm->output

    {{ x-param-option name="colorize_data" option="visible" value=false }}
    {{ x-add-cmd2 "colorize_data" @colorize_data_l->output; }}

    {
    mm: arr_find_min_max input=@root->input
    
    param_cmd name="recalculate" {
       setter target="@root->minmax" value=@mm->output;
    };
    param_checkbox name="auto_calculate" value=true;

    if (@root->auto_calculate) {
       setter target="@root->minmax" value=@mm->output ~auto_apply;
    };
    
    //param_label name="help" value="Выбор мин и макс<br/>значения для раскраски";
    
    color_arr: m_eval @colorize_data_l->output @root->input;
    //color_arr: m_eval @root->colorize_data @root->input;

    colorize_data_l: m_lambda `(minmax,colorfunc,datafunc,input) => {

        let min = minmax[0];
        let max = minmax[1];
        let diff = max-min;

        let acc = new Float32Array( input.length*3 );
        //console.log('minmax',minmax)

        //let f = (x) => Math.log(1+x);
        let f = (x) => Math.sqrt( Math.sqrt(x) );
        diff = datafunc(diff);

        if (diff > 0)         
        for (let i=0,j=0; i<input.length; i++,j+=3) {
            let t = datafunc(input[i] - min) / diff;
            // теперь t это нечто от 0 до 1 - раскрашиваем палитрою
            //if (t)         debugger;
            colorfunc( t, acc, j );
        }
        else
        for (let i=0,j=0; i<input.length; i++,j+=3) {
            colorfunc( 1, acc, j );
        }
        //if (!isFinite(acc[0])) debugger;
        return acc;
       }` @root->minmax @root->color_func_f @root->data_func_f check_params=true;

    //service "colorize-data"

  };

};

register_feature name="color_func_red" code=`
  let f = function( t, acc, index ) {
     acc[index] = t;
  }
  env.setParam("output",f);
`;

register_feature name="color_func_white" code=`
  let f = function( t, acc, index ) {
     acc[index] = t;
     acc[index+1] = t;
     acc[index+2] = t;
  }
  env.setParam("output",f);
`;

register_feature name="color_func_base_color" code=`
  env.onvalue( 0, (basecolor) => {
    let f = function( t, acc, index ) {
       acc[index] = t * basecolor[0];
       acc[index+1] = t * basecolor[1];
       acc[index+2] = t * basecolor[2];
    }
    env.setParam("output",f);
  });
`;

// идеи - функция из функций, например логарифм и затем раскраска
// конструктор функций с гуи.. (можно даже чистым dom)
// просто выбиралка функций (можно из 2х стадий - расчет и раскраска) (на параметрах)
// ...

feature "coloring_func_tabl" {
  cf: m_lambda "( palette_table, val, acc, index ) => {
        //if (index == 0) console.log('using pal',palette_table)
        function mid( a,b,t ) {
            return (a + (b-a)*t);
        }
        var ci0 = val * (palette_table.length-1);
        var ci = Math.floor( ci0 );
        var ci2 = Math.min( palette_table.length-1, ci+1 );
        var t = ci0 - ci; // теперь t это 0..1 от индекса 0 к индексу 1 в таблице
        var color = palette_table[ci];
        var color2 = palette_table[ci2];

        if (!color) {
          acc[index] = 1;
          acc[index+1] = 1;
          acc[index+2] = 1;     
        }
        else {
         acc[index] = mid( color[0], color2[0], t );
         acc[index+1] = mid( color[1], color2[1], t );
         acc[index+2] = mid( color[2], color2[2], t );
        }
    }
  " (@cf->palette_table or [ [0,0,0], [1,0,1] ]);
};

register_feature name="color_func_tabl" code=`
  function mid( a,b,t ) {
    return (a + (b-a)*t);
  }

  let f = function( val, acc, index, palette_table ) {
        var ci0 = val * (palette_table.length-1);
        var ci = Math.floor( ci0 );
        var ci2 = Math.min( palette_table.length-1, ci+1 );
        var t = ci0 - ci; // теперь t это 0..1 от индекса 0 к индексу 1 в таблице
        var color = palette_table[ci];
        var color2 = palette_table[ci2];        

        if (!color) {
          acc[index] = 1;
          acc[index+1] = 1;
          acc[index+2] = 1;     
        }
        else {
         acc[index] = mid( color[0], color2[0], t );
         acc[index+1] = mid( color[0], color2[0], t );
         acc[index+2] = mid( color[0], color2[0], t );
      }
  }
  env.setParam("output",f);
`;


palettes: object
one=[
  [ 0.00000000, 0.00000000, 0.50000000],
  [ 0.00000000, 0.00000000, 0.51782531],
  [ 0.00000000, 0.00000000, 0.53565062],
  [ 0.00000000, 0.00000000, 0.55347594],
  [ 0.00000000, 0.00000000, 0.57130125],
  [ 0.00000000, 0.00000000, 0.58912656],
  [ 0.00000000, 0.00000000, 0.60695187],
  [ 0.00000000, 0.00000000, 0.62477718],
  [ 0.00000000, 0.00000000, 0.64260250],
  [ 0.00000000, 0.00000000, 0.66042781],
  [ 0.00000000, 0.00000000, 0.67825312],
  [ 0.00000000, 0.00000000, 0.69607843],
  [ 0.00000000, 0.00000000, 0.71390374],
  [ 0.00000000, 0.00000000, 0.73172906],
  [ 0.00000000, 0.00000000, 0.74955437],
  [ 0.00000000, 0.00000000, 0.76737968],
  [ 0.00000000, 0.00000000, 0.78520499],
  [ 0.00000000, 0.00000000, 0.80303030],
  [ 0.00000000, 0.00000000, 0.82085561],
  [ 0.00000000, 0.00000000, 0.83868093],
  [ 0.00000000, 0.00000000, 0.85650624],
  [ 0.00000000, 0.00000000, 0.87433155],
  [ 0.00000000, 0.00000000, 0.89215686],
  [ 0.00000000, 0.00000000, 0.90998217],
  [ 0.00000000, 0.00000000, 0.92780749],
  [ 0.00000000, 0.00000000, 0.94563280],
  [ 0.00000000, 0.00000000, 0.96345811],
  [ 0.00000000, 0.00000000, 0.98128342],
  [ 0.00000000, 0.00000000, 0.99910873],
  [ 0.00000000, 0.00000000, 1.00000000],
  [ 0.00000000, 0.00000000, 1.00000000],
  [ 0.00000000, 0.00000000, 1.00000000],
  [ 0.00000000, 0.00196078, 1.00000000],
  [ 0.00000000, 0.01764706, 1.00000000],
  [ 0.00000000, 0.03333333, 1.00000000],
  [ 0.00000000, 0.04901961, 1.00000000],
  [ 0.00000000, 0.06470588, 1.00000000],
  [ 0.00000000, 0.08039216, 1.00000000],
  [ 0.00000000, 0.09607843, 1.00000000],
  [ 0.00000000, 0.11176471, 1.00000000],
  [ 0.00000000, 0.12745098, 1.00000000],
  [ 0.00000000, 0.14313725, 1.00000000],
  [ 0.00000000, 0.15882353, 1.00000000],
  [ 0.00000000, 0.17450980, 1.00000000],
  [ 0.00000000, 0.19019608, 1.00000000],
  [ 0.00000000, 0.20588235, 1.00000000],
  [ 0.00000000, 0.22156863, 1.00000000],
  [ 0.00000000, 0.23725490, 1.00000000],
  [ 0.00000000, 0.25294118, 1.00000000],
  [ 0.00000000, 0.26862745, 1.00000000],
  [ 0.00000000, 0.28431373, 1.00000000],
  [ 0.00000000, 0.30000000, 1.00000000],
  [ 0.00000000, 0.31568627, 1.00000000],
  [ 0.00000000, 0.33137255, 1.00000000],
  [ 0.00000000, 0.34705882, 1.00000000],
  [ 0.00000000, 0.36274510, 1.00000000],
  [ 0.00000000, 0.37843137, 1.00000000],
  [ 0.00000000, 0.39411765, 1.00000000],
  [ 0.00000000, 0.40980392, 1.00000000],
  [ 0.00000000, 0.42549020, 1.00000000],
  [ 0.00000000, 0.44117647, 1.00000000],
  [ 0.00000000, 0.45686275, 1.00000000],
  [ 0.00000000, 0.47254902, 1.00000000],
  [ 0.00000000, 0.48823529, 1.00000000],
  [ 0.00000000, 0.50392157, 1.00000000],
  [ 0.00000000, 0.51960784, 1.00000000],
  [ 0.00000000, 0.53529412, 1.00000000],
  [ 0.00000000, 0.55098039, 1.00000000],
  [ 0.00000000, 0.56666667, 1.00000000],
  [ 0.00000000, 0.58235294, 1.00000000],
  [ 0.00000000, 0.59803922, 1.00000000],
  [ 0.00000000, 0.61372549, 1.00000000],
  [ 0.00000000, 0.62941176, 1.00000000],
  [ 0.00000000, 0.64509804, 1.00000000],
  [ 0.00000000, 0.66078431, 1.00000000],
  [ 0.00000000, 0.67647059, 1.00000000],
  [ 0.00000000, 0.69215686, 1.00000000],
  [ 0.00000000, 0.70784314, 1.00000000],
  [ 0.00000000, 0.72352941, 1.00000000],
  [ 0.00000000, 0.73921569, 1.00000000],
  [ 0.00000000, 0.75490196, 1.00000000],
  [ 0.00000000, 0.77058824, 1.00000000],
  [ 0.00000000, 0.78627451, 1.00000000],
  [ 0.00000000, 0.80196078, 1.00000000],
  [ 0.00000000, 0.81764706, 1.00000000],
  [ 0.00000000, 0.83333333, 1.00000000],
  [ 0.00000000, 0.84901961, 1.00000000],
  [ 0.00000000, 0.86470588, 0.99620493],
  [ 0.00000000, 0.88039216, 0.98355471],
  [ 0.00000000, 0.89607843, 0.97090449],
  [ 0.00948767, 0.91176471, 0.95825427],
  [ 0.02213789, 0.92745098, 0.94560405],
  [ 0.03478811, 0.94313725, 0.93295383],
  [ 0.04743833, 0.95882353, 0.92030361],
  [ 0.06008855, 0.97450980, 0.90765338],
  [ 0.07273877, 0.99019608, 0.89500316],
  [ 0.08538899, 1.00000000, 0.88235294],
  [ 0.09803922, 1.00000000, 0.86970272],
  [ 0.11068944, 1.00000000, 0.85705250],
  [ 0.12333966, 1.00000000, 0.84440228],
  [ 0.13598988, 1.00000000, 0.83175206],
  [ 0.14864010, 1.00000000, 0.81910183],
  [ 0.16129032, 1.00000000, 0.80645161],
  [ 0.17394054, 1.00000000, 0.79380139],
  [ 0.18659077, 1.00000000, 0.78115117],
  [ 0.19924099, 1.00000000, 0.76850095],
  [ 0.21189121, 1.00000000, 0.75585073],
  [ 0.22454143, 1.00000000, 0.74320051],
  [ 0.23719165, 1.00000000, 0.73055028],
  [ 0.24984187, 1.00000000, 0.71790006],
  [ 0.26249209, 1.00000000, 0.70524984],
  [ 0.27514231, 1.00000000, 0.69259962],
  [ 0.28779254, 1.00000000, 0.67994940],
  [ 0.30044276, 1.00000000, 0.66729918],
  [ 0.31309298, 1.00000000, 0.65464896],
  [ 0.32574320, 1.00000000, 0.64199873],
  [ 0.33839342, 1.00000000, 0.62934851],
  [ 0.35104364, 1.00000000, 0.61669829],
  [ 0.36369386, 1.00000000, 0.60404807],
  [ 0.37634409, 1.00000000, 0.59139785],
  [ 0.38899431, 1.00000000, 0.57874763],
  [ 0.40164453, 1.00000000, 0.56609741],
  [ 0.41429475, 1.00000000, 0.55344719],
  [ 0.42694497, 1.00000000, 0.54079696],
  [ 0.43959519, 1.00000000, 0.52814674],
  [ 0.45224541, 1.00000000, 0.51549652],
  [ 0.46489564, 1.00000000, 0.50284630],
  [ 0.47754586, 1.00000000, 0.49019608],
  [ 0.49019608, 1.00000000, 0.47754586],
  [ 0.50284630, 1.00000000, 0.46489564],
  [ 0.51549652, 1.00000000, 0.45224541],
  [ 0.52814674, 1.00000000, 0.43959519],
  [ 0.54079696, 1.00000000, 0.42694497],
  [ 0.55344719, 1.00000000, 0.41429475],
  [ 0.56609741, 1.00000000, 0.40164453],
  [ 0.57874763, 1.00000000, 0.38899431],
  [ 0.59139785, 1.00000000, 0.37634409],
  [ 0.60404807, 1.00000000, 0.36369386],
  [ 0.61669829, 1.00000000, 0.35104364],
  [ 0.62934851, 1.00000000, 0.33839342],
  [ 0.64199873, 1.00000000, 0.32574320],
  [ 0.65464896, 1.00000000, 0.31309298],
  [ 0.66729918, 1.00000000, 0.30044276],
  [ 0.67994940, 1.00000000, 0.28779254],
  [ 0.69259962, 1.00000000, 0.27514231],
  [ 0.70524984, 1.00000000, 0.26249209],
  [ 0.71790006, 1.00000000, 0.24984187],
  [ 0.73055028, 1.00000000, 0.23719165],
  [ 0.74320051, 1.00000000, 0.22454143],
  [ 0.75585073, 1.00000000, 0.21189121],
  [ 0.76850095, 1.00000000, 0.19924099],
  [ 0.78115117, 1.00000000, 0.18659077],
  [ 0.79380139, 1.00000000, 0.17394054],
  [ 0.80645161, 1.00000000, 0.16129032],
  [ 0.81910183, 1.00000000, 0.14864010],
  [ 0.83175206, 1.00000000, 0.13598988],
  [ 0.84440228, 1.00000000, 0.12333966],
  [ 0.85705250, 1.00000000, 0.11068944],
  [ 0.86970272, 1.00000000, 0.09803922],
  [ 0.88235294, 1.00000000, 0.08538899],
  [ 0.89500316, 1.00000000, 0.07273877],
  [ 0.90765338, 1.00000000, 0.06008855],
  [ 0.92030361, 1.00000000, 0.04743833],
  [ 0.93295383, 1.00000000, 0.03478811],
  [ 0.94560405, 0.98838054, 0.02213789],
  [ 0.95825427, 0.97385621, 0.00948767],
  [ 0.97090449, 0.95933188, 0.00000000],
  [ 0.98355471, 0.94480755, 0.00000000],
  [ 0.99620493, 0.93028322, 0.00000000],
  [ 1.00000000, 0.91575890, 0.00000000],
  [ 1.00000000, 0.90123457, 0.00000000],
  [ 1.00000000, 0.88671024, 0.00000000],
  [ 1.00000000, 0.87218591, 0.00000000],
  [ 1.00000000, 0.85766158, 0.00000000],
  [ 1.00000000, 0.84313725, 0.00000000],
  [ 1.00000000, 0.82861293, 0.00000000],
  [ 1.00000000, 0.81408860, 0.00000000],
  [ 1.00000000, 0.79956427, 0.00000000],
  [ 1.00000000, 0.78503994, 0.00000000],
  [ 1.00000000, 0.77051561, 0.00000000],
  [ 1.00000000, 0.75599129, 0.00000000],
  [ 1.00000000, 0.74146696, 0.00000000],
  [ 1.00000000, 0.72694263, 0.00000000],
  [ 1.00000000, 0.71241830, 0.00000000],
  [ 1.00000000, 0.69789397, 0.00000000],
  [ 1.00000000, 0.68336964, 0.00000000],
  [ 1.00000000, 0.66884532, 0.00000000],
  [ 1.00000000, 0.65432099, 0.00000000],
  [ 1.00000000, 0.63979666, 0.00000000],
  [ 1.00000000, 0.62527233, 0.00000000],
  [ 1.00000000, 0.61074800, 0.00000000],
  [ 1.00000000, 0.59622367, 0.00000000],
  [ 1.00000000, 0.58169935, 0.00000000],
  [ 1.00000000, 0.56717502, 0.00000000],
  [ 1.00000000, 0.55265069, 0.00000000],
  [ 1.00000000, 0.53812636, 0.00000000],
  [ 1.00000000, 0.52360203, 0.00000000],
  [ 1.00000000, 0.50907771, 0.00000000],
  [ 1.00000000, 0.49455338, 0.00000000],
  [ 1.00000000, 0.48002905, 0.00000000],
  [ 1.00000000, 0.46550472, 0.00000000],
  [ 1.00000000, 0.45098039, 0.00000000],
  [ 1.00000000, 0.43645606, 0.00000000],
  [ 1.00000000, 0.42193174, 0.00000000],
  [ 1.00000000, 0.40740741, 0.00000000],
  [ 1.00000000, 0.39288308, 0.00000000],
  [ 1.00000000, 0.37835875, 0.00000000],
  [ 1.00000000, 0.36383442, 0.00000000],
  [ 1.00000000, 0.34931009, 0.00000000],
  [ 1.00000000, 0.33478577, 0.00000000],
  [ 1.00000000, 0.32026144, 0.00000000],
  [ 1.00000000, 0.30573711, 0.00000000],
  [ 1.00000000, 0.29121278, 0.00000000],
  [ 1.00000000, 0.27668845, 0.00000000],
  [ 1.00000000, 0.26216412, 0.00000000],
  [ 1.00000000, 0.24763980, 0.00000000],
  [ 1.00000000, 0.23311547, 0.00000000],
  [ 1.00000000, 0.21859114, 0.00000000],
  [ 1.00000000, 0.20406681, 0.00000000],
  [ 1.00000000, 0.18954248, 0.00000000],
  [ 1.00000000, 0.17501816, 0.00000000],
  [ 1.00000000, 0.16049383, 0.00000000],
  [ 1.00000000, 0.14596950, 0.00000000],
  [ 1.00000000, 0.13144517, 0.00000000],
  [ 1.00000000, 0.11692084, 0.00000000],
  [ 1.00000000, 0.10239651, 0.00000000],
  [ 1.00000000, 0.08787219, 0.00000000],
  [ 0.99910873, 0.07334786, 0.00000000],
  [ 0.98128342, 0.05882353, 0.00000000],
  [ 0.96345811, 0.04429920, 0.00000000],
  [ 0.94563280, 0.02977487, 0.00000000],
  [ 0.92780749, 0.01525054, 0.00000000],
  [ 0.90998217, 0.00072622, 0.00000000],
  [ 0.89215686, 0.00000000, 0.00000000],
  [ 0.87433155, 0.00000000, 0.00000000],
  [ 0.85650624, 0.00000000, 0.00000000],
  [ 0.83868093, 0.00000000, 0.00000000],
  [ 0.82085561, 0.00000000, 0.00000000],
  [ 0.80303030, 0.00000000, 0.00000000],
  [ 0.78520499, 0.00000000, 0.00000000],
  [ 0.76737968, 0.00000000, 0.00000000],
  [ 0.74955437, 0.00000000, 0.00000000],
  [ 0.73172906, 0.00000000, 0.00000000],
  [ 0.71390374, 0.00000000, 0.00000000],
  [ 0.69607843, 0.00000000, 0.00000000],
  [ 0.67825312, 0.00000000, 0.00000000],
  [ 0.66042781, 0.00000000, 0.00000000],
  [ 0.64260250, 0.00000000, 0.00000000],
  [ 0.62477718, 0.00000000, 0.00000000],
  [ 0.60695187, 0.00000000, 0.00000000],
  [ 0.58912656, 0.00000000, 0.00000000],
  [ 0.57130125, 0.00000000, 0.00000000],
  [ 0.55347594, 0.00000000, 0.00000000],
  [ 0.53565062, 0.00000000, 0.00000000],
  [ 0.51782531, 0.00000000, 0.00000000],
  [ 0.50000000, 0.00000000, 0.00000000]
]

white = [
  [0.0, 0.0, 0.0],
  [1.0, 1.0, 1.0]
]

bgr = [
  [0.0, 0.0, 1.0],
  [0.0, 1.0, 0.0],  
  [1.0, 0.0, 0.0]
];