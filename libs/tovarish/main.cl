load "misc new-modifiers set-params params"

v: view world=@w
      predicate=(m-lambda "(e) => e.temp>2")
      on_added=(m-lambda "(e,w) => {
        console.log('view new elem',e,'to world',w.getPath())
        w.add( {a:0, b:0, alfa: 1 } )
      }")

view world=@w
      predicate=(m-lambda "(e) => e.alfa")
      on_added=(m-lambda "(e,w) => {
        console.log('view new elem with alfa',e,'to world',w.getPath())
        e = w.clone( e )
        e.alfa = 2
        w.update( e )
      }")
      on_removed=(m-lambda "(e,w) => {
        console.log('view elem with alfa removed',e,'to world',w.getPath())
      }")

view world=@w
      predicate=(m-lambda "(e) => e.alfa>1")
      on_added=(m-lambda "(e,w) => {
        console.log('view new elem with alfa>1',e,'to world',w.getPath())
        w.remove( e )
      }")

// emit on_appear, on_disappear
// emit added, removed
feature "view" {
  v: object
    world=null
    predicate=(m_lambda "() => false")
    exec_for_each=(m_lambda "(w,code) => {
      for (let e of Object.values(w.entities)) {
        let res = predicate( e )
        if (res)
            code( e )
      }
    }" @v.world)
    // get_and_lock - найти и захватить один элемент -> e
    get_and_lock=(m_lambda "() => {
      // но вообще это процесс по уму то.. длительный.. возможно...
      // типа заявки такой.. т.е. мы заказываем и нам когда-то пришлют.. так это должно быть по идее..
      // и плюс заказов одновременно несколько..
      // ну стало быть аргументом должен быть канал, куда записать результат
    }")
    // unlock - вернуть лок элемента
    unlock=(m_lambda "() => {
    }")
  {
    read @v.world | x-modify {
      x-on "added" {
        m-lambda "(view,predicate,obj,e) => {

          let res = predicate( e )

          if (res)
            view.emit( 'added', e,obj )
        }" @v @v.predicate
      }
      x-on "removed" {
        m-lambda "(view,predicate,obj,e) => {
          let res = predicate( e )
          if (res)
            view.emit( 'removed', e,obj )
        }" @v @v.predicate
      }
      x-on "updated" {
        m-lambda "(view,predicate,obj,e,old_e) => {
          let res = predicate( e )
          let res_old = predicate( old_e )
          if (res && !res_old)
            view.emit( 'added', e, obj )
          else
          if (!res && res_old)
            view.emit( 'removed', e, obj )
        }" @v @v.predicate
      }
    }
  }
}

feature "world" {
  m: object
    entities=(json)
    counter=0
    {{
      x-add-cmd2 'add' (m_lambda "(e) => {
      e.id = 'mem_' + (scope.m.params.counter++);
      scope.m.params.entities[ e.id] = e;
      env.signalTracked( 'entities' )
      scope.m.emit('added',e); // тпу
    }")
      x-add-cmd2 'remove' (m_lambda "(e) => {
      delete scope.m.params.entities[ e.id ];
      scope.m.emit('removed',e); // тпу
    }")
    
      x-add-cmd2 'update' (m_lambda "(e) => {
      let olde = scope.m.params.entities[ e.id ];
      scope.m.params.entities[ e.id ] = e; // ну по идее оно уже и там
      scope.m.emit('updated',e, olde); // тпу
    }")
    
      x-add-cmd2 'clone' (m_lambda "(e) => {
        let c = JSON.parse( JSON.stringify( e ) )
        return c
    }")
    }}
}

feature "w-log-events" {
  x-modify {
    x-on "added" {
      m-lambda "(obj,e) => {
        console.log('added ',e )
      }"
    }
  }
}

w : world {{ w-log-events }}
let add = (read @w | get-method-cell "add")

console-log "entities are" @w.entities

//console-log "w is" @w
//console-log "add is" @add

read @add | set-cell-value (json a=1 b=1 temp=1)
read @add | set-cell-value (json a=1 b=2 temp=2)
read @add | set-cell-value (json a=1 b=3 temp=1.5)

insert-children input=@.. active=(timeout_ms 1000) {
  read @add | set-cell-value (json a=1 b=3 temp=2.5)
}

//перспектива.. хотя вроде это не надо, раз метод стал каналом..
// разве что set-cell-value уже пора в send переименовать
//send @w "add" (json a=2 b=1 temp=0.5)

/////////////////// поиск

// w-find @w (m-lambda "(e) => e.b > 2") | console-log
// в этом варианте w-find выставляет полученные значения по очереди на output
// тут мб проблема - в компаланг встроено поедание значений. но вроде | ему не подвержено. а вот console-log мб подвержено.

// w-find @w (m-lambda "(e) => e.b > 2") (m_lambda "(e,w) => console.log(e)")
// тут все хорошо но
// а) не сериализуемо, не отправишь на сервер
// б) получается что вся обработка только на js

/*
  насчет |-варианта. изначально это же штука для параллельной работы. а компаланг пока не для параллельной работы.
  сообразно конструкция | имеет смысл в локальном контексте, а не в параллельном...
  чтобы это было в параллельном, компаланг-конструкции должны означать
  запусти параллельный процесс (как вариант - как набор одинаковый исполнителей)
  и если есть понятие ссылки - организуй передачу между процессами-источниками в рандомные (ближайшие..) процессы приемники
  
  т.е. семантика у этих компаланг-объектов получается именно такая. что как бы да, описание, вот оно.
  но оно при "создании" на самом деле означает что должны быть созданы процессы.
  
  это что-то типа schedule-job только параллельная.. мм
  
  а к чему это приведет?
  
  w-find "e => e.renderable" | render camera=@c1 | join-renders
  
  ну кстати.. выглядит неплохо вроде как..
  
  особенно если join-renders сможет создать пирамиду процессов
  
  ---
  но пока тут нет синхронизации.. какие из рендеров надо собирать в джоин?
  
  и да. тут безымянные, безентитные потоки данных. это как бы хорошо. но с другой стороны это не позволит к ним подключаться..
  т.е это как бы шина но не та когда я мог получать срезы шины..
*/

/* формально если по старинке то w-find должен бы возвращать массив сущностей прошедших предикат..
  но у нас новое. а новое говорит - это будет параллельная обработка. поэтому нет никакого массива сущностей в памяти.
  есть возможность вызвать код, встретив сущность...
*/

/* была мысль выразить энтити вьюзавр-объектами (а точнее компоненты их). это может оказаться забавным с точки зрения удобства для компаланга нового. новых механик.
   но это нарушение моделей тотальное - в частности связывание компонент, тем более разных сущностей.
   фишка то что они общаются через шину, представленную миром энтитей. вот в чем фишка.
*/
