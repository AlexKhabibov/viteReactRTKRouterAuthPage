function isValid(string) {
    const stack = []; // '('

    const example = {
        ")": "(",
        "]": "[",
        "}": "{"
    };

    for (const char of string) {
        // Закрывающая скобка
        if (char in example) {
            const lastOpen = stack[stack.length - 1];

            // Нет открывающей или скобки не совпадают
            if (lastOpen !== example[char]) {
                return false;
            }

            // Убираем использованную открывающую
            stack.pop();

        } else {
            // Открывающая скобка
            stack.push(char);
        }
    }

    // Если что-то осталось — есть незакрытые скобки
    return stack.length === 0;
}

isValid("()")       // true
isValid("()[]{}")   // true
isValid("(]")       // false
isValid("([{}])")   // true
isValid("([)]")     // false