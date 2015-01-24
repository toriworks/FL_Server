SalesHistory = function() {
    this.sales_history_key = '';
    this.project_project_key = '';
    this.nos = 0;
    this.sales_types = '';
    this.from_date = '';
    this.from_datetime = '';
    this.to_date = '';
    this.to_date_datetime = '';
    this.to_date_month = '';
    this.to_date_date = '';
    this.contents = '';
    this.vips = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'sales_history_key : ' + this.sales_history_key;
    str += ', project_project_key : ' + this.project_project_key;
    str += ', nos : ' + this.nos;
    str += ', sales_types : ' + this.sales_types;
    str += ', from_date : ' + this.from_date;
    str += ', from_datetime : ' + this.from_datetime;
    str += ', to_date : ' + this.to_date;
    str += ', to_date_datetime : ' + this.to_date_datetime;
    str += ', to_date_month : ' + this.to_date_month;
    str += ', to_date_date : ' + this.to_date_date;
    str += ', contents : ' + this.contents;
    str += ', vips : ' + this.vips;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
