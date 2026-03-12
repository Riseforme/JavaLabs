<h1>Лабораторная работа №2. Реализация базовых методов работы с массивами</h1>
1.1. Вывод массива в консоль
Реализуйте функцию printArray(array), которая принимает массив и выводит его элементы в консоль (console.log)
<br/><code>function printArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(`Element ${i}: value ${arr[i]}`);
    }
}</code>
<br/><code>
    function printArray1(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(`${i}: ${arr[i]}`);
    }
}
</code>
        
1.2. Функция forEach(array, callback)
<code>
function foreach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}
forEach([1, 2, 3], (element, index, array) => {
  console.log(`Element: ${element}, Index: ${index}`);
});</code>

2. Функция map(array, callback)
<code>
function map(array, callback) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array));
    }
    return result;
}</code>

3. Функция filter(array, callback)
<code>
function filter(array, callback) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            result.push(array[i]);
        }
    }
    return result;
}
</code>

4. Функция find(array, callback)
<code>function find(array, callback) {
    for (let i = 0; i < array.length; i++) if (callback(array[i], i, array)) return array[i];

    return undefined;
}</code>

5. Функция some(array, callback)
<code>
function some(arr, callback) {
    for (let i = 0; i < arr.length; i++) if (callback(arr[i], i, arr)) return true;

    return false;
}
</code>

6. Функция every(array, callback)
<code>
function every(arr, callback) {
    for (let i = 0; i < arr.length; i++) if (!callback(arr[i], i, arr)) return false;

    return true;
}
</code>
7. Функция reduce(array, callback, initialValue)
<code>
function reduce(arr, callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
}
</code>

<h2>Контрольные вопросы</h2>
<h3>В чем преимущества использования колбэков при работе с массивами?</h3> - обработка элементов вынесена в отдельную функцию, что упрощает тестирование; один и тот же метод можно применять с разными функциями; можно передавать любую функцию для обработки элементов массива, не переписывая сам алгоритм

<h3>Какие проблемы могут возникать при использовании колбэков и как их избежать?</h3> - если колбэк вложен или анонимный, трудно понять, где ошибка; слишком большое количество вложенных колбэков может замедлить выполнение; при использовании методов объекта внутри колбэка можно потерять правильный контекст
Как избежать:
- Использовать именованные функции вместо анонимных, где это возможно.
- Применять стрелочные функции, чтобы не терять контекст this.
- Для асинхронного кода лучше использовать Promises или async/await.
- Разбивать сложные операции на небольшие функции.

<h3>Как реализовать функции map, filter, find, some, every и reduce без использования встроенных методов массивов?</h3> - используя цикл for и callback функции
