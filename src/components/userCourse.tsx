import {
  useByeQuery,
  useCourseOneQuery,
  useUnenrollMutation,
} from "../generated/graphql";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { Link, useHistory } from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";
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
    imagemock: {
      width: "100%",
      height: "100%",
      borderRadius: "12px",
      background: "black",
      marginRight: "3%",
    },
    cover: {
      width: 170,
      backgroundColor: "lightgray",
    },
    card: {
      display: "flex",
      height: "7.5vw",
      // width: "10vw",
      marginRight: "10%",
      boxShadow: "none",
      borderRadius: "12px",
    },
    deleteBut: {
      marginLeft: "4%",
      padding: "0.4em 1em",
      boxShadow: "none",
      fontWeight: "bold",
      borderRadius: "12px",
      fontSize: "0.75vw",
      [theme.breakpoints.down("md")]: {
        fontSize: "1vw",
      },
      "&:hover": {
        boxShadow: "none",
      },
    },
    cancelmodal: {
      padding: "0.5em 1em",
      boxShadow: "none",
      borderRadius: "12px",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    papermodal: {
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      outline: 0,
      padding: "1% 2%",
      width: "25vw",
    },
    backdrop: {
      backdropFilter: "blur(10px)",
      // background: "",
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    deleteButsec: {
      marginTop: "4%",
    },
  })
);

interface Props {
  id: number;
  userid: number;
  refetchlist: any;
}

export const UserCourse: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { data, loading } = useCourseOneQuery({
    variables: {
      courseId: props.id,
    },
  });
  // const timeElapsed = Date.now();
  const today = new Date();
  const tolearn = `/learncourse/${props.id}`;
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div key={props.id}>
      {!loading && data && (
        <Grid container className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container className={classes.root}>
              <Grid item xs={2}>
                <Grid container>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cover}
                      image={data.courseOne.coverImage}
                      title="Live from space album cover"
                    />
                  </Card>
                </Grid>
              </Grid>
              <Grid item xs={10}>
                <Grid container justify="space-between">
                  <Typography variant="h4" className={classes.headText}>
                    {data.courseOne.courseName}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                      // history.push(`/editcoursedetail/${props.number}`);
                    }}
                  >
                    <DeleteOutlineRoundedIcon className={classes.icon} />
                  </IconButton>
                </Grid>
                <Grid container className={classes.space}></Grid>
                <Grid container justify="space-between">
                  <div className={classes.createdtext}>
                    Created on {today.toDateString()}
                  </div>
                  <ThemeProvider theme={theme}>
                    <Link to={tolearn}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.explore}
                      >
                        LEARN
                      </Button>
                    </Link>
                  </ThemeProvider>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 400,
              classes: {
                root: classes.backdrop,
              },
            }}
          >
            <Fade in={open}>
              <div className={classes.papermodal}>
                <Unenroll
                  courseid={props.id}
                  userId={props.userid}
                  setmodal={setOpen}
                  refresh={props.refetchlist}
                />
              </div>
            </Fade>
          </Modal>
        </Grid>
      )}
    </div>
  );
};

interface unenroll {
  courseid: number;
  userId: number;
  setmodal: any;
  refresh: any;
}

const Unenroll: React.FC<unenroll> = ({
  courseid,
  setmodal,
  userId,
  refresh,
}) => {
  const [unenroll] = useUnenrollMutation();
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid xs item container>
        <Typography variant="h4">Confirm Unenroll?</Typography>
      </Grid>
      <Grid item container>
        <Typography variant="caption">
          Your Course will be unenrolled, you cen reenroll again.
        </Typography>
      </Grid>
      <Grid item container className={classes.deleteButsec} justify="flex-end">
        <Button
          variant="outlined"
          onClick={() => {
            setmodal(false);
          }}
          className={classes.cancelmodal}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.deleteBut}
          onClick={async () => {
            await unenroll({
              variables: {
                courseId: courseid,
                userId: userId,
              },
            });
            refresh();
            setmodal(false);
          }}
        >
          Unenroll
        </Button>
      </Grid>
    </Grid>
  );
};
