ProjectPersons = function() {
    this.project_persons_key = '';
    this.project_project_key = '';
    this.last_name = '';
    this.first_name = '';
    this.email = '';
    this.hp = '';
    this.tel = '';
    this.fax = '';
    this.company_name = '';
    this.position = '';
    this.duty = '';
    this.personality = '';
    this.view_cnt = 0;
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'project_persons_key : ' + this.project_persons_key;
    str += ', project_project_key : ' + this.project_project_key;
    str += ', last_name : ' + this.last_name;
    str += ', first_name : ' + this.first_name;
    str += ', email : ' + this.email;
    str += ', hp : ' + this.hp;
    str += ', tel : ' + this.tel;
    str += ', fax : ' + this.fax;
    str += ', company_name : ' + this.company_name;
    str += ', position : ' + this.position;
    str += ', duty : ' + this.duty;
    str += ', personality : ' + this.personality;
    str += ', view_cnt : ' + this.view_cnt;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};