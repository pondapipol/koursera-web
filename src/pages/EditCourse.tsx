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

import {
  Button,
  createMuiTheme,
  Select,
  ThemeProvider,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import { Formik, Form, FieldAttributes, useField, Field } from "formik";
import {
  useAddunitMutation,
  useIndividualCourseQuery,
  useUnitQuery,
} from "../generated/graphql";
import { useState } from "react";

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
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      outline: 0,
      padding: "1% 2%",
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
  })
);

interface addunit {
  id: number;
  setOpen: any;
  setAdd: any;
}

const AddUnit: React.FC<addunit> = (props) => {
  const classes = useStyles();
  const [addUnit] = useAddunitMutation();
  return (
    <Grid container>
      <Formik
        initialValues={{
          unitname: "",
          unitdescription: "",
          courseId: props.id,
        }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (values.unitname == "") {
            errors.unitname = "Unit Name is required";
          }
          return errors;
        }}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          //   make async call
          const reponse = await addUnit({
            variables: {
              unitName: data.unitname,
              unitDes: data.unitdescription,
              courseId: data.courseId,
            },
          });
          console.log(reponse);
          setSubmitting(false);
          resetForm();
          props.setOpen(false);
          props.setAdd(true);
          // history.push("/instructor");
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, errors }) => (
          <Form>
            <Grid container>
              <Typography variant="h5" className={classes.modalHead}>
                Add Unit
              </Typography>
              <Grid item xs={12} className={classes.margin}>
                <TextField
                  fullWidth
                  name="unitname"
                  label="Unit Name"
                  value={values.unitname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.unitname}
                  error={!!errors.unitname}
                />
              </Grid>
              <Grid item xs={12} className={classes.margin}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="unitdescription"
                  label="Unit Description"
                  value={values.unitdescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} className={classes.margin}>
                <Grid container justify="flex-end">
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.edit}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

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
                          <Link to={`/editunit/${course.UnitId}`}>
                            <Button
                              variant="contained"
                              color="primary"
                              className={classes.edit}
                            >
                              Edit Contents
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container justify="flex-end">
                          <Link to={`/editunitdetail/${course.UnitId}`}>
                            <Typography
                              variant="caption"
                              className={classes.minimargin}
                            >
                              Edit Unit
                            </Typography>
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
  id: string;
}

export const EditCourse: React.FC<Props> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { data, loading } = useIndividualCourseQuery({
    variables: {
      courseId: parseInt(props.id),
    },
  });
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);

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
                        history.push("/instructor");
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

                <UnitDis id={parseInt(props.id)} fetch={add} setAdd={setAdd} />
                <Grid container className={classes.grow}>
                  <Button
                    type="button"
                    onClick={handleOpen}
                    className={classes.addUnit}
                  >
                    {" "}
                    + Add Unit
                  </Button>
                </Grid>
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
                <AddUnit
                  id={parseInt(props.id)}
                  setOpen={setOpen}
                  setAdd={setAdd}
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
