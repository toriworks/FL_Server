ProjectHistory = function() {
    this.profile_profile_key = '';
    this.project_history_key = '';
    this.project_project_key = '';
    this.title = '';
    this.ordering_organization = '';
    this.role = '';
    this.from_date_year = '';
    this.from_date_month = '';
    this.to_date_year = '';
    this.to_date_month = '';
    this.is_ing = '';
    this.contribution = '';
    this.history_desc = '';
    this.is_managed = '';
    this.work_types = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'profile_profile_key : ' + this.profile_profile_key;
    str += ', project_history_key : ' + this.project_history_key;
    str += ', project_project_key : ' + this.project_project_key;
    str += ', title : ' + this.title;
    str += ', ordering_organization : ' + this.ordering_organization;
    str += ', role : ' + this.role;
    str += ', from_date_year : ' + this.from_date_year;
    str += ', from_date_month : ' + this.from_date_month;
    str += ', to_date_year : ' + this.to_date_year;
    str += ', to_date_month : ' + this.to_date_month;
    str += ', is_ing : ' + this.is_ing;
    str += ', contribution : ' + this.contribution;
    str += ', history_desc : ' + this.history_desc;
    str += ', is_managed : ' + this.is_managed;
    str += ', work_types : ' + this.work_types;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
