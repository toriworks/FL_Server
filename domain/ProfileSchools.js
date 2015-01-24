ProfileSchools = function() {
    this.profile_profile_key = '';
    this.profile_schools_key = '';
    this.school_name = '';
    this.school_types = '';
    this.from_date_year = '';
    this.to_date_year = '';
    this.degree_name = '';
    this.school_desc = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'profile_profile_key : ' + this.profile_profile_key;
    str += ', profile_schools_key : ' + this.profile_schools_key;
    str += ', school_name : ' + this.school_name;
    str += ', school_types : ' + this.school_types;
    str += ', from_date_year : ' + this.from_date_year;
    str += ', to_date_year : ' + this.to_date_year;
    str += ', degree_name : ' + this.degree_name;
    str += ', school_desc : ' + this.school_desc;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
