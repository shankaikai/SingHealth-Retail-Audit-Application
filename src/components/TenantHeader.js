import {
  Divider,
  makeStyles,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles({
  root: {
    top: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    margin: 0,
    padding: "15px",
  },
  searchbar: {
    width: "80%",
    alignSelf: "center",
    paddingBottom: "20px",
  },
});

const TenantHeader = () => {
  const classes = useStyles();

  const [search, setSearch] = useState("");

  const handleSearch = () => {};

  return (
    <div className={classes.root}>
      <h2 className={classes.header}>Tenants</h2>
      <FormControl className={classes.searchbar} variant="outlined">
        <InputLabel>Search Tenant</InputLabel>
        <OutlinedInput
          id="search"
          label="Search Tenant"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} edge="end">
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Divider />
    </div>
  );
};

export default TenantHeader;
