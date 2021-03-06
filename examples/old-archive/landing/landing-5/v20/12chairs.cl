///////////////////////////////////////////////////////////
////////////////////////// создавалка объектов по описанию
/////////////////////////////////////////////////////

// модель  работы. на вход поступает массив описаний возможных объектов
// пользователю дается выбор какой объект создавать (на основе title описания)
// затем этот объект создается
// при этом анализируются его поля, содержащие описания окружений
// которые следуте добавить к тем или иным окружениям программы
// таким образом реализуется модель "добавок" в программу.
// это может быть использовано как для подключения функциональности к программе
// так и для реализации наборной модели визуального программирования.

// вход: list - список объектов с описанием добавок
//       mapping - окружение с описанием кого куда
//       input = возможные входные данные

// примечание по list. каждая запись это объект содержащий title, code
register_feature name="create_by_user_type" {
  vlayer: 
    gui_title=( @.->list  | 
                    | arr_filter type=@selected_show->value code=`(c) => c.params.code == env.params.type` 
                    | get name=0 
                    | get_param name="title")
    gui={
      text text="create_by_user_type...";
      render-params input=@vlayer;
      find-objects features="created_by_we" root=@vlayer recursive=false | repeater {
        //text text="created-by-repeater" {{ console_log_params text="12paints"; }};;
        paint_kskv_gui {{ console_log_params text="12paints"; }};
      };

      /*
      repeater input=[1,3,4] {
        paint_kskv_gui {{ console_log_params text="12paints" }};
      };*/

      //(find-objects features="user_objects_creators" root=@vlayer foundstop=true | arr_map_c with={get_param name="output"} | arr_join)
    }
    active=true
  {

    //gui_title: param_string;

    selected_show: param_combo 
       values=(@vlayer->list | arr_map code=`(c) => c.params.code`)
       titles=(@vlayer->list | arr_map code=`(c) => c.params.title`);

    mapping_obj: {
      deploy_many input=@vlayer->mapping;
    };

    //debug: param_cmd code=`debugger;`;

    get_children_arr input=@mapping_obj 
    | arr_filter code=`(c) => c.params.channel` //
    | repeater
    {
      recroot: // input это запись о мэппинге. это окружение с параметрами channel и target 
        channel=(@.->input | get_param name="channel")
        target=(@.->input | get_param name="target")
      { 

        deploy_many_to target=@recroot->target user_objects_creators
           input=( @vlayer->list 
                    | arr_filter type=@selected_show->value code=`(c) => c.params.code == env.params.type` 
                    | get name=0 
                    | get param=@recroot->channel )
           
           //include_gui_from_output
           {{ find-objects-follow to=@.->output }}
           extra_features={
              set_params input=@vlayer->input 
                         active=@vlayer->active visible=@vlayer->active;
              add_feature name="created_by_we";
           }
           {{ keep_state }}; // keep_state сохраняет состояние при переключении типов объектов
      };
    };

    //param_cmd name="dbg" text="test" in1=@vlayer->input code=`console.log( env.params.in1 )`;

    // todo теперь сюда как-то суб-фичи прикрутить
    // мб. по селектору subfeature_target фильтровать

  };
};

register_feature name="keep_state" {
  ksroot: {
    connection object=@ksroot->.host event_name="before_deploy" vlayer=@ksroot code=`
          //console.log("EEEE0 args=",args,"object=",env.params.object);
          let envs = args[0] || [];
          let existed_env = envs[0];
          
          if (!existed_env) return;
          
          let dump = existed_env.dump();
          //console.log("EEEE generated dump",dump);

          //if (!env.params.vlayer) return;
          env.params.vlayer.setParam("item_state", dump);
        `;

        //onevent name="after_deploy" vlayer=@vlayer code=`
        // выглядит что проще добавить в onevent тоже обработку object, и уметь делать ссылки на хост.. @env->host
        // ну или уже сделать параметр такой..
    connection object=@ksroot->.host event_name="after_deploy" vlayer=@ksroot code=`
          //console.log("UUUU0",args);
          let envs = args[0] || [];
          let tenv = envs[0];
          
          if (!tenv) return;

          let dump = env.params.vlayer.getParam("item_state");
          //console.log("UUUU0 using dump",dump);

          if (!dump) return;
          
          //dump.keepExistingChildren = true;
          //dump.keepExistingParams = true;
          dump.manual = true;
          tenv.restoreFromDump( dump, true );
        `;     
  };
};