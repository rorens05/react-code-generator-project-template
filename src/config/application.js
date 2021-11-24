import {ENV, ENV_LIST} from './env';
import developmentConfig from './environments/development';
import productionConfig from './environments/production';
import stagingConfig from './environments/staging';

let config = {};

switch (ENV) {
  case ENV_LIST.DEVELOPMENT:
    config = developmentConfig;
    break;
  case ENV_LIST.STAGING:
    config = stagingConfig;
    break;
  case ENV_LIST.PRODUCTION:
    config = productionConfig;
    break;
  default:
    break;
}

export default config;
