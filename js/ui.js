import { changeLanguage, changeDifficulty, findCurKey} from "./utils.js"
import { data, incorrectArr, linesArr, topResultsArr } from "./index.js";


let textToPrintInput = document.querySelector(".textToPrint");
let durationDiv = document.querySelector(".duration");
let resContainer = document.querySelector(".results");
// Получаем все радио-кнопки по имени
const languages = document.querySelectorAll('input[name="lang"]');
const difficulties = document.querySelectorAll('input[name="difficulty"]');

export function initializeParams() {
  languages.forEach(radio => {
    if (data.language === radio.id) radio.checked = true
  });
  difficulties.forEach(radio => {
    if (data.difficulty === radio.id) radio.checked = true
  });
}






export let activeKeys = [];
export let allKeys = document.querySelectorAll(".key");
           


function renewKeys() {
  allKeys = document.querySelectorAll(".key");
}

export function updateResults(results, lastTryResult) {
  let totalsymbols = 0,
      totalDuration = 0;

  if (results.length > 0) results.sort((a, b) => (b.symbolsCnt / b.duration) - (a.symbolsCnt / a.duration));
  if (results.length > 5) results.length = 5;



  resContainer.innerHTML = "";

  if (lastTryResult) {
    resContainer.innerHTML = `<h2>Последняя попытка:</h2>
                            <ul>
                              <li>Время: ${lastTryResult.duration}</li>
                              <li>Набранное количество символов: ${lastTryResult.symbolsCnt}</li>
                              <li>Допущенное количество ошибок: ${lastTryResult.totalMistakes}</li>
                              <li>Набранная скорость: ${Math.floor(60 * lastTryResult.symbolsCnt / lastTryResult.duration )}</li>
                            </ul>
                           `;
  }
  resContainer.innerHTML += `<h2>ТОП 5 попыток:</h2>`;
  if (results.length > 0) {
    results.forEach((item, idx) => {
      totalsymbols += item.symbolsCnt;
      totalDuration += item.duration;

      resContainer.innerHTML += `
        Попытка №${idx+1}: <br/>
        <ul>
          <li>Время: ${item.duration}</li>
          <li>Набранное количество символов: ${item.symbolsCnt}</li>
          <li>Допущенное количество ошибок: ${item.totalMistakes}</li>
          <li>Набранная скорость: ${Math.floor(60 * item.symbolsCnt / item.duration )}</li>
        </ul>
      `
    })

    let averageSpeed = Math.floor(60 * totalsymbols / totalDuration);
    resContainer.innerHTML += `Средняя скорость (количество символов в минуту): ${averageSpeed}`;
  } else {
    resContainer.innerHTML += "Пока нет данных о лучших попытках!";
  }
}

export function formateString(str, activeIndex, incorrectArr) {
  if (!str || str.length < 1 || activeIndex < 0 || activeIndex > str.length || !incorrectArr) {
    console.error("Произошла ошибка при форматировании строки!", str, activeIndex, incorrectArr);
    return;
  }

  let htmlCode = ""

  for (let c in str) {
    let search = incorrectArr.findIndex(i => i == c);

    
    if (search !== -1 )
      htmlCode += `<span style="color:red;">${str[c]}</span>`;
    else if (c == activeIndex)
      htmlCode += `<span class="active-symbol">${str[c]}</span>`;
    else if (c < activeIndex)
      htmlCode += `<span class="active-text">${str[c]}</span>`;
    else
      htmlCode += `<span>${str[c]}</span>`;
  }
  textToPrintInput.innerHTML = `${htmlCode}`;
}

export function setActiveKey(char) {
  if (!char) return;

  if (activeKeys.length > 0) 
    activeKeys.forEach(i => i.classList.remove("active"));

  if (char === "changeLang") {
    activeKeys.length = 0;

    let shift, alt;

    for (let i of allKeys) {
      if(shift && alt) break;

      if (i.classList.contains("shift")) {
        shift = i;
      } else if (i.classList.contains("alt")) {
        alt = i;
      }
        
    }

    shift.classList.add("active");
    alt.classList.add("active");
    activeKeys.push(shift, alt);

    return;
  }

  for (let key of allKeys) {
    if (key.textContent === char) {
      activeKeys.push(key);
      key.classList.add("active");

      break;
    };
  }
}

export function printing(pressedKey, linesArr, incorrectArr, results, data, language) {
  if (!linesArr[data.curLine]) {
    console.error("Ошибка: нет текущей строки", data.curLine);
    return;
  }
  let access = /^.$|(Backspace)/.test(pressedKey);
  if (!access || linesArr.length < 1) return;
  if (activeKeys.find(i => i.classList.contains("shift")) && activeKeys.find(i => i.classList.contains("alt")) && activeKeys.length === 2) 
    return;


  // Если первый символ - возможно запустить таймер
  if (data.curSymbolIdx === 0) {
    data.timeBegin = Date.now();
    
    if (!window.updateTime)
      if (pressedKey !== "Backspace")
        window.updateTime = setInterval(() => {
          durationDiv.textContent = `${(Date.now() - data.timeBegin) / 1000}`;
        }, 50)
    else {
      // Если стерли строку - остановить таймер, обнулись стили 
      clearInterval(window.updateTime);
      window.updateTime = undefined;
      data.incorrectTotal = 0;

      setActiveKey(findCurKey(linesArr, data.curLine, data.curSymbolIdx, incorrectArr));

      return;
    }
  } 

  let nextKey = null;

  if (pressedKey === "Backspace") {
    if (data.curSymbolIdx <= 0)
      return;

    if (--data.curSymbolIdx === 0) {
      clearInterval(window.updateTime);
      window.updateTime = undefined;
      incorrectArr.length = 0;
    }

    let incorrectArrPos = incorrectArr.findIndex(i => i === data.curSymbolIdx);

    if (incorrectArrPos !== -1) 
      incorrectArr.splice(incorrectArrPos, 1);
    

  } else {
    // Если введены все слова, но есть ошибки - ничего не делаем (пользователь должен исправить ошибки)
    if (data.curSymbolIdx + 1 >= linesArr[data.curLine].length && incorrectArr.length !== 0) 
        return;
      
    // Если нажата правильная клавиша
    if (pressedKey === linesArr[data.curLine][data.curSymbolIdx]) {
      if (data.curSymbolIdx + 1 >= linesArr[data.curLine].length) {
        // Останавливаю таймер
        clearInterval(window.updateTime);
        window.updateTime = undefined;
        // Сохраняю статистику
        data.lastTryResult = {
          duration: +durationDiv.textContent,
          symbolsCnt: linesArr[data.curLine].length,
          totalMistakes: data.incorrectTotal
        };
        if ((data.lastTryResult.symbolsCnt / data.lastTryResult.duration) > (results[results.length - 1]?.symbolsCnt / results[results.length - 1]?.duration) || results.length < 5) {
          results.push(data.lastTryResult);
          localStorage.setItem("topResults", JSON.stringify(results));
          data.lastTryResult = null;
        } 


        incorrectArr.length = 0;
        data.incorrectTotal = data.timeBegin = 0;
        data.curSymbolIdx = 0;

        updateResults(results, data.lastTryResult);
        data.curLine++;
      } else 
        data.curSymbolIdx++;    
    } else {
      incorrectArr.push(data.curSymbolIdx);
      data.incorrectTotal++;
      data.curSymbolIdx++;

      let changeLang = false;
      if (language == "ru") {
        let notRU = /^[a-zA-Z]$/.test(pressedKey);
        if (notRU) changeLang = true;
      } else if (language == "en") {
        let notEN = /^[а-яА-Яё]$/.test(pressedKey);
        if (notEN) changeLang = true;
      }
      if (changeLang) nextKey = "changeLang"; // Говорим, что на виртуальной клавиатуре надо выделить комбинацию клавиш Shift + alt
    }
  }
  
 
  formateString(linesArr[data.curLine], data.curSymbolIdx, incorrectArr, textToPrintInput);

  if (!nextKey) nextKey = findCurKey(linesArr, data.curLine, data.curSymbolIdx, incorrectArr);
  setActiveKey(nextKey);
}

export function setKeyboard(lang) {
  let keysContainer = document.querySelector(".keyboard");
  if (lang === "ru") {
    // Логика для русской клавиатуры
    keysContainer.innerHTML = `
    <div class="line line0">
                <div class="key delete">⌫</div>
            </div>
            <div class="line line1">
                <div class="key">й</div>
                <div class="key">ц</div>
                <div class="key">у</div>
                <div class="key">к</div>
                <div class="key">е</div>
                <div class="key">н</div>
                <div class="key">г</div>
                <div class="key">ш</div>
                <div class="key">щ</div>
                <div class="key">з</div>
                <div class="key">х</div>
                <div class="key">ъ</div>
            </div>
            <div class="line line2">
                <div class="key">ф</div>
                <div class="key">ы</div>
                <div class="key">в</div>
                <div class="key">а</div>
                <div class="key">п</div>
                <div class="key">р</div>
                <div class="key">о</div>
                <div class="key">л</div>
                <div class="key">д</div>
                <div class="key">ж</div>
                <div class="key">э</div>
            </div>
            <div class="line line3">
                <div class="key shift">Shift</div>
                <div class="key">я</div>
                <div class="key">ч</div>
                <div class="key">с</div>
                <div class="key">м</div>
                <div class="key">и</div>
                <div class="key">т</div>
                <div class="key">ь</div>
                <div class="key">б</div>
                <div class="key">ю</div>
                <div class="key">.</div>
            </div>
            <div class="line line4">
                <div class="key alt">alt</div>
                <div class="key space"> </div>
            </div>`;
  } else {
    // Логика для английской клавиатуры
    keysContainer.innerHTML = `
            <div class="line line0">
                <div class="key delete">⌫</div>
            </div>
            <div class="line line1">
                <div class="key">q</div>
                <div class="key">w</div>
                <div class="key">e</div>
                <div class="key">r</div>
                <div class="key">t</div>
                <div class="key">y</div>
                <div class="key">u</div>
                <div class="key">i</div>
                <div class="key">o</div>
                <div class="key">p</div>
                <div class="key">[</div>
                <div class="key">]</div>
            </div>
            <div class="line line2">
                <div class="key">a</div>
                <div class="key">s</div>
                <div class="key">d</div>
                <div class="key">f</div>
                <div class="key">g</div>
                <div class="key">h</div>
                <div class="key">j</div>
                <div class="key">k</div>
                <div class="key">l</div>
                <div class="key">;</div>
                <div class="key">'</div>
            </div>
            <div class="line line3">
                <div class="key shift">Shift</div>
                <div class="key">z</div>
                <div class="key">x</div>
                <div class="key">c</div>
                <div class="key">v</div>
                <div class="key">b</div>
                <div class="key">n</div>
                <div class="key">m</div>
                <div class="key">,</div>
                <div class="key">.</div>
                <div class="key">/</div>
            </div>
            <div class="line line4">
                <div class="key alt">alt</div>
                <div class="key space"> </div>
            </div>
    `;
  }
  renewKeys();
}

// Меняю цвет заголовка
setInterval(() => {
  let title = document.querySelector("h1");
  let newRGBColor = [];

  newRGBColor[0] = Math.floor(Math.random() * 125 + 130);
  newRGBColor[1] = Math.floor(Math.random() * 240);
  newRGBColor[2] = Math.floor(Math.random() * 240);

  title.style.color = `rgb(${newRGBColor[0]}, ${newRGBColor[1]}, ${newRGBColor[2]})`;
}, 200);

languages.forEach(radio => {
    radio.addEventListener('change', (event) => {
      changeLanguage(event.target.id);
    });
});

// Событие смены сложности
difficulties.forEach(radio => {
  radio.addEventListener('change', (event) => 
    changeDifficulty(event.target.id)
  );
});

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

  
  printing(e.key, linesArr, incorrectArr, topResultsArr, data, data.language);
});