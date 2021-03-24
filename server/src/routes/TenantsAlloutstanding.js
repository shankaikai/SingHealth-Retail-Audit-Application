const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");


router.get("/alloutstanding", (req,res) => {
    
    db.query("SELECT * from scratch_issues", (err,result)=>{
        if (err){
            console.log(err);
        } else {
            res.send({result})
        }
    }
    );
})

module.exports = router;