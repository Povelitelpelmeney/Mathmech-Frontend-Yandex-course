"use strict";

/**
 * Телефонная книга
 */
const phoneBook = new Map();

/**
 * Вызывайте эту функцию, если есть синтаксическая ошибка в запросе
 * @param {number} lineNumber – номер строки с ошибкой
 * @param {number} charNumber – номер символа, с которого запрос стал ошибочным
 */
function syntaxError(lineNumber, charNumber) {
  throw new Error(
    `SyntaxError: Unexpected token at ${lineNumber}:${charNumber}`
  );
}
const commands = [
  "Создай",
  "Удали",
  "Добавь",
  "телефон",
  "и",
  "Удали",
  "почту",
  "контакт",
  "контакты",
  "для",
  "контакта",
  "контактов",
  "Покажи",
  "почты",
  "телефоны",
  "где",
  "есть",
  "имя",
  ";",
];
function strLength(query) {
  let string1;
  let temp = "";
  string1 = query.split(" ");
  let string = [];
  for (let i = 0; i < string1.length; i++) {
    if (
      string1[i].includes(";") &&
      string1[i].length - 1 > string1[i].indexOf(";") &&
      temp === ""
    ) {
      string.push(string1[i].slice(0, string1[i].indexOf(";") + 1));
      string.push(
        string1[i].slice(string1[i].indexOf(";") + 1, string1[i].length)
      );
    } else if (
      string1[i].match(/\p{Lu}/gu) !== null &&
      string1[i].match(/\p{Lu}/gu).length > 1
    ) {
      string.push(
        string1[i].slice(0, string1[i].indexOf(string1[i].match(/\p{Lu}/gu)[1]))
      );
      string.push(
        string1[i].slice(
          string1[i].indexOf(string1[i].match(/\p{Lu}/gu)[1]),
          string1[i].length
        )
      );
    } else {
      if (commands.includes(string1[i])) {
        string.push(string1[i]);
      } else if (
        string1[i].includes(";") ||
        string1[i - 1] === "телефон" ||
        string1[i - 1] === "почту"
      ) {
        if (temp === "") {
          string.push(string1[i]);
        } else {
          temp += string1[i];
          if (temp.includes(";") && temp.length - 1 > temp.indexOf(";")) {
            string.push(temp.slice(0, temp.indexOf(";") + 1));
            string.push(temp.slice(temp.indexOf(";") + 1, temp.length));
          } else {
            string.push(temp);
          }
          temp = "";
        }
      } else {
        if (string1[i - 1] === "контакт" || string1[i - 1] === "контакта") {
          temp += string1[i];
        } else {
          string.push(string1[i]);
        }
      }
    }
  }
  return string;
}
/**
 * Выполнение запроса на языке pbQL
 * @param {string} query
 * @returns {string[]} - строки с результатами запроса
 */
function run(query) {
  let result = [];
  let ok;
  let temp;
  let comm = 0;
  let tempArr = [[], []];
  let shtodelArr = [0, 0, 0];
  if (typeof query !== "string") {
    syntaxError(0, 0);
  }
  let string = strLength(query);
  let stringCount = string.length;
  let leng =
    string.reduce((summ, el) => {
      return summ + el.length + 1;
    }, 0) - 1;
  let stringLen = 0;
  let wordCount = 0;
  let lineNum = 0;
  let phone = /^\d{10}$/;
  let mail = /^\w{6}@example.com$/;
  const commands = [
    "Создай",
    "Удали",
    "Добавь",
    "телефон",
    "и",
    "Удали",
    "почту",
    "контакт",
    "контакты",
    "для",
    "контакта",
    "контактов",
    "Покажи",
    "почты",
    "телефоны",
    "где",
    "есть",
    "имя",
    ";",
  ];
  for (let i = 0; i < stringCount; i++) {
    // console.log(i, wordCount, stringCount);
    // console.log(string[i]);
    if (commands.includes(string[i])) {
      //////////////////////////////////////////////////////////////////////////////
      if (string[i] === "Создай") {
        !phoneBook.has(string[i + 2].slice(0, -1))
          ? phoneBook.set(string[i + 2].slice(0, -1), { phone: [], mail: [] })
          : phoneBook;
        stringLen += string[i].length + 1;
        wordCount++;
        temp = "Создай";
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "имя") {
        shtodelArr[0] += 1;
        if (temp === "Покажи") {
          comm += 1;
        }
        stringLen += string[i].length + 1;
        wordCount++;
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "почты") {
        shtodelArr[2] += 1;

        stringLen += string[i].length + 1;
        wordCount++;
        if (temp === "Покажи") {
          comm += 1;
        }
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "телефоны") {
        shtodelArr[1] += 1;
        stringLen += string[i].length + 1;
        wordCount++;
        if (temp === "Покажи") {
          comm += 1;
        }
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "контакт") {
        stringLen += string[i].length + 1;
        wordCount += 1;
        let sti = "";
        while (!sti.includes(string[wordCount].slice(0, -1))) {
          if (query[stringLen] !== " ") {
            sti += query[stringLen];
            stringLen++;
          } else {
            stringLen++;
          }
        }
        sti = "";
        wordCount++;
        sti += query[stringLen];
        if (string[i + 1][string[i + 1].length - 1] === ";") {
          lineNum++;
        } else {
          syntaxError(lineNum + 1, stringLen);
        }
        i++;
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "Удали") {
        if (string[i + 1] === "контакт") {
          if (phoneBook.has(string[i + 2].slice(0, -1))) {
            phoneBook.delete(string[i + 2].slice(0, -1));
          }
        }
        stringLen += string[i].length + 1;
        wordCount++;
        temp = "Удали";
        if (string[i + 1] === "контакты,") {
          stringLen += string[i].length + 1;
          wordCount++;
          i += 2;
          if (string[i] === "где") {
            stringLen += string[i].length + 1;
            wordCount++;
            i++;
            if (string[i] === "есть") {
              stringLen += string[i].length + 1;
              wordCount++;
              i++;
              if (string[i][string[i].length - 1] === ";") {
                if (string[i].length > 1) {
                  for (let [key, value] of phoneBook) {
                    if (key.includes(string[i].slice(0, -1))) {
                      ok = 1;
                    }
                    for (let j = 0; j < value.phone.length; j++) {
                      if (value.phone[j].includes(string[i].slice(0, -1))) {
                        ok = 1;
                      }
                    }
                    for (let j = 0; j < value.mail.length; j++) {
                      if (value.mail[j].includes(string[i].slice(0, -1))) {
                        ok = 1;
                      }
                    }
                    if (ok === 1) {
                      if (phoneBook.has(key)) {
                        phoneBook.delete(key);
                      }
                    }
                  }
                }
                stringLen += string[i].length;
                wordCount++;
              } else {
                stringLen += string[i].length;
                wordCount++;
                syntaxError(lineNum + 1, stringLen + 1);
              }
            }
          }
        }
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "Добавь") {
        stringLen += string[i].length + 1;
        wordCount++;
        temp = "Добавь";
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "Покажи") {
        stringLen += string[i].length + 1;
        wordCount++;
        temp = "Покажи";
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "и") {
        stringLen += string[i].length + 1;
        wordCount++;
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "телефон") {
        if (phone.test(string[i + 1])) {
          tempArr[0].push(string[i + 1]);
          stringLen += string[i].length + string[i + 1].length + 2;
          wordCount += 2;
          i++;
          if (temp === "Покажи") {
            comm += 1;
          }
        } else {
          stringLen += string[i].length + 1;
          wordCount += 1;
          syntaxError(lineNum + 1, stringLen + 1);
        }
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "почту") {
        if (mail.test(string[i + 1])) {
          tempArr[1].push(string[i + 1]);
          stringLen += string[i].length + string[i + 1].length + 2;
          wordCount += 2;
          i++;
          if (temp === "Покажи") {
            comm += 1;
          }
        } else {
          stringLen += string[i].length + 1;
          wordCount += 1;
          syntaxError(lineNum + 1, stringLen + 1);
        }
        //////////////////////////////////////////////////////////////////////////////
      } else if (string[i] === "для") {
        stringLen += string[i].length + 1;
        wordCount++;
        i++;
        if (string[i] === "контакта") {
          stringLen += string[i].length + 1;
          wordCount++;
          i++;
          if (string[i][string[i].length - 1] === ";") {
            if (temp === "Добавь") {
              if (phoneBook.get(string[i].slice(0, -1))) {
                let obj = JSON.parse(
                  JSON.stringify(phoneBook.get(string[i].slice(0, -1)))
                );
                if (obj.phone) {
                  for (let el of tempArr[0]) {
                    if (!obj.phone.includes(el)) obj.phone.push(el);
                  }
                }
                if (obj.mail) {
                  for (let el of tempArr[1]) {
                    if (!obj.mail.includes(el)) obj.mail.push(el);
                  }
                }
                phoneBook.delete(string[i].slice(0, -1));
                phoneBook.set(string[i].slice(0, -1), obj);
                let sti = "";
                while (!sti.includes(string[wordCount])) {
                  if (query[stringLen] !== " ") {
                    sti += query[stringLen];
                    stringLen++;
                  } else {
                    stringLen++;
                  }
                }
                sti = "";
                wordCount++;
                temp = null;
                tempArr = [[], []];
              } else {
                let sti = "";
                while (!sti.includes(string[wordCount])) {
                  if (query[stringLen] !== " ") {
                    sti += query[stringLen];
                    stringLen++;
                  } else {
                    stringLen++;
                  }
                }
                sti = "";
                wordCount++;
                temp = null;
                tempArr = [[], []];
              }
            }
            if (temp === "Удали") {
              if (phoneBook.get(string[i].slice(0, -1))) {
                let obj = JSON.parse(
                  JSON.stringify(phoneBook.get(string[i].slice(0, -1)))
                );
                if (obj.phone.length > 0) {
                  for (let j = 0; j < tempArr[0].length; j++) {
                    for (let u = 0; u < obj.phone.length; u++) {
                      if (tempArr[0][j] === obj.phone[u]) {
                        obj.phone.splice(u, 1);
                      }
                    }
                  }
                }
                if (obj.mail.length > 0) {
                  for (let j = 0; j < tempArr[1].length; j++) {
                    for (let u = 0; u < obj.mail.length; u++) {
                      if (tempArr[1][j] === obj.mail[u]) {
                        obj.mail.splice(u, 1);
                      }
                    }
                  }
                }
                temp = null;
                tempArr = [[], []];
                phoneBook.delete(string[i].slice(0, -1));
                phoneBook.set(string[i].slice(0, -1), obj);
                stringLen += string[i].length;
                wordCount++;
              } else {
                temp = null;
                tempArr = [[], []];
                stringLen += string[i].length;
                wordCount++;
              }
            }
          }
        } else if (string[i] === "контактов,") {
          stringLen += string[i].length + 1;
          wordCount++;
          i++;
          if (string[i] === "где") {
            stringLen += string[i].length + 1;
            wordCount++;
            i++;
            if (string[i] === "есть") {
              stringLen += string[i].length + 1;
              wordCount++;
              i++;
              if (string[i][string[i].length - 1] === ";") {
                if (string[i].length > 1) {
                  if (temp === "Покажи") {
                    let st = "";
                    for (let [key, value] of phoneBook) {
                      if (key.includes(string[i].slice(0, -1))) {
                        ok = 1;
                      }
                      for (let j = 0; j < value.phone.length; j++) {
                        if (value.phone[j].includes(string[i].slice(0, -1))) {
                          ok = 1;
                        }
                      }
                      for (let j = 0; j < value.mail.length; j++) {
                        if (value.mail[j].includes(string[i].slice(0, -1))) {
                          ok = 1;
                        }
                      }
                      if (ok === 1) {
                        if (shtodelArr[0] > 0) {
                          for (let u = 0; u < shtodelArr[0]; u++) {
                            if (comm === 1) {
                              st = st + key;
                            } else {
                              st = st + key + ";";
                            }
                          }
                        }
                        if (shtodelArr[1] > 0) {
                          for (let u = 0; u < shtodelArr[1]; u++) {
                            let str = value.phone.reduce((s, el) => {
                              s =
                                s +
                                `+7 (${el[0]}${el[1]}${el[2]}) ${el[3]}${el[4]}${el[5]}-${el[6]}${el[7]}-${el[8]}${el[9]}` +
                                ",";
                              return s;
                            }, "");
                            if (comm === 1) {
                              st = st + str.slice(0, -1);
                            } else {
                              st = st + str.slice(0, -1) + ";";
                            }
                          }
                        }
                        if (shtodelArr[2] > 0) {
                          for (let u = 0; u < shtodelArr[2]; u++) {
                            let str = value.mail.reduce((s, el) => {
                              s = s + el + ",";
                              return s;
                            }, "");
                            if (comm === 1) {
                              st = st + str.slice(0, -1);
                            } else {
                              st = st + str.slice(0, -1) + ";";
                            }
                          }
                        }
                      }
                      if (comm !== 1) {
                        st = st.slice(0, -1);
                      }
                      result.push(st);
                      st = "";
                    }
                    ok = 0;
                    comm = 0;
                    stringLen += string[i].length;
                    wordCount++;
                    shtodelArr = [0, 0, 0];
                  }
                }
              } else {
                stringLen += string[i].length;
                wordCount++;
                syntaxError(lineNum + 1, stringLen + 1);
              }
            } else {
              syntaxError(lineNum + 1, stringLen + 1);
            }
          } else {
            syntaxError(lineNum + 1, stringLen + 1);
          }
        } else if (string[i] === "контактов") {
          stringLen += string[i].length;
          wordCount++;
          syntaxError(lineNum + 1, stringLen + 1);
        } else {
          syntaxError(lineNum + 1, stringLen + 1);
        }
      }
    } else {
      syntaxError(lineNum + 1, stringLen + 1);
    }
  }
  return result;
}
module.exports = { phoneBook, run };
