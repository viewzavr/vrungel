register_feature name="collapsible" {
  cola: 
  column text=@.->0 expanded=false
  //button_type=["button"]
  {
    shadow_dom {
      btn: button text=@../..->text {
        m_apply "(env) => env.setParam('expanded', !env.params.expanded, true)" @cola;
      };

      pcol: 
      column visible=@cola->expanded? {{ use_dom_children from=@cola; }};

      insert_features input=@btn  list=@cola->button_features?;
      insert_features input=@pcol list=@cola->body_features?;

    };

  };
};

register_feature name="plashka" {
  object
  style_p="background: rgba(99, 116, 137, 0.86); padding: 5px;"
  style_b="border-left: 8px solid #00000042;
                      border-bottom: 1px solid #00000042;
                      border-radius: 5px;
                     "
  style_border_b="margin-bottom: 5px;"               
};

feature "sort_by_priority"
{
    m-eval {: arr |
       //if (!env.params.input) return [];
       let qprev;
       for (let q of arr) {
         if (q.params.block_priority == null)
          {
            //if (qprev)
            //  q.setParam('block_priority', qprev.params.block_priority+1,true);
            //else
            q.setParam('block_priority',0); // убрал true
          }
         
         if (qprev && q.params.block_priority == qprev.params.block_priority)
            q.setParam('block_priority', qprev.params.block_priority+1); // убрал true - т.е. не сохраняем

         qprev = q;   
       }

       //console.log('after cure, arr is ',arr);

       return arr.sort( (a,b) => {
        function getpri(q) { 
            return q.params.block_priority;
          }
        return getpri(a) - getpri(b); 
       })
   :}
}

feature "created_mark_manual" {
  onevent name="created" 
     code=`
         args[0].manuallyInserted=true;
     `;
  ;    
};

// добавка
// curview параметр обязательный, процесс приезжает в аргументе
feature "created_add_to_current_view" {
  x-on "created"
     code=`
         let item = arg2;
         env.params.curview.append_process( item );
         //let project = args[0].ns.parent;
         //args[0].manuallyInserted=true;
     `;
  ;
};

// add_to 
// add_type
feature "button_add_object" {
  bt_root: button "Добавить" margin="0.5em" {
        
        //link from="@bt_root->add_to" to="@cre->target" soft_mode=true;

        cre: creator input={} target=@bt_root->add_to
          {{ onevent 
             name="created" 
             newf=@bt_root->add_type?
             btroot=@bt_root
             code=`
                 arg1.manuallyInserted=true;

                 // сейчас мы через фичи инициализируем новые объекты через manual_features
                 // чтобы выбранный тип "сохранялся" в состоянии сцены.
                 // в будущем это можно будет изменить на другой подход
                 //args[0].manual_feature( "linestr" );
                 //args[0].setParamManualFlag("manual_features");
                 //let s = "linestr";

                 let s = env.params.newf;
                 Promise.allSettled( arg1.manual_feature( s ) ).then( () => {
                    env.params.btroot.emit("created", arg1 ); 
                 })
                 //arg1.setParam("manual_features",s,true)
                 //arg1.apply_manual_features();   
                 
             `
          }};
     };    
};

// add_to
// add_template это шаблон
feature "button_add_object_t" {
  bt_root: button "Добавить" margin="0.5em" {
        
        //link from="@bt_root->add_to" to="@cre->target" soft_mode=true;

        cre: creator input=(@bt_root->add_template | dump_to_manual) target=@bt_root->add_to
          {{ onevent 
             name="created" 
             //newf=@bt_root->add_type
             btroot=@bt_root
             code=`
             /*
                 arg1.manuallyInserted=true;

                 // сейчас мы через фичи инициализируем новые объекты через manual_features
                 // чтобы выбранный тип "сохранялся" в состоянии сцены.
                 // в будущем это можно будет изменить на другой подход
                 //args[0].manual_feature( "linestr" );
                 //args[0].setParamManualFlag("manual_features");
                 //let s = "linestr";

                 //let s = env.params.newf;
                 
                 let k = env.params.btroot.params.add_template;
                 let s = Object.keys( k[0].features ).filter( f => f != "base_url_tracing");
                 arg1.setParam("manual_features",s,true);
                 //console.log("created",arg1)
             */

                 env.params.btroot.emit("created", arg1 );
             `
          }};
     };    
};

//target_obj | object_change_type | console_log;
//вот тут хотелось бы... чтобы вместо object_change_type оказалось бы 2 объекта..

// можно оказывается напрямую на русском языке писать и это будут фичи;

// комбо выбиралки типа объекта
// input - объект, 
// types - список типов
// titles - список названий
feature "object_change_type"
{
   cot: object 
      input=null types=[] titles=[]
      text="Образ: "
      dom_generator=true
      {{ m_eval "() => {
          scope.cot.ns.parent.callCmd('rescan_children')
        }" @cot->output
      }}
      output=(dom_group {

   text @cot->text;

   cbb: combobox 
            values=@cot->types?
            titles=@cot->titles?
            value=(detect_type @cot->input? @cbb->values?)
            style="width: 120px;"
            {{ on "user_change" {
              lambda @cot->input? @cot code=`(obj,cot, v) => {
                // вот мы спотыкаемся - что это, начальное значение или управление пользователем

                // console.log("existing obj",obj,"creating new obj type",v);

                let dump = obj.dump();

                let origparent = obj.ns.parent;
                let pos = origparent.ns.getChildren().indexOf( obj );
                

                //console.log("dump is",dump)

                let newobj = obj.vz.createObj();
                origparent.ns.appendChild( newobj,'item',true,pos );
                
                let arr = obj.ns.getChildren().slice(0);
                for (let c of arr)
                  newobj.ns.appendChild( c, c.ns.name,true );

                obj.remove();
                

                Promise.allSettled( newobj.manual_feature( v ) ).then( () => {
                  newobj.manuallyInserted=true;

                  //onsole.log("setted manual feature",v);

                  if (dump) {
                    if (dump.params) {
                        delete dump.params['manual_features'];
                        newobj.vz.restoreParams( dump, newobj, true );
                    }
                    
                    //console.log("restoring dump",dump);
                    //dump.manual = true;
                    //newobj.restoreFromDump( dump, true );

                    console.log("created obj", newobj)
                  }

                  cot.emit('type-changed', newobj);
                });
                

                }`;

           }
           }}; // on user changed
   }); // dom group           

};

// рисует набор кнопочек для управления объектами сцены
/* root - сцена где искать объекты
   пример
    render_layers_inner 
         title="Визуальные объекты" 
         root=@vroot
         items=[ {"title":"Объекты данных", find":"guiblock datavis","add":"linestr","add_to":"@some->path_param"},
                 {"title":"Статичные","find":"guiblock staticvis","add":"axes"},
                 {"title":"Текст","find":"guiblock screenvis","add":"select-t"}
               ];

   при этом у объектов должны быть параметры
    sibling_titles sibling_types - используется для смены типа объекта
    gui - используется для рендеринга визуального интерфейса

   todo idea а зачем ему искать. пусть пользователь искает. а этот ток показывает. 
*/


// по объекту выдает его первичный тип (находя его в массиве types)
// эта странная вещь т.к. я отказался от типа объекта и теперь его не знаю. хм.
feature "detect_type" {
  eval code="(obj,types) => {
    //console.log('detect_type:',obj,types)
    if (!(obj && types)) return null;
    if (types.length == 0) return null; // но это и не ошибка

      for (let f of types) {
        //if (obj.$features_applied[f]) 
        let fcheck = Array.isArray(f) ? f[0] : f; // хак, для отработки типов вида [type,label]
        if (obj.is_feature_applied(fcheck))
        { 
          //console.log('detect-type',f,obj);
          return f;
        };
      };

    console.log('detect-type failed',obj,types);
  }";

};


///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

/*
   рисует "интерфейс". пример:

   render_interface
       left={
          collapsible text="Основные параметры" style="min-width:250px;" padding="10px"
          {
            render-params  input=@mainparams;
          }; 
       }
       middle={}
       right={
        render_layers title="Визуальные объекты" 
           root=@vroot
           items=[ {"title":"Объекты данных", "find":"guiblock datavis","add":"linestr"},
                   {"title":"Статичные","find":"guiblock staticvis","add":"axes"},
                   {"title":"Текст","find":"guiblock screenvis","add":"select-t"}
                 ];
       };
*/

feature "render_interface" {

    dg: dom_group 
      {{ insert_children @left list=@dg->left;
         insert_children @middle list=@dg->middle; 
         insert_children @right list=@dg->right; 
      }}
      {
        row style="z-index: 3; color: white;" 
            class="vz-mouse-transparent-layout" 
            align-items="flex-start" // эти 2 строчки решают проблему мышки
        {
          left: column;
          middle: column;
        }; // row

        right: column style="position:absolute; right: 20px; top: 10px;"; 
    };
};


// работает в связке с one_of - сохраняет данные объекта и восстанавливает их
// идея также - сделать передачу параметров между объектами в духе как сделано переключение 
// типа по combobox/12chairs (см lib.cl)
// дополнительно - делает так чтобы в дамп системы не попадали параметры сохраняемого объекта
// а сохранялись бы внутри one-of и затем использовались при пересоздании
// таким образом one-of целиком сохраняет состояние всех своих вкладов в дампе системы

// прим: тут @root используется для хранения параметров и это правильно; но в коде он фигурирует как oneof

// сохраняет состояние вкладок при переключении
feature "one_of_keep_state" {
  root: x_modify 
  {
    x-on "destroy_obj" {
       lambda code=`(oneof, obj, index) => {
         if (!oneof) return;
         let dump = obj.dump(true);
         let oparams = oneof.params.objects_params || [];
         oparams[ index ] = dump;
         //console.log("oneof dump=",dump)
         oneof.setParam("objects_params", oparams, true );
       }`;
     };

     x-on "create_obj" {
       lambda code=`(oneof, obj, index) => {
         if (!oneof) return;
         let oparams = oneof.params.objects_params || [];
         let dump = oparams[ index ];
         //console.log("oneof: dump is",dump,oneof.params.objects_params)
         if (dump) {
             dump.manual = true;

             env.feature("delayed");
             env.delayed( () => {
                //console.log("oneof:restoring tab 2",dump)
                obj.restoreFromDump( dump, true );
             }, 15) (); // типа пусть репитер отработает.. если там внутрях есть..  

         }
       }`;
     };

    // выяснилась доп-история что на старте программы объект уже может быть создан
    // и нам надо это отловить..
    x-patch {
      lambda code=`(env) => {

        let orig = env.restoreChildrenFromDump;
        env.restoreChildrenFromDump = function ( edump, manualParamsMode, $scopeFor ) {
          
          if (env.params.output) { 
             let obj = env.params.output;
             let oparams = edump.params.objects_params || [];
             if (oparams) {
               let dump = oparams[ env.params.index ];
               //console.log("oneof: using extra dump",edump)
               if (dump) {
                   dump.manual = true;
                   //debugger;
                   env.feature('delayed');
                   env.delayed( () => {
                      //console.log("oneof:restoring tab",dump,obj)
                      obj.restoreFromDump( dump, true );
                    }, 15) (); // типа пусть репитер отработает.. если там внутрях есть..  
                   
               }
             }
          }
          //return env.vz.restoreObjFromDump( edump, env, manualParamsMode, $scopeFor );
          return orig( edump, manualParamsMode, $scopeFor )
        }         
       }`;
    };

  };
};

// заменяет dump у one-of и у создаваемого им объекта таким образом, чтобы
// 1 создаваемый объект не выдавал dump при общем сохранении
// 2 создаваемый объект сохранял бы dump в переменную save_state[i] у one-of
// это позволяет корректно сохранять состояние всех вкладок 
// и восстанавливает его при перезагрузке страницы
feature "one_of_all_dump" {
  root: x_modify 
  {
    x-patch {
      lambda code=`(env) => {
         let origdump = env.dump;
         env.dump = () => {
           
           env.emit( "save_state");
           return origdump();
         }

       }`;
    };

    x-on "save_state" {
       lambda code=`(oneof) => {
         if (!oneof) return;
         let obj = oneof.params.output;
         let index = oneof.params.index;
         
         if (obj && index >= 0) {
           let dump = obj.dump(true);
           let oparams = oneof.params.objects_params || [];
           oparams[ index ] = dump;

           oneof.setParam("objects_params", oparams, true );
         }  
       }`;
     };

     x-on "create_obj" {
       lambda code=`(oneof, obj, index) => {
         let origdump = obj.dump;
         obj.dump = (force) => {
            if (force) return origdump();
         }
       }`;
     };
  };
};