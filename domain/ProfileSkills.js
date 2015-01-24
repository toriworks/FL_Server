ProfileSkills = function() {
    this.profile_profile_key = '';
    this.profile_skills_key = '';
    this.skill_name = '';
    this.grade = '';
    this.regdate = '';
    this.moddate = '';

    // toString()
    this.toString = toString;
};

toString = function() {
    var str = 'profile_profile_key : ' + this.profile_profile_key;
    str += ', profile_skills_key : ' + this.profile_skills_key;
    str += ', skill_name : ' + this.skill_name;
    str += ', grade : ' + this.grade;
    str += ', regdate : ' + this.regdate;
    str += ', moddate : ' + this.moddate;

    return str;
};
