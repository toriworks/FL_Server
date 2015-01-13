/*
 * Profile 관리 컨트롤러
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
require('../domain/Profile');
var db = require('../common/DBConnection');
var utils = new Utils();


// 로그 파일 위치 설정
var _LOG_FILE = __dirname + config.logfilepath;
var _LOG_LEVEL = config.loglevel;


//------------------------------------------------------------------------
// 서비스
//------------------------------------------------------------------------
// IF_V1_0001 - 프로필 정보 조회(특정 아이디)
exports.get_profile_info = function(req, res) {
    // 파라미터 수신
    var profile_key = req.params.profile_key;
    var interface_id = req.query.interface_id;
    var timestamp = req.query.timestamp;
    var hmac = req.query.hmac;

    // 패킷 생성
    var packet = new Packet();

    // 헤더 패킷 생성
    var headerPacket = new HeaderPacket();
    headerPacket.interface_id = interface_id
    headerPacket.timestamp = timestamp;
    headerPacket.hmac = hmac;


    // 데이터 구성
    //var arrData = new Array();
    //for(var i=0; i<5; i++) {
    //    var profileObj = new Profile();
    //    profileObj.profile_key = profile_key;
    //
    //    arrData.push(profileObj);
    //}

    // 바디 패킷 생성
    //var bodyPacket = new BodyPacket();
    //bodyPacket.error_code = '200';
    //bodyPacket.error_msg = 'SUCCESS';
    //bodyPacket.body_data = arrData;
    //
    //packet.header = headerPacket;
    //packet.body = bodyPacket;
    //
    //logger.log(_LOG_LEVEL, JSON.stringify(packet));


    // 유효성 체크 - 전달된 키값이 36자리가 아닌 경우 오류
    if(!utils.validate_key(profile_key, config.app.key_length)) {
        logger.log(_LOG_LEVEL, 'ProfileController - get_profile_info error - parameter size not valid.' + profile_key.length);
        //res.json('{\'Parameter size not valid.\'}');
        var bodyPacket = new BodyPacket();
        bodyPacket.error_code = '500';
        bodyPacket.error_msg = 'Parameter size is not valid.';
        bodyPacket.body_data = '';
        bodyPacket.execute_time = -1;

        packet.header = headerPacket;
        packet.body = bodyPacket;

        res.send(JSON.stringify(packet));

        res.status(200).end();
        return;
    }

    // 정보조회
    var qry = 'SELECT profile_key, email, full_name, gender, salary, access_type, is_user, passwd ';
    qry += ', email_auth_process, overview, enroll_status, avail_loc, is_freelancer, regdate, moddate ';
    qry += 'FROM profile ';
    qry += 'WHERE profile_key=\'' + profile_key + '\'';

    db.pool.getConnection(function(err,connection){
        var query = connection.query(qry, function (err, rows) {
            if(err){
                // 오류 메세지 전송
                res.status(500).end();
                connection.release();
            }

            if(rows.length > 0) {
                //                res.json(rows);
                res.json(rows[0].profile_key);

            } else {
                res.json('{\'No Data\'}');
            }
            connection.release();

            res.status(200).end();
        });

    });
};


// IF_V1_0002 - 프로필 목록 조회
exports.get_profile_lists = function(req, res) {
    // 파라미터 수신
    // 현재 페이지
    var cur_page = (!utils.blank_param(req.query.cur_page)) ? req.query.cur_page : 1;

    // 정렬, 조회 파라미터
    var order_field = '' + req.query.order_field;
    var order_type = ' ' + req.query.order_type + ' ';
    var search_type = '' + req.query.search_type;
    var search_text = '' + req.query.search_text;

    // 정보조회
    var qry = 'SELECT profile_key, email, full_name, gender, salary, access_type, is_user ';
    qry += ', email_auth_process, enroll_status, avail_loc, is_freelancer, regdate, moddate ';
    qry += 'FROM profile ';
    qry += 'WHERE 1=1 ';

    // 검색어
    if(!utils.blank_param(req.query.search_type)) {
        qry += 'AND ' + search_type + ' LIKE \'' + search_text + '%\' ';
    }

    // 정렬
    if(!utils.blank_param(req.query.order_field)) {
        qry += 'ORDER BY ' + order_field + order_type;
    }

    // 페이징
    qry += ' LIMIT ' + (cur_page-1) + ', 10 ';

    logger.log(_LOG_LEVEL, '[ProfileController - get_profile_lists]' + qry);

    // 데이터 조회
    db.pool.getConnection(function (err, connection) {
        var query = connection.query(qry, function (err, rows) {
            if (err) {
                // 오류 메세지 전송
                res.status(500).end();
                connection.release();
            }

            connection.release();

            res.status(200).end();
        });

    });

    res.status(200).end();
};


// IF_V1_0003 - 프로필 정보 등록
exports.add_profile_info = function(req, res) {
    // 파라미터 수신
    var email = '' + req.body.email;
    var full_name = '' + req.body.full_name;
    var gender = '' + req.body.gender;
    var salary = '' + req.body.salary;
    var access_type = '' + req.body.access_type;
    var is_user = '' + req.body.is_user;
    var passwd = '' + req.body.passwd;
    var email_auth_process = '' + req.body.email_auth_process;
    var overview = '' + req.body.overview;
    var enroll_status = '' + req.body.enroll_status;
    var avail_loc = '' + req.body.avail_loc;
    var is_freelancer = '' + req.body.is_freelancer;


    // key값을 신규로 생성
    var uuid = utils.generate_key();
    logger.log(_LOG_LEVEL, 'uuid : ' + uuid);

    // 입력 쿼리 생성
    var qry = 'INSERT INTO profile(profile_key, email, full_name, gender, salary, access_type ';
    qry += ', is_user, passwd, email_auth_process, overview, enroll_status, avail_loc, is_freelancer ';
    qry += ', regdate) VALUES (\'' + uuid + '\', \'' + email + '\', \'' + full_name + '\'';
    qry += ', \'' + gender + '\', ' + salary + ', \'' + access_type + '\', \'' + is_user + '\', password(\'' + passwd + '\')';
    qry += ', \'' + email_auth_process + '\', \'' + overview + '\', ' + enroll_status + ', ' + avail_loc + ', \'' + is_freelancer + '\'';
    qry += ', now())';

    logger.log(_LOG_LEVEL, qry);

    try {
        db.pool.getConnection(function (err, connection) {
            var query = connection.query(qry, function (err, rows) {
                if (err) {
                    // 오류 메세지 전송
                    res.status(500).end();
                    connection.release();
                }

                connection.release();

                res.status(200).end();
            });
        });
    } catch(e) {
        logger.log(_LOG_LEVEL, 'XXXXXXXXXXXXXX');
    }

};


// IF_V1_0004 - 프로필 정보 수정
exports.mod_profile_info = function(req, res) {
    // TODO : (수정 필요) 파라미터 수신
    var profile_key = '292f9dc0-9492-11e4-b42f-7320472f9772';

    var email = 'tori0530@daumx.com';
    var full_name = '이영림';
    var gender = 'M';
    var salary = 8300;
    var access_type = 'ET';
    var is_user = 'U';
    var passwd = 'z1z2z3z4';
    var email_auth_process = 'A';
    var overview = '자기소개';
    var enroll_status = 20;
    var avail_loc = 3;
    var is_freelancer = 'Y';

    // 입력 쿼리 생성
    var qry = 'UPDATE profile SET email=\'' + email + '\', full_name=\'' + full_name + '\', gender=\'' + gender + '\'';
    qry += ', salary=' + salary + ', access_type=\'' + access_type + '\', is_user=\'' + is_user + '\'';
    qry += ', email_auth_process=\'' + email_auth_process + '\', overview=\'' + overview + '\', enroll_status=' + enroll_status;
    qry += ', avail_loc=' + avail_loc + ', is_freelancer=\'' + is_freelancer + '\' ';
    qry += 'WHERE profile_key=\'' + profile_key + '\'';

    logger.log(_LOG_LEVEL, qry);

    db.pool.getConnection(function (err, connection) {
        var query = connection.query(qry, function (err, rows) {
            if (err) {
                // 오류 메세지 전송
                res.status(500).end();
                connection.release();
            }

            connection.release();

            res.status(200).end();
        });

    });
};


// IF_V1_0005 - 이메일 중복 체크
exports.get_email_duplicate = function(req, res) {
    // 파라미터 수신
    var email = req.params.email;

    duplicate_email(email, function(ret) {
        logger.log(_LOG_LEVEL, 'callback called...' + ret);

        res.status(200).end();
    });
};


// 이메일 중복 체크
duplicate_email = function(email_address, callback) {

    // 정보조회
    var qry = 'SELECT COUNT(0) cnt FROM profile WHERE email=\'' + email_address + '\'';

    logger.log(_LOG_LEVEL, qry);

    var dup_count = 0;

    if(db.pool.connection == null) {
        logger.log(_LOG_LEVEL, "db.pool is null");
    } else {
        logger.log(_LOG_LEVEL, "db.pool is not null");
    }

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
