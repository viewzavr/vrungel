export function setup(vz, m) {
  vz.register_feature_set( m );

}

// устанавливает параметры целевому объекту
// пока для упрощения только хост
// особенность - set_params можно удалить и тогда вернутся старые значения параметров
// что ценно для разнообразных аспектов.
// пример: set_params input=... y=... z=...;
export function set_params( env )
{
   env.host.feature("param_subchannels");

   let channel = env.host.create_subchannel();

   env.on('param_changed',(name,value) => {
      channel.setParam( name, value );
   });
   for (let c of env.getParamsNames())
      channel.setParam( c, env.getParam(c));

   env.on("remove", () => channel.remove( ! env.host.removing ) );
}

// новый модификатор
// x_set_params a=5 b=c;
export function x_set_params( env )
{
  let detach = {};

  //console.warn("x-set-params start monitoring attach",env.getPath())

  env.on("attach",(obj) => {
      //console.log("x-set-params attach",env.getPath(),obj.getPath())

      obj.feature("param_subchannels");

      let channel = obj.create_subchannel();

      let u1 = env.on('param_changed',(name,value) => { // todo optimize
         if (name !== "__manual" && name !== "__debug") {
            //console.log('passing ',name,value,channel)
            if (env.params.__debug)
                debugger;
            channel.setParam( name, value, env.params.__manual ); 
         };
      });
      
      
      for (let c of env.getParamsNames()) {
         //console.log("setting param ",c)
         if (c !== "__manual" && c !== "__debug")
            channel.setParam( c, env.getParam(c), env.params.__manual );
      }

      let unsub = () => { u1(); if (!channel.removed) channel.remove( ! env.params.__manual ); }
      env.on("remove", unsub ); // todo optimize
      detach[ obj.$vz_unique_id ] = unsub;

      return unsub;
  });

  env.on("detach",(obj) => {
    let f = detach[ obj.$vz_unique_id ];
    if (f) {
      f();
      delete detach[ obj.$vz_unique_id ];
    }
  });

}

export function x_set_param( env )
{
  env.feature("m_auto_detach_algo",(obj) => {
      //console.log("x-set-params attach",env.getPath(),obj.getPath())

      obj.feature("param_subchannels");

      let channel = obj.create_subchannel();

      let u1 = env.monitor_values( ["name","value"],(n,v) => {
         if (!n) return;
         //console.log("x-set-param",n,v,obj.getPath())
         // туду реагировать на изменение n отменой параметра в канале
         channel.setParam( n,v, env.params.__manual);
      });

      let unsub = () => { 
         if (!channel.removed) 
             channel.remove( ! env.params.__manual ); 
         u1(); 
      }

      return unsub;
  });

}

// todo эта штука не отменяет последующие присвоения параметров у базового объекта, а видимо это нужно
// в этом смысле после присвоения значения каналу.. getParam должен работать как проходка по этим каналам..
// либо setParam не должен срабатывать, если есть верхние каналы с этим параметром
export function param_subchannels(env) 
{
  env.create_subchannel = () => {
    let res = { params: {}, my_env: env };
    env.$subchannels ||= [];
    env.$subchannels.push( res );

    // m.addTreeToObj(obj, "ns");
    res.remove = (restore_values_to_original=true) => {
       
       let i = env.$subchannels.indexOf( res );
       if (i >= 0)
           env.$subchannels.splice( i, 1 );

       if (!restore_values_to_original) // особый случай. если у нас ручное управление то отменять не надо. да уж.
           return; // ну либо отдельный флаг надо будет сделать

       //console.log('channel removing and restoring params',res) 

       // todo странно все это.. все параметры заново выставлять.. тем более там есть ссылки и резульатты выражений..
       // возможно лучше было бы.. выставлять только то что было в данном канале...
       // + cочесть с тем что ниже на тему выставления undefined
       let notified = env.update_params_from_subchannels();

       // ну и еще для кучи для теста разошлем информацию что поменялось то, что ушло
       // а точнее надо даже прям явно ее и удалить (ну undefined выставим)
       for (let q of Object.keys(res.params))
         if (!notified[q]) env.setParam(q,undefined);
         //if (!notified[q]) env.signalParam(q);
    }

    res.setParam = (name,value, ...args) => {
      res.params[name] = value;
      // проверим что не перекрывают верхние
      let this_channel_index = env.$subchannels.indexOf( res );
      for (let k=this_channel_index+1; k<env.$subchannels.length; k++)
        if (env.$subchannels[k].hasParam(name)) 
             return
      orig_setParam( name,value, ...args );
    }

    res.hasParam = (name) => res.params.hasOwnProperty(name)

    return res;
  }

  // тупо едем по всем и выставляем, сообразно кто удалился - больше не установит
  env.update_params_from_subchannels = () => {
     let notified = {};
     for (let c of env.$subchannels) {
        for (let q of Object.keys(c.params)) {
           orig_setParam( q, c.params[q], env.getParamManualFlag(q) );
           notified[q] = true;
        }
     }
     return notified;
  };

  let channel0 = env.create_subchannel();
  channel0.params = {...env.params}; // запомним то что было 

  // теперь будем заменять стандартное setParams на новое
  let orig_setParam = env.setParam;
  env.setParam = channel0.setParam;
}