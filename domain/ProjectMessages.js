ProjectMessages = function() {
    this.project_key = '';
    this.profile_key = '';
    this.message = '';
    this.regdate = '';

// toString()
    this.toString = toString;
};

toString = function() {
    var str = 'project_key : ' + this.project_key;
    str += ', profile_key : ' + this.profile_key;
    str += ', message : ' + this.message;
    str += ', regdate : ' + this.regdate;

    return str;
};
