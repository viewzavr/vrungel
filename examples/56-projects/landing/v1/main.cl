load "lib3dv3 csv params io gui render-params df scene-explorer-3d new-modifiers imperative";
load "56view";
load "landing-view.cl";

project: the_project active_view_index=1 
{

  insert_default_children input=@project list={

    lf: landing-file;
    lv1: landing-view-1;
    lv2: landing-view-2;

    sync_time: esync1 synced_param_name="time_index";

    lv_t_cur: landing-view-base title="Вывод T" scene2d_items={ curtime; };

    lv_t_select: landing-view-base title="Вывод переменных" scene2d_items={ selectedvars; };

    v0: the-view-mix3d title="Данные" 
        sources_str="@lf";

    v1: the-view-mix3d title="Общий вид" 
        sources_str="@lv1,@lv_t_cur";

    v2: the-view-mix3d title="Вид на ракету" 
        sources_str="@lv2,@lv_t_select";

    @v2->camera | console_log_input | x-modify { 
      x-set-params center=[0,0,0] pos=[101.97743440722813, 111.82726702985235, 155.1388566634926]; 
    };
        
  };

};
// мб будет полезно и такой "дефолтный проект" абстрагировать.
// чтобы по команде пользователя его применять.



//////////////////////////////////////////////////////// главное окно программы

screen1: screen auto-activate  {
  render_project @project active_view_index=1;
};

debugger-screen-r;