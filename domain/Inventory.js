Inventory = function() {
    this.inventory_key = '';
    this.inventory_name = '';
    this.search_keyword = '';
    this.types = '';
    this.status = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'inventory_key : ' + this.inventory_key;
    str += ', inventory_name : ' + this.inventory_name;
    str += ', search_keyword : ' + this.search_keyword;
    str += ', types : ' + this.types;
    str += ', status : ' + this.status;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
