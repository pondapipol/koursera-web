import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import ReactToPdf from "react-to-pdf";

import {
  useAuthandRoleQuery,
  useIndividualCourseQuery,
  useIsPaidQuery,
  useUnitQuery,
} from "../generated/graphql";
import { useState } from "react";
import React from "react";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
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
      marginTop: "10vh",
      marginBottom: "10vh",
      boxSizing: "border-box",
      fontFamily: "Montserrat",
    },
    grow: {
      flexGrow: 1,
      width: "100%",
    },
    paper: {
      padding: theme.spacing(5),
      borderRadius: "20px",
      width: "100%",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
    },
    paperUnit: {
      padding: theme.spacing(3, 5),
      borderRadius: "20px",
      width: "100%",
      border: "1px solid rgba(70,33,177,0.32)",
      boxShadow: "none",
      marginTop: "1.5em",
    },
    addUnit: {
      borderRadius: "20px",
      border: "1px solid purple",
      width: "100%",
      paddingTop: "1.2%",
      paddingBottom: "1.2%",
      color: "purple",
      fontSize: "25px",
      marginTop: "5%",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    papermodal: {
      borderRadius: "20px",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      outline: 0,
      padding: "1% 2%",
      background: "#f8f8fc",
    },
    backdrop: {
      backdropFilter: "blur(10px)",
      // background: "",
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    margin: {
      marginTop: "3%",
      marginBottom: "2%",
    },
    modalHead: {
      marginTop: "20px",
      color: "black",
    },
    edit: {
      marginBottom: "0.5em",
      color: "white",
      padding: "0.7em 1.2em",
      boxShadow: "none",
      fontWeight: "bolder",
      borderRadius: "12px",
      fontSize: "0.75vw",
      background: "linear-gradient(92.74deg, #5C23FF 0.32%, #3300C5 97.43%)",
      "&:hover": {
        boxShadow: "0px 6px 24px rgba(85, 22, 188, 0.2)",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1vw",
      },
    },
    minimargin: {
      marginRight: "3em",
      color: "#FF9595",
      fontSize: "0.8vw",
      transition: "0.5s",
      "&:hover": {
        color: "red",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1vw",
      },
    },
    iconbut: {
      fontSize: "2vw",
    },
    paperCert: {
      padding: theme.spacing(5, 7),
      margin: theme.spacing(2),
      width: "75%",
      borderRadius: "12px",
      boxShadow: "0px 2px 24px rgba(85, 22, 188, 0.05)",
    },
    Certtext: {
      padding: theme.spacing(0, 0, 2, 0),
    },
    koutext: {
      marginTop: theme.spacing(2),
      fontWeight: "bold",
    },
    download: {
      marginBottom: "0.5em",
      color: "white",
      padding: "0.7em 1.2em",
      boxShadow: "none",
      fontWeight: "bolder",
      borderRadius: "12px",
      fontSize: "0.75vw",
      background: "linear-gradient(92.74deg, #5C23FF 0.32%, #3300C5 97.43%)",
      "&:hover": {
        boxShadow: "0px 6px 24px rgba(85, 22, 188, 0.2)",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1vw",
      },
    },
    close: {
      padding: "0.7em 1.2em",
      marginBottom: "0.5em",
      borderRadius: "12px",
    },
  })
);

interface unitprops {
  id: number;
  fetch: boolean;
  setAdd: any;
}

const UnitDis: React.FC<unitprops> = (props) => {
  const classes = useStyles();
  const { data, loading, refetch } = useUnitQuery({
    variables: {
      courseId: props.id,
    },
    fetchPolicy: "network-only",
  });
  if (props.fetch == true) {
    const fetch = async () => {
      await refetch();
      props.setAdd(false);
    };
    fetch();
  }

  const link = `/editunit/${props.id}`;
  return (
    <Grid container>
      {!loading && data && data.courseunit ? (
        <Grid container>
          {data.courseunit.map((course) => (
            <Grid item xs={12} key={course.UnitId}>
              <Paper className={classes.paperUnit}>
                <Grid container>
                  <Grid item xs={9}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h5">{course.unitName}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="caption">
                          {course.unitDescription}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container justify="flex-end">
                      <Grid item xs={12}>
                        <Grid container justify="flex-end">
                          <Link to={`/learnunit/${course.UnitId}`}>
                            <IconButton>
                              <ChevronRightRoundedIcon
                                className={classes.iconbut}
                              />
                            </IconButton>
                            {/* <Button
                              variant="contained"
                              color="primary"
                              className={classes.edit}
                            >
                              Edit Contents
                            </Button> */}
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div></div>
      )}
    </Grid>
  );
};

interface Props {
  id: number;
}

export const LearnCourse: React.FC<Props> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { data, loading } = useIndividualCourseQuery({
    variables: {
      courseId: props.id,
    },
  });
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [userid, setuserid] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {!loading && data ? (
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <Grid container className={classes.grow}>
              <Paper className={classes.paper}>
                <Grid item container>
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      <ArrowBackIosRoundedIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={11}>
                    <Typography variant="h4">
                      {data.individualCourse[0].courseName}
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      {data.individualCourse[0].courseDescription}
                    </Typography>
                  </Grid>
                </Grid>

                <UnitDis id={props.id} fetch={add} setAdd={setAdd} />

                <PaidButton
                  courseid={props.id}
                  setopen={setOpen}
                  setuserId={setuserid}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
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
                <CertDis
                  coursename={data.individualCourse[0].courseName}
                  setopen={setOpen}
                />
              </div>
            </Fade>
          </Modal>
        </Grid>
      ) : (
        <div>not found</div>
      )}
    </ThemeProvider>
  );
};

interface buttondis {
  courseid: number;
  setopen: any;
  setuserId: any;
}

const PaidButton: React.FC<buttondis> = ({ courseid, setopen }) => {
  const classes = useStyles();
  const { data, loading } = useIsPaidQuery({
    variables: {
      courseId: courseid,
    },
  });
  return (
    <Grid container>
      {!loading && data && data.ispaid.paid && (
        <Button
          className={classes.addUnit}
          onClick={() => {
            setopen(true);
          }}
        >
          You have paid for the certificates. Click to see.
        </Button>
      )}
    </Grid>
  );
};

interface certprops {
  coursename: string;
  setopen: any;
}

const CertDis: React.FC<certprops> = ({ coursename, setopen }) => {
  const classes = useStyles();
  const ref = React.createRef();
  const { data, loading } = useAuthandRoleQuery();
  const options = {
    orientation: "landscape",
    format: [760, 460],
  };
  return (
    <Grid container>
      {!loading && data && data.authandRole && (
        <Grid item container>
          <Grid item container justify="center">
            <Paper className={classes.paperCert} ref={ref}>
              <Grid
                item
                container
                justify="center"
                className={classes.Certtext}
              >
                <Typography variant="h5">Certificate of Completions</Typography>
              </Grid>
              <Grid
                item
                container
                justify="center"
                className={classes.Certtext}
              >
                <Typography variant="subtitle1">This certifies that</Typography>
              </Grid>
              <Grid
                item
                container
                justify="center"
                className={classes.Certtext}
              >
                <Typography variant="h5">{data.authandRole.name}</Typography>
              </Grid>
              <Grid item container justify="center">
                <Typography variant="subtitle2">
                  {`han enrolled ${coursename} course`}
                </Typography>
              </Grid>
              <Grid item container justify="center">
                <Typography variant="subtitle2" className={classes.koutext}>
                  KOURSERA
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item container justify="center">
            <ReactToPdf
              targetRef={ref}
              filename="Certificates.pdf"
              options={options}
              x={0.5}
              y={0.5}
              scale={2}
            >
              {({ toPdf }: any) => (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.download}
                  onClick={toPdf}
                >
                  DOWNLOAD
                </Button>
              )}
            </ReactToPdf>
          </Grid>
          <Grid item container justify="center">
            <Button
              variant="outlined"
              className={classes.close}
              onClick={() => {
                setopen(false);
              }}
            >
              CLOSE
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
