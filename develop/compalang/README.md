# Описание языка Компаланг

Компаланг в чем-то похож на язык HTML, отличается записью тегов и дополнительными возможностями.

## Комментарии
Комментарии в Компаланг идут в стиле Си, т.е. `//` и `/* ... */`.

## Основная форма
Исходный текст на языке Компаланг это описание набора объектов. Каждый объект обычно описывается следующей формой:
```
[метка:] тип [param_name=param_value] ... [param_name=param_value] [positional_value] {
	...
}
```

* `метка` - необязательный идентификатор объекта
* `тип` - тип объекта, обязательный параметр.
* `param_name` - идентификатор параметра
* `param_value` - значение параметра. принимается json-совместимые значения (кроме объектов) и другие, см. ниже.
* `positional_value` - значение позиционного параметра. можно указывать много позиционных параметров, можно перемешивать их с именованными параметрами.
* `{}` - возможность указывать "вложенные подобъекты".

Пример:
```
  scene3d {
  	pts: points positions=[0,0,0, 1,2,2, 5,5,2 ]
  	lines positions=@pts.positions radius=4
  	console-log "цвет точек по умолчанию есть " @pts.color
  	node3d {
  		spheres positions=(@pts.positions | arr_slice 0 12)
  	}
  }
```

## Дополнительная форма для операций

Некоторые типы объектов имеют следующую форму записи, удобную для арифметических и логических операций:
```
[positional_value] тип [positional_value] 
```
Пример:
```
 console-log (@a + 4)
 console-log (@b == (@a + 4))
 console-log (@a < (@b + @c))
```

## Ссылки
В качестве значения параметра может выступать ссылка. Ссылка записывается как `@идентификатор`.
Ссылаться можно на объекты, на параметры объектов, на переменные объявленные с помощью `let`.
Пример:
```
  a: object alfa=5 beta=7;
  b: object teta=@a.alfa;
  c: object sigma=@b beta=15;
  console-log @c.sigma.teta; // напечатает 5
```

## Вычисление значений параметров
В качестве значения параметра может выступать вычисление. Пример:
```
  points positions=(some-computation @arr teta=14);
```
будет создан объект some-computation @arr teta=14 и значение его параметра `output` будет копироваться в параметр positions у объекта points.

## Набор объектов как значение параметра
В качестве значения параметра можно указать набор объектов. При этом объекты не создаются, а их программный код записывается в значение.
Пример:
```
  paint scene={ 
  	   rectangle 0 0 500 100 
  	   circle 10 20 
  	   repeater input=5 { |i| circle (@i * 10) 20 }
  	}
```
Объекты могут пользоваться по своему усмотрению этими поступившими кодами, например создать объекты по этому описанию.

## Конвейер (pipe)
В язык введен тип `pipe`, которые соединяет параметры `input` и `output` у вложенных объектов.
Пример:
```
pipe {
  load-file "alfa.csv"
  parse-csv
  multiply-column "X" 10
}
```
Будет создано три объекта и соединены их входы-выходы (параметры input-output). Выход последнего объекта будет выходом pipe-а.

Поскольку pipe на практике считается частой операций, вводится специальная форма для записи через вертикальную палку:
```
  объект1 | объект2 | объект3
```
которая эквивалентна применению pipe. Пример:
```
  load-file "alfa.csv" | parse-csv | multiply-column "X" 10
  read @filename | load-file | parse-csv | multiply-column "X" 10
```
Дополнительная операция `read` читает значение переменных и передает их в параметр input у load-file.

## Публикация переменных с помощью let
В язык введен тип `let` который добавляет в текущую лексическую область видимости новые переменные. Их имена и значения берутся из параметров let. Пример:
```
  let content=(load-file "alfa.csv" | parse-csv) x2=2 x3=(@x2 * 3);

  console-log "Прочитано содержимое" @content " и при этом x3=" @x3;
```
Результат вычисления `(load-file "alfa.csv" | parse-csv)` записывается в переменную с именем content. Эта переменная доступна другим объектам. Равно как и другие переменные, заданные параметрами let.

## Регистрация новых типов
Новые типы в компаланг можно добавлять с помощью типа `feature`.
Пример:
```
feature "my-rectangle" {
  root: rectangle color='red' width=(@root.a * 2) height=10 { 
  	circle 5 5 5 circle 10 5 5 
  }
}
```
и далее тип `my-rectangle` становится доступным в программе.
```
my-rectangle a=5 color='blue'
```

Дополнительно тип можно инициализировать яваскрипт-кодом, указанным во втором параметре:
```
feature "compute" "
  env.onvalues( [0,1], (a,b) => env.setParam('output', a+b) )
"
console-log (compute 2 2); // напечатает 4
```
здесь env, onvalues и другие вещи - это API Viewzavr. В будущем, быть может, также можно будет указывать классы js в качестве типов Компаланга.

## Вызов вычислений javascript
Введен тип `m-eval` для вычисления javascript. Его первый позиционный аргумент - js-выражение с привязкой к compalang-окружению. 
Последующие позиционные аргументы, а также аргумент input, будут переданы в js-выражение.
Результат записывается в поле output m-eval'а.
Пример:
```
  m_eval {: a b | return a+b :}" 2 2; // вернет 4
  m_eval {: a b c=@some.coef | return (a+b)*c :}" 2 2; // вернет 4 умноженное на значение @some.coef
  load-file "alfa.txt" | m-eval {: txt | return txt.split("\n") :} // вернет массив строк файла  
```

## Загрузка файлов
В язык введен тип `load` который загружает указанные файлы, интерпретирует как компаланг, а созданные объекты размещаются как вложенные объекты в load. Пример:
```
load "graphics.cl"
load "one.cl two.cl three.cl"
```

Это поведение должно измениться, когда будут введены "пространства имен". Прототип примерно такой, в стиле import-ов javascript:
```
  gr: load "graphics"

  gr.points positions=[1,2,3];
```

## Загрузка модулей javascript
Можно загружать модули яваскрипт (es6 modules) и далее пользоваться их функциями и прочими значениями:
```
  let k = (import_js (resolve-url "../lib/my.js"));
  console.log (m-eval @k.hello 1 2 3);
```

