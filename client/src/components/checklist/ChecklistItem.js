import React, { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100vw",
    alignItems: "center",
  },
  formControl: {
    width: "100px",
    marginRight: "8px",
  },
});
export default function ChecklistItem(props) {
  const [score, setScore] = useState("");

  // Handle change in select value
  const handleChange = (e) => {
    // Call the update handler in Checklist.js
    props.updateHandler(
      props.data.sectionIndex,
      props.data.questionIndex,
      e.target.value
    );
    console.log(e.target.value);
  };

  useEffect(() => {
    setScore(props.data.score);
  }, [props.data.score]);

  const classes = useStyles();
  return (
    <div>
      <Divider />
      <Card square className={classes.root} elevation={0}>
        <CardContent>
          <Typography>{props.data.text}</Typography>
        </CardContent>
        <CardActions>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Score</InputLabel>
            <Select
              label="Score"
              className={classes.select}
              value={score}
              onChange={handleChange}
              color="primary"
            >
              <MenuItem value={""}></MenuItem>
              <MenuItem value={-1}>N.A.</MenuItem>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
        </CardActions>
      </Card>
      <Divider />
    </div>
  );
}
