Почему бы все-таки не перевести в параметры (сиречь ячейки, потоки)
такие вещи как
parent
children
path

и вот например getPathRelative(@to) - как должно ловить реактивность?
если это функция. то никак. а если это процесс - то почему он функция.

варианты
- вынести get-path-relative вообще в метод
- научиться делать функцию которая дает процесс (через промисы например).
у нас уже есть такой опыт, см make-func.
но кстати там не так, там процесс дает функцию.
ну что-то такое. чтобы она возвращала вещь которая есть канал с возможностью обновления.