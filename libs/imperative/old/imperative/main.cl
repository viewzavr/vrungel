load files="imperative.js gui";

screen auto_activate {
  column padding="1em" gap="0.4em" {
    button "test" {
      i_console_log "hehe sum 1..5 is" (i_sum 1 2 3 4 5);
    };
    button "test 2" {
      t2: i_console_log "hehe 10+5*5 is" (i_sum 10 (i_mul 5 5)); 
    };

    button "test 3" {
      i-if (i-sum 0 1) (i_console_log "1 is true") (i_console_log "1 is false");
    };

    button "test 4" {
      //i-if (i-sum 0 1) @t2->output; // работает
      //i-if (i-sum 0 1) (@t2); // почему-то не работает..
      i-if (i-sum 0 1) (output=@t2->output); // тож работает
    };

    button "test 5" {
      i-if (i_less 3 5) (i_console_log "one"; i_console_log "two");
    };

    button "test 6" {
      //i-repeat 10 (i_console_log "mir trud may!"); // todo?
      i-repeat 10 { i_console_log "mir trud may!" };
    };

    button "test 6a" {
      //i-repeat 10 (i_console_log "mir trud may!"); // todo?
      i-repeat 10 { 
        i_console_log "mir trud may!"; 
        i_console_log "pobeda!"; 
      };
    };    

    button "test 7" {
      i-repeat 10 { 
        q: i-args;
        i_console_log "mir trud may!" @q->0 "*" @q->0 "=" (i-mul @q->0 @q->0);
        i-if (@q->0 i-more 6)
          { i_console_log "ura!"; };
      };
    };

    button "test 8" {
      i-console-log (sum_kv 5 5 5);
    };

    button "test 8" {
      test-func 123;
    };

/*
    button "test 7" {
      i-repeat 10 (ib: i-block { i_console_log "mir trud may!" @ib->0 "*" @ib->0 "=" (i-mul @ib->0 @ib->0)}); // todo
    };
*/    

    button "test aa" {
      i-lambda {
        qqq: alfa=(sum_kv 3 3 3); // todo каррирования нет - все перезатрется
        i-console-log @qqq;
        i-console-log (i-mul (i-call @qqq->alfa 2 2 2) @qqq->alfa);

        /*
        qqq: sum_kv 5 5 5;
        i-console-log (i-mul @qqq->result @qqq->result);
        */
      };
    };

  };
};

feature "test-func" {
  root: i-lambda {
    //i-console-log "testfunc working 1";
    //q: i-lambda code="() => console.log('hi from js')";
    q2: i-lambda code="() => 22;";
    i-console-log "testfunc working" @root->0 (i-call @q2);
  };
};

feature "sum_kv" {
  root: i-lambda {
    //i-console-log "sum-kv lambda called" @root->0 @root->1 @root->2;
    i-sum
      (i-mul @root->0 @root->0)
      (i-mul @root->1 @root->1)
      (i-mul @root->2 @root->2)
    ;
  };
};

feature "i-repeat" {
  i_lambda code="(count) => {
     for (let i=0; i<count; i++)
     {
        //env.callCmd('eval_attached_block',i);
        env.eval_attached_block( i );
     }
  }";
};

