ProjectBids = function() {
    this.project_bids_key = '';
    this.project_project_key = '';
    this.profile_key = '';
    this.bid_total = '';
    this.is_choosen = '';
    this.regdate = '';
    this.moddate = '';

// toString()
    this.toString = toString;
};

toString = function() {
    var str = 'project_bids_key : ' + this.project_bids_key;
    str += ', project_project_key : ' + this.project_project_key;
    str += ', profile_key : ' + this.profile_key;
    str += ', bid_total : ' + this.bid_total;
    str += ', is_choosen : ' + this.is_choosen;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
