// предназначение - сохранять в hash страницы все что там ставится через параметры
// и загружать на старте страницы

// функция setup настраивает player - дает ему методы loadFromHash, saveToHash, startSavingToHash, stopSavingToHash
// путем заноса во вьюзавр хуков - на установку параметров и модификацию деревьев

export function setup(vz, m) {
  vz.register_feature_set(m);
}

export function save_state_to_window_hash( player ) {
  let vz = player.vz;

  // nodejs
  if (typeof(window) == "undefined") return;

////////////////////////////////////////// цепляемся в команды obj - будем от них плясать на тему сохранения в хеш

  function setup_obj(x) {

    var _setParam = x.setParamWithoutEvents;
    var _getParam = x.getParam;
    var _removeParam = x.removeParam;

    x.setParamWithoutEvents = function(name,value,ismanual) {
      //console.log("hasher see setParam call",name,value);
      if (!x.getParamOption(name,"internal")) 
        if (ismanual)
            player.scheduleSaveToHash( x );

      return _setParam( name, value, ismanual );
    }

    x.removeParam = function(name) {
      return _removeParam(name);
    }
    
    //debugger;
    var _appendChild = x.ns.appendChild;
    x.ns.appendChild = function(obj,name)
    {
      if (obj.manuallyInserted) 
          player.scheduleSaveToHash(x);
      
      _appendChild.apply(x.ns,arguments);
    }
    
    var _removeChild = x.ns.forgetChild;
    x.ns.forgetChild = function(obj)
    {
      if (obj.manuallyInserted)
          player.scheduleSaveToHash(x);

      _removeChild.apply(x.ns,arguments);
    }

  }

  ///////////////////////////////////////// дадим полезных методов

  player.saveToHash = function( obj ) {
    //console.log("save to hash called",obj)
    var name = obj.saveTreeToHashName;
    if (!name) return;
    
    //var q = read_from_hash(); // дорого.. вписывать.. да вроде и не надо по факту пока что стало..
    let q = {}
    q[ name ] = obj.dump();
    write_to_hash( q );
    //console.log("saved to hash",q);
  }

  function findRoot( obj ) {
    if (!obj.ns.parent) return obj;
    return findRoot( obj.ns.parent );
  }

  var writeTimeoutId = null;
  var lastWriteTm = 0;
  player.scheduleSaveToHash = function( signalObj ) {
  //  console.log("scheduling save to hash");
    /* оказывается если включить таймер анимации то эта штука не успевает сохранить.. */
    /*
      if (writeTimeoutId) {
        clearTimeout(writeTimeoutId);
        writeTimeoutId = null;
      }
    */
    
    //if (lastWriteTm + 5*1000 > performance.now()) return; // skip if already writted in last 5 seconds

      if (!writeTimeoutId)
        writeTimeoutId = setTimeout( function() {
          //console.time("player-saveToHash")
          player.saveToHash( findRoot( signalObj ) );
          //console.timeEnd("player-saveToHash")
          writeTimeoutId = null;
          lastWriteTm = performance.now();
        }, 2500 );
  }

  player.loadFromHash = function( aname, targetobj ) {
      if (!targetobj) targetobj = player;

      var q = read_from_hash();

      var name = aname || targetobj.saveTreeToHashName || "mvis";
      if (q && q[name]) {
        if (!targetobj) {
          targetobj = player.root;
          console.error( "restoreFromHash: reading deprecated thing vz.root!" );
        }
        //console.log("restoring",q[name])
        
        return vz.createSyncFromDump( q[name], targetobj, undefined, undefined, true );
      }
      return new Promise( (resolv, reject) => {
        resolv( targetobj );
      });
  }

  player.startSavingToHash = function( name="mvis",targetobj ) {
    
    if (!targetobj) 
       targetobj = player;
    
    targetobj.saveTreeToHashName = name;
  };

  player.stopSavingToHash = function( targetobj ) {
    
    targetobj.saveTreeToHashName = undefined;
  };

  ///////////////////////////// впишемся в создание объектов..

  vz.chain("create_obj", function( obj, opts ) {
    this.orig( obj,opts );
    setup_obj( obj );
    return obj;
  });

}


///////////////////////////////////////
/////////////////////////////////////// ценныя методы

/*
  // пишет в хеш объект
  function write_to_hash(obj) {
    //console.log("write_to_hash",obj);
     var strpos = JSON.stringify( obj );
     //strpos = encodeURIComponent( strpos );
     strpos = strpos.replace(/ /g, "%20");
     if (strpos.length > 1024*1024) {
       console.error("Viewzavr: warning: program state is too long!",strpos.length );
       console.error( strpos );
     }
     // это добавляет историю в браузер а нам не надо ибо много во время особенно анимации вращения
     //location.hash = strpos;
     // а этот вариант историю не добавляет - норм
     history.replaceState(undefined, undefined, "#"+strpos)
  }

  // читает из хеша объект
  function read_from_hash() {
      var oo = {};
       try {
         var s = location.hash.substr(1);
         if (s.length <= 0) return oo;
         // we have 2 variations: use decode and use replace %20.
         // at 2020 we see Russian language in objects, thus we use variant with decode.
         s = decodeURIComponent( s );
         //s = s.replace(/%20/g, " ");
         oo = JSON.parse( s );
       } catch(err) {
         //console.error("read_hash_obj: failed to parse. err=",err);
         var s = location.hash.substr(1);
         console.error("str was",s, "location.hash is ",location.hash);
         // sometimes url may be converted. decode it.
         try {
           //oo = JSON.parse( decodeURIComponent( location.hash.substr(1) ) );
           // если не получилось с decode - попробуем без него
           oo = JSON.parse( location.hash.substr(1) );
         }
         catch (err2) {
           // console.error("read_hash_obj: second level of error catch. err2=",err2);
           // do nothing
         }
       }
     return oo;
  }
*/

  // пишет в хеш объект
  // вариант с записью в query-параметр. Минус - это посылается на сервер. А вот хеш-часть не посылается
  /*
  function write_to_hash(obj) {
     var strpos = JSON.stringify( obj );
     if (strpos.length > 1024*1024) {
       console.error("Viewzavr: warning: program state is too long!",strpos.length );
       console.error( strpos );
     }      
     var href = new URL( window.location.href );
     href.searchParams.set('state', strpos);
     //console.log('setting state href',href)
     history.replaceState(undefined, undefined, href)
  }

  // читает из хеша объект
  function read_from_hash() {
      var oo = {};
       try {
         var href = new URL( window.location.href );
         var s = href.searchParams.get('state');
         console.log('got state',s)
         if (!s || s.length <= 0) return oo;
         oo = JSON.parse( s );
       } catch(err) {
         console.error("read_hash_obj: failed to parse. err=",err);
       }
     return oo;
  }
  */
  
  /* итак используется таки запись в хеш т.е. после # потому что это не отправляется браузеру, а квери-параметр отправляется и там нжинкс начинает очень быстро плакать
     мол длинная строка (хотя 64 на хеш дается).
     и плюс делается кодировка encodeuricomponent т.к. терминал и жмейл воспринимают такие ссылки, а если оставлять {{}} символы то не воспринимает.
     да читаемость становится никакая ну и ладно зато ссылки работают */
  
  function write_to_hash(obj) {
    //console.log("write_to_hash",obj);
     var strpos = JSON.stringify( obj );
     strpos = encodeURIComponent( strpos );
     if (strpos.length > 1024*1024) {
       console.error("Viewzavr: warning: program state is too long!",strpos.length );
       console.error( strpos );
     }
     // это добавляет историю в браузер а нам не надо ибо много во время особенно анимации вращения
     //location.hash = strpos;
     // а этот вариант историю не добавляет - норм
     history.replaceState(undefined, undefined, "#"+strpos)
  }

  // читает из хеша объект
  function read_from_hash() {
      var oo = {};
       try {
         var s = location.hash.substr(1);
         if (s.length <= 0) return oo;
         // we have 2 variations: use decode and use replace %20.
         // at 2020 we see Russian language in objects, thus we use variant with decode.
         s = decodeURIComponent( s );
         oo = JSON.parse( s );
       } catch(err) {
         //console.error("read_hash_obj: failed to parse. err=",err);
         var s = location.hash.substr(1);
         console.error("str was",s, "location.hash is ",location.hash);
         // sometimes url may be converted. decode it.
         try {
           //oo = JSON.parse( decodeURIComponent( location.hash.substr(1) ) );
           // если не получилось с decode - попробуем без него
           oo = JSON.parse( s );
         }
         catch (err2) {
           console.error("read_hash_obj: second level of error catch. err2=",err2);
           // do nothing
         }
       }
     return oo;
}