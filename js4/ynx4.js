/**
 * Возвращает новый emitter
 * @returns {Object}
 */
"use strict";
function getEmitter() {
  const events = {};
  return {
    getEvents: function (event) {
      const splittedEvents = event.split(".");
      return splittedEvents.reduce((accumulator, currentEvent) => {
        if (accumulator.length === 0) {
          return [currentEvent];
        }
        accumulator.unshift(`${accumulator[0]}.${currentEvent}`);
        return accumulator;
      }, []);
    },
    /**
     * Подписаться на событие
     * @param {String} event
     * @param {Object} context
     * @param {Function} handler
     */
    on: function (event, context, handler) {
      if (!{}.hasOwnProperty.call(events, event)) {
        events[event] = [];
      }
      events[event].push({ context, handler });
      return this;
    },

    /**
     * Отписаться от события
     * @param {String} event
     * @param {Object} context
     */
    off: function (event, context) {
      Object.keys(events).forEach((eventToUnsubscribe) => {
        if (
          eventToUnsubscribe === event ||
          eventToUnsubscribe.startsWith(`${event}.`)
        ) {
          events[eventToUnsubscribe] = events[eventToUnsubscribe].filter(
            (person) => person.context !== context
          );
        }
      });

      return this;
    },

    /**
     * Уведомить о событии
     * @param {String} event
     */
    emit: function (event) {
      const allOfEvent = this.getEvents(event);
      allOfEvent.forEach((emitThis) => {
        if (events.hasOwnProperty(emitThis)) {
          events[emitThis].forEach((person) => {
            person.handler.call(person.context);
          });
        }
      });
      return this;
    },

    /**
     * Подписаться на событие с ограничением по количеству полученных уведомлений
     * @star
     * @param {String} event
     * @param {Object} context
     * @param {Function} handler
     * @param {Number} times – сколько раз получить уведомление
     */
    several: function (event, context, handler, times) {
      console.info(event, context, handler, times);
    },

    /**
     * Подписаться на событие с ограничением по частоте получения уведомлений
     * @star
     * @param {String} event
     * @param {Object} context
     * @param {Function} handler
     * @param {Number} frequency – как часто уведомлять
     */
    through: function (event, context, handler, frequency) {
      console.info(event, context, handler, frequency);
    },
  };
}
module.exports = {
  getEmitter,
};
