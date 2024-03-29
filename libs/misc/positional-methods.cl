// разные методы заточенные под позиционные параметры. может их и не надо так группировать но пусть пока будут

/*
feature "join" {=
  env.on("param_changed",(name) => {
    if (name == "output") return;
    compute();
  });
  
  function compute() {

    let count = env.params.args_count;
    let arr = [];
    for (let i=0; i<count; i++)
      arr.push( env.params[ i ] );
    let res = arr.join( env.params.with || "" ); // по умолчанию пустой строкой
    env.setParam("output",res );
  };
  
  compute();
=}
*/

// join соединяет позиционные аргументы, считая их массивами, 
// и соединяет эти массивы в СТРОКУ
// странно что join работает с позиционными аргументами а не list например
register_feature name="join" code=`
  env.on("param_changed",(name) => {
    if (name == "output") return;
    compute();
  });
  
  function compute() {

    let count = env.params.args_count;
    let arr = [];
    for (let i=0; i<count; i++)
      arr.push( env.params[ i ] );
    let res = arr.join( env.params.with || "" ); // по умолчанию пустой строкой
    env.setParam("output",res );
  };
  
  compute();
`;

// кстати идея - а вызвать бы тут метод arr.join как-то.. а то вон какой длинный код 
// а так бы мостик соорудить - аргументы в массив в допом ключ..
// назовем его list по аналогии как в лисп

// итак list берет на вход список аргументов, а на выход дает массив. хорошо.
register_feature name="list" code=`
  env.on("param_changed",(name) => {
    if (name == "output") return;
    compute();
  });
  
  function compute() {

    let count = env.params.args_count;
    let acc = [];
    for (let i=0; i<count; i++)
      acc.push( env.params[ i ] );

    env.setParam("output",acc );
  };
  
  compute();
`;

//jsfunc "list" {: ...args | return args :}

/*
jsfunc "arr-concat" {: ...args | 
  let res=[];
  for (let a of args) {
    if (Array.isArray(a)) res = res.concat(a)
  }
  return res 
:}
*/

jsfunc "arr-concat" {: arr | 
  let res=[];
  for (let a of arr) {
    if (Array.isArray(a)) res = res.concat(a)
  }
  return res 
:}

// concat соединяет массивы в 1 массив, поданный на вход
// ну и в качестве удобняшки если что-то не массив то оно делает его массивом
// в результате concat ведет себя еще и как list
register_feature name="concat" code=`
  env.on("param_changed",(name) => {
    if (name == "output") return;
    compute();
  });
  
  function compute() {

    let count = env.params.args_count;
    let arr = [];
    for (let i=0; i<count; i++)
      arr = arr.concat( Array.isArray( env.params[i] ) ? env.params[i] : [ env.params[i] ] );
    env.setParam("output",arr );
  };
  
  compute();
`;

// да и операцию + можно было бы выразить через это.. типа попарный reduce..

register_feature name="+" code=`

  env.on("param_assigned",(name) => {
    if (name == "output") return;
    //console.log("plus: pc")
    compute();
  });
  
  function compute() {
    
    let count = env.params.args_count;
    let acc = env.params[0];

    //console.log("plus: computing",count)

    for (let i=1; i<count; i++) {
      if (env.params[i] == null) return; // ждем..
      // if (env.params[i] == null) continue; // это не складываем...
      acc = acc + env.params[ i ];
    }

    //console.log("plus: result",acc)

    env.setParam("output",acc );
  };
  
  compute();
`;

register_feature name="-" code=`

  env.on("param_assigned",(name) => {
    if (name == "output") return;
    compute();
  });
  
  function compute() {
    
    let count = env.params.args_count;
    let acc = env.params[0];
    for (let i=1; i<count; i++) {
      if (env.params[i] == null) return; // ждем..
      acc = acc - env.params[ i ];
    }
    env.setParam("output",acc );
  };
  
  compute();
`;

// но вообще + и join это какие-то совместные вещи.. я к тому что вроде как + может выполнять join функцию.. но тогда без with..

feature "*" code=`

  env.on("param_assigned",(name) => {
    if (name == "output") return;
    compute();
  });
  
  function compute() {
    let count = env.params.args_count;
    let acc = env.params[0];
    for (let i=1; i<count; i++) {
      if (env.params[i] == null) return; // ждем..
      acc = acc * env.params[ i ];
    }
    env.setParam("output",acc );
  };
  
  compute();
`;

feature "/" code=`

  env.on("param_assigned",(name) => {
    if (name == "output") return;
    compute();
  });
  
  function compute() {
    let count = env.params.args_count;
    let acc = env.params[0];
    for (let i=1; i<count; i++) {
      if (env.params[i] == null) return; // ждем..
      acc = acc / env.params[ i ];
    }
    env.setParam("output",acc );
  };
  
  compute();
`;

//////////////////// сравнения

register_feature name="<" {
  eval code="(a,b) => a<b";
};

register_feature name=">" {
  eval code="(a,b) => a>b";
};

register_feature name="<=" {
  eval code="(a,b) => a<=b";
};

register_feature name=">=" {
  eval code="(a,b) => a>=b";
};

register_feature name="==" {
  eval code="(a,b) => a == b";
};

register_feature name="!=" {
  eval code="(a,b) => a != b";
};

// todo тут надо проверять все аргументы а не только 2

register_feature name="or" {
  eval code="(a,b) => a || b" allow_undefined=true;
};

// todo отладить чето ломается табы
jsfunc "or-many" {: ...args |
  for (let i =0; i<args.length; i++)
     if (args[i]) return args[i];
  return null
:}

// todo тут надо проверять все аргументы согласно args_count а не только 2
register_feature name="and" {
  eval code="(a,b) => a && b ? b : false" allow_undefined=true;
  // решил попробовать выдавать второй элемент как результат - это может позволить делать вещи типа
  // cond && (generator ....)
  //eval code="(a,b) => a && b" allow_undefined=true;
};

register_feature name="not" {
  eval code="(a) => ! a" allow_undefined=true;
};