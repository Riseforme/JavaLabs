import {transactions} from './transactions.js'
import { addTransaction } from './utils.js';
import {updateTable} from './ui.js'

let submitFormBtn = document.querySelector('#check-form__btn');
let sum = document.querySelector("#sum"),
    category = document.querySelector("select[name='category']"),
    description = document.querySelector("#description");
let transactionsCnt = transactions.length;

updateTable();

submitFormBtn.addEventListener("click", e => {
    e.preventDefault();
    console.dir(category);
    
    if (addTransaction(transactionsCnt + 1, sum.value, category.value, description.value))
        transactionsCnt++;
})
