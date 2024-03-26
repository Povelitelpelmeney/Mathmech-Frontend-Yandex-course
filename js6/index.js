"use strict";

const weather = require("./weather");

/**
 * Как выбрать geoid для тестирования функции:
 * Заходим на https://yandex.ru/pogoda, в поиске вводим желаемый город
 * Получаем урл вида https://yandex.ru/pogoda/10451 - 10451 это geoid
 */
const geoids = [10451, 54];

async function main() {
  const path = await weather.planTrip(geoids).cloudy(1).sunny(2).build();
  const availableGeoIds = [5, 10, 192, 20, 37];

  const sunnyPlan = planTrip(availableGeoIds)
    .sunny(2)
    .cloudy(1)
    .sunny(2)
    .max(3)
    .build();

  const cloudyPlan = planTrip(availableGeoIds).cloudy(2).sunny(1).build();
  console.info(path, sunnyPlan, cloudyPlan);
}

main().catch(console.error);
