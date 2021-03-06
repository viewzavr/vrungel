load "lib3dv3 csv params io gui render-params df scene-explorer-3d new-modifiers imperative";
load "56view";
load "loader-tools.cl obj-tools.cl vis-tools.cl vtk-tools.cl";

feature "auto_gui" {
  vp:
  gui={
    render-params plashka @vp filters={ params-hide list="title"; };

    manage-content @vp
       root=@vp
       allow_add=false
       title=""
       vp=@vp
       items=[{"title":"Визуальные слои", "find":"visual-process"}];
  };
};

feature "auto_gui2" {
  vp:
  gui={
    render-params plashka @vp filters={ params-hide list="title"; };

    column style="" {
      show_sources_params input=@vp->subprocesses;
    };
  }
  subprocesses=(find-objects-bf root=@vp features="visual-process" include_root=false recursive=false)
  visible_subprocesses = (@vp->subprocesses | filter_geta "visible")
  scene3d= (@vp->visible_subprocesses | map_geta "scene3d" default=null)
  scene2d= (@vp->visible_subprocesses | map_geta "scene2d" default=null)
  ;
};

feature "auto_gui3" {
  vp:
  gui={}
  gui2={
    render-params plashka @vp filters={ params-hide list="title"; };

    column style="" {
      show_sources_params input=@vp->ag_subprocesses;
    };
  }
  ag_subprocesses=(find-objects-bf root=@vp features="visual-process" include_root=false recursive=false)
  ;
};


project: the_project 
  default_animation_parameter="project/adata/data->N"
{
  insert_children input=@project manual=true active=(is_default @project) list={

    ld: load-dir active_view=@rp->active_view;
    axes: axes-view size=10;

    v1: the-view-uni title="Общий вид" {
          area sources_str="@ld, @axes";
          camera pos=[10,10,10];
    };

  };

};


//////////////////////////////////////////////////////// главное окно программы

screen1: screen auto-activate  {
  rp: render_project @project active_view_index=0;
};