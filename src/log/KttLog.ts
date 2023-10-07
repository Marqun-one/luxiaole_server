import log4js, { Logger, Configuration } from 'log4js';

const config: Configuration = {
  appenders: {
    debug: {
      type: 'console'
    },
    info: {
      type: 'dateFile',
      filename: 'logs/infoktt',
      pattern: '-yyyy-MM-dd.log',
    },
    //错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
    errorLog: { type: 'dateFile', filename: 'logs/error', pattern: '-yyyy-MM-dd.log' },
    error: { type: "logLevelFilter", level: "error", appender: 'errorLog' }
  },
  categories: {
    default: { appenders: ['debug', 'info', 'error'], level: 'debug' },
    info: { appenders: ['info', 'error'], level: 'info' }
  }
}
log4js.configure(config);

export class LuxoaileLog {
  _log?: Logger;

  constructor(documentPosition?: string) {
    this._log = log4js.getLogger('luxiaole-server: ' + documentPosition);
  };

  log(level: string, msg: string, ...args: any[]) {
    console.log(msg, args);
    switch (level) {
      case 'info':
        this._log?.info(msg, args);
        break;
      case 'warn':
        this._log?.warn(msg, args);
        break;
      case 'error':
        this._log?.error(msg, args);
        break;
      default:
        this._log?.info(msg, args);
    }
  }
}

export default log4js;