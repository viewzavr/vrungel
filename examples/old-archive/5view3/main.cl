load "lib3dv3 csv params io gui render-params df scene-explorer-3d gui5.cl new-modifiers imperative";

load "landing3/landing-view.cl landing/test.cl universal/universal-vp.cl"; // отдельный вопрос

feature "setup_view" {
  column {
    button "Настройки"
  };
};

// подфункция реакции на чекбокс view_settings_dialog
// идея вынести это в метод вьюшки. типа вкл-выкл процесс.
feature "toggle_visprocess_view_assoc2" {
i-call-js 
  code="(cobj,val) => { // cobj объект чекбокса, val значение
    let view = env.params.view; // вид the_view
    //let view = cobj.params.view;
    console.log({view,cobj,val});
    view.params.sources ||= [];
    view.params.sources_str ||= '';
    if (val) { // надо включить
      let curind = view.params.sources.indexOf( env.params.process );
      if (curind < 0) {
        let add = '@' + env.params.process.getPathRelative( view.params.project );
        console.log('adding',add);
        let filtered = view.params.sources_str.split(',').filter( (v) => v.length>0)
        let nv = filtered.concat([add]).join(',');
        //console.log('nv',nv)
        
        view.setParam( 'sources_str', nv, true);
      }
        // видимо придется как-то к кодам каким-то прибегнуть..
        // или к порядковым номерам, или к путям.. (массив objref тут так-то)
    }
    else
    {
        // надо выключить
      let curind = view.params.sources.indexOf( env.params.process );
      //debugger;
      if (curind >= 0) {
        //obj.params.sources.splice( curind,1 );
        //obj.signalParam( 'sources' );
        let arr = view.params.sources_str.split(',').map( x => x.trim());
        arr = [...new Set(arr)]; // унекальнозть
        let p = '@' + env.params.process.getPathRelative( view.params.project );
        let curind_in_str = arr.indexOf(p);
        if (curind_in_str >= 0) {
          arr.splice( curind_in_str,1 );
          view.setParam( 'sources_str', arr.join(','), true)
        };
      }
    };
  };";
};

feature "the_view" 
{
  tv: 
  //show_view={ show_visual_tab1 ; }
  title="Экран"
  gui={ 
    render-params @tv; 
    //console_log "tv is " @tv "view procs are" (@tv | geta "sources" | map_geta "getPath");
    
    text @tv->compatible_sources;
    //qoco: param_field name="Отображаемые процессы" { column; };

    // @tv->project | geta "processes" - раньше ток процессы
    // а теперь разным вьюшкам разное подавай
    //find-objects-by-crit root=@tv->project input=@tv->compatible_sources

    ba0: find-objects-by-crit root=@tv->project input=@tv->compatible_sources;
    ba1: @ba0->output | arr_filter_by_features features="visual_process" ;
    ba2: @ba0->output | arr_filter_by_features features="the_view" | arr_filter me=@tv code="(val) => val != env.params.me";

    //console_log "ba0=" @ba0->output @ba0;
     //"a1=" @ba1->output "ba2=" @ba2->output;

    column {      
    text "Включить:";
    //qq: tv=@tv; // без этого внутри ссылка на @tv уже не робит..
    repeater input=@ba1->output //target_parent=@qoco 
    {
       i: checkbox text=(@i->input | geta "title") 
             value=(@tv | geta "sources" | arr_contains @i->input)
          {{ x-on "user-changed" {
              toggle_visprocess_view_assoc2 process=@i->input view=@tv;
          } }};
    };
    };

    column {
    text "Включить экраны:";
    repeater input=@ba2->output //target_parent=@qoco 
    {
       i: checkbox text=(@i->input | geta "title") 
             value=(@tv | geta "sources" | arr_contains @i->input)
          {{ x-on "user-changed" {
              toggle_visprocess_view_assoc2 process=@i->input view=@tv;
          } }};
    };
    };

  }
  {{
    x-param-string name="title";
    // дале чтобы сохранялось всегда даж для введенных в коде вьюшек
    x-param-option name="title" option="manual" value=true;
    x-param-option name="sources_str" option="manual" value=true;
  }}
  sibling_types=["the-view-mix3d","the-view-row"] 
  sibling_titles=["Одна сцена","Слева на право"]
  sources=(find-objects-by-pathes input=@tv->sources_str root=@tv->project)
  project=@..
  ;  

  
};

feature "the_view_mix3d" {
  tv: the_view exporting_3d exporting_2d
        camera=@cam
        compatible_sources="exporting_1d,exporting_3d"
        show_view={ show_visual_tab_mix3d input=@tv; } 
        scene3d=(@tv->sources | map_geta "scene3d")
        title="Одна сцена"
        {
          cam: camera3d pos=[-400,350,350] center=[0,0,0];
          // вот бы метод getCameraFor(i).. т.е. такое вычисление по запросу..
        };
};

feature "the_view_row" 
{
  tv: the-view 
        show_view={ show_visual_tab_row input=@tv; } 
        title="Ряд"
        exporting_2d
        compatible_sources="exporting_1d,exporting_2d"
  ;
};

feature "visual_process" {};
feature "exporting_3d" {};
feature "exporting_2d" {};
feature "exporting_1d" {}; // кто не дает экранов но дает опции

feature "pause_input" code=`
  env.feature("delayed");
  let pass = env.delayed( () => {
    env.setParam("output", env.params.input);
  },1000/30);

  env.onvalue("input",pass);
`;

project: active_view_index=1 
  //views=(get-children-arr input=@project | pause_input | arr_filter_by_features features="the-view")
  views=(find-objects-bf features="the-view" root=@project | sort_by_priority)
  
  //processes=(get-children-arr input=@project | arr_filter_by_features features="visual-process")
  processes=(find-objects-bf features="visual-process" root=@project | sort_by_priority)
{
  lf: landing-file;
  lv: landing-view;
  a1: axes-view size=100;
  a2: axes-view title="Оси координат 2";

  kv1: visual_process title="Тестовый плоский" 
            exporting_2d show_view={
              dom style_q="width: 100px; height: 100px; background: red;";
            };

  v0: the-view-mix3d 
        title="Данные" 
        sources_str="@lf";

  v1: the-view-mix3d 
        title="Общий вид" 
        sources_str="@lv/lv1 ,@a1";
  
  v2: the-view-mix3d 
        title="Вид на ракету" 
        sources_str="@lv/lv2,@a2";

  
  /*
  v_setup: the-view title="Настройки" {
    //sync_params_process root=@project;
  }
  */
};

screen1: screen auto-activate  {
  render_project @project active_view_index=1;
};

//debugger-screen-r;

////////////////////////////////////////////////////////

// отображение. тут и параметр как компоновать
// параметр - список визуальных процессов видимо.
// ну а может контейнер ихний. посмотрим
// input 

// так это уже конкретная показывалка - с конкретным методом комбинирования.
// мы потом это заоверрайдим чтобы было несколько методов комбинирования и был выбор у человека
// хотя это можно и как параметр этой хрени и как суб-компоненту сделать.

// обновление. input это объект вида. the-view.
// у вью ожидаются - параметр sources - массив где каждый элемент
// имеет записи gui, scene2d, scene3d

feature "show_visual_tab" {
  sv: dom_group {
    ic: insert_children input=@sv list=(@sv->input | get_param "show_view");
    
    //@ic->output | x-modify { x-set-params input=@sv->input };
  };
};

/*
.. короче я тут начал подтягивать из вьюшек тип отображения
.. а при этом считаю что будет меняться этот тип отображения во вьюшках
.. например за счет смены типа вьюшек через методу render_layers_inner
.. которую я покажу рядом с кнопкой таблицы настройки видов
*/

// это у нас микс сцен
feature "show_visual_tab_mix3d" {
   svt: dom_group 
   {
    show_sources_params input=@svt->input;
    show_3d_scene input=@svt->input
       style_k="position: absolute; top: 0; left: 0; width:100%; height: 100%; z-index:-2";
    ;
   }; // domgroup
}; // show vis tab


feature "show_visual_tab_row" {
   svt: dom_group 
   {
    show_sources_params input=@svt->input;

    rrviews: row style="position: absolute; top: 0; left: 0; width:100%; height: 100%; z-index:-2;
        justify-content: center;" 
    {

/*
      //console_log 
      repa: repeater input=(@svt->input | geta "sources") {
        src: {
          insert_children input=@../.. list=(@src->input | geta "show_view");
        };
      }
*/  
    };

    ic: insert_children input=@rrviews list=(@svt->input | geta "sources" | map_geta "show_view" | geta "flat" | arr_uniq);

    @ic->output | x-modify { x-set-params style_flex="flex: 1 1 0;" };

   }; // domgroup

}; // screen row

// вход - окружение с параметрами scene3d, camera, scene2d (надписи)
// можно переделать будет на раздельное питание
feature "show_3d_scene" {
    scene_3d_view: 
    view3d style_k="width:100px;";
    {
      r1: render3d 
          bgcolor=[0.1,0.2,0.3]
          target=@scene_3d_view //{{ skip_deleted_children }}
          input=(@scene_3d_view->input | geta "scene3d") // кстати идея так-то сделать аналог и для 2д - до-бирать детей отсель
          camera=(@scene_3d_view->input | geta "camera" | console_log_input "camamaa")
      {
          //camera3d pos=[-400,350,350] center=[0,0,0];

          orbit_control;
      };

      extra_screen_things: 
      column style="padding-left:2em; min-width: 80vw; 
         position:absolute; bottom: 1em; left: 1em;" {
         dom_group 
           input=(@scene_3d_view->input | geta "scene2d");
      };

    };
};

// рисует боковушку - параметры визпроцессов...
feature "show_sources_params"
{
  sv: row {
    svlist: column {
      repeater input=(@sv->input | geta "sources") {
        mm: 
         row {
        //dom tag="fieldset" style="border-radius: 5px; padding: 2px; margin: 2px;" {
          collapsible text=(@mm->input | get_param "title" default="no title") 
            style="min-width:250px;" padding="2px"
            style_h = "max-height:80vh;"
            body_features={ set_params style_h="max-height: inherit; overflow-y: auto;"}          
          {
             insert_children input=@.. list=(@mm->input | get_param "gui");
             // вот мы вставили гуи
          };

          cbv: checkbox value=(@mm->input | get_param "visible");
          x-modify input=@mm->input {
            x-set-params visible=@cbv->value ;
            x-on "show-settings" {
              lambda @extra_settings_panel code="(panel,obj,settings) => {
                 // console.log('got x-on show-settings',obj,settings)
                 // todo это поведение панели уже..
                 // да и вообще надо замаршрузизировать да и все будет.. в панель прям
                 // а там типа событие или тоже команда
                 if (panel.params.list == settings)
                   panel.setParam('list',[]);
                 else  
                   panel.setParam('list',settings);
                 
              };
              ";
            };
          };
        }; // fieldset
      }; // repeater

      //@repa->output | render-guis;
      //render-params @rrviews;

    }; // svlist  


    extra_settings_panel_outer: row gap="2px" {
      extra_settings_panel: 
      column // style="position:absolute; top: 1em; right: 1em;" 
      {
         insert_children input=@.. list=@extra_settings_panel->list;
      };
      button "&lt;" style_h="height:1.5em;" visible=(eval @extra_settings_panel->list code="(list) => list && list.length>0") 
      {
         setter target="@extra_settings_panel->list" value=[];
      };
    }; // extra_settings_panel_outer

    }; // row    
};


// подфункция реакции на чекбокс view_settings_dialog
feature "toggle_visprocess_view_assoc" {
i-call-js 
  code="(cobj,val) => { // вот какого ежа тут js, где наш i-код?
    let obj = cobj.params.input;
    console.log({obj,cobj,val});
    obj.params.sources ||= [];
    if (val) {
      let curind = obj.params.sources.indexOf( env.params.src );
      if (curind < 0)
        obj.setParam( 'sources', obj.params.sources.concat([env.params.src]));
        // видимо придется как-то к кодам каким-то прибегнуть..
        // или к порядковым номерам, или к путям.. (массив objref тут так-то)
    }
    else
    {
      let curind = obj.params.sources.indexOf( env.params.src );
      if (curind >= 0) {
        //obj.params.sources.splice( curind,1 );
        //obj.signalParam( 'sources' );
        let nv = obj.params.sources.slice();
        nv.splice( curind,1 );
        obj.setParam( 'sources', nv);
      }
    };
  };";  
};

feature "view_settings_dialog" {
    d: dialog {
     dom style_1=(eval (@rend->project | get_param "views" | arr_length) 
           code="(len) => 'display: grid; grid-template-columns: repeat('+(1+len)+', 1fr);'") 
     {
        text "/";
        dom_group {
          repeater input=(@rend->project | geta "views") 
          {
            rr: text (@rr->input | get_param "title"); 
          };
        };
        dom_group { // dom_group2
          repeater input= (@rend->project | get_param "processes") {
            q: dom_group {
              text (@q->input | get_param "title");
              repeater input=(@rend->project | get_param "views") 
              {
                i: checkbox value=(@i->input | get_param "sources" | arr_contains @q->input)
                  {{ x-on "user-changed" {toggle_visprocess_view_assoc src=@q->input;} }}
                ;
              };
            };
          }; // repeater2
        }; // dom_group2 
      }; // dom grid  

    }; // dlg
};

/*
feature "view_settings_dialog" {
    d: dialog {
     row style_1="flex-wrap: wrap;" {
      column {
        repeater input= (@rend->project | get_param "processes") {
                checkbox;
             };
      }
      repeater input=(@rend->project | get_param "views") {
        rr: column {
          text (@rr->input | get_param "title");
          column {
             repeater input= (@rend->project | get_param "processes") {
                checkbox;
             };
          };
        };
       };
     };

    };
};
*/

//lv1: landing-view-1;

feature "render_project" {
   rend: column padding="1em" project=@.->0 active_view_index=0 
            active_view=(@rend->project|geta "views"|geta @ssr->index){

       ssr: switch_selector_row 
               index=@rend->active_view_index
               items=(@rend->project | get_param "views" | sort_by_priority | map_param "title")
               style_qq="margin-bottom:15px;" {{ hilite_selected }}
                ;

       right_col: 
       column style="padding-left:2em; min-width: 80px; 
       position:absolute; right: 1em; top: 1em;" {
         button "Настройка соответствий" {
            view_settings_dialog project=@rend->project;
         };
         collapsible "Настройка экрана" {

           co: column plashka style_r="position:relative;"
            input=@rend->active_view 
            {

              row {
                insert_here list=(object_change_type2 input=@co->input
                  types=(@co->input | get_param "sibling_types" )
                  titles=(@co->input | get_param "sibling_titles"));
              };

              column {
                insert_here list=(@co->input | get_param name="gui");
              };

              button "Удалить экран" //style="position:absolute; top:0px; right:0px;" 
              {
                lambda @co->input code=`(obj) => { obj.removedManually = true; obj.remove(); }`;
              };
           };

           

/*
           render_layers_inner title="Виды" expanded=true
           root=@rend->project
           items=[ { "title":"Виды", 
                     "find":"the-view",
                     "add":"the-view",
                     "add_to": "@rend->project"
                   } ];
*/                   
         };          

       button_add_object "Добавить экран" add_to=@rend->project add_type="the-view-mix3d";  

       }; // column справа

       of: one_of 
              index=@ssr->index
              list={ 
                show_visual_tab input=(@rend->project | get_param "views" | get 0); // так то.. так то.. показывай просто текущий, согласно project[index].. но параметры сохраняй...
                show_visual_tab input=(@rend->project | get_param "views" | get 1);
                show_visual_tab input=(@rend->project | get_param "views" | get 2);
                show_visual_tab input=(@rend->project | get_param "views" | get 3);
                show_visual_tab input=(@rend->project | get_param "views" | get 4);
              }
              {{ one-of-keep-state; one_of_all_dump; }}
              ;

   };  
};