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
  const [score, setScore] = useState(0);

  // Handle change in select value
  const handleChange = (e) => {
    console.log(score);
    // Call the update handler in Checklist.js
    // props.updateSectionScores(props.data, score)
    props.updateHandler(
      props.data.questionIndex,
      props.data.sectionIndex,
      e.target.value
    );
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
            >
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
