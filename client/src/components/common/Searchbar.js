import {
    makeStyles,
    FormControl,
    OutlinedInput,
    InputAdornment,
    InputLabel,
  } from "@material-ui/core";
import { useState } from "react";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles({
    searchbar: {
        width: "80%",
        alignSelf: "center",
        paddingBottom: "20px",
      },
})

const Searchbar = () => {
    const classes = useStyles();
    const [search, setSearch] = useState("");

    // Search bar handler

    return (
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
                <Search />
            </InputAdornment>
          }
        />
      </FormControl>
    )
}

export default Searchbar