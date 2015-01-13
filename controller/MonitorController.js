/**
 * Node.js 모니터링
 */

// 전역 설정(config.json을 참고 합니다.)
var config = require('../config');
require('../Logger');


// 로그 파일 위치 설정
var _LOG_FILE = __dirname + config.logfilepath;
var _LOG_LEVEL = config.loglevel;


// node 동작 확인용
exports.monitoring = function(req, res) {
    logger.log(_LOG_LEVEL, '[Request] Method : ' + req.method + ', URL : ' + req.url + '<<END');

    res.send(new Buffer(JSON.stringify({
        pid : process.pid,
        memory : process.memoryUsage(),
        uptime : process.uptime()
    })));
};