load "gui5.cl";

// вот идея - хорошо бы все-таки это под локальным именем бы экспортировалось
// а на уровне load можно было бы указать таки X и затем говорить X.view например фича
// ну или объект.. но на с.д. надо и фичу и объект, кстати..

view1: feature text="Общий вид" { dom_group {

  ////// основные параметры

      mainparams:
      {
        time_slider: param_slider 
           min=0 
           max=(@time->values | arr_length | compute_output code=`return env.params.input-1`) 
           step=1 
           value=@time->index;

        //f1:  param_file value="phase_yScaled2.csv";
        f1:  param_file value="https://viewlang.ru/assets/other/landing/2021-10-phase.txt";

        y_scale_coef: param_slider min=1 max=200 value=50;

        time: param_combo values=(@_dat | df_get column="T") 
           index=@time_slider->value;
        // todo исследовать time: param_combo values=(@dat | df_get column="T");
        

        step_N: param_slider value=10 min=1 max=100;

        lines_loaded: param_label value=(@dat0 | get name="length");
      };

  ///////////////////////////////////////
  /////////////////////////////////////// данные
  ///////////////////////////////////////

  dat0: load-file file=@mainparams->f1 
         | parse_csv separator="\s+";

  _dat: @dat0 | df_set X="->x[м]" Y="->y[м]" Z="->z[м]" T="->t[c]"
                RX="->theta[град]" RY="->psi[град]" RZ="->gamma[град]"
              | df_div column="RX" coef=57.7
              | df_div column="RY" coef=57.7
              | df_div column="RZ" coef=57.7;


  dat: @_dat | df_div column="Y" coef=@mainparams->y_scale_coef;       

  dat_prorej: @dat | df_skip_every count=@mainparams->step_N;

  dat_cur_time: @dat       | df_slice start=@time->index count=1;

  dat_cur_time_orig: @dat0 | df_slice start=@time->index count=1; 
   // оригинальная curr time до изменения имен колонок и прочих преобьразований
   // требуется для вывода на экран исходных данных

   dat_cur_time_zero: @dat | df_slice start=@time->index count=1 | df_set X=0 Y=0 Z=0;


   ////////////////////////////////////
   ////// сцена
   ////////////////////////////////////

        r1: render3d 
              bgcolor=[0.1,0.2,0.3]
              target=@v1
        {
            camera3d pos=[0,0,100] center=[0,0,0];
            orbit_control;


        };

   ////////////////////////////////////
   ////// интерфейс
   ////////////////////////////////////

          row style="z-index: 3; color: white;" 
              class="vz-mouse-transparent-layout" align-items="flex-start" // эти 2 строчки решают проблему мышки
          {
            collapsible text="Основные параметры" style="min-width:250px;" padding="10px"
            {

              //paint_kskv_gui input=@sol;
              render-params  input=@mainparams;
            };

            extra_screen_things: column {};

          }; // row

          //render_layers root=@sol style="position:absolute; right: 10px; top: 10px;";

          column style="position:absolute; right: 20px; top: 10px;" {
            collapsible text="Визуальные объекты" 
            style="min-width:250px" 
            style_h = "max-height:90vh;"
            body_features={ set_params style_h="max-height: inherit;"}
            {
             s: switch_selector_column items=["Объекты данных","Статичные","Текст"] style="width:200px;";

                show_one 
                  index=@s->index 
                  style_h="max-height: inherit;"
                {
                  
                  render_layers root=@sol->l1;
                  render_layers root=@sol->l2;
                  render_layers root=@sol->l3;

                };
            };  
          };

          v1: view3d style="position: absolute; top: 0; left: 0; width:100%; height: 100%; z-index:-2" extra=@extra_screen_things;

    }
};

view2: feature text="Ракета" {
    dom_group {
        v1: view3d style="position: absolute; top: 0; left: 0; width:100%; height: 100%; z-index:-2";
    };
}
