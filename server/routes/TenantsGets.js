const express = require("express");
const router = express.Router();
const db = require("../config/DatabaseConfig");

// Get all tenant data
router.get("/all", (req, res) => {
  //send all the tenant details + the most recent audit, along with when it was
  db.query(
    `SELECT * from escdb.scratch_tenants a
    LEFT OUTER JOIN (SELECT dateCompleted, tenantID, score
    FROM escdb.scratch_audits) b 
    ON a.id = b.tenantID
    AND b.dateCompleted = (SELECT MAX(dateCompleted) from scratch_audits WHERE tenantID = b.tenantID)
    GROUP BY a.id ASC`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Group by function used for outstanding GET call
const groupByTenants = (res) => {
  var out = [];
  res.map((item) => {
    // If id already exist in out array add the issue to the object
    const index = out.findIndex((x) => x.storeID == item.storeID);
    // -1 is returned for index when the index doesn't exist
    if (index === -1) {
      var newItem = {
        storeID: item.storeID,
        storeName: item.storeName,
        imageUrl: item.imageUrl,
        type: item.type,
        location: item.location,
        issues: [
          {
            issueID: item.issueID,
            title: item.title,
            deadline: item.deadline,
          },
        ],
      };
      out.push(newItem);
    } else {
      out[index].issues.push({
        issueID: item.issueID,
        title: item.title,
        deadline: item.deadline,
      });
    }
  });
  return out;
};

// Get all currently outstanding tenants and issues
router.get("/outstanding", (req, res) => {
  db.query(
    `SELECT 
  y.id AS storeID,
  y.name AS storeName,
  y.imageUrl,
  y.type,
  y.location,
  x.title,
  x.deadline,
  x.id as issueID
  FROM (SELECT * 
  FROM escdb.scratch_issues
  WHERE closed = 0) AS x
  LEFT JOIN escdb.scratch_tenants AS y
  ON x.tenantID = y.id`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(groupByTenants(result));
      }
    }
  );
});

module.exports = router;
