import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { Link, useHistory } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF9595",
      light: "#FFBFC3",
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      boxSizing: "border-box",
      width: "100%",
    },
    paper: {
      padding: theme.spacing(5),
      marginTop: "2%",
      boxSizing: "border-box",
      color: "white",
      width: "100%",
      borderRadius: "30px",
      backgroundImage: `white`,
      backgroundSize: "100%",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
    },
    paperInside: {
      padding: theme.spacing(2),
      marginTop: "5%",
      boxSizing: "border-box",
      color: theme.palette.text.secondary,
      borderRadius: "30px",
      background: "rgba( 255, 255, 255, 0.03 )",
      boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.05 )",
      backdropFilter: "blur( 10.0px )",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
    },
    profilebut: {
      height: "100%",
    },
    status: {
      background: "none",
      boxShadow: "none",
      color: "white",
    },
    statusMargin: {
      marginTop: "10px",
      marginBottom: "20px",
    },
    headText: {
      color: "grey",
      fontFamily: "Montserrat",
    },
    icon: {
      color: "grey",
      fontSize: "1em",
    },
    space: {
      height: "3.5em",

      [theme.breakpoints.down("md")]: {
        height: "2em",
      },
      [theme.breakpoints.down("sm")]: {
        height: "1em",
      },
      [theme.breakpoints.down("xs")]: {
        height: "0em",
      },
    },
    createdtext: {
      color: "grey",
      display: "flex",
      alignItems: "flex-end",
      height: "100%",
      marginTop: "1.5%",
    },
    explore: {
      color: "white",
      padding: "0.8em 1.5em",
      boxShadow: "none",
      fontWeight: "bolder",
      borderRadius: "12px",
      background: "linear-gradient(92.74deg, #FF9595 0.32%, #FFBFC3 97.43%)",
      "&:hover": {
        boxShadow: "0px 6px 20px rgba(255, 191, 195, 0.5)",
      },
      fontSize: "0.75vw",
      [theme.breakpoints.down("md")]: {
        fontSize: "1vw",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.2vw",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "2vw",
      },
    },

    cover: {
      width: 170,
      // height: 100,
      backgroundColor: "lightgray",
    },
    card: {
      display: "flex",
      height: "7.5vw",
      // width: "10vw",
      marginRight: "10%",
      boxShadow: "none",
      borderRadius: "12px",
      [theme.breakpoints.down("md")]: {
        height: "8.5vw",
      },
      [theme.breakpoints.down("sm")]: {
        height: "9.5vw",
      },
      [theme.breakpoints.down("xs")]: {
        height: "10vw",
      },
    },
  })
);

interface Props {
  hello: string;
  number: number;
  date: string;
  cover: string;
}

export const InstructorCourse: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  // const timeElapsed = Date.now();
  const today = new Date(props.date);
  const toedit = `/edit/${props.number}`;
  return (
    <div key={props.number}>
      <Grid container className={classes.root}>
        <Paper className={classes.paper}>
          <Grid container className={classes.root}>
            <Grid item xs={2}>
              <Grid container>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cover}
                    image={props.cover}
                    title="Live from space album cover"
                  />
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={10}>
              <Grid container justify="space-between">
                <Typography variant="h4" className={classes.headText}>
                  {props.hello}
                </Typography>
                <IconButton
                  onClick={() => {
                    history.push(`/editcoursedetail/${props.number}`);
                  }}
                >
                  <EditRoundedIcon className={classes.icon} />
                </IconButton>
              </Grid>
              <Grid container className={classes.space}></Grid>
              <Grid container justify="space-between">
                <div className={classes.createdtext}>
                  Created on {today.toDateString()}
                </div>
                <ThemeProvider theme={theme}>
                  <Link to={toedit}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.explore}
                    >
                      Edit Content
                    </Button>
                  </Link>
                </ThemeProvider>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};
