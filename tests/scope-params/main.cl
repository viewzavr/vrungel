load "lib3dv3 csv params io gui render-params df scene-explorer-3d misc";
//load "make-func.js";

let alfa=5 beta=(@alfa + 1);

// вложенное имя
// посмотрим что тут будет
// сейчас оно не регистрируется из-за alfa.. пойдет
b: {
  let alfa=44; 
  console_log "B alfa is " @alfa;
};

screen auto_activate {
  column {
  
    text (join "alfa beta " @alfa @beta with=' ');

    text "1. result = ";
    text (m_eval (make-func {
       output=(2 * @alfa);
       console_log "MMM invoked" @alfa;
    }));

    text "set alfa = ";

    x1: dom tag="input" {{
       @alfa->cell | set-cell-value (
         @x1 | dom_event_cell "change" | c-on "(evt) => parseFloat( evt[0].target.value )"
       )
    }};

    // заодно проверяем экранирование
    text "2. result = ";
    text (m_eval (make-func { |alfa|
       output=(2 * @alfa);
       console_log "MMM invoked" @alfa;
    }) @alfa);

    text "3. result = ";
    text (2 * @alfa);
    
    text "4. result = ";
    text (@beta * @alfa);

};
};