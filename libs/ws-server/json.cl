/* берет на вход сервер (или клиент)
   а на выход выдает такую-же штуку с протоколом
   только каналы сериализуются и дерсериализуются по json
   
   конечно это все ужас какой-то. надо к серверу какие-то плагины изобрести.
   и в нем тогда подключать слой json, слой там работы с сессими.
   может так эффективнее будет.
   
   типа
   
   json-plugin = x-modify {
     x-append-param process_sending=(m-lambda ...) process_receiving=(m-lambda ...)
   }
   но так-то нет
   
   ну и будет
   ws-server {{ ws-session }} on_session={ |in out|
   }
   
   ну ладно..
*/

feature "ws-json" {
 j: object
    io=@.->0
    output=@j
    @.->input
    {
      get-channel @j.io "connection" | cc-on  { |in out ws|
           mf-timeout 0
           //console-log "json see connection, in=" @in
           let jin = (read @in | convert-channel (m-lambda "v => JSON.parse(v)"))
           let jout = (create-channel)
           read @jout | convert-channel (m-lambda "v => JSON.stringify(v)") | redirect-to-channel @out
           
           //comm: object in=... out=....

           yy: get-event-channel @j "connection" | put-value (mark-event-args (list @jin @jout @ws))
           
           //object on_shutdown=(m-lambda "() => console.log('JJJ shutdown')")

           /* тут надо closed нормальный шерстить. и гооврит if (closed) { return }
           x: return
           read @ws | listen on_close={
             console-log "socket closed, returning"
             read @x | get-channel "output" | put-value true
           }
           */
     }
   }
}

feature "mark-event-args" "
  env.onvalue(0, (v) => {
    v.is_event_args = true;
    //console.log(555,v)
    env.setParam('output',v)
  })
"