много записей вида some @a @b
и это порождает ссылки.
а так-то это можно сделать как
some (read-param "@a") (read-param "@b)
ну и можно без даже окружений таких сделать.

смысл - link тяжелая, всех ищет. а так то запись идет у текущего объекта..

но совсем от link мы мб и не сможем отказаться.. а может и сможем..
(ведь даже в гуи Дениса они все-равно к объекту цепляются..)