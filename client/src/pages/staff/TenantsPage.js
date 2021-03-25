import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Header from "../../components/common/Header";
import TenantList from "../../components/common/tenant/TenantList";
import AddIcon from "@material-ui/icons/Add";
import { Fab, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import Axios from "axios";

const useStyles = makeStyles({
  fab: {
    zIndex: 100,
    position: "fixed",
    bottom: 70,
    right: 20,
  },
  skele: {
    marginLeft: "20px",
    marginRight: "20px",
    height: "90px",
  },
  skeletons: {
    marginTop: "139px",
    marginBottom: "56x",
    height: "calc(100vh - 195px)",
  },
});

const TenantsPage = () => {
  let history = useHistory();
  // Function for Add Tenant FAB
  const handleAddTenant = () => {
    history.push("/addtenant");
  };

  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/tenants/all").then((response) => {
      setData(response.data);
      setLoaded(true);
    });
  }, []);

  const classes = useStyles();

  return (
    <div>
      <Header searchbar title="Tenants" />
      {loaded ? (
        <TenantList data={data} />
      ) : (
        <div className={classes.skeletons}>
          <Skeleton className={classes.skele} />
          <Skeleton className={classes.skele} />
          <Skeleton className={classes.skele} />
        </div>
      )}

      <Fab
        color="primary"
        aria-label="Add tenant"
        onClick={handleAddTenant}
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
      <Navbar route="" />
    </div>
  );
};

export default TenantsPage;
