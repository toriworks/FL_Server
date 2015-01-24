ProjectHistoryEstimate = function() {
    this.project_history_profile_profile_key = '';
    this.project_history_job_history_key = '';
    this.project_history_estimate_key = '';
    this.estimate_1 = 0;
    this.estimate_2 = 0;
    this.estimate_3 = 0;
    this.estimate_4 = 0;
    this.estimate_5 = 0;
    this.memo = '';
    this.estimator_name = '';
    this.estimator_key = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'project_history_profile_profile_key : ' + this.project_history_profile_profile_key;
    str += ', project_history_job_history_key : ' + this.project_history_job_history_key;
    str += ', project_history_estimate_key : ' + this.project_history_estimate_key;
    str += ', estimate_1 : ' + this.estimate_1;
    str += ', estimate_2 : ' + this.estimate_2;
    str += ', estimate_3 : ' + this.estimate_3;
    str += ', estimate_4 : ' + this.estimate_4;
    str += ', estimate_5 : ' + this.estimate_5;
    str += ', memo : ' + this.memo;
    str += ', estimator_name : ' + this.estimator_name;
    str += ', estimator_key : ' + this.estimator_key;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
