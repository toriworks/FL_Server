Profile = function() {
    this.profile_key = '';
    this.email = '';
    this.full_name = '';
    this.gender = '';
    this.salary = 0;
    this.access_type = '';
    this.is_user = '';
    this.passwd = '';
    this.email_auth_process = '';
    this.overview = '';
    this.enroll_status = 0;
    this.avail_loc = 0;
    this.is_freelancer = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'profile_key : ' + this.profile_key;
    str += ', email : ' + this.email;
    str += ', full_name : ' + this.full_name;
    str += ', gender : ' + this.gender;
    str += ', salary : ' + this.salary;
    str += ', access_type : ' + this.access_type;
    str += ', is_user : ' + this.is_user;
    str += ', passwd : ' + this.passwd;
    str += ', email_auth_process : ' + this.email_auth_process;
    str += ', overview : ' + this.overview;
    str += ', enroll_status : ' + this.enroll_status;
    str += ', avail_loc : ' + this.avail_loc;
    str += ', is_freelancer : ' + this.is_freelancer;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
