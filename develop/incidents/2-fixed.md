какие-то ошибки на уровне визпроцессов - теряется ссылка на айди головного объекта визпроцесса
при добавлении нового визпроцесса репитером
.
====
причина 1 - был внесен баг в repeater, у него вызывалась recreate с неверным аргументом force
отчего он всегда пересоздавал визпроцессы.

причина 2 - find-objects-by-pathes находил объект а после при его удалении не реагировал,
продолжал давать старую ссылку. теперь это исправлено.

итого причина - ошибки реализации ключевых функций.