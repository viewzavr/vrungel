для разрешения ссылок вида @name использовтаь локальный скоп.
он начинается от момента load и распространяется на него.
но далее там начинается некая система вложенности т.к. лоад может определить фичи
а в фичах одинаковые локальные имена у под-компонент.
и более того в списке детей компоненты разные дети принадлежат разным цепочкам этих областей видимости.

=====
см $scopeFor и scope.js