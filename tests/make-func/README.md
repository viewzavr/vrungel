Тестируем makefunc.

Процесс make-func (блок?)

Вход:
 BODY children-описание либо переменная code с компаланг-описанием
 разнообразные аргументы.

Выход:
 output содержит функцию, которая при вызове создает окружение из BODY
 и передает ему входные параметры. когда это окружение формирует
 выходной параметр output то это является результатом функции,
 окружение удаляется, результат возвращается.

Технически результатом вызова функции является либо промиса, либо наш канал,
который получит итоговое значение.