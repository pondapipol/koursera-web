import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SignalCellularAltRoundedIcon from "@material-ui/icons/SignalCellularAltRounded";
import HourglassEmptyRoundedIcon from "@material-ui/icons/HourglassEmptyRounded";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CreditBackground from "../Image/creditback.svg";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import IconButton from "@material-ui/core/IconButton";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  createMuiTheme,
  FormControlLabel,
  ThemeProvider,
} from "@material-ui/core";
import { useState } from "react";
import {
  useByeQuery,
  useCourseOneQuery,
  useEnrollMutation,
  useIsenrolledQuery,
  useUnitQuery,
} from "../generated/graphql";
import TextField from "@material-ui/core/TextField";
import { Formik, Form } from "formik";
import InputMask from "react-input-mask";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
  palette: {
    primary: {
      main: "#5C23FF",
      light: "#5C23FF",
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      boxSizing: "border-box",
      width: "100%",
      marginTop: "7vw",
      [theme.breakpoints.down("md")]: {
        marginTop: "9vw",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "10vw",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "13vw",
      },
    },
    paper: {
      padding: theme.spacing(6),
      boxSizing: "border-box",
      width: "100%",
      borderRadius: "30px",
      backgroundSize: "100%",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
    },

    paperside: {
      padding: theme.spacing(3),
      width: "100%",
      marginTop: "2em",
      borderRadius: "20px",
      backgroundSize: "100%",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
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
    },
    edit: {
      marginTop: "5vw",
      color: "white",
      padding: "0.9em 1.4em",
      boxShadow: "none",
      fontWeight: "bolder",
      borderRadius: "12px",
      fontSize: "0.85vw",
      background: "linear-gradient(92.74deg, #5C23FF 0.32%, #3300C5 97.43%)",
      "&:hover": {
        boxShadow: "0px 6px 24px rgba(85, 22, 188, 0.2)",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1vw",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.75vw",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "2vw",
      },
    },
    enroll: {
      marginTop: "1vw",
      marginLeft: "1vw",
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
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.75vw",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "2vw",
      },
    },
    cancel: {
      marginTop: "1vw",
      padding: "0.7em 1.2em",
      boxShadow: "none",
      borderRadius: "12px",
      fontSize: "0.75vw",
    },
    abouthead: {
      margin: theme.spacing(5, 2, 2, 2),
    },
    about: {
      margin: theme.spacing(0, 6, 0, 2),
    },
    icon: {
      fontSize: "3em",
    },
    sidetext: {
      height: "100%",
    },
    side: { height: "100%" },
    namehead: {
      fontSize: "2.8vw",
      [theme.breakpoints.down("md")]: {
        fontSize: "3vw",
      },
    },
    unitdis: {
      width: "100%",
      boxShadow: "none",
      padding: theme.spacing(4),
      borderRadius: "20px",
      border: "1px solid gray",
      background: "inherit",
    },
    seccond: {
      margin: theme.spacing(4, 2, 2, 2),
    },
    paperunit: {
      width: "100%",
      boxShadow: "none",
      marginTop: theme.spacing(3),
      padding: theme.spacing(4),
      borderRadius: "20px",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    papermodal: {
      backgroundColor: "white",
      borderRadius: "20px",
      width: "35vw",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      outline: 0,
      padding: "1% 2%",
    },
    backdrop: {
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    margin: {
      marginTop: "3%",
      marginBottom: "2%",
    },
    formwidth: {
      width: "100%",
    },
    papercredit: {
      padding: theme.spacing(2),
      marginTop: "2%",
      width: "100%",
      boxSizing: "border-box",
      color: "white",
      borderRadius: "20px",
      backgroundImage: `url(${CreditBackground})`,
      fontFamily: "Montserrat",
      backgroundSize: "100%",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
    },
    creditcard: {
      width: "70%",
      color: "white",
      margin: theme.spacing(4, 2),
      padding: theme.spacing(2, 2),
      background: "rgba( 255, 255, 255, 0.15 )",
      boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.1 )",
      backdropFilter: "blur( 7.5px )",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
      borderRadius: "20px",
    },
    cardnum: {
      fontSize: "1.2vw",
      margin: "2vw 0 2vw 0",
      whiteSpace: "pre",
      letterSpacing: "0.1vw",
    },
    cardkourse: {
      fontWeight: "bolder",
    },
    carddes: {
      fontSize: "1vw",
    },
  })
);

const schema = yup.object({
  pay: yup.boolean(),
  cardnum: yup.string().when("pay", {
    is: true,
    then: yup.string().required().length(19, "Credit Card number not valid"),
  }),

  month: yup.string().when("pay", {
    is: true,
    then: yup.string().required(),
  }),
  year: yup.string().when("pay", {
    is: true,
    then: yup.string().required().length(2, "Year not valid"),
  }),

  cvc: yup.string().when("pay", {
    is: true,
    then: yup.string().required().length(3, "CVC number not valid"),
  }),
});

interface enrollprops {
  id: number;
  closemodal: any;
}

const EnrollForm: React.FC<enrollprops> = (props) => {
  const history = useHistory();

  const classes = useStyles();
  const { data, loading, error } = useByeQuery({
    fetchPolicy: "network-only",
  });
  const [pay, setPay] = useState(false);
  const [enrollCourse] = useEnrollMutation();
  if (loading) {
    return (
      <Grid container>
        <Typography>Loading...</Typography>
      </Grid>
    );
  }
  if (!data) {
    return (
      <Grid container>
        <Typography>You need to log in first</Typography>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item container>
        <Typography variant="h6">Enrollment Option</Typography>
      </Grid>
      <Grid item container>
        <Typography variant="subtitle1">
          You could earn certificate after making payments
        </Typography>
      </Grid>
      <Grid item container>
        <FormControlLabel
          // className={classes.margininstructor}
          control={
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setPay(true);
                } else {
                  setPay(false);
                }
              }}
              // name="role"
              color="primary"
            />
          }
          label="Pay for certificate"
        />
      </Grid>

      <Grid item container>
        <Formik
          initialValues={{
            cardnum: "",
            month: "",
            year: "",
            cvc: "",
            userId: data.bye.id,
            courseId: props.id,
            paid: pay,
            // userId: data.bye
          }}
          validationSchema={schema}
          validate={(values) => {
            const errors: Record<string, string> = {};
            // if (values.unitname == "") {
            //   errors.unitname = "Unit Name is required";
            // }
            return errors;
          }}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            //   make async call
            const reponse = await enrollCourse({
              variables: {
                paid: pay,
                cardnumber: data.cardnum,
                exmonth: data.month,
                exyear: data.year,
                cvc: data.cvc,
                courseId: data.courseId,
                userId: data.userId,
              },
            });
            console.log(reponse);
            setSubmitting(false);
            resetForm();
            // props.setOpen(false);
            history.push("/");
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            errors,
            setFieldValue,
          }) => (
            <Form className={classes.formwidth}>
              <Grid container>
                {pay && (
                  <Grid item container>
                    <Grid item container>
                      <Paper className={classes.papercredit}>
                        <Grid
                          item
                          container
                          justify="center"
                          alignItems="center"
                        >
                          <Paper className={classes.creditcard}>
                            <Grid
                              item
                              container
                              justify="flex-end"
                              className={classes.cardkourse}
                            >
                              KOURSERA
                            </Grid>
                            <Grid item container justify="center">
                              <Typography
                                variant="h5"
                                className={classes.cardnum}
                              >
                                {values.cardnum.replaceAll("-", "   ")}
                              </Typography>
                            </Grid>
                            <Grid item container justify="space-between">
                              <Grid item>
                                <Typography variant="caption">
                                  CARD HOLDER
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  className={classes.carddes}
                                >
                                  {data.bye.name.length < 10
                                    ? data.bye.name.toUpperCase()
                                    : data.bye.name.toUpperCase().slice(0, 9)}
                                </Typography>
                              </Grid>

                              <Grid item>
                                <Grid item container justify="flex-end">
                                  <Typography variant="caption">
                                    Expires
                                  </Typography>
                                </Grid>

                                <Typography
                                  variant="subtitle1"
                                  className={classes.carddes}
                                >
                                  {values.month}/{values.year}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.margin}>
                      <InputMask
                        mask="9999-9999-9999-9999"
                        maskPlaceholder={null}
                        onChange={(e) => {
                          setFieldValue("cardnum", e.target.value);
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Card Number"
                          helperText={errors.cardnum}
                          error={!!errors.cardnum}
                          name="cardnum"
                        />
                      </InputMask>
                    </Grid>
                    <Grid item xs={4} className={classes.margin}>
                      <InputMask
                        mask="99"
                        maskPlaceholder={null}
                        onChange={(e) => {
                          setFieldValue("month", e.target.value);
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Expiry Month"
                          helperText={errors.month}
                          error={!!errors.month}
                          name="month"
                        />
                      </InputMask>
                    </Grid>
                    <Grid item xs={4} className={classes.margin}>
                      <InputMask
                        mask="99"
                        maskPlaceholder={null}
                        onChange={(e) => {
                          setFieldValue("year", e.target.value);
                        }}
                      >
                        <TextField
                          fullWidth
                          label="Expiry Year"
                          helperText={errors.year}
                          error={!!errors.year}
                          name="year"
                        />
                      </InputMask>
                    </Grid>
                    <Grid item xs={4} className={classes.margin}>
                      <InputMask
                        mask="999"
                        maskPlaceholder={null}
                        onChange={(e) => {
                          setFieldValue("cvc", e.target.value);
                        }}
                      >
                        <TextField
                          fullWidth
                          label="CVC Number"
                          helperText={errors.cvc}
                          error={!!errors.cvc}
                          name="cvc"
                        />
                      </InputMask>
                    </Grid>
                  </Grid>
                )}

                <Grid item xs={12} className={classes.margin}>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Button
                        variant="outlined"
                        className={classes.cancel}
                        onClick={props.closemodal}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.enroll}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Enroll
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      </Grid>

      <Grid item container justify="flex-end"></Grid>
    </Grid>
  );
};

interface unitprops {
  id: number;
}

const Unitdis: React.FC<unitprops> = (props) => {
  const classes = useStyles();
  const { data, loading, refetch, error } = useUnitQuery({
    variables: {
      courseId: props.id,
    },
    fetchPolicy: "network-only",
  });
  return (
    <Grid item container>
      {!loading && data && data.courseunit ? (
        <Grid item container>
          {data.courseunit.map((unit, index) => (
            <Paper className={classes.paperunit}>
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <Grid container alignItems="center">
                    <Typography variant="h4">{index + 1}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5">{unit.unitName}</Typography>
                  <Typography variant="caption">
                    {unit.unitDescription}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
      ) : (
        <Typography>{error}</Typography>
      )}
    </Grid>
  );
};

interface buttonprops {
  courseId: number;
  handleOpen: any;
  userid: number;
}

const ButtonDis: React.FC<buttonprops> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { data, loading } = useIsenrolledQuery({
    variables: {
      courseId: props.courseId,
      userId: props.userid,
    },
  });
  return (
    <div>
      {!loading && data && data.enrolledCourseId ? (
        <Button
          variant="contained"
          color="primary"
          className={classes.edit}
          onClick={() => {
            history.push(`/learncourse/${props.courseId}`);
          }}
        >
          Go to Course
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.edit}
          onClick={props.handleOpen}
        >
          Enroll Course
        </Button>
      )}
    </div>
  );
};

interface Props {
  id: number;
}

export const CourseDisplay: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data, loading } = useCourseOneQuery({
    variables: {
      courseId: props.id,
    },
  });
  const { data: userdata, loading: userload } = useByeQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Grid container justify="center" className={classes.root}>
          <Typography variant="h2">Loading...</Typography>
        </Grid>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      {data ? (
        <Grid container className={classes.root}>
          <Grid item xs={1}>
            <Grid item container justify="center">
              <BackBut />
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Grid container>
              <Grid item container></Grid>
              <Grid item container>
                <Paper className={classes.paper}>
                  <Grid item container>
                    <Grid item xs={10}>
                      <Grid container>
                        <Grid item container>
                          <Typography variant="h3" className={classes.namehead}>
                            {data.courseOne.courseName}
                          </Typography>
                        </Grid>
                        <Grid item container>
                          <Typography variant="subtitle1">
                            {data.courseOne.category}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}>
                      <Grid container>
                        <Grid item container>
                          <Typography variant="subtitle1">
                            Offered by
                          </Typography>
                        </Grid>
                        <Grid item container>
                          <Typography variant="h5">
                            {data.courseOne.organization}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* seccond section of paper */}
                  <Grid item container>
                    {/* Button Enroll */}

                    {!userload && userdata ? (
                      <ButtonDis
                        courseId={props.id}
                        handleOpen={handleOpen}
                        userid={userdata.bye.id}
                      />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.edit}
                        onClick={handleOpen}
                      >
                        Enroll Course
                      </Button>
                    )}

                    {/* Button Enroll */}
                  </Grid>
                </Paper>
              </Grid>

              {/* seccond section */}
              <Grid item container>
                <Grid item xs={7} sm={9}>
                  <Grid container>
                    <Grid item container className={classes.abouthead}>
                      <Typography variant="h6">About the Course</Typography>
                    </Grid>
                    <Grid item container className={classes.about}>
                      <Typography variant="body1">
                        {data.courseOne.courseDescription}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={5} sm={3}>
                  <Grid container>
                    <Grid item container>
                      <Paper className={classes.paperside}>
                        <Grid container>
                          <Grid item xs={3}>
                            <Grid container justify="center">
                              <SignalCellularAltRoundedIcon
                                className={classes.icon}
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={9}>
                            <Grid
                              container
                              alignItems="center"
                              className={classes.side}
                            >
                              <Typography variant="subtitle1">
                                {data.courseOne.level}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item container>
                      <Paper className={classes.paperside}>
                        <Grid container>
                          <Grid item xs={3}>
                            <Grid container justify="center">
                              <HourglassEmptyRoundedIcon
                                className={classes.icon}
                              />
                            </Grid>
                          </Grid>
                          <Grid item xs={9}>
                            <Grid
                              container
                              alignItems="center"
                              className={classes.side}
                            >
                              <Typography variant="subtitle1">
                                {data.courseOne.timeEstimation} Hour to finish
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
                {/* section unit display */}
                <Grid item container className={classes.seccond}>
                  <Paper className={classes.unitdis}>
                    <Grid item container justify="center">
                      <Typography variant="h4">What you will learn</Typography>
                    </Grid>

                    <Unitdis id={props.id} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
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
                <EnrollForm id={props.id} closemodal={handleClose} />
                {/* <AddUnit
                  id={props.id}
                  setOpen={setOpen}
                  setAdd={setAdd}
                /> */}
              </div>
            </Fade>
          </Modal>
        </Grid>
      ) : (
        <Grid container className={classes.root} justify="center">
          <Typography variant="h3">Course Not found</Typography>
        </Grid>
      )}
    </ThemeProvider>
  );
};

const BackBut: React.FC = () => {
  const history = useHistory();
  return (
    <IconButton
      onClick={() => {
        history.goBack();
      }}
    >
      <ChevronLeftRoundedIcon className="backbut" />
    </IconButton>
  );
};
