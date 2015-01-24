Project = function() {
    this.project_key = '';
    this.profile_key = '';
    this.title = '';
    this.ordering_organization = '';
    this.from_date_year = '';
    this.from_date_month = '';
    this.to_date_year = '';
    this.to_date_month = '';
    this.contents = '';
    this.status = '';
    this.work_types = '';
    this.duration_month = '';
    this.total_pay = '';
    this.skills = '';
    this.is_managed = '';
    this.bid_open = '';
    this.manager_manager_key = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'project_key : ' + this.project_key;
    str += ', profile_key : ' + this.profile_key;
    str += ', title : ' + this.title;
    str += ', ordering_organization : ' + this.ordering_organization;
    str += ', from_date_year : ' + this.from_date_year;
    str += ', from_date_month : ' + this.from_date_month;
    str += ', to_date_year : ' + this.to_date_year;
    str += ', to_date_month : ' + this.to_date_month;
    str += ', contents : ' + this.contents;
    str += ', status : ' + this.status;
    str += ', work_types : ' + this.work_types;
    str += ', duration_month : ' + this.duration_month;
    str += ', total_pay : ' + this.total_pay;
    str += ', skills : ' + this.skills;
    str += ', is_managed : ' + this.is_managed;
    str += ', bid_open : ' + this.bid_open;
    str += ', manager_manager_key : ' + this.manager_manager_key;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
