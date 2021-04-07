var sqlite3 = require("sqlite3").verbose();
var path = require("path")
var parentDir = path.dirname(__dirname)
let db = new sqlite3.Database(path.join(parentDir + "/db/cse-singhealth-test.db"), sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if(err) {
        console.log(err)
        return;
    }
    console.log("Connect to SQLite DB success..")
});

module.exports = db;