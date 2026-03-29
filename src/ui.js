import { transactions } from "./transactions.js";
import { calculateTotal, deleteTransaction, findTransation } from './utils.js';

let table = document.querySelector(".statistics-table");
let totalAmountField = document.querySelector(".total-amount span");
let fullDescriptionDiv = document.querySelector(".full-description");

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

/**
 * Обновляет отображение статистики в пользовательском интерфейсе.
 */
export function updateStatistics() {
    let total = calculateTotal();
    
    totalAmountField.textContent = total;
}

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
    } else if (targetClasses.contains("transaction-category")) {
        let id = +e.target.parentElement.getAttribute("data-id");
        if(!id) {
            alert("Ошибка!");
            return;
        }
        if (!findTransation(id)) {
            alert("Транзакция не найдена!");
            return;
        }
        showFullDescription(id);
    }
});