load "lib3dv3 csv params io gui render-params df scene-explorer-3d new-modifiers imperative";
load "main-lib.cl plugins.cl gui5.cl";

//////////////////////////////////////////////////////// главное окно программы

screen1: screen auto-activate  {
  render_project @project active_view_index=1;
};

debugger-screen-r;

///////////////////////////////////////////// проект

project: the_project active_view_index=1 
{

  insert_default_children input=@project list={
    lf: landing-file;
    lv: landing-view;
    //a1: axes-view size=100;
    //a2: axes-view title="Оси координат 2";

    v0: the-view-mix3d title="Данные" 
        sources_str="@lf";

    v1: the-view-mix3d title="Общий вид" 
        sources_str="@lv/lv1";

    v2: the-view-mix3d title="Вид на ракету" 
        sources_str="@lv/lv2";
  };

};

feature "the_project" {
  project:
  //views=(get-children-arr input=@project | pause_input | arr_filter_by_features features="the-view")
  views=(find-objects-bf features="the-view" root=@project | sort_by_priority)
  
  //processes=(get-children-arr input=@project | arr_filter_by_features features="visual-process")
  processes=(find-objects-bf features="visual-process" root=@project recursive=false | sort_by_priority)
  top_processes=(find-objects-bf features="top-visual-process" root=@project recursive=false | sort_by_priority)
  ;
};

///////////////////////////////////////////// экраны и процессы

feature "the_view_types";
the_view_types_inst: the_view_types;

feature "the_view" 
{
  tv: 
  title="Новый экран"
  gui={ 
    render-params @tv; 
    //console_log "tv is " @tv "view procs are" (@tv | geta "sources" | map_geta "getPath");

    qq: tv=@tv; // без этого внутри ссылка на @tv уже не робит..
    text "Включить:";

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
    // дале чтобы сохранялось всегда даж для введенных в коде вьюшек
    x-param-option name="title" option="manual" value=true;
    x-param-option name="sources_str" option="manual" value=true;
  }}
  
  sources=(find-objects-by-pathes input=@tv->sources_str root=@tv->project)
  project=@..

  //sibling_types=["the-view-mix3d","the-view-row", "the-view-small-big"] 
  //sibling_titles=["Одна сцена","Слева на право", "Окно в окне"]
  sibling_types=(@the_view_types_inst | get_children_arr | map_geta "value")
  sibling_titles=(@the_view_types_inst | get_children_arr | map_geta "title")
  ;
  
};

feature "visual_process" {
    output=@~->scene3d; // это сделано чтобы визпроцесс можно было как элемент сцены использовать
};

feature "top_visual_process" {
};

//////////////////////////////////////////////////////// рендеринг проекта

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
  };
};

/*
.. короче я тут начал подтягивать из вьюшек тип отображения
.. а при этом считаю что будет меняться этот тип отображения во вьюшках
.. например за счет смены типа вьюшек через методу render_layers_inner
.. которую я покажу рядом с кнопкой таблицы настройки видов
*/

//global_modifiers: render_project_right_col={};
// render_project_right_col_modifier: x-modify {};

feature "render_project_right_col";

feature "render_project" {
   rend: column padding="1em" project=@.->0 active_view_index=0 
            active_view=(@rend->project|geta "views"|geta @ssr->index){

       ssr: switch_selector_row 
               index=@rend->active_view_index
               items=(@rend->project | get_param "views" | sort_by_priority | map_param "title")
               style_qq="margin-bottom:15px;" {{ hilite_selected }}
                ;

       right_col: 
       project=@rend->project
       column style="padding-left:2em; min-width: 80px; 
       position:absolute; right: 1em; top: 1em;" 
       render_project_right_col
       //{{ x-modify list=@render_project_right_col_modifier }}

       {
        
         collapsible "Настройка экрана" {

           co: column plashka style_r="position:relative;"
            input=@rend->active_view 
            {

              column {
                object_change_type text="Способ отображения:"
                   input=@co->input
                   types=(@co->input | get_param "sibling_types" )
                   titles=(@co->input | get_param "sibling_titles");
              };

              column {
                insert_siblings list=(@co->input | get_param name="gui");
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
                show_visual_tab input=(@rend->project | get_param "views" | get 5); // так то.. так то.. показывай просто текущий, согласно project[index].. но параметры сохраняй...
                show_visual_tab input=(@rend->project | get_param "views" | get 6);
                show_visual_tab input=(@rend->project | get_param "views" | get 7);
                show_visual_tab input=(@rend->project | get_param "views" | get 8);
                show_visual_tab input=(@rend->project | get_param "views" | get 9);                
              }
              {{ one-of-keep-state; one_of_all_dump; }}
              ;


   };  
}
