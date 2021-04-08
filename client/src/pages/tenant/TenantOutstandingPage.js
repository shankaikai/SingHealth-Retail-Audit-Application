<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
=======
import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/common/NavbarTenant";
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5
import Header from "../../components/common/Header";
import { makeStyles } from "@material-ui/core";
import OutstandingList from "../../components/tenantView/OutstandingList";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
<<<<<<< HEAD
=======
import { LoginContext } from "../../context/LoginContext";
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
<<<<<<< HEAD
=======
    marginTop: "64px",
    height: "calc(100vh - 119px)",
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5
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
<<<<<<< HEAD
=======
  const { context } = useContext(LoginContext);
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
<<<<<<< HEAD
    Axios.get("http://localhost:3001/tenants/outstanding").then((response) => {
      setData(response.data);
      setLoaded(true);
    });
=======
    Axios.get(`http://localhost:3001/api/tenant/${context.id}`).then(
      (response) => {
        console.log(response.data);
        setData(response.data);
        setLoaded(true);
      }
    );
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5
  }, []);

  return (
    <div className={classes.root}>
      <Header title="Outstanding" />
      {loaded ? (
<<<<<<< HEAD
        <OutstandingList data={data} />
=======
        <OutstandingList outstanding={data.issues} />
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5
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

<<<<<<< HEAD
export default TenantOutstandingPage;
=======
export default TenantOutstandingPage;
>>>>>>> f3e4b7cd51ce8c7fab8dcb5375f548c3ff5e42d5
