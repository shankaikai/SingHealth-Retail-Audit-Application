import {
  Divider,
  makeStyles,
  Typography,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import HeaderDetails from "./HeaderDetails";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    top: 0,
    width: "100%",
    display: "flex",
    position: "fixed",
    flexDirection: "column",
  },
  header: {
    margin: 0,
    padding: "15px",
    height: "100%",
    marginLeft: "7px",
    fontWeight: 500,
  },
  avatar: {
    margin: 0,
    marginLeft: "26.1px",
    marginTop: "15px",
    marginBottom: "7px",
    width: "40px",
    height: "40px",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  filter: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
    marginBottom: "20px",
  },
  formControl: {
    width: "25%",
  },
  searchbar: {
    width: "55%",
  },
});

const Header = (props) => {
  const classes = useStyles();
  let history = useHistory();

  // Handler for back button
  const handleBack = () => {
    if (props.backHandler) {
      props.backHandler();
    } else {
      history.goBack();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        {props.back ? (
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        ) : null}
        {props.avatar ? (
          <Avatar src={props.avatar} className={classes.avatar} />
        ) : null}
        {props.avatar || props.back ? (
          <Typography variant="h5" className={classes.header}>
            {props.title}
          </Typography>
        ) : (
          <Typography
            variant="h5"
            className={classes.header}
            style={{ marginLeft: "26.1px" }}
          >
            {props.title}
          </Typography>
        )}
      </div>
      {props.details ? <HeaderDetails details={props.details} /> : null}
      {props.searchbar ? (
        <div className={classes.filter}>
          <FormControl className={classes.searchbar} variant="outlined">
            <InputLabel>Search Tenant</InputLabel>
            <OutlinedInput
              id="search"
              label="Search Tenant"
              value={props.searchValue}
              onChange={(e) => {
                props.setSearch(e.target.value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Cluster</InputLabel>
            <Select
              value={props.clusterValue}
              onChange={(e) => {
                props.setCluster(e.target.value);
              }}
              label="Cluster"
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value={"CGH"}>CGH</MenuItem>
              <MenuItem value={"SGH"}>SGH</MenuItem>
              <MenuItem value={"SKGH"}>SKGH</MenuItem>
              <MenuItem value={"KKH"}>KKH</MenuItem>
            </Select>
          </FormControl>
        </div>
      ) : null}
      {props.noDivider ? null : <Divider />}
    </div>
  );
};

export default Header;
