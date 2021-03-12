import React from "react";
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
            <Select label="Score" className={classes.select}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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
