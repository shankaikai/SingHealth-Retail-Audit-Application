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
  TextField,
  Snackbar,
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
  snack: {
    bottom: 70,
  },
});

const TenantPage = () => {
  const classes = useStyles();
  let history = useHistory();

  const [data, setData] = useState({});

  const [loaded, setLoaded] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { setSpinner } = useContext(LoginContext);

  const [toExport, setToExport] = useState(false);

  const [exportData, setExportData] = useState({});

  const [email, setEmail] = useState("");

  const [invalidEmail, setInvalidEmail] = useState(false);

  const [snackbar, setSnackbar] = useState(false);

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleExport = () => {
    // Check if email is valid
    if (validateEmail(email)) {
      setInvalidEmail(false);
      setToExport(false);

      setEmail("");
      Axios.get(
        `http://localhost:3001/api/audit/export/${exportData.id}/${email}`
      ).then((response) => {
        if (response.data.message) {
          setSnackbar(true);
        }
      });
    } else {
      setInvalidEmail(true);
    }
  };

  const handleDelete = () => {
    setDeleteConfirm(false);
    setSpinner(true);
    Axios.post(`http://localhost:3001/api/tenant/delete/${id}`).then(
      (response) => {
        if (response.data.message) {
          setSpinner(false);

          history.push("/");
        } else {
          setSpinner(false);
          alert("Delete failed");
        }
      }
    );
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
          <Snackbar
            open={snackbar}
            autoHideDuration={3000}
            onClose={() => setSnackbar(false)}
            message="Report sent successfully"
            className={classes.snack}
          />
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
          <Dialog
            open={toExport}
            onClose={() => {
              setToExport(false);
              setInvalidEmail(false);
              setEmail("");
            }}
          >
            <DialogTitle>{`Export Audit: ${exportData.dateStarted}`}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the email address of the recipient you wish to send
                the report to.
              </DialogContentText>
              <TextField
                error={invalidEmail}
                helperText={invalidEmail ? "Invalid email" : null}
                autoFocus
                variant="outlined"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setToExport(false);
                  setInvalidEmail(false);
                  setEmail("");
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button onClick={handleExport} color="primary" autoFocus>
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
          <Tabs
            outstanding={data.issues}
            audits={data.audits}
            setToExport={setToExport}
            setExportData={setExportData}
          />
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
