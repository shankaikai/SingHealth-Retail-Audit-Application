import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { makeStyles } from "@material-ui/core";
import AuditEndHeader from "../../components/checklist/AuditEndHeader";
import AuditResults from "../../components/checklist/AuditResults";
import { useHistory, useParams } from "react-router-dom";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  skeletons: {
    padding: "10px",
    marginLeft: "20px",
    marginRight: "20px",
  },
});

export default function AuditEndPage() {
  const classes = useStyles();

  let history = useHistory();

  const { tenantID, auditID } = useParams();

  const [data, setData] = useState(null);

  const [tenantData, setTenantData] = useState(null);

  const [loaded, setLoaded] = useState(false);

  // Display loading screen when the data is not loaded yet

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/audit/${auditID}`).then((res) => {
      setData(res.data);
      Axios.get(`http://localhost:3001/api/tenant/${tenantID}`).then(
        (response) => {
          setTenantData(response.data);
          console.log(response.data);
          setLoaded(true);
        }
      );
    });
  }, [tenantID, auditID]);

  const handleDone = () => {
    history.push(`/tenant/${tenantID}`);
  };

  return (
    <div>
      {loaded ? (
        <div className={classes.root}>
          <Header title="Audit Summary" noDivider />
          <AuditEndHeader
            score={data.score.toFixed(1)}
            data={tenantData}
            date={data.dateCompleted}
          />
          <AuditResults
            data={data}
            className={classes.results}
            handleDone={handleDone}
          />
        </div>
      ) : (
        <div>
          <div className={classes.skeletons}>
            <Skeleton height={50} />
            <Skeleton height={80} />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      )}
    </div>
  );
}
