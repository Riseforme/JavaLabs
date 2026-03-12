// 1.1
// arr - массив, который нужно вывести
function printArray(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(`Element ${i}: value  ${arr[i]}`);
    }
}
// arr - массив, который нужно вывести
function printArray1(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log(`${i}: ${arr[i]}`);
    }
}
// 1.2
// array - массив, с элементами которого нужно работать
// callback - функция, которая будет вызвана для каждого элемента массива
function foreach(array, callback) {
    for (var i = 0; i < array.length; i++) {
        callback(array[i], i, array);
    }
}
foreach([1, 2, 3], (element, index, array) => {
  console.log(`Element: ${element}, Index: ${index}`);
});
// 2
// array - массив, с элементами которого нужно работать
// callback - функция, которая будет вызвана для каждого элемента массива и должна вернуть новое значение
function map(array, callback) {
    var result = [];
    for (var i = 0; i < array.length; i++) result.push(callback(array[i], i, array));

    return result;
}
const numbers = [1, 2, 3];
const squared = map(numbers, (element) => element * element);
console.log(squared);
// 3
// array - массив, с элементами которого нужно работать
// callback - функция, которая найдет все элементы, подходящие условию
function filter(array, callback) {
    var result = [];
    for (var i = 0; i < array.length; i++) if (callback(array[i], i, array)) result.push(array[i]);

    return result;
}
const n = [1, 2, 3, 4, 5];
const evenNumbers = filter(n, (element) => element % 2 === 0);
console.log(evenNumbers); // [2, 4]

// 4
// array - массив, с элементами которого нужно работать
// callback - функция, которая найдет первый элемент, подходящий условию
function find(array, callback) {
    for (let i = 0; i < array.length; i++) if (callback(array[i], i, array)) return array[i];

    return undefined;
}
const num = [1, 2, 3, 4, 5];
const firstEven = find(num, (element) => element % 2 === 0);
console.log(firstEven); // 2

// 5
// array - массив, с элементами которого нужно работать
// callback - функция, которая проверит, есть ли хотя бы один элемент, подходящий условию
function some(arr, callback) {
    for (let i = 0; i < arr.length; i++) if (callback(arr[i], i, arr)) return true;

    return false;
}
const n1 = [1, 2, 3, 4, 5];
const hasEven = some(n1, (element) => element % 2 === 0);
console.log(hasEven); // true

// 6
// array - массив, с элементами которого нужно работать
// callback - функция, которая проверит, все ли элементы подходят условию
function every(arr, callback) {
    for (let i = 0; i < arr.length; i++) if (!callback(arr[i], i, arr)) return false;

    return true;
}
const n2 = [2, 4, 6];
const allEven = every(n2, (element) => element % 2 === 0);
console.log(allEven); // true

// 7
// array - массив, с элементами которого нужно работать
// callback - функция, которая будет вызвана для каждого элемента массива и должна вернуть новое значение сумматора
// initialValue - начальное значение сумматора
function reduce(arr, callback, initialValue) {
    let accumulator = initialValue;
    for (let i = 0; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
}
const n3 = [1, 2, 3, 4, 5];
const sum = reduce(n3, (accumulator, element) => accumulator + element, 0);
console.log(sum); // 15