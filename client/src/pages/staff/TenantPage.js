import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Header from "../../components/common/Header";
import Tabs from "../../components/tenantView/tenantViewTab";
import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import HeaderViewTenant from "../../components/tenantView/HeaderViewTenant";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";
import { LoginContext } from "../../context/LoginContext";

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
  let history = useHistory();

  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { setSpinner } = useContext(LoginContext);

  const handleDelete = () => {
    setDeleteConfirm(false);
    setSpinner(true);
    Axios.post(`/api/tenant/delete/${id}`).then((response) => {
      if (response.data.message) {
        setSpinner(false);

        history.push("/");
      } else {
        setSpinner(false);
        alert("Delete failed");
      }
    });
  };

  let { id } = useParams();

  // add axios function to get the tenant details using the id
  useEffect(() => {
    Axios.get(`http://localhost:3001/api/tenant/${id}`).then((response) => {
      setData(response.data);
      setLoaded(true);
    });
  }, [id]);

  return (
    <div className={classes.root}>
      {loaded ? (
        <div>
          <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
            <DialogTitle>{`Delete ${data.name}?`}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Deleting a tenant is irreversible. Are you sure you want to
                delete this tenant and all of their records?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirm(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
          <Header title={data.name} avatar={data.imageUrl} noDivider />
          <HeaderViewTenant
            data={data}
            onGoingAuditID={data.onGoingAuditID}
            handleDeleteButton={() => setDeleteConfirm(true)}
          />
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
