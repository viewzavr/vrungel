Не рисовался визуальный процесс, размещаемый динамически в поддереве другого визуального процесса.
Все обыскался.

Оказалось - не там размещал. Сначала разместил объект вообще в коде модуля.
Затем догадался, стал размещать его - но в коде уже рарвернутой scene3d процесса визуализации (mount-point).
А надо было тащить его в дети прямо визуального процесса. Долго искал.