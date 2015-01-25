Cnt = function() {
    this.cnt = -1;

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'cnt : ' + this.cnt;

    return str;
};