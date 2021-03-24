const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");


router.get("/:auditID", (req,res) => {
    let audits;
    const auditID = req.params.auditID;

    
    db.query(`SELECT * from scratch_audits WHERE id = ${auditID}`, [audits], (err,result)=>{
        if (err){
            console.log(err);
        } else {
            audits = result;
            res.send(audits)
        }
    }
    );
})

module.exports = router;