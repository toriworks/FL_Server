ProfileEtc = function() {
    this.profile_profile_key = '';
    this.profile_etc_key = '';
    this.title = '';
    this.contents = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'profile_profile_key : ' + this.profile_profile_key;
    str += ', profile_etc_key : ' + this.profile_etc_key;
    str += ', title : ' + this.title;
    str += ', contents : ' + this.contents;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
