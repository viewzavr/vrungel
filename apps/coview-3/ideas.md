вот я сделал Плагин из URL - он просто подтягивает файл указанный и загружает его.
Ну а что там - фича или что - его не касается.

Я с таким же успехом мог бы просто фичу для сцены сделать.. 

Короче мне задание разобраться с плагинами. Как я их сделал в Ковью - это странное.
Частные вопросы:
- как вести каталог плагинов? внешний например - когда я готов описать все в некоем файле но на внешней стороне.. как подгрузить этот каталог?
- кстати вообще добавление файла в проект - cl - можно сделать чтобы это был либо сам проект либо его часть (слой там какой-то или набор слоев)

Так вроде получается что описание плагина это строчка
coview-record title="Плагин из URL" type="plugin-from-url" cat_id="plugin"
а вот уже feature "plugin-from-url" { ... } это есть сам плагин.

Ну короче надо учить ковью дружить с внешним миром.
Что вот он есть а вот так внешним образом в него добавлять.
И кустомные вещи. И библиотечные.

+ мб проще - попробовать ввести сразу текст.
+ ну и эта идея - что добавляем файл в проект и если он .cl то выполняем.

*************
вопрос ток в том чтобы те новые типы - попроще бы появлялись бы в ковью.
ну хотя бы... через npx coview и он ищет app.cl и поехало. или init.cl. ну например.

я думаю норм бы было. и там тебе и типы, и проект сцены, и там что сделать надо - все там есть.
--------
и чтобы из командной строки запускалось и чисто из веба тоже.
npx coview -- подхватывает coview.cl или main.cl и поехало.

****
напрашиваются действия.. типа - "нарисовать". и пусь оно создает рисователь точками и линкует эту df-ку (или output этого блока если он df).

----
по 3д редактору - идея изобразить воду и блоки кочками (торчащие сферы) и между ними - линии ссылок. ну у сферы еще рядом мб минисферы
их параметров к которым можно цеплять ссылки.

----
помним формулы - т.е. не узлы создавать а формулы писать, эдакие онлайн-узлы
----
и еще желание - уметь повлиять сразу на группу чего-то (например а давайте посмотрим сред по времени по всем притивам)
----
+надо уметь множественные модификаторы
****
добавить экран! (как вкладку в браузере..)
****
надо еще поворот
****
вот есть df-ка и я хочу ее нарисовать.
а) рисователь берет дф с требованием определенных колонок..
б) рисователь позволяет указать в каких колонках какие данные..
***
вот хочу изобразить сетку. 
- есть взоможность сгенерить массив точек и массив отрезков
- или сгенерировать df-ку сразу из наборов чередующихся строк..
но и затем - хочется рисовать ее отдельно. по выбору - цилиндрами, отрезками, точками..
мб фича painted (или класс?) и - добавляем подобъект "рисование" и выбор типа. хотя формально лучше не выбор типа объекта а добавление объекта
ибо мб хорошо комбинацию - например отрезки и точки. что-то такое.

*****
модификаторы д. быть 1 ко многим. и храниться отдельно а не как дите объекта..
цель - что если объект создан программно то материалы бы сохранились.
*****
сделать панель (панелИ!) с гуями разных объектов. такая панель:
- где-то отображается (и схлапывается)
- настраивается какие гуи каких объектов отображает, и допом что еще пишет
- показывает оные гуи.
цель - натащить контролы по камере плюс некие другие основные в отдельный уголок. так удобнее гораздо.
и желательно через драг-дроп управление сделать.

***************
***** по визуализации 2023-04-12
+ нужна связь переменных tscale у разных графиков.. блин как там было - авто-вытаскивание переменных на верхний уровень.. так удобно..
причем оно автоматизировано напр в паравью - типа если есть в "источнике" то выходит на верхний уровень
+ надо восстанавливать вручную заданные параметры. а то это трындоз.
+ надо оси по раннерам да и подписать их
+ модификаторы чтобы назначать один нескольким. когнитивная мощь! можно даже галочки расставлять блин. или в тексте писать - собственно же list .... | geffect-pos x=...
+ делать свои панельки гуи
+ формулы. т.е. не ссылка а прямо компаланг запись:
  input = :: read @df1 | df_set RADIUS="->X" Y=(df-map-arr {: df index row | return row.X+row.Z })
  ну пусть так будет написано.. но мы то знаем что это реально выход жеж.

кстати получается я вот не догаладлся tscale-ы соединить. либо это настолько сложно что мозг запретил.

++++++++++++++++++++++++++++++
---
пытиаюсь совместить 2 эксперимента в ковью... это трындоз

короче мне надо получается 2 сцены.. на 1 экране.. 
ну т.е. в моей моделе - на 2 экранах?

короче реплей это хорошо но.. удобнее было бы файл драг-дропать тупорого.
т.е. настроил сцену.. как-то продублировал ее на другую область.
и задрагдропил - этот файл сюда тот туда.

ну и еще.. вот я хочу разделить имеющуюсся сцену на 2 части.
т.е. в левой показать одни образы а в правой другие.
а как? никак. только на слои раздирать... неудобно ни разу.

ну и еще - продублировать
а) те же объекты, - и им индивидуально назначить что где видно
б) сделать дубликат объектов.
и потом тем новым - драгдропнуть новый файл данных (файлы?).

****
вот в браузере. есть вкладки. и их легко можно:
- добавить
- вытащить в отдельную область
- разместить справа-слева и ваще.

можно было бы даже на них и положиться. но - нам надо совместные камеры и нам надо - снимать одновременно..

---
а нащот данных.. ну тут бы не таблица помогла, а тут бы реплей помог.
чтоыб его реплеить прямо из браузера.. ну это ббыло бы удобней.
так реально затащил штуку, вот ппк - и ему настроил, что ты не из вс берешь а из реплей.ы

****
ну и получается мне надо в 4 местах прописать tscale.
было бы удобно кстати если был бы хотя бы искалка по параметрам.. о..
я бы везде там быстро tscale то прописал хотя бы так..
а еще лучше галочками проставил что вот они связаны..
домен связи такой-то...

ну и областям.. таки индивидуальная настройка какие объекты из каких слоев они показывают..
прям по-галочно. ну если весь слой - то и хорошо.

эх.. ну и управление бы на уровне "класса". т..е вот рисовалке меняю стиль точек - и оно на все ее объекты распространяется.