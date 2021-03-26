import Reac, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Header from "../../components/common/Header";
import Tabs from "../../components/tenantView/tenantViewTab";
import { makeStyles } from "@material-ui/core";
import HeaderViewTenant from "../../components/tenantView/HeaderViewTenant";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  headers: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
  },
  skeletons: {
    padding: "10px",
    marginLeft: "20px",
    marginRight: "20px",
  },
});

const TenantPage = () => {
  const classes = useStyles();
  const location = useLocation();

  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  let { id } = useParams();

  // add axios function to get the tenant details using the id
  useEffect(() => {
    Axios.get(`http://localhost:3001/tenant/${id}`).then((response) => {
      setData(response.data);
      setLoaded(true);
    });
  }, [id]);

  return (
    <div className={classes.root}>
      {loaded ? (
        <div>
          <Header back title={data.name} avatar={data.imageUrl} noDivider />
          <HeaderViewTenant data={data} />
          <Tabs outstanding={data.issues} audits={data.audits} />
          <Navbar route="tenants" />
        </div>
      ) : (
        <div className={classes.skeletons}>
          <Skeleton height={50} />
          <Skeleton height={80} />
          <Skeleton />
          <Skeleton />
        </div>
      )}
    </div>
  );
};

export default TenantPage;
