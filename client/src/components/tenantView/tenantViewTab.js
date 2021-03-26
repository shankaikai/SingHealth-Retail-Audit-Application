import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import AuditList from "./AuditList";
import OutstandingList from "../tenantView/OutstandingList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} className={classes.tabpanel}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabpanel: {
    padding: "0px",
  },
  list: {},
}));

export default function SimpleTabs(props) {
  const classes = useStyles({
    root: {
      marginTop: "10px",
      height: "calc(100vh-215.4px)",
    },
  });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          variant="fullWidth"
        >
          <Tab label="Audits" {...a11yProps(0)} />
          <Tab label="Outstanding" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.list}>
        <AuditList audits={props.audits} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OutstandingList outstanding={props.outstanding} />
      </TabPanel>
    </div>
  );
}
