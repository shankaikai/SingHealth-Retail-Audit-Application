const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");


router.get("/:tenantID", (req,res) => {
    let tenants;
    let issues;
    const tenantID = req.params.tenantID;

    
    db.query(`SELECT * from scratch_tenants WHERE id = ${tenantID}`, (err,result)=>{
        if (err){
            console.log(err);
        } else {
            tenants = result;
        }
    }
    );

    db.query(`SELECT * from scratch_issues WHERE tenantID = ${tenantID}`, (err,result)=>{
        if (err){
            console.log(err);
        } else {
            issues = result;
            res.send({tenants,issues})
        }
    }
    );
})

router.get("/edit/:tenantID", (req,res) =>{
    const tenantID = req.params.tenantID;
    db.query(`SELECT * FROM scratch_tenants WHERE id = ${tenantID}`, (err,result) =>{
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

module.exports = router;