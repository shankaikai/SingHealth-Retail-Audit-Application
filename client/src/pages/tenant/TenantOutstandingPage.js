import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/common/NavbarTenant";
import Header from "../../components/common/Header";
import { makeStyles } from "@material-ui/core";
import OutstandingList from "../../components/tenantView/OutstandingList";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import { LoginContext } from "../../context/LoginContext";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "62px",
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

const TenantOutstandingPage = () => {
  const { context, setContext } = useContext(LoginContext);
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Axios.get(`http://localhost:3001/api/tenant/${context.id}`).then(
      (response) => {
        console.log(response.data);
        setData(response.data);
        setLoaded(true);
      }
    );
  }, []);

  return (
    <div className={classes.root}>
      <Header title="Outstanding" />
      {loaded ? (
        <OutstandingList outstanding={data.issues} />
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

export default TenantOutstandingPage;
