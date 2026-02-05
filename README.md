Задание 1
Создаю файл index.html, вставляю в него код
```<!DOCTYPE html>
<html lang="en">
 <head>
   <title>Привет, мир!</title>
 </head>
 <body>
   <script>
     alert("Привет, мир!");
     console.log("Hello, console!");
   </script>
 </body>
</html>
```
При открытии страницы сверху вылазит окошко с текстом: "Привет, мир!", а в консоли: ""Hello, console!".
Теперь создаю файл index.js, вставляю код:
```
alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли");
```
В html-файл в теге <head> подключаю этот файл: ```<script src="script.js"></script>```
Теперь при открытии страницы сверху вылазит 2 окошка: сначала "Этот код выполнен из внешнего файла!", потом "Привет, мир!", а в консоли: "Сообщение в консоли" и "Hello, console!".

Задание 2
2.1 Создаем переменные name, birthYear, isStudent и выводим их в консоль:
```
let name = "Егорыч",
    birthYear = 2006,
    isStudent = true;

console.log("Имя: " + name);
console.log("Год рождения: " + birthYear);
console.log("Студент: " + isStudent);
```
