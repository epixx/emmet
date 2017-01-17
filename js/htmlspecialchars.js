// Задаем функцию.
// Первый параметр: строка
// Второй параметр: нужно ли отменить перевод
var htmlSpecialChars = function(string, reverse)
    {

        // specialChars это список символов и их сущностей
        // specialChars["<"] = "&lt;";
        // x — простая переменная, используемая в циклах
        var specialChars = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;"
            }, x;

        // Если мы отменяем перевод
        if (typeof(reverse) != "undefined")
        {

            // Нужно создать временный массив
            reverse = [];

            // Помещаем каждый специальный символ в массив
            for (x in specialChars)
                reverse.push(x);

            // Создаем обратный массив
            // ["<", ">"] становится [">", "<"]
            reverse.reverse();

            // Для каждого специального символа:
            for (x = 0; x < reverse.length; x++)

                // Заменяем все экземпляры (g) сущности оригиналом
                // если x = 1, то
                // reverse[x] = reverse[1] = ">";
                // specialChars[reverse[x]] = specialChars[">"] = "&gt;";
                string = string.replace(
                    new RegExp(specialChars[reverse[x]], "g"),
                    reverse[x]
                );

            // Получаем оригинальную строку
            return string;
        }

        // Если нам нужно не получать оригинал, а перевести строку в сущности
        // Для каждого специального символа:
        for (x in specialChars)

            // Заменяем все экземпляры специального символа его сущностью
            // Запомните, в отличие от обратного алгоритма, где x была числом
            // здесь х это необходимый символ (&, <, > или ")
            string = string.replace(new RegExp(x, "g"), specialChars[x]);

        // Получаем переведенную строку.
        return string;
    };