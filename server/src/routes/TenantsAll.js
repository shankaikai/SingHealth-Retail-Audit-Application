const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");


router.get("/all", (req,res) => {
    //send all the tenant details + the most recent audit, along with when it was
    db.query("select * from escdb.scratch_tenants LEFT JOIN (SELECT MAX(dateCompleted) AS lastAudit, tenantID, score FROM escdb.scratch_audits GROUP BY tenantID) AS audits ON escdb.scratch_tenants.id = audits.tenantID;", (err,result)=>{ 
        if (err){
            console.log(err); 
        } else {
            res.send({result})
        }
    }
    );
})

module.exports = router;