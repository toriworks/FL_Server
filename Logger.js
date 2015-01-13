// 전역 설정(config.json을 참고 합니다.)
var config = require('./config');
var winston = require('winston');


// 로그 파일 위치 설정
var _LOG_FILE = __dirname + config.logfilepath;
var _LOG_LEVEL = config.loglevel;


// winston용 로깅
require('./rollingLog.js');

logger = winston.loggers.add('myLogger', {
    rollingFile : {
        filename : _LOG_FILE,
        level : _LOG_LEVEL,
        timestamp : true,
        maxFiles : 90,
        json : true
    }
});