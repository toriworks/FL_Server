ProfileImage = function() {
    this.profile_profile_key = '';
    this.image_original = '';
    this.image_trans = '';
    this.save_loc = '';
    this.is_use = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'profile_profile_key : ' + this.profile_profile_key;
    str += ', image_original : ' + this.image_original;
    str += ', image_trans : ' + this.image_trans;
    str += ', save_loc : ' + this.save_loc;
    str += ', is_use : ' + this.is_use;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};