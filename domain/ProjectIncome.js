ProjectIncome = function() {
    this.project_income_key = '';
    this.project_history_profile_profile_key = '';
    this.project_history_project_history_key = '';
    this.m = 0;
    this.amount = 0;
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'project_income_key : ' + this.project_income_key;
    str += ', project_history_profile_profile_key : ' + this.project_history_profile_profile_key;
    str += ', project_history_project_history_key : ' + this.project_history_project_history_key;
    str += ', m : ' + this.m;
    str += ', amount : ' + this.amount;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
