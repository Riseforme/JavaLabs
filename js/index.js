import {getWords,  findCurKey, preparatoryWork} from "./utils.js"
import { printing, setActiveKey, activeKeys} from "./ui.js"












export let ruWords = [], // массив русских слов
    enWords = [], // массив английских слов
    linesArr = [], // строки для ввода
    results = [], // статистика
    incorrectArr = []; // индексы символов, где допустили ошибку


export let data = {
  language: "ru", // текущий язык
  timeBegin: 0, // время начала
  curLine: 0, // номер текущей строки
  curSymbolIdx: 0, // метка текущего символа для ввода
  incorrectTotal: 0 // общее количество ошибок
}


getWords().then(d => {
  ruWords = d.ru;
  enWords = d.en;

  preparatoryWork(ruWords, enWords, linesArr, data, incorrectArr);
})

document.addEventListener("keydown", e => {
  if (e.code == 'Space' && e.target == document.body)
    e.preventDefault();

  if (e.altKey && e.shiftKey && activeKeys.length === 2)
    if (e.key == "Shift" || e.key == "Alt") {
      let wasChangingLang = [false, false];

      for (let i of activeKeys) {
        if (i.classList.contains("shift"))
          wasChangingLang[0] = true;
        else if (i.classList.contains("alt"))
          wasChangingLang[1] = true;

        if (wasChangingLang[0] && wasChangingLang[1]) {
          setActiveKey(findCurKey(linesArr, data.curLine, data.curSymbolIdx, incorrectArr));
          break;
        }
      }
    }

  
  printing(e.key, linesArr, incorrectArr, results, data, data.language);
});

