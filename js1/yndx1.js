"use strict";

/**
 * Складывает два целых числа
 * @param {Number} a Первое целое
 * @param {Number} b Второе целое
 * @throws {TypeError} Когда в аргументы переданы не числа
 * @returns {Number} Сумма аргументов
 */
function abProblem(a, b) {
  if (
    typeof a !== "number" ||
    typeof b !== "number" ||
    a === NaN ||
    b === NaN
  ) {
    throw new TypeError("Error");
  }
  return a + b;
}

/**
 * Определяет век по году
 * @param {Number} year Год, целое положительное число
 * @throws {TypeError} Когда в качестве года передано не число
 * @throws {RangeError} Когда год – отрицательное значение
 * @returns {Number} Век, полученный из года
 */
function centuryByYearProblem(year) {
  if (typeof year === "number" && year !== NaN) {
    if (year > 0) {
      let vek;
      vek = year / 100;
      vek = Math.ceil(vek);
      return vek;
    }
    throw new RangeError("R_Error");
  }
  throw new TypeError("Error");
}

/**
 * Переводит цвет из формата HEX в формат RGB
 * @param {String} hexColor Цвет в формате HEX, например, '#FFFFFF'
 * @throws {TypeError} Когда цвет передан не строкой
 * @throws {RangeError} Когда значения цвета выходят за пределы допустимых
 * @returns {String} Цвет в формате RGB, например, '(255, 255, 255)'
 */
function colorsProblem(hexColor) {
  let arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  if (typeof hexColor !== "string") {
    throw new TypeError("error");
  } else {
    if (
      hexColor.length === 7 &&
      hexColor[0] === "#" &&
      arr.includes(hexColor[1]) &&
      arr.includes(hexColor[2]) &&
      arr.includes(hexColor[3]) &&
      arr.includes(hexColor[4]) &&
      arr.includes(hexColor[5]) &&
      arr.includes(hexColor[6])
    ) {
      let r = parseInt(hexColor[1] + hexColor[2], 16);
      let g = parseInt(hexColor[3] + hexColor[4], 16);
      let b = parseInt(hexColor[5] + hexColor[6], 16);
      if (0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255) {
        let str =
          "(" + r.toString() + ", " + g.toString() + ", " + b.toString() + ")";
        return str.toUpperCase();
      }
    }
    throw new RangeError("error");
  }
}
/**
 * Находит n-ое число Фибоначчи
 * @param {Number} n Положение числа в ряде Фибоначчи
 * @throws {TypeError} Когда в качестве положения в ряде передано не число
 * @throws {RangeError} Когда положение в ряде не является целым положительным числом
 * @returns {Number} Число Фибоначчи, находящееся на n-ой позиции
 */
function fibonacciProblem(n) {
  if (typeof n !== "number") {
    throw new TypeError("error");
  }
  if (n > 0 && (n * 10) % 10 === 0) {
    let a = 1;
    let b = 1;
    let temp;
    for (let i = 0; i < n - 2; i++) {
      temp = a;
      a = a + b;
      b = temp;
    }
    return a;
  } else {
    throw new RangeError("R_Error");
  }
}
/**
 * Транспонирует матрицу
 * @param {(Any[])[]} matrix Матрица размерности MxN
 * @throws {TypeError} Когда в функцию передаётся не двумерный массив
 * @returns {(Any[])[]} Транспонированная матрица размера NxM
 */
function matrixProblem(matrix) {
  let res = new Array();
  let num;
  let len = matrix.length;
  if (Array.isArray(matrix)) {
    for (let i = 0; i < len; i++) {
      if (!Array.isArray(matrix[i])) {
        throw new TypeError("Error");
      }
      num = matrix[i].length;
    }
    for (let i = 0; i < num; i++) {
      res[i] = new Array();
      for (let j = 0; j < len; j++) {
        res[i].push(matrix[j][i]);
      }
    }
    return res;
  } else {
    throw new TypeError("Error");
  }
}
/**
 * Переводит число в другую систему счисления
 * @param {Number} n Число для перевода в другую систему счисления
 * @param {Number} targetNs Система счисления, в которую нужно перевести (Число от 2 до 36)
 * @throws {TypeError} Когда переданы аргументы некорректного типа
 * @throws {RangeError} Когда система счисления выходит за пределы значений [2, 36]
 * @returns {String} Число n в системе счисления targetNs
 */
function numberSystemProblem(n, targetNs) {
  if (typeof n !== "number" || typeof targetNs !== "number") {
    throw new TypeError("Аргументы должны быть числами");
  }
  if (targetNs < 2 || targetNs > 36) {
    throw new RangeError("Система счисления должна быть от 2 до 36");
  }
  return n.toString(targetNs);
}
/**
 * Проверяет соответствие телефонного номера формату
 * @param {String} phoneNumber Номер телефона в формате '8–800–xxx–xx–xx'
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Boolean} Если соответствует формату, то true, а иначе false
 */
function phoneProblem(phoneNumber) {
  if (typeof phoneNumber !== "string") {
    throw new TypeError("Аргумент должен быть строкой");
  }
  const regex = /^8-800-\d{3}-\d{2}-\d{2}$/;
  return regex.test(phoneNumber);
}

/**
 * Определяет количество улыбающихся смайликов в строке
 * @param {String} text Строка в которой производится поиск
 * @throws {TypeError} Когда в качестве аргумента передаётся не строка
 * @returns {Number} Количество улыбающихся смайликов в строке
 */
function smilesProblem(text) {
  let count = 0;
  if (typeof text !== "string") {
    throw new TypeError("error");
  }
  const len = text.length;
  for (let i = 0; i < len - 2; i++) {
    if (
      (text[i] === ":" && text[i + 1] === "-" && text[i + 2] === ")") ||
      (text[i + 2] === ":" && text[i + 1] === "-" && text[i] === "(")
    ) {
      count++;
    }
  }
  return count;
}

/**
 * Определяет победителя в игре "Крестики-нолики"
 * Тестами гарантируются корректные аргументы.
 * @param {(('x' | 'o')[])[]} field Игровое поле 3x3 завершённой игры
 * @returns {'x' | 'o' | 'draw'} Результат игры
 */
function ticTacToeProblem(field) {
  const ar1 = field.reduce((ar1, el1) => {
    ar1.push(
      el1.reduce((ar2, el2) => {
        ar2.push(el2);
        return ar2;
      }, [])
    );
    return ar1;
  }, []);
  for (let i = 0; i < 3; i++) {
    if (
      ar1[i][0] == ar1[i][1] &&
      ar1[i][1] == ar1[i][2] &&
      ar1[i][0] == ar1[i][2]
    )
      return ar1[i][0];
    if (
      ar1[0][i] == ar1[1][i] &&
      ar1[1][i] == ar1[2][i] &&
      ar1[0][i] == ar1[2][i]
    )
      return ar1[0][i];
    if (
      i == 0 &&
      ar1[0][0] == ar1[1][1] &&
      ar1[1][1] == ar1[2][2] &&
      ar1[0][0] == ar1[2][2]
    )
      return ar1[0][0];
    if (
      i == 2 &&
      ar1[0][2] == ar1[1][1] &&
      ar1[1][1] == ar1[2][0] &&
      ar1[2][0] == ar1[0][2]
    )
      return ar1[0][2];
  }
  return "draw";
}

module.exports = {
  abProblem,
  centuryByYearProblem,
  colorsProblem,
  fibonacciProblem,
  matrixProblem,
  numberSystemProblem,
  phoneProblem,
  smilesProblem,
  ticTacToeProblem,
};
