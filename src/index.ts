/**
 * @desc we will export a fake logger implementation from `log4js` Logger
 * @see https://github.com/log4js-node/log4js-node/blob/master/lib/logger.js
 **/
class EmptyLogger {
  log() {
  }


  get level() {
    return EmptyLevel.getLevel();
  }

  set level(level) {

  }

  get useCallStack() {
    return false;
  }

  set useCallStack(value) {

  }


  isLevelEnabled() {
    return false;
  }

  addContext() {
  }

  removeContext() {
  }

  clearContext() {
  }

  setParseCallStackFunction() {

  }
}


class EmptyLevel {


  level: number;
  levelStr: string;
  colour: string;

  constructor(level, levelStr, colour) {
    this.level = level;
    this.levelStr = levelStr;
    this.colour = colour;
  }

  toString() {
    return this.levelStr;
  }

  static levels = [];

  static getLevel(target?, defaultLevel?) {
    if (!target) {
      return defaultLevel;
    }

    if (target instanceof EmptyLevel) {
      return target;
    }

    if (target instanceof Object && target.levelStr) {
      target = target.levelStr;
    }

    return EmptyLevel[target.toString().toUpperCase()] || defaultLevel;
  }

  static addLevels(customLevels) {
    if (customLevels) {
      const levels = Object.keys(customLevels);
      levels.forEach((l) => {
        const levelStr = l.toUpperCase();
        EmptyLevel[levelStr] = new EmptyLevel(
          customLevels[l].value,
          levelStr,
          customLevels[l].colour
        );
        const existingLevelIndex = EmptyLevel.levels.findIndex(lvl => lvl.levelStr === levelStr);
        if (existingLevelIndex > -1) {
          EmptyLevel.levels[existingLevelIndex] = EmptyLevel[levelStr];
        } else {
          EmptyLevel.levels.push(EmptyLevel[levelStr]);
        }
      });
      EmptyLevel.levels.sort((a, b) => a.level - b.level);
    }
  }
}

EmptyLevel.addLevels({
  ALL: { value: Number.MIN_VALUE, colour: 'grey' },
  TRACE: { value: 5000, colour: 'blue' },
  DEBUG: { value: 10000, colour: 'cyan' },
  INFO: { value: 20000, colour: 'green' },
  WARN: { value: 30000, colour: 'yellow' },
  ERROR: { value: 40000, colour: 'red' },
  FATAL: { value: 50000, colour: 'magenta' },
  MARK: { value: 9007199254740992, colour: 'grey' }, // 2^53
  OFF: { value: Number.MAX_VALUE, colour: 'grey' }
});

EmptyLevel.levels.forEach(addLevelMethods);

function addLevelMethods(target) {
  const level = EmptyLevel.getLevel(target);

  const levelStrLower = level.toString().toLowerCase();
  const levelMethod = levelStrLower.replace(/_([a-z])/g, g =>
    g[1].toUpperCase()
  );
  const isLevelMethod = levelMethod[0].toUpperCase() + levelMethod.slice(1);

  EmptyLogger.prototype[`is${isLevelMethod}Enabled`] = () => false;
  EmptyLogger.prototype[levelMethod] = function(...args) {
    this.log(level, ...args);
  };


}


/** Export */

const getEmptyLogger = () => new EmptyLogger();

const checkForLog4js = () => {
  try {
    return require('log4js');
  } catch (e) {
    return null;
  }
};

const log4js = checkForLog4js();

export const getLogger = log4js ? log4js.getLogger : getEmptyLogger;

export default {
  getLogger
};
