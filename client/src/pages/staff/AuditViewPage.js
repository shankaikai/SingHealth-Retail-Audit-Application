import React, { useEffect } from "react";
import Header from "../../components/common/Header";
import { makeStyles } from "@material-ui/core";
import AuditEndHeader from "../../components/checklist/AuditEndHeader";
import AuditResults from "../../components/checklist/AuditResults";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
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

  // Display loading screen when the data is not loaded yet

  useEffect(() => {
    // TODO: Grab data from server
  });

  return (
    <div className={classes.root}>
      <Header title="Audit Report" noDivider />
      <AuditEndHeader score="95" />
      <AuditResults data={tempData} className={classes.results} />
    </div>
  );
}
