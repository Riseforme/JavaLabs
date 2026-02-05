alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли");

let name = "Егорыч",
    birthYear = 2006,
    isStudent = true;

console.log("Имя: " + name);
console.log("Год рождения: " + birthYear);
console.log("Студент: " + isStudent);

let score = prompt("Введите ваш балл:");
if (score >= 90) {
 console.log("Отлично!");
} else if (score >= 70) {
 console.log("Хорошо");
} else {
 console.log("Можно лучше!");
}

for (let i = 1; i <= 5; i++) {
 console.log(`Итерация: ${i}`);
}
