F-SCOPE-PARAMS

Доступ к параметрам через scope.
var alfa=5 beta=7;
console-log @alfa;

Изначально было что любые параметры так публиковать всех объектов-блоков.
Но вроде как слишком много да и нет потребности.
Пока оставил ток что блок типа var пишет.

note при этом если @alfa->cell записать значение то там ссылки не сотрутся.
т.е. var q=(some compute...); @q->cell | set-cell-value 5; ссылку не сотрет исходную.