Рисует с помощью gui список параметров указанного объекта (окружения).
Используется библиотека https://github.com/vasturiano/3d-force-graph

# Подключение к проекту

load "scene-explorer-3d";
debugger-screen-r;

# Об алгоритме рисования

## IFROMTO
стрелки разумно вести от from к to. стрелка таким образом показывает направление перемещения данных. 

## IUPDATE
надо обновлять по мере изменения дерева граф.
тогда это решит проблему RNONEXISTP частично.
да и вообще актуальность это круто.

# RNONEXISTP
бывает так что ссылка задействует параметр, который еще не определен в param-names.
но он будет позже.
если никак не решать это, то параметр висит в воздухе независимо и незаметно.
вероятно, это лучше как-то обзначить хотя бы цветом (что параметр не задан), 
но при этом объект если существует параметра, то это тоже обозначить.

## Дабл-клик приближает узел
Потребность - уметь фокусироваться на узле. Это объективно надо.
Решение - приближаться по дабл клику.
https://github.com/vasturiano/3d-force-graph/blob/master/example/click-to-focus/index.html
 + https://stackoverflow.com/questions/11274358/adjusting-camera-for-visible-three-js-shape
 + https://stackoverflow.com/questions/14614252/how-to-fit-camera-to-object

Update. В 3d-force-graph нет даблкликов. Есть клики но у нас на них повешено выбор объекта.
Решение - приближаться если узел по которому кликнули это уже текущий выбранный объект.

# Todo

## Parameter preview
Сейчас сделано как-то, но был алгоритм с хорошим предпросмотром массивов и т.п.

## Log flow
// кстати вот было бы прикольно тут логи добавлять..
// чтобы как бы объекты писали в воздухе..
// ну и оно пусть растворяется..

## Links as objects
Мб стоит их показывать объектами/субфичами, а то не ясно откуда стрелочки взялись
(и я искал одну срелочку и не стразу понял что она неправильно разрезолвилась
- а если бы она была показана как принадлежность то я бы понял..)

- проверил - слишком много объектов получается, прям слишком.. может это конечно сработает на совсем небольшом числе, проверить еще раз

## Выбор по метке
Сделать чекбоксы (или аля они) и список фич.. и типа кликаем их и видим граф
только состоящий из таких вот фич.. или типа того.. имхо удобно было бы..
можно их кнопки по размеру увеличить в зависимости от кол-ва использований..

=================================

# Scope-only
Надо уметь показывать только текущий scope (некоторого выбранного окружения),
без входа в детали используемых им окружений. Это кажется будет то что надо
в плане детализации. (и оставить режим "показывать все поддерево")

# Подсветка текущего объекта
выделять особо

# Переход к родителю от текущего
По команде - переход выше. Это будет удобно.