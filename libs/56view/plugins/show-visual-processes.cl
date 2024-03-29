// первый плагин. поведение - при активации вида открывать параметры первого визуального процеса.

// визуальные процессы проекта

// монтаж
/*
insert_children @render_project_right_col_modifiers {
	x-insert-children list={manage_visual_processes};
}

// а там:
{{ x-modify modifiers=(@render_project_right_col_modifiers | get_children_arr ) }}
*/

find-objects-bf features="render_project_right_col" recursive=false 
|
insert_children { manage_visual_processes; };

////////////////////////////

// вход - project - визпроект
feature "manage_visual_processes" {
	vp: collapsible "Визуальные объекты"
      project=@..->project
      active_view = @..->active_view
    	{
        render_process_hierarchy 
           objects=@vp.project.processes
           active_view=@vp.active_view?
        ;
                  
        //render_process_hierarchy objects=(@vp->project | geta "top_processes");
     	};
};

feature "render_process_hierarchy"
{
    rh: column ~plashka
    objects=[] // список объектов верхних процессов
     //text=@.->title?
    style="min-width:250px;"     
    style_h = "max-height:80vh;"
    
    {
     /// верхний и след уровни...

     let objects_list=(@rh->objects | pause_input | repeater target_parent=@~ { 
     	 q: object repeater_output=(concat @l1 @l2) {
     		  l1: object
              id=(@q->input | geta "$vz_unique_id")
     	        title=(@q->input | geta "title")
     	        obj=@q->input
     	         ;

     	    let l2 = (@q->input | geta "subprocesses" default=[] | repeater target_parent=@~ {
       	          qq: object id=(@qq->input | geta "$vz_unique_id")
     	                title=(join "  - " (@qq->input | geta "title"))
     	                obj=@qq->input
     	                ;
     	        });
     	  };
     } | pause_input | map_geta "repeater_output" | geta "flat" fok=true | m_eval_input | arr_compact);

     cbsel: combobox style="margin: 5px;" dom_size=10
       values=(@objects_list | map_geta "id")
       titles=(@objects_list | map_geta "title")
       ;

    /// параметры объекта

     let selected_object = (@objects_list | geta @cbsel->index? default=null | geta "obj")
     

     co: column ~plashka style_r="position:relative; overflow: auto;"  
            input=@selected_object?
      {
        column {
          insert_children input=@.. list=(@co->input? | geta "gui3" default=[]);
        };
        button "Клонировать" 
        {
          /*
          make-func @co->input? @rh->active_view @cbsel { |obj curview cbsel|
             clone: clone_obj @obj;
             when_value @clone->output { |nobj|
               res: @curview | geta "append_process" @nobj;
               when_value @res->output { 
                 @cbsel | get-cell "index" | set-cell-value ((@cbsel | geta "values" | geta "length") - 1);
               };
             };  
          };
          */

          m_lambda "(obj,curview,cbsel) => {
             let n = obj.clone();
             n.then(nobj => {
              curview.append_process( nobj );
              console.log('cloned to',nobj);
              cbsel.setParam( 'index', cbsel.params.values.length-1 );
             })
          }" @co->input? @rh->active_view? @cbsel;
        };

        button "Удалить" 
          on_click={: obj=@co.input? |
            obj.removedManually = true; obj.remove(); 
          :}

/*
        button "Удалить" //style="position:absolute; top:0px; right:0px;" 
        {
          lambda @co->input? code=`(obj) => { console.log('removing',obj); obj.removedManually = true; obj.remove(); }`;
        };
*/        

     };


  };

};