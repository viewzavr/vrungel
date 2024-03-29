// объект со свойством, запускающий интерпретатор

export function setup( vz ) {
  // на будущее получается как-то так
  //vz.addItemType( "compolang-machine","Compolang interpreter", {features: "compolang_interpreter"} );
  // и можно сокращать
  //vz.addItemType( "compolang-machine","Compolang interpreter", "simple_lang_interpreter" );
  // да и на самом деле даже - если тип влечет фичу
  vz.addItemType( "compolang_machine","Compolang machine" );

/*
  vz.addItemType( "compolang-machine","Compolang interpreter", function( opts ) {
    //return create( vz, opts );
    return vz.createObj( {name:"compolang",...opts,features:"simple_lang_interpreter"})
  } );
*/  
  vz.register_feature( "compolang_machine", compolang_machine);
  lang.setup( vz,lang );
}

import * as lang from "./compo-lang.js";

// вход text, base_url
// выход - компаланг обьект
export function compolang_machine(obj) {
  obj.feature("simple-lang delayed");
  var go = obj.delayed(interpret);
  //let t =  obj.vz.tools.delayed( obj )
  //let go = t.delayed(interpret )
  
  obj.addText( "text", "",go );
  obj.addString("base_url","",go);
  
  function interpret() {
    obj.ns.removeChildren();
    let dump = obj.parseSimpleLang( obj.params.text, {base_url: obj.params.base_url, diag_file: obj.params.diag_file } );
    if (!dump) {
      console.error('compolang machine: code parser returned null.');
      return;
    }
    let $scopeFor = obj.$scopes.createScope("parseSimpleLang"); // F-SCOPE
    let res = obj.restoreFromDump( dump,false,$scopeFor );

    Promise.resolve(res).then( (result) => {
      obj.emit("machine_done",result);
    });
  }
  // вот вопрос. если мы устанавливаем эти вещи, как нам узнать, что это выполнено?
  // по уму, по логике вещей. надо для восстановления из хеша страницы.

}

// create function should return Viewzavr object
export function create22( vz, opts ) {
  opts.name ||= "compolang";
  var obj = vz.createObj( opts );
  obj.feature("simple_lang_interpreter");
  /*
  obj.feature("simple-lang delayed");
  var go = obj.delayed(interpret);
  
  obj.addText( "text", "",go );
  obj.addString("base_url","",go);
  
  function interpret() {
    obj.ns.removeChildren();
    obj.parseSimpleLang( obj.params.text, {base_url: obj.params.base_url } );
  }
  */

  return obj;
}