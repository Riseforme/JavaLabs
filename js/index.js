import {getWords,  findCurKey, preparatoryWork} from "./utils.js"
import { initializeParams, updateResults } from "./ui.js"












export let ruWords = [], // массив русских слов
    enWords = [], // массив английских слов
    linesArr = [], // строки для ввода
    incorrectArr = [], // индексы символов, где допустили ошибку
    topResultsArr = JSON.parse(localStorage.getItem("topResults")) || []; // лучшие попытки


export let data = {
  language: "en", // текущий язык
  timeBegin: 0, // время начала
  curLine: 0, // номер текущей строки
  curSymbolIdx: 0, // метка текущего символа для ввода
  incorrectTotal: 0, // общее количество ошибок
  difficulty: "medium", // уровень сложности
  lastTryResult: null // результат последней попытки
}

updateResults(topResultsArr, data.lastTryResult);


getWords().then(d => {
  ruWords = d.ru;
  enWords = d.en;
  
  preparatoryWork(linesArr, data, incorrectArr);
  initializeParams();
})



