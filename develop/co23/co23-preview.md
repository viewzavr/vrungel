# Пакет нововведений декабрь 2022

Внимание это предварительный документ. Финальный см. co23.md.

F-CO23 F-JS-INLINE

# Императивное вычисление

## Мотивация

Предыдущий вариант с m-eval и m-lambda приводит к громоздким конструкциям, т.к. аргументы перечисляются и в сигнатуре js-кода, и по сути дублируются в позиционных аргументах. Вместе с тем в компаланг есть механизм именованных аргументов. Т.о. можно более плотно связать компаланг и базисный язык (js сейчас). Кроме того, использование в m-eval кода в форме ()=>{} это всегда ведет к скобкам {}, что усложняет последующую читаемость. И наконец, текущие варианты использования m-lambda совместно с x-modify/cc-on приводит к ужасной путанице в порядке аргументов. Ожидается что применение именованных аргументов способно эту путаницу хоть частично устранить.

## Вычисление

1. Позиционные аргументы: 
```
n-eval "|arg1 arg2| js-код... console.log( arg1, arg2 ); return arg1+arg2; " @value1 @value2
```
Таким образом первым идет аргумент с js-кодом, а последующие аргументы считаются как позиционные.
При этом чтобы сопоставить их с именами в js-коде, в этом коде можно указать приставку |имена аргументов|.
Код js-код будет обернут в функцию с параметрами, указанными в ||.
Чтобы вернуть результат из кода, используется return.

2. Именованные аргументы:
```
n-eval foo=@value1 "js-код... console.log( foo,beta )" beta=@value2
```
Все именованные аргументы n-eval доступны js-коду под своими именами.

3. Комбинированный режим:
```
n-eval foo=@value1 "|a b| js-код... console.log( foo,beta,a,b )" beta=@value2
```
Все именованные аргументы n-eval, и все позиционные, доступны js-коду, по аналогии с (1) и (2).

4. Особый случай для простых вызовов:
```
n-eval "Math.sin" @alfa
```
Форма вычисляется по регулярному выражению ^[\w\.]+$ (case insensitive).

5. Особый случай для вызова функций:
```
n-eval @jsfunc @value1 @value2
```
Если в качестве аргумента передается не код (выражаемый строкой), а js-функция, то n-eval вызывает ее с указанными позиционными аргументами.

6. Поддержка input. Если задан параметр input, то он должен трактоваться как первый позиционный аргумент.

Общие примечания: 
* возможно неудобно, что всегда теперь надо говорить return. Возможно стоит ввести правило, что если в строке js-код нет return, то делается return(js-код).
* в m-eval было такое поведение, что функция выполняется только если все ее аргументы определены (отличаются от undefined). Возможно это стоит вынести в какое-то явно указываемое поведение. Но в целом это вызвано тем, что не все еще вычисляется, а у нас нет механизма попросить вычислить значение по ссылке.. В qml это были binding и они всегда работали, там был запрос на вычисление если ещ ене вычислено. Возможно, нам надо сделать что-то такое-же (но тогда ссылка должна понимать, или n-eval должен понимать, и уметь делать такой обход и опрос..)

## Создание функций

Для создания js-функций предоставляется метод `n-func`.
Результат работы `n-func` (на его выходе `.output`) - функция с K позиционными аргументами.
Сигнатура аналогичная n-eval. Примеры:
```
n-func "console.log" -- вернет функцию с N позиционными аргументами
n-func "|a b| return a+b" -- вернет функцию с 2 позиционными аргументами
n-func "|a b| return a+b" 1 -- вернет функцию с 1 позиционными аргументом (b)
n-func "console.log(foo,w)" foo="hello" w=@world -- вернет функцию с 0 аргументами
n-func "|w| console.log(foo,w)" foo="hello" -- вернет функцию с 1 позиционным аргументом (w)
n-func (n-func "|a b|" console.log(a,b) "hello") "world" -- вернет функцию с 0 аргументами
```

Примечание: формально, теперь любой параметр `n-func` становится доступным внутри js-коду. Это неплохо для внешних вызовов.
Но получается `n-func` должен как-то реагировать на изменение своих параметров; возможно, перестраивая функцию. И уж точно - уведомляя выход .output - т.к. это единственная возможность реактивно запустить пересчет там, где эта функция используется.


# Реакции

Необходимо реагировать на события. Реакция это у нас формально - некое развитие процесса. Она может быть описана декларативно (на компаланге) или императивно. При этом декларативность, формально, может означать как дополнение процесса некоторыми подпроцессами, так и некоторое процессное вычисление, которое в конце концов заканчивается и сворачивается. Кроме того, у нас не поддерживается пока переход в "управляющие состояния", но возможно это и не надо, а возможно выражается декларативно/императивно, а возможно это можно поддержать в будущем.

Ранее у нас уже сделан ряд "обычных" реакций (on, c-on, cc-on) и реакций в режиме "массовых модификаторов": `@objlist | x-modify { x-on "func" }`. Их стало очень много, и надо сделать что-то одно. `on` - работали с событиями объектов вьюзавр. c-on и cc-on работали с каналами. В принципе, cc-on это почти то что надо, и мы его здесь зафиксируем с новым именем `reaction`.

Для массовых реакций - пока неясно что делать.

# reaction

1. Базовая форма
```
reaction @channel @func
```
- вызывает func при каждой записи в channel. Передает аргумент - значение, которое записали в channel.

2. Внедрение адаптера поведения m-eval:
```
reaction @channel js-код @arg1 @arg2 namedarg=@arg3
```
- вызывает js-код при каждой записи в channel. Ведет себя с кодом аналогично `n-eval`.

3. Поддержка нескольких каналов
```
reaction @channels-list @func
```
- вызывает func при появлении хотя записи в любом из каналов channel. Передает аргумент - список значений каналов. Они все null, кроме того в котором произошла запись.

Примечание. Возможно здесь можно навести какую-то синхронизацию, например вызов не сразу, а по накоплении событий за такт. В этом будет некая аналогия с lingua franca, но там есть ручной контроль как складывать события еще не обработанные reaction, и этот контроль на стороне отправителя. А здесь получится только на стороне принимающей. Впрочем, у нас есть delayed и это можно как-то попробовать совместить, если будет необходимость.

4. Поддержка {}-функций
```
reaction @channel { |value|
	...compalang-code...
}
```
создается процесс, описанный compalang-code. Он завершается, когда в коде сработает оператор `return @some-value`.
(но в целом это все пока неясно очень все). По сути, это адаптер к make-func.

5. Поддержка input
```
@channel | reaction @func
@channel-list | reaction js-код ...
@channel | reaction { |val|
  console-log "hello" @val | return
}
...
```

## Получение каналов
Для работы реакций нужны каналы. В синтаксисе компаланг они недоступны. Предлагаются такие методы:
```
event @obj "name" -- возвращает канал, соответствующий событию name объекта @obj. Когда в объекте срабатывает событие, производится запись в канал. Если запись в канал производится извне, то в объекте срабатывает событие.
dom-event @obj "name" -- возвращает канал, соответствующий dom-событию name объекта @obj, который является dom-элементом.
param-changed @obj "param-name" - возвращает канал, связанный с параметром param-name. Запись в канал производится, когда значение параметра меняется. Запись в канал извне приводит к установке параметра.
param-assigned @obj "param-name" - возвращает канал, связанный с параметром param-name. Запись в канал производится, когда значение параметра присваивается (пусть даже). Запись в канал извне приводит к установке параметра. 
method-channel @obj "name" - запись в такой канал приводит к вызову метода (привязанной функции) у obj.ы
```
Соображения:
1. event и dom-event - хорошо вроде.
2. param-changed и param-assigned - вроде можно соединить в одно, и управлять выбором changed/assigned через параметр,
например: `param @obj "name" only_changes=true`
3. Вопрос как назыввать это (2)? param? Но это слово (param) хотелось бы оставить для чего-то мб другого. Тогда param-channel? Но почему не param-channel? Но почему channel, почему это не cell?

По повову (3) есть еще отдельный ряд мыслей - это все-таки у нас каналы (channel) или ячейки (cell)?
Вероятно это каналы. А ячейки.. это могут быть вообще отдельные объекты. Т.е.:
```
  x: create-channel @alfa // на выходе канал для чтения и записи значений. параметр value также связан с каналом
  y: @alfa | create-channel
  z: param @obj "paramname"
  reaction @x.output "|arg| console.log(arg)"
```
В общем эта часть еще есть большое todo.

# Создание объектов.
Текущая проблема компаланга в том что у него очень много методов создания объектов. Надо их сократить, до 1-2.
Потребности:
1. создать набор объектов согласно списку описаний объектов
Пример: ` read @objects-list | create target=@target-obj`
При этом надо уметь получить результат - список созданных объектов.
2. создать набор объектов согласно списку значений и описанию объекта.
Пример: ` repeater model=[1,2,3] { |input| rectangle width=@input } `
3. создать набор объектов согласно списку описаний объектов, и передать им значения в качестве позиционных аргументов:
Пример 1: `computing-env @arg1 @arg2 { |arg1 arg2| ...compalang... }`
Пример 2: `computing-env @arg1 @arg2 code=@some-code`
Если значения аргументов arg1 arg2 меняются, их следует передать в созданное окружение.
При этом, в случае конкретно computing-env, результатом является не список созданных объектов, а значение параметра output.
Вероятно, этот computing-env можно как-то было бы выразить через create (если бы тот умел передавать аргументы).

Примечания. Иногда в (1) требуется создавать объекты не в 1 целевом объекте @target-obj в наборе объектов. Но вероятно этого же можно достичь и используя repeater, т.е. `repeater { |target-obj| create input=@list target=@target-obj }`.

4. Создавать пустой объект 1 штуку. Это надо уметь, чтобы конструировать объекты с помощью компаланга динамически и описывать это на самом компаланге. Кроме этого, понадобится умение применять к объекту фичу, устанавливать параметры.
Это могло бы выглядеть так:
```
  let x = (create-object "button")
  let y = (create-object)
  apply-feature @y "buttons"
```
Также были мысли, что в качестве фичи может выступать и функция. Т.е. по сути это применение функции к объекту:
```
  apply-feature @obj (n-eval "|env| env.setParam('output',22) ")
```
В целом кстати последний вариант, с функцией, он честнее. Потому что фичи, похоже, это все-таки не часть объекта, не его "тип", а что-то отдельное, тоже кстати возможно объектное (если имеет параметры, которые могут меняться во времени). Но это история для отдельного размышления.

5. Создавать объекты не в пространстве детей, а в пространстве "внедренных-фич". Т.е. уметь динамически выполнять то, что у нас записывается сейчас как object {{ attached-feature @arg }}.

## Предложение.
Выразить все потребности перечисленные выше с помощью методов `create` и `repeater`.

## create
create - создаёт набор объектов, передает им позиционные параметры. Примеры:
```
 create input=@objects-list target=@parent
 create input=@objects-list target=@parent @value1 @value2
 create target=@parent @value1 @value2 { |a1 a2|
 	... compalang-code ....
 }
```

## repeater
repeater - остается без изменений как уже есть сейчас. Репитер создает указанный объект N раз. N определяется массивом model, значения этого массива передаются через scope. Примеры:
```
 repeater model=@some-list code=@object-code
 repeater model=@some-list { |arg|
 	 console.log @arg
 }
```
Примечания. 
* Сейчас репитер на вход получает описание 1 объекта. Формально, он бы мог получать описание многих объектов - по идее, ему без разницы, при наличии scope, сколько объектов создавать в ответ на одну запись в model.
* Вероятно, репитер можно совместить с create, т.е. наделить create поведением репитера. Тогда:
```
  create model=@some-list code=@objects-list
```
создаст @objects-list объекты столько раз, сколько записей в some-list. Но это кажется является усложнением. Кроме того, они отлично компонуются, `repeater { create ... }`.

# Другое вычисление
Михаил предлагает следующую запись которая формирует функцию:
```
[[[ a b=(some @alfa @beta) c | console.log(a,b,c)
    return c+2 ]]]
```

Таким образом пример с кнопками в стиле n-func:
```
button "Удалить" 
  on_click=(m-func obj=@co->input? [[[
     console.log('removing',obj); obj.removedManually = true; obj.remove(); 
  ]]])
```
выглядит в этом варианте так:
```
button "Удалить" 
  on_click=[[[ obj=@co->input? |
     console.log('removing',obj); obj.removedManually = true; obj.remove(); 
  ]]]
```
Что выглядит, в общем-то, лаконичнее.

По сути это есть окружение по аналогии с `n-func` только у него особая форма записи.

Применение такой записи лучше, чем n-func, тем что:
* запись более лаконична(!).
* определение связей с контекстом внесено в "тело" оператора, что несколько логичнее, чем передача через n-func.
* есть ли еще премущества?

Минусы:
* невозможно сгенерировать строковое значение функции и подать его на вход этому оператору.
Как вариант, можно предусмотреть для оператора `[[[ ... ]]]` обычный синтаксис, что-то вроде:
```
prepare-func "a b=(some @alfa @beta) c | console.log(a,b,c) return c+2"
```
По сути получается, что оператор `[[[]]]` это синтаксис для вызова оператора prepare-func, да и все.
Единственное, что парсить его.. будет крайне сложно.. по сути он внутри себя должен вызывать компаланг-парсер.
Так что, по существу, этот prepare-func будет в реализации сводится к чему-то уже обычному:
```
prepare-func-internal "a c" "console.log(a,b,c) return c+2" b=(some @alfa @beta)
```
Вероятно, придется все-таки парсить всегда заранее.. А от динамической генерации отказаться - если надо, генерируйте себе функции сами да и все..

* невозможно извне переопределить именованный параметр. Но может быть это уже и не нужно?
Было:
```
  m-eval (n-func "console.log(foo)" foo=5) foo=10
```
Стало:
```
  m-eval [[[ foo=5 | console.log(foo) ]]]
```

Открытые вопросы:
* у нас уже есть символ | он используется для пайпов. уместно ли его использовать тут?
* Скобки [[[ ]]] мб стоит заменить на что-то другое. Вариант Lingua Franca не очень хорош,
т.к. пример: `some func={= a b | console.log(a,b) =}` вот в этой части: `={=` странно выглядит.
* Может оператор `[[[ ]]]` это есть eval сразу? А если надо - пусть возвращает function..
Но нет, попробовал - выглядит глупо:
```
reaction (list @d.mousemove @d.mouseclick) [[[ foo=@foo events |
  return () => { console.log(events) }
]]]
```
* Насчет одного символа `|`. Может сделать их таки два, как в аргументах руби? Или это лишнее?
```
[[[ | a b=(some @alfa @beta) c | console.log(a,b,c)
    return c+2 ]]]
```
ну выглядит глупо, да.

* Возникает идея задавать с помощью спец-синтаксиса не только lambda, но и выполнять eval.
Вместо
```
if (eval [[[ a=@a | a > 5]]]) { console-log "privet" }
```
писать:
```
if [[[! a=@a | a > 5]]] { console-log "privet" }
```
и это влечет вопрос синтаксиса для оператора такого eval-а.
В этом смысле мы приходим почти к варианту QML для синтаксиса пропертей и обработчиков событий.
* В компаланг явно прописываются связи с контекстом, в QML - можно ссылаться из кода (и это по опыту ведет к невидимым связям)
* В QML хитрость - для пропертей код интерпретируется в смысле евал, а для событий - в смысле функция:
```
property var a: { var b=7 return b+3 }
onClicked: { console.log("clicked") }
```
Вероятно, в QML код идет всегда как функция, но присваиватель параметров выполняет сразу eval. Мы видимо не можем себе это позволить, т.к. стараемся сохранить "универсальный" синтаксис.

---
Путем ряда размышлений пришел к мысли, что удачно сделать так:
* Код оформляется с помощью кавычек {: .... :}, например:
```
  reaction (event @btn "click") {: console.log("clicked") :}
```
* При необходимости его выполнения явно вызываем m-eval.
```
 if (m-eval {: a=@beta | a > 5 :}) 
   { compalang-puts "a is big" }
```
Какие-то другие скобочки или спец-символ перед скобками пока не придумался.
Это будет даже мотивировать использовать компаланг, а не js.

Назовем эти новые вычисления F-JS-INLINE