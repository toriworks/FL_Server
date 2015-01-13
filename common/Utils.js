/*
 * 공용 유틸리티
 */
var uuid = require('node-uuid');

Utils = function() {
    this.validate_key = validate_key;
    this.generate_key = generate_key;
    this.blank_param = blank_param;
};

// 키의 길이가 정해진 길이와 같은지 체크
validate_key = function(key, length) {
    console.log(key + ', ' + key.length + ', ' + length);

    if(key.length != length) {
        return false;
    } else {
        return true;
    }
}

// 키값을 생성
generate_key = function() {
    var key_value = '';
    key_value = uuid.v1();

    return key_value;
}

// 파라미터 체크
blank_param = function() {
    for(var i in arguments) {
        if(arguments[i] === undefined) { return true; }
    }
    return false;
}

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};

Date.prototype.format = function(f) {
    var d= this;

    return f.replace(/(yyyy|MM|dd|hh|mm|ss)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            default: return $1;
        }
    });
}