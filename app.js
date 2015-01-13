//------------------------------------------------------------------------
// 각종 라이브러리 설정
//------------------------------------------------------------------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cluster = require('cluster');
var crypto = require('crypto-js');


//------------------------------------------------------------------------
// 컨트롤러 설정
//------------------------------------------------------------------------
var monitor = require('./controller/MonitorController');
var profile = require('./controller/ProfileController');


//------------------------------------------------------------------------
// 전역 설정
//------------------------------------------------------------------------
global.config = require('./config');
require('./Logger');

// 로그 파일 위치 설정
var _LOG_FILE = __dirname + config.logfilepath;
var _LOG_LEVEL = config.loglevel;


// 클러스터링 지원용 코어 갯수 얻기
var numCPUs = require('os').cpus().length;

// 크로스도메인용 설정
var header = {};

// 서비스 포트
var _PORT = config.app.port;

// Replay Attach 한계허용초
var REPLAY_ATTACK_LIMIT = 30;


// 클러스터링 기능 사용
if(cluster.ismaster) {
    for(var i=0; i<numCPUs; i++) {
        var worker = cluster.fork();

        worker.on('death', function(worker) {
            console.log('worker', worker.pid + ' died.');
        });

        worker.on('message', function(msg) {
            if(msg.cmd == 'reached') {
                console.log('Worker %d reached another 10000', msg.workerId);
            }
        })
    }
} else {

    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    var router = express.Router();

    // 모든 요청 전에 로깅
    router.use(function(req, res, next) {
        logger.log(_LOG_LEVEL, '[Request] Method : ' + req.method + ', URL : ' + req.url + '<<END');

        var interface_id = req.query.interface_id;
        var timestamp = req.query.timestamp;
        var hmac = getHMAC(req);

        // 기본 입력값 유효성 테스트
        if(interface_id === undefined || timestamp === undefined || req.query.hmac === undefined) {
            var error_code = '400';
            var error_msg = '필수 파라미터가 누락되었습니다..';

            var packet = generateAbnormalPacket(req, interface_id, timestamp, hmac, error_code, error_msg);
            res.send(JSON.stringify(packet));
            res.status(200).end();

            return;
        }

        // 보안 유효성 테스트(1. hmac으로 전달된 값과 timestamp가 동일한지를 체크함 / 2. Replay Attack인지 체크)
        var decrypted = crypto.AES.decrypt(hmac, config.app.secret_key);
        decrypted = decrypted.toString(crypto.enc.Utf8);
        var now_timestamp = new Date().getTime();
        var gap_timestamp = now_timestamp - timestamp;
        if(decrypted != timestamp || (gap_timestamp > REPLAY_ATTACK_LIMIT || gap_timestamp < 0)) {
            var error_code = (decrypted != timestamp) ? '900' : '901';
            var error_msg = (decrypted != timestamp) ? '-hmac 오류' : '-timestamp limit 오류';

            var packet = generateAbnormalPacket(req, interface_id, timestamp, hmac, error_code, '정상적인 접근이 아닙니다.' + error_msg);

            res.send(JSON.stringify(packet));
            res.status(200).end();

            return;
        }

        res.status(200).end();
        return;
        next();
    });

    //------------------------------------------------------------------------
    // Node.js 모니터링
    //------------------------------------------------------------------------
    router.get('/mntr', monitor.monitoring);


    //------------------------------------------------------------------------
    // Profile 핸들링
    //------------------------------------------------------------------------
    // IF_V1_0001 - 프로필 정보 조회(특정 아이디)
    router.get('/v1/profile/:profile_key', profile.get_profile_info);

    // IF_V1_0002 - 프로필 목록 조회
    router.get('/v1/profile', profile.get_profile_lists);

    // IF_V1_0003 - 프로필 정보 등록
    router.post('/v1/profile/', profile.add_profile_info);

    // IF_V1_0004 - 프로필 정보 수정
    router.post('/v1/profile/:profile_key', profile.mod_profile_info);

    // IF_V1_0005 - 이메일 중복 체크
    router.get('/v1/profile/email/:email', profile.get_email_duplicate);







    app.use('/', router);
    app.listen(_PORT);
};

// URL에서 hmac값만을 추출
getHMAC = function(req) {
    var i = req.url.indexOf('&hmac=');
    var hmac = req.url.substr(i+1).replace('hmac=', '');

    return hmac;
};

// 이상징후에 의한 패킷 생성
generateAbnormalPacket = function(req, interface_id, timestamp, hmac, error_code, error_msg) {
    // 패킷 생성
    var packet = new Packet();

    // 헤더 패킷 생성
    var headerPacket = new HeaderPacket();
    headerPacket.interface_id = interface_id
    headerPacket.timestamp = timestamp;
    headerPacket.hmac = hmac;

    // 바디 패킷 생성
    var bodyPacket = new BodyPacket();
    bodyPacket.error_code = error_code;
    bodyPacket.error_msg = error_msg;

    packet.header = headerPacket;
    packet.body = bodyPacket;

    return packet;
};
