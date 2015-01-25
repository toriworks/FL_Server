/*
 * Manager 관리 컨트롤러
 */

//------------------------------------------------------------------------
// 각종 라이브러리 설정
//------------------------------------------------------------------------
// 전역 설정(config.json을 참고 합니다.)
var config = require('../config');
require('../Logger');
require('../common/Utils');
require('../domain/Packet');
require('../domain/HeaderPacket');
require('../domain/BodyPacket');
require('../domain/Manager');
require('../domain/Cnt');
var db = require('../common/DBConnection');
var utils = new Utils();


// 로그 파일 위치 설정
var _LOG_FILE = __dirname + config.logfilepath;
var _LOG_LEVEL = config.loglevel;


//------------------------------------------------------------------------
// 서비스
//------------------------------------------------------------------------
// IF_V1_0901 - 관리자 로그인
exports.try_login_manager = function(req, res) {
    // 파라미터 수신
    var interface_id = req.query.interface_id;
    var timestamp = req.query.timestamp;
    var hmac = req.query.hmac;
    var email = req.query.email;
    var passwd = req.query.passwd;

    // 패킷 생성
    var packet = new Packet();

    // 헤더 패킷 생성
    var headerPacket = new HeaderPacket();
    headerPacket.interface_id = interface_id
    headerPacket.timestamp = timestamp;
    headerPacket.hmac = hmac;
    packet.header = headerPacket;

    // 바디 패킷 생성
    var bodyPacket = new BodyPacket();

    // 조건절 테스트
    if(utils.blank_param(req.query.email) || utils.blank_param(req.query.passwd)) {
        logger.log(_LOG_LEVEL, 'ManagerController - try_login_manager error - parameter is not valid.(Blank parameter)');

        bodyPacket.error_code = '500';
        bodyPacket.error_msg = 'parameter is not valid.(Blank parameter).';
        bodyPacket.body_data = '';
        bodyPacket.execute_time = -1;
        packet.body = bodyPacket;

        res.send(JSON.stringify(packet));
        res.status(200).end();
        return;
    }

    // 정보조회
    var qry = 'SELECT COUNT(0) AS cnt ';
    qry += 'FROM manager  ';
    qry += 'WHERE email = \'' + email.trim() + '\' AND passwd = password(\'' + passwd.trim() + '\') ';

    db.pool.getConnection(function(err,connection){
        var query = connection.query(qry, function (err, rows) {
            if(err){
                // 오류 메세지 전송
                res.status(500).end();
                connection.release();
            }

            if(rows.length > 0) {
                var cnt_val = parseInt('0' + rows[0].cnt);
                var cntObj = new Cnt();
                cntObj.cnt = cnt_val;

                bodyPacket.error_code = 200;
                bodyPacket.error_msg = '';
                bodyPacket.body_data = cntObj;
                bodyPacket.execute_time = new Date().getTime()/ 1000;
                packet.body = bodyPacket;
            } else {
                bodyPacket.error_code = 400;
                bodyPacket.error_msg = 'No Data';
                bodyPacket.body_data = '';
                bodyPacket.execute_time = new Date().getTime()/ 1000;

                packet.body = bodyPacket;
            }
            connection.release();

            res.send(JSON.stringify(packet));
            res.status(200).end();
        });

    });
};

// IF_V1_0902 - 관리자 등록
exports.add_manager_info = function(req, res) {
    // 파라미터 수신
    var interface_id = req.query.interface_id;
    var timestamp = req.query.timestamp;
    var hmac = req.query.hmac;
    var last_name = '' + req.body.last_name;
    var first_name = '' + req.body.first_name;
    var email = '' + req.body.email;
    var passwd = '' + req.body.passwd;

    // 패킷 생성
    var packet = new Packet();

    // 헤더 패킷 생성
    var headerPacket = new HeaderPacket();
    headerPacket.interface_id = interface_id
    headerPacket.timestamp = timestamp;
    headerPacket.hmac = hmac;
    packet.header = headerPacket;

    // 바디 패킷 생성
    var bodyPacket = new BodyPacket();

    // key값을 신규로 생성
    var uuid = utils.generate_key();
    logger.log(_LOG_LEVEL, 'uuid : ' + uuid);

    // 쿼리
    var qry = 'INSERT INTO manager (manager_key, last_name, first_name, email, passwd, is_use ';
    qry += ', regdate) VALUES (\'' + uuid + '\', \'' + last_name + '\', \'' + first_name + '\'';
    qry += ', \'' + email + '\', password(\'' + passwd + '\')';
    qry += ', \'Y\', now())';


    db.pool.getConnection(function(err,connection){
        var query = connection.query(qry, function (err, rows) {
            if(err){
                // 오류 메세지 전송
                res.status(500).end();
                connection.release();
            }

            bodyPacket.error_code = 200;
            bodyPacket.error_msg = '';
            bodyPacket.execute_time = new Date().getTime()/ 1000;
            packet.body = bodyPacket;

            connection.release();

            res.send(JSON.stringify(packet));
            res.status(200).end();
        });

    });
};


// IF_V1_0903 - 관리자 수정
exports.mod_manager_info = function(req, res) {
    // 파라미터 수신
    var interface_id = req.query.interface_id;
    var timestamp = req.query.timestamp;
    var hmac = req.query.hmac;
    var manager_key = '' + req.body.manager_key;
    var last_name = '' + req.body.last_name;
    var first_name = '' + req.body.first_name;
    var email = '' + req.body.email;
    var passwd = '' + req.body.passwd;
    var is_use = '' + req.body.is_use;

    // 새로운 패스워드(새로운 패스워드가 비어 있다면 패스워드를 변경하지 않음)
    var new_passwd = '' + req.body.new_passwd;

    // 패킷 생성
    var packet = new Packet();

    // 헤더 패킷 생성
    var headerPacket = new HeaderPacket();
    headerPacket.interface_id = interface_id
    headerPacket.timestamp = timestamp;
    headerPacket.hmac = hmac;
    packet.header = headerPacket;

    // 바디 패킷 생성
    var bodyPacket = new BodyPacket();

    // 쿼리
    var qry = 'UPDATE manager SET last_name=\'' + last_name + '\', first_name=\'' + first_name + '\', email=\'' + email + '\'';
    qry += ',, is_use=\'' + is_use + '\', moddate=now() ';

    if(!utils.blank_param(new_passwd)) {
         qry += ', passwd=password(\'' + new_passwd + '\') ';
    }

    qry += ' WHERE manager_key=\'' + manager_key + '\'';

    db.pool.getConnection(function(err,connection){
        var query = connection.query(qry, function (err, rows) {
            if(err){
                // 오류 메세지 전송
                res.status(500).end();
                connection.release();
            }

            bodyPacket.error_code = 200;
            bodyPacket.error_msg = '';
            bodyPacket.execute_time = new Date().getTime()/ 1000;
            packet.body = bodyPacket;

            connection.release();

            res.send(JSON.stringify(packet));
            res.status(200).end();
        });

    });
};


// IF_V1_0999 - 이메일 중복 체크
exports.get_email_duplicate = function(req, res) {
    // 파라미터 수신
    var interface_id = req.query.interface_id;
    var timestamp = req.query.timestamp;
    var hmac = req.query.hmac;
    var email = req.params.email;

    duplicate_email(email, function(ret) {
        // 패킷 생성
        var packet = new Packet();

        // 헤더 패킷 생성
        var headerPacket = new HeaderPacket();
        headerPacket.interface_id = interface_id
        headerPacket.timestamp = timestamp;
        headerPacket.hmac = hmac;
        packet.header = headerPacket;

        // 바디 패킷 생성
        var bodyPacket = new BodyPacket();
        bodyPacket.error_code = 200;
        bodyPacket.error_msg = '';
        bodyPacket.execute_time = new Date().getTime()/ 1000;

        var cntObj = new Cnt();
        cntObj.cnt = ret;

        bodyPacket.body_data = cntObj;
        packet.body = bodyPacket;

        res.send(JSON.stringify(packet));
        res.status(200).end();
    });
};

// 이메일 중복 체크
duplicate_email = function(email_address, callback) {

    // 정보조회
    var qry = 'SELECT COUNT(0) AS cnt FROM profile WHERE email=\'' + email_address + '\'';
    logger.log(_LOG_LEVEL, qry);

    var dup_count = 0;

    db.pool.getConnection(function (err, connection) {
        connection.query(qry, function (err, rows) {
            if (err) {
                // 오류 메세지 전송
                connection.release();
                callback(0);
            }

            if(rows.length > 0) {
                dup_count = rows[0].cnt;
            } else {
                dup_count = 0;
            }

            connection.release();

            callback(dup_count);
        });

    });
};