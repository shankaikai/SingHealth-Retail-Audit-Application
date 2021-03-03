import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, makeStyles, Typography, Avatar } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"
import logo from '../assets/koufu.jpg'

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    container: {
        display: "flex",
        flexDirection: "row"
    },
    description: {
        display: "flex",
        flexDirection: "column"
    },
    avatar: {
        alignSelf: "center",
        paddingRight: "5px",
    }
})

const OutstandingItem = (props) => {
    const classes = useStyles();

    return (
        <ExpansionPanel square className = {classes.root}>
            <ExpansionPanelSummary
            expandIcon={<ExpandMore/>}>
                <div className = {classes.container}>
                    <Avatar alt="Koufu" src={logo} className={classes.avatar}/>
                        <div className = {classes.description}>
                            <Typography variant = "h6" >{props.name}</Typography>
                            <Typography variant = "subtitle2" >{props.type} • {props.location}</Typography>
                        </div>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Insert issues here
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default OutstandingItem;