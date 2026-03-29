<h1>Шаг 1. Настройка и структурирование проекта</h1>

```
css/
  style.css
src/
  index.js
  transactions.js
  ui.js
  utils.js
index.html
```

<h1>Шаг 2. Представление транзакции</h1>

```js
export const transactions = [
  {
    id: 1,
    date: "2026-03-28T23:40:00",
    amount: -250.75,
    category: "Продукты",
    description: "Покупка продуктов в супермаркете"
  },
  {
    id: 2,
    date: "2026-03-27T18:15:00",
    amount: 1200.00,
    category: "Аренда",
    description: "Оплата аренды квартиры"
  }
]
```

<h1>Шаг 3. Отображение транзакций</h1>
Основа таблицы:

```html
<table class="statistics-table">
    <tr>
        <th>ID</th>
        <th>Дата</th>
        <th>Сумма</th>
        <th>Категория</th>
        <th>Описание</th>
    </tr>
</table>
```
```js
/**
 * Обновляет таблицу транзакций в пользовательском интерфейсе.
 */
export function updateTable() {
    let table = document.querySelector(".statistics-table");
    calculateTotal(); 

    table.innerHTML = ` <tr>
                            <th>ID</th>
                            <th>Дата</th>
                            <th>Сумма</th>
                            <th>Категория</th>
                            <th>Описание</th>
                        </tr>`;
    for (let obj of transactions) {
        let descrWordsArr = obj.description.split(' ');
        let descrLine = "";

        if (descrWordsArr.length > 4) {
            for (let i = 0; i < 4; i++)
                descrLine += `${descrWordsArr[i]} `;
            descrLine += '...';
        }
        else 
            descrLine = obj.description;

        table.innerHTML += `
            <tr data-id=${obj.id} style="background-color:${obj.amount > 0 ? "green" : "red"}">
                <td>${obj.id}</td>
                <td>${obj.date}</td>
                <td>${obj.amount}</td>
                <td>${obj.category}</td>
                <td class="transaction-category">${descrLine}</td>
                <td><button class="delete-btn" data-id="${obj.id}">Удалить</button></td>
            </tr>
        `;
    }
}

```

<h1>Шаг 4. Добавление транзакций</h1>

```js
/**
 * Добавляет новую транзакцию в список.
 * @param {number} id - ID для новой транзакции.
 * @param {number} sum - Сумма транзакции.
 * @param {string} category - Категория транзакции.
 * @param {string} description - Описание транзакции.
 * @returns {boolean} True, если транзакция была добавлена успешно, иначе false.
 */
export function addTransaction(id, sum, category, description) {
    let allowedCategories = ["Продукты", "Аренда", "Развлечения", "Транспорт", "Одежда"];
    
    if (typeof sum != "number" || !category || !description || sum == 0 || !allowedCategories.find(i => i === category) || description.length < 5) {
        alert("Неверные данные!");
        return false;
    }

    transactions.push({
        id: id,
        date: new Date().toISOString(),
        amount: +sum,
        category,
        description
    });
    updateTable();
    updateStatistics();

    return true;
}
```

<h1>Шаг 5. Управление транзакциями</h1>

```js
/**
 * Удаляет транзакцию по её ID.
 * @param {number} id - ID транзакции для удаления.
 */
export function deleteTransaction(id) {
    let idx = transactions.findIndex(i => i.id === id);
    
    if (idx === -1) {
        alert("Транзакция не найдена!");
        return;
    }

    transactions.splice(idx, 1);
    updateTable();
    updateStatistics();
}

table.addEventListener("click", e => {
    let targetClasses = e.target.classList;

    if (targetClasses.contains("delete-btn")) {
        let id = +e.target.parentElement.parentElement.getAttribute("data-id");
        if(!id) {
            alert("Ошибка!");
            return;
        }
        if (!findTransation(id)) {
            alert("Транзакция не найдена!");
            return;
        }

        deleteTransaction(id);
        updateTable();
    }
});
```

<h1>Шаг 6. Подсчет суммы транзакции</h1>

```js
  /**
   * Вычисляет общую сумму всех транзакций.
   * @returns {number} Общая сумма.
   */
  export function calculateTotal() {
      return transactions.reduce((acc, item) => acc+=item.amount, 0);
  }
  /**
   * Обновляет отображение статистики в пользовательском интерфейсе.
   */
  export function updateStatistics() {
      let total = calculateTotal();
      
      totalAmountField.textContent = total;
  }
  
```

<h1>Шаг 7. Отображение полного описания транзакции</h1>

```js
let fullDescriptionDiv = document.querySelector(".full-description");
/**
 * Показывает полное описание транзакции в пользовательском интерфейсе.
 * @param {number} id - ID транзакции.
 */
function showFullDescription(id) {
    let trs = findTransation(id);
    if (!trs) {
        alert("Ошибка!");
        return;
    }
    
    fullDescriptionDiv.innerHTML = `
        <h3>Подробное описание транзакции №${id}</h3>
        ${trs.description}
    ` ;
}
```

<h1>Шаг 8. Добавление транзакции</h1>

```html
<div class="add-transaction">
    <form action="#">
        <h2>Добавить транзакцию</h2>
        <label for="sum">Введите сумму: </label><input id="sum" name="sum" type="number">
        <label for="category">Выберите категорию: </label><select name="category">
            <option value="Продукты">Продукты</option>
            <option value="Аренда">Аренда</option>
            <option value="Развлечения">Развлечения</option>
            <option value="Транспорт">Транспорт</option>
            <option value="Одежда">Одежда</option>
        </select>
        <label for="description">Введите описание транзакции: </label>
        <textarea name="description" id="description"></textarea>
        <button id="check-form__btn" type="submit">Добавить</button>
    </form>
</div>
```

```js
let submitFormBtn = document.querySelector('#check-form__btn');
submitFormBtn.addEventListener("click", e => {
    e.preventDefault();
    
    if (addTransaction(transactionsCnt + 1, sum.value, category.value, description.value))
        transactionsCnt++;
})

```

<h1>Контрольные вопросы</h1>
-Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?: <br>
  - document.getElementById("id") — выбор по id. <br>
  - document.getElementsByClassName("class") — выбор всех элементов по классу<br>
  - document.getElementsByTagName("tag") — выбор всех элементов по тегу <br>
  - document.querySelector("selector") — первый элемент по CSS‑селектору <br>
  - document.querySelectorAll("selector") — все элементы по CSS‑селектору <br>

-Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM? - вместо того чтобы вешать обработчик на каждый дочерний элемент, мы назначаем его на родителя <br>
-Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?: <br>
- element.textContent = "Новый текст"; <br>
- element.innerHTML = "Можно добавить html-элементы"; <br>

-Как можно добавить новый элемент в DOM дерево с помощью JavaScript? - с помощью созданного js-объекта (document.createElement()) <br>
