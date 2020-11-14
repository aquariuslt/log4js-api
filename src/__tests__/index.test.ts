import * as log4js from '../';


describe('log4js-api', () => {

  it('# should load log4js api without implement', () => {
    const logger = log4js.getLogger();
    logger.log('Testing default level');
    logger.warn('Testing default level');
  });
});
