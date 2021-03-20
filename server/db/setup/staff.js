const db = require("../../config/SQLiteConfig");
var query_string = `create table Staffs (
    StaffID integer primary key, 
    StaffName text default "", 
    StaffPassword text not null
    );`
db.run(query_string, (err) => {
    if(err) {
        console.log(err)
        return;
    } 
    console.log(`Create table "Staffs" success..`)
})