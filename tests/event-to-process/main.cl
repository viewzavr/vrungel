load "./eha.js misc new-modifiers"

/*
console-log "hello world" (timer-ms 1000)

timer-ms 1000 | object on_param_input_changed=(make-func { |cnt|
  console-log "process-like eha, cnt=" @cnt
})
*/

//console-log (timer-ms 1000 | get-cell "output" | get-cell-value)

//console-log ( create-object { timer-ms 1000 } | get-cell "output" | get-cell-value )

/*
create-object { timer-ms 1000 } | get-cell "output" | c-on (make-func { |cnt|
  console-log "process-like eha on cell, cnt=" @cnt
})
*/

a: object on_message={ |msg|
  console-log "got message " @msg.str @msg.num @r.input
  r: repeater input=@msg.num { |i|
    console-log "x" @msg.str @msg.num @i
  }
}

//m_eval @c.send (json a=5 b=5)
//read @a | get-event-cell "message" | set-cell-value "privet"
let ch = (read @a | get-event-cell "message")

repeater input=10 { |num|
  read @ch | set-cell-value (json str=(+ "privet " @num) num=@num)
}