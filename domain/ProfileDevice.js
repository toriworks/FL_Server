ProfileDevice = function() {
    this.profile_profile_key = '';
    this.device_token = ''
    this.device_os = '';
    this.device_version = '';
    this.app_version = '';
    this.is_notiable = '';
    this.regdate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'profile_profile_key : ' + this.profile_profile_key;
    str += ', device_token : ' + this.device_token;
    str += ', device_os : ' + this.device_os;
    str += ', device_version : ' + this.device_version;
    str += ', app_version : ' + this.app_version;
    str += ', is_notiable : ' + this.is_notiable;
    str += ', regdate : ' + this.regdate;

    return str;
};