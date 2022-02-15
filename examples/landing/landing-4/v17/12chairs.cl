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


//
load files="active-feature.cl";

conf12: 
  addon-modifiers=( get_children_arr input=@conf12 | console_log text="EE5" | envs_get_param name="addon-modifiers" )
  addon-elems-modifiers=( get_children_arr input=@conf12 | envs_get_param name="addon-elems-modifiers" )
  global=( get_children_arr input=@conf12 | envs_get_param name="global" )
  {{ console_log_params text="EEEE" }}
{
  active_feature;
};

global12: {
  deploy_many input=@conf12->global;
};


// на вход получает массив окружений и на выходе выдает массив значений указанного параметра
// пример: envs_get_param input=@some->children name="alfa" | arr_non_empty;

register_feature name="envs_get_param" code=`
  env.feature("delayed");
  let res = [];
  function publish() {

    env.setParam("output",res);
  }
  let publish_delayed = env.delayed( publish );

  let unsub = [];
  function clear() { unsub.forEach( u => u() ); unsub=[]; }
  env.onvalues(["input","name"],(arr,param) => {
     clear();
     res = [];
     let i = 0;
     for (let it of arr) {
        res.push( undefined );
        let q = i;
        i++;
        let u = it.onvalue( param,(v) => {
           res[q] = v;
           publish_delayed();
        })
        unsub.push( u );
     }
  })

  env.on("remove",unsub);
`;

// вход: list - объект содержащий список типов добавок.
//       mapping - окружение с описанием кого куда
register_feature name="addon_layer" {
  vlayer: 
    gui_title=( @.->list | get child=@selected_show->value | get param="title")
    items_in_list=(@.->list | get_children_arr | arr_filter code=`(c) => c.params.title`)
    {{ deploy_features feautures=@conf12->addon-modifiers input=@. }}
  {

    //gui_title: param_string;

    selected_show: param_combo 
       values=(@vlayer->items_in_list | arr_map code=`(c) => c.ns.name`)
       titles=(@vlayer->items_in_list | arr_map code=`(c) => c.params.title`);

    mapping_obj: {
         deploy_many input=@vlayer->mapping;
    };

    get_children_arr input=@mapping_obj | | arr_filter code=`(c) => c.params.target` 
    | repeater {
      recroot: // input это запись о мэппинге. это окружение с параметрами channel и target 
      channel=(@.->input | get param="channel")
      target=(@.->input | get param="target")
      { 
        deploy_many_to target=@recroot->target
           input=( @vlayer->list | get child=@selected_show->value | get param=@recroot->channel )
           include_gui_from_output
           extra_features={
             set_params input=@vlayer->input;
             {{ deploy_features feautures=@conf12->addon-elems-modifiers input=@. }}
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