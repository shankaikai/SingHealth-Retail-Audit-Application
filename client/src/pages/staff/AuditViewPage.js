import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/common/Header";
import { makeStyles } from "@material-ui/core";
import AuditEndHeader from "../../components/checklist/AuditEndHeader";
import AuditResults from "../../components/checklist/AuditResults";
import Axios from "axios";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  skeletons: {
    padding: "10px",
    marginLeft: "20px",
    marginRight: "20px",
  },
});

const tempData = {
  scores: [
    {
      section: "Professionalism & Staff Hygiene",
      score: 10,
      weightage: 10,
    },
    {
      section: "Housekeeping & General Cleanliness",
      score: 15,
      weightage: 20,
    },
    {
      section: "Food Hygiene",
      score: 35,
      weightage: 35,
    },
    {
      section:
        "Healthier Choice in line with HPB’s Healthy Eating’s Initiative",
      score: 15,
      weightage: 15,
    },
    {
      section: "Workplace Safety & Health",
      score: 20,
      weightage: 20,
    },
  ],
  issues: [
    {
      name: "Pan not washed",
      description: "The pan was left unwashed and unattended",
    },
    {
      name: "Pan not washed",
      description: "The pan was left unwashed and unattended",
    },
    {
      name: "Pan not washed",
      description: "The pan was left unwashed and unattended",
    },
  ],
};

export default function AuditEndPage() {
  const classes = useStyles();

  // Grab id
  const { id } = useParams();
  // Display loading screen when the data is not loaded yet

  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    // TODO: Grab data from server
    Axios.get("http://localhost:3001/audit/" + id).then((response) => {
      setData(response.data);
      setLoaded(true);
    });
  }, []);

  return (
    <div className={classes.root}>
      {loaded ? (
        <div>
          <Header back title="Audit Report" noDivider />
          <AuditEndHeader score="95" />
          <AuditResults data={tempData} className={classes.results} />
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
}
