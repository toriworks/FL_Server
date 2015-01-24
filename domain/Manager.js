Manager = function() {
    this.manager_key = '';
    this.last_name = '';
    this.first_name = '';
    this.email = '';
    this.passwd = '';
    this.is_use = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'manager_key : ' + this.manager_key;
    str += ', last_name : ' + this.last_name;
    str += ', first_name : ' + this.first_name;
    str += ', email : ' + this.email;
    str += ', passwd : ' + this.passwd;
    str += ', is_use : ' + this.is_use;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};