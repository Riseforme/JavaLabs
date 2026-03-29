import { transactions } from "./transactions.js";
import {updateTable, updateStatistics} from "./ui.js";

/**
 * Находит транзакцию по её ID.
 * @param {number} id - ID транзакции для поиска.
 * @returns {object|boolean} Объект транзакции, если найдена, иначе false.
 */
export function findTransation(id) {
    let trs = transactions.find(i => i.id === id);

    if (trs)
        return trs
    else 
        return false;
}

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
    
    if (!sum || !category || !description || sum == 0 || !allowedCategories.find(i => i === category) || description.length < 5) {
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

/**
 * Вычисляет общую сумму всех транзакций.
 * @returns {number} Общая сумма.
 */
export function calculateTotal() {
    return transactions.reduce((acc, item) => acc+=item.amount, 0);
}

