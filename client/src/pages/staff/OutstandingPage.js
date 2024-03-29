import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import Header from "../../components/common/Header";
import { makeStyles } from "@material-ui/core";
import OutstandingList from "../../components/outstanding/OutstandingList";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import config from "../../App.config";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  skeletons: {
    width: "100%",
    margin: 0,
    marginTop: "64px",
    marginBottom: "56x",
    height: "calc(100vh - 119px)",
  },
  skele: {
    marginLeft: "20px",
    marginRight: "20px",
    height: "90px",
  },
});

const OutstandingPage = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Axios.get(`${config.SERVERURL}/api/tenants/outstanding`).then(
      (response) => {
        setData(response.data);
        setLoaded(true);
      }
    );
  }, []);

  return (
    <div className={classes.root}>
      <Header title="Outstanding" />
      {loaded ? (
        <OutstandingList data={data} />
      ) : (
        <div className={classes.skeletons}>
          <Skeleton className={classes.skele} />
          <Skeleton className={classes.skele} />
          <Skeleton className={classes.skele} />
        </div>
      )}

      <Navbar route="outstanding" />
    </div>
  );
};

export default OutstandingPage;
