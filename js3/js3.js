"use strict";

/**
 * @param {Object} schedule Расписание Банды
 * @param {number} duration Время на ограбление в минутах
 * @param {Object} workingHours Время работы банка
 * @param {string} workingHours.from Время открытия, например, "10:00+5"
 * @param {string} workingHours.to Время закрытия, например, "18:00+5"
 * @returns {Object}
 */
function day(str) {
  switch (str) {
    case "ПН":
      return 0;
      break;
    case "ВТ":
      return 1;
      break;
    case "СР":
      return 2;
      break;
    case "ЧТ":
      return 3;
      break;
    case "ПТ":
      return 4;
      break;
    case "СБ":
      return 5;
      break;
    case "ВС":
      return 6;
      break;
  }
}
function fmtMSS(s) {
  let otv;
  otv = parseInt(s.slice(3, 5));
  otv += parseInt(s.slice(0, 2)) * 60;
  return otv;
}
function getAppropriateMoment(schedule, duration, workingHours) {
  let arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push([]);
    for (let j = 0; j < 24 * 60; j++) {
      arr[i].push([]);
    }
  }
  let period;
  period = workingHours["from"].slice(-1);
  let key = Object.keys(schedule);
  for (let j = 0; j < key.length; j++) {
    for (let i = 0; i < schedule[key[j]].length; i++) {
      let from = schedule[key[j]][i]["from"];
      let to = schedule[key[j]][i]["to"];
      if (from.slice(-1) === period) {
        break;
      } else {
        schedule[key[j]][i]["from"] =
          from.slice(0, 3) +
          (
            parseInt(from.slice(3, 5)) -
            parseInt(from.slice(-1)) +
            parseInt(period)
          ).toString() +
          from.slice(5, 9) +
          period;
        schedule[key[j]][i]["to"] =
          to.slice(0, 3) +
          (
            parseInt(to.slice(3, 5)) -
            parseInt(to.slice(-1)) +
            parseInt(period)
          ).toString() +
          from.slice(5, 9) +
          period;
      }
    }
  }
  for (let j = 0; j < key.length; j++) {
    for (let i = 0; i < schedule[key[j]].length; i++) {
      let from = schedule[key[j]][i]["from"];
      let to = schedule[key[j]][i]["to"];
      for (let d = day(from.slice(0, 2)); d <= day(to.slice(0, 2)); d++) {
        if (d !== day(from.slice(0, 2))) {
          for (let h = 0; h < fmtMSS(to.slice(3, 5) + to.slice(5, 8)); h++) {
            if (arr[d][h].length === 0) {
              arr[d][h].push(1);
            }
          }
        } else {
          for (
            let h = fmtMSS(from.slice(3, 5) + from.slice(5, 8));
            h < fmtMSS(to.slice(3, 5) + to.slice(5, 8));
            h++
          ) {
            if (arr[d][h].length === 0) {
              arr[d][h].push(1);
            }
          }
        }
      }
    }
  }
  for (let d = 0; d < 3; d++) {
    for (let h = 0; h < fmtMSS(workingHours["from"].slice(0, 5)); h++) {
      if (arr[d][h].length === 0) {
        arr[d][h].push(1);
      }
    }
    for (let h = fmtMSS(workingHours["to"].slice(0, 5)); h < 24 * 60; h++) {
      if (arr[d][h].length === 0) {
        arr[d][h].push(1);
      }
    }
  }
  let temp = 0;
  let res = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 24 * 60; j++) {
      if (arr[i][j].length === 0) {
        temp++;
        if (temp === duration) {
          res.push([i, j - duration + 1]);
        }
      } else {
        temp = 0;
      }
    }
    temp = 0;
  }
  return {
    /**
     * Найдено ли время
     * @returns {boolean}
     */
    exists() {
      if (duration && res.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * Возвращает отформатированную строку с часами
     * для ограбления во временной зоне банка
     *
     * @param {string} template
     * @returns {string}
     *
     * @example
     * ```js
     * getAppropriateMoment(...).format('Начинаем в %HH:%MM (%DD)') // => Начинаем в 14:59 (СР)
     * ```
     */
    format(template) {
      return template;
    },

    /**
     * Попробовать найти часы для ограбления позже [*]
     * @note Не забудь при реализации выставить флаг `isExtraTaskSolved`
     * @returns {boolean}
     */
    tryLater() {
      return false;
    },
  };
}
console.log(
  getAppropriateMoment(
    {
      Danny: [
        { from: "ПН 12:00+5", to: "ПН 17:00+5" },
        { from: "ВТ 13:00+5", to: "ВТ 16:00+5" },
      ],
      Rusty: [
        { from: "ПН 11:30+5", to: "ПН 16:30+5" },
        { from: "ВТ 13:00+5", to: "ВТ 16:00+5" },
      ],
      Linus: [
        { from: "ПН 09:00+3", to: "ПН 14:00+3" },
        { from: "ПН 21:00+3", to: "ВТ 09:30+3" },
        { from: "СР 09:30+3", to: "СР 15:00+3" },
      ],
    },
    90,
    { from: "10:00+5", to: "18:00+5" }
  ).exists()
);
module.exports = {
  getAppropriateMoment,
};
