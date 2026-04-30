import { allKeys, formateString, setActiveKey, setKeyboard } from "./ui.js";
import { ruWords, enWords, data, incorrectArr, linesArr } from "./index.js";

export async function getWords() {
  let res = await fetch("../words.json");

  if (!res.ok) {
    throw new Error("Ошибка при загрузке слов, статус: " + res.status);
  }

  let data = await res.json();
  return data;
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Случайный индекс от 0 до i
    let j = Math.floor(Math.random() * (i + 1));
    // Меняем элементы местами
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function preparatoryWork( linesArr, data, incorrectArr ) {
  if (["light", "medium", "hard"].indexOf(data.difficulty) === -1) {
    console.error("Неверный уровень сложности!");
    return;
  }

  let wordsArr = data.language === "ru" ? ruWords[data.difficulty] : enWords[data.difficulty];
  shuffle(wordsArr);
  formLines(wordsArr, linesArr, 15);
  formateString(linesArr[data.curLine], data.curSymbolIdx, incorrectArr);
  setKeyboard(data.language);
  setActiveKey(findCurKey(linesArr, data.curLine, data.curSymbolIdx, incorrectArr));
}

export function changeLanguage(lang) {
  if (data.language === lang || lang !== "ru" && lang !== "en") return;

  data.language = lang;
  data.curLine = data.curSymbolIdx = data.incorrectTotal = data.timeBegin = 0;
  incorrectArr.length = 0;

  if (window.updateTime) {
    clearInterval(window.updateTime);
    window.updateTime = undefined;
  }
  
  preparatoryWork(linesArr, data, incorrectArr);
}

export function formLines(wordsArr, linesArr, wordsInLineCnt) {
  if (wordsArr.length <= wordsInLineCnt) {
    console.error("Недостаточно слов в массиве!");
    return;
  }

  let linesCnt = Math.floor(wordsArr.length / wordsInLineCnt);  
    
  for (let i = 0; i < linesCnt; i++) {
    linesArr[i] = wordsArr.slice(wordsInLineCnt*i, wordsInLineCnt*(i+1)).reduce((acc, item) => `${acc}${item} `, "");
  }

  if (wordsArr.length % wordsInLineCnt > 0) {
    let obtainedWords = wordsInLineCnt * linesCnt,
        rest = wordsArr.length - obtainedWords,
        lastLineBegin = wordsArr.length - rest;

    linesArr[linesCnt] = wordsArr.slice(lastLineBegin, wordsArr.length).reduce((acc, i) => `${acc}${i} `, "");
  }
}

export function findCurKey(linesArr, curLine, curSymbolIdx, incorrectArr) {
  if (linesArr.length < 1) return;
  
  if (incorrectArr.length > 0)
    return allKeys[0].textContent; // delete key
  else
    return linesArr[curLine][curSymbolIdx];
}

export function changeDifficulty(difficulty) {
  if (!difficulty || data.difficulty === difficulty || ["light", "medium", "hard"].indexOf(difficulty) === -1) return;


  data.difficulty = difficulty;
  data.curLine = data.curSymbolIdx = data.incorrectTotal = data.timeBegin = 0;
  incorrectArr.length = 0;

  if (window.updateTime) {
    clearInterval(window.updateTime);
    window.updateTime = undefined;
  }

  preparatoryWork(linesArr, data, incorrectArr);
}