# `log4js-api`


[![NPM](https://img.shields.io/npm/v/log4js-api.svg)](https://www.npmjs.com/package/log4js-api)
[![Github Workflow Status](https://github.com/aquariuslt/log4js-api/workflows/ci/badge.svg)](https://github.com/aquariuslt/log4js-api)
[![Codecov](https://codecov.io/gh/aquariuslt/log4js-api/branch/master/graph/badge.svg)](https://codecov.io/gh/aquariuslt/log4js-api)
[![Semantic-Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


Provide fixed implementation for [https://github.com/log4js-node/log4js-api](https://github.com/log4js-node/log4js-api)




## Usage

```typescript
import * as log4js from 'log4js-api';

const logger = log4js.getLogger('my-library');
logger.info("Library starting up");

```
