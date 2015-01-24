ProfileCertifications = function() {
    this.profile_profile_key = '';
    this.profile_certifications_key = '';
    this.cert_name = '';
    this.cert_from = '';
    this.cert_desc = '';
    this.from_date_year = '';
    this.from_date_date = '';
    this.to_date_year = '';
    this.to_date_date = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'profile_profile_key : ' + this.profile_profile_key;
    str += ', profile_certifications_key : ' + this.profile_certifications_key;
    str += ', cert_name : ' + this.cert_name;
    str += ', cert_from : ' + this.cert_from;
    str += ', cert_desc : ' + this.cert_desc;
    str += ', from_date_year : ' + this.from_date_year;
    str += ', from_date_date : ' + this.from_date_date;
    str += ', to_date_year : ' + this.to_date_year;
    str += ', to_date_date : ' + this.to_date_date;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
