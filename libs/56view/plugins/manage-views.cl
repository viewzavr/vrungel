find-objects-bf features="render_project_right_col" recursive=false 
|
insert_children { 
  manage_views block_priority=0; 
};

feature "manage_views" {

  mv: collapsible "Настройка экрана" 
      render_project=@..->render_project
      project=@..->project
      active_view=@..->active_view
      style="min-width: 256px"
      {

           co: column ~plashka 
                style_r="position:relative;" 
                input=@mv->active_view 
            {

              

/*
              column visible=( (@co->input | pause_input | geta "sibling_types" | geta "length") > 1) {
                object_change_type text="Способ отображения:"
                   input=@co->input
                   types=(@co->input | pause_input | geta "sibling_types" )
                   titles=(@co->input | pause_input | geta "sibling_titles");
              };
*/

              column {
                insert_siblings list=(@co->input | get_param name="gui");
              };

              //button_add_object "Добавить новый экран" add_to=@mv->project add_type="the_view_recursive";  
              button_add_object_t "Добавить новый экран" add_to=@mv->project add_template={ the_view_recursive { area_3d } };

              button "Удалить экран" 
                //dom_disabled=true
              //style="position:absolute; top:0px; right:0px;" 
              {
                lambda @co->input code=`(obj) => { obj.removedManually = true; obj.remove(); }`;
              };

           };

/*
           render_layers_inner title="Виды" expanded=true
           root=@mv->project
           items=[ { "title":"Виды", 
                     "find":"the-view",
                     "add":"the-view",
                     "add_to": "@mv->project"
                   } ];
*/                   
         };

};         