F-GET-EVENT-VALUE
Работа 2022-11-13-2 A Survey on Reactive Programming.txt показывает что очень распространненый паттерн это соединение событий и значений параметров.
Когда по пришествию события на его основе рассчитывается функция и результат используется в вычислении какого-то параметра.

Мы можем реализовать это путем создания get-event-value: channel -> value и далее приделывать к нему m-eval при необходимости.