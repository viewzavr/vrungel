load "lib3dv3 csv params io gui render-params df scene-explorer-3d gui5.cl new-modifiers imperative";

load "landing3/landing-view.cl landing/test.cl universal/universal-vp.cl"; // отдельный вопрос

feature "setup_view" {
  column {
    button "Настройки"
  };
};

// подфункция реакции на чекбокс view_settings_dialog
// идея вынести это в метод вьюшки. типа вкл-выкл процесс.
// .view, .process
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
        console.log('nv',nv)
        
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
  show_view={ show_visual_tab1; }
  title="Вид"
  gui={ 
    render-params @tv; 
    //console_log "tv is " @tv "view procs are" (@tv | geta "sources" | map_geta "getPath");

    qq: tv=@tv; // без этого внутри ссылка на @tv уже не робит..
    text "Отображаемые процессы:";
    //qoco: param_field name="Отображаемые процессы" { column; };

    @tv->project | geta "processes" | repeater //target_parent=@qoco 
    {
       i: checkbox text=(@i->input | geta "title") 
             value=(@qq->tv | geta "sources" | arr_contains @i->input)
          {{ x-on "user-changed" {
              toggle_visprocess_view_assoc2 process=@i->input view=@qq->tv;
          } }};
    };

  }
  {{
    x-param-string name="title";
  }}
  sibling_types=["the-view","the-view-row"] 
  sibling_titles=["Одна сцена","Слева на право"]
  sources=(find-objects-by-pathes input=@tv->sources_str root=@tv->project)
  project=@..
  camera=@cam
  {
     cam: camera3d pos=[-400,350,350] center=[0,0,0];
     // вот бы метод getCameraFor(i).. т.е. такое вычисление по запросу..
  };
  
};

feature "the_view_row" 
{
  tv: the-view show_view={ show_visual_tab_row; } title="Ряд";
};

feature "visual_process" {
};

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

  v0: the-view title="Данные" 
      sources_str="@lf"
  {
  };

  v1: the-view title="Общий вид" 
      sources_str="@lv/lv1 ,@a1";
  {
    
  };

  v2: the-view title="Вид на ракету" 
      sources_str="@lv/lv2,@a2";
  {
  };

  /*
  v_setup: the-view title="Настройки" {
    //sync_params_process root=@project;
  }
  */
};

screen1: screen auto-activate  {
  render_project @project active_view_index=1;
};

debugger-screen-r;

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
    
    @ic->output | x-modify { x-set-params input=@sv->input };
  };
};
/*
.. короче я тут начал подтягивать из вьюшек тип отображения
.. а при этом считаю что будет меняться этот тип отображения во вьюшках
.. например за счет смены типа вьюшек через методу render_layers_inner
.. которую я покажу рядом с кнопкой таблицы настройки видов
*/

feature "show_visual_tab1" {
   sv: dom_group 
   {

    row {

    svlist: column {
      repeater input=(@sv->input | get_param "sources") {
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

    scene_3d_view: view3d style="position: absolute; top: 0; left: 0; width:100%; height: 100%; z-index:-2";

    r1: render3d 
        bgcolor=[0.1,0.2,0.3]
        target=@scene_3d_view //{{ skip_deleted_children }}
        input=(@sv->input | get_param "sources" | map_param "scene3d") // кстати идея так-то сделать аналог и для 2д - до-бирать детей отсель
    {
        camera3d pos=[-400,350,350] center=[0,0,0];
        orbit_control;
    };

    extra_screen_things: 
    column style="padding-left:2em; min-width: 80vw; 
       position:absolute; bottom: 1em; left: 1em;" {
       dom_group 
         input=(@sv->input | get_param "sources" | map_param "scene2d");
    };

    // думаю нет ничего плохого если мы этим скажим рисоваться сюды
    x-modify input=@sv->input {
      //x-set-params slice_scene3d=@scene_3d_view slice_renderer=@r1 scene2d=@extra_screen_things;
      //x-set-params scene2d=@extra_screen_things;
    };

   }; // domgroup

}; // show vis tab

feature "show_visual_tab_row" {
   sv: dom_group 
   {

    row {

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

    //cam: output=(@sv->input | geta "camera");

    rrviews: row style="position: absolute; top: 0; left: 0; width:100%; height: 100%; z-index:-2;
        justify-content: center;
    " 
    {
      repa: repeater input=(@sv->input | geta "sources") {
        src: 
          view3d style="flex: 1 1 0; width: 100px;" {

          r1: render3d 
              bgcolor=[0.1,0.2,0.3]
              target=@src //{{ skip_deleted_children }}
              input=(@src->input | geta "scene3d")
              camera=(@sv->input | geta "camera")
              {
                  // идея надо просто камеру в инпут утащить. шоб она там была. да и все.
                  // но опять же а может ее во вьюшку надо утащить.
                  // кстати я же делал как-то синхронизацию камер.. 
                  orbit_control; // camera=@cam;
              };
          
              // плоское
              column style="padding-left:2em; min-width: 100%;
                 position:absolute; bottom: 1em; left: 1em;" {
                 dom_group 
                   input=(@src->input | geta "scene2d");
              };
              
        }; // view3d
      };
    };

   }; // domgroup

}; // show vis tab

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
          repeater input=(@rend->project | get_param "views") 
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

/* не ну это интрига. говорить - инсерт чилдрен таба из его гуи.. хм..
feature "oneview" {
  ov: gui={
    
  }
}
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
         collapsible "Настройка вида" {

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

              button "Удалить вид" //style="position:absolute; top:0px; right:0px;" 
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

       button_add_object "Добавить вид" add_to=@rend->project add_type="the-view";  

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
}



/*
  of: one_of 
              index=@ssr->index
              list={ 
                oneview {
                  collapsible text="Траектория возвращения" style="min-width:250px;" padding="5px"
                  {
                    //render-params input=@lv1;
                    insert_children input=@.. list=@lv1->gui;
                  };
                  collapsible text="Траектория возвращения 2" style="min-width:250px;" padding="5px"
                  {
                    //render-params input=@lv1;
                    insert_children input=@.. list=@lv1->gui;
                  };
                };
                oneview;
                addview;
              }
              {{ one-of-keep-state; one_of_all_dump; }}
              ;

*/