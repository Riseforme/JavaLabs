import {getWords,  findCurKey, preparatoryWork} from "./utils.js"
import { printing, setActiveKey, activeKeys} from "./ui.js"
/*
1) Получаю данные
2) Перемешиваю массив
3) Делю массив на несколько строк из 10 слов
4) Сохраняю количество пройденных строк, текущую вывожу на экран
*/













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



