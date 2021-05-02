import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
  useCourseOneQuery,
  useCreatecourseMutation,
  useDeleteCourseMutation,
  useMeQuery,
  useUpdateCourseMutation,
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
      boxSizing: "border-box",
      fontFamily: "Montserrat",
    },
    paper: {
      padding: theme.spacing(5),
      borderRadius: "20px",
      width: "30vw",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
    },
    margin: {
      marginTop: "3%",
      marginBottom: "2%",
    },
    marginSelect: {
      marginTop: "4%",
      marginBottom: "2%",
      paddingRight: "20px",
    },
    marginSelect2: {
      marginTop: "4%",
      marginBottom: "2%",
      paddingRight: "20px",
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

    delete: {
      padding: "0.3em 1em",
      boxShadow: "none",
      borderRadius: "12px",
      fontSize: "0.75vw",
      color: "red",
      border: "1px solid red",
      "&:hover": {
        border: "1px solid red",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1vw",
      },
    },
    submitbut: {
      color: "white",
      padding: "0.8em 1.5em",
      marginLeft: "3%",
      boxShadow: "none",
      fontWeight: "bolder",
      borderRadius: "12px",
      background: "linear-gradient(92.74deg, #FF9595 0.32%, #FFBFC3 97.43%)",
      "&:hover": {
        boxShadow: "0px 6px 20px rgba(255, 191, 195, 0.5)",
      },
    },
    cancel: {
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
  })
);

interface Props {
  id: number;
}

export const EditCourseDetail: React.FC<Props> = (props) => {
  const classes = useStyles();
  const history = useHistory();
  //   const [createCourse] = useCreatecourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();
  const [updateCourse] = useUpdateCourseMutation();
  const { data: course, loading: loadcourse } = useCourseOneQuery({
    variables: {
      courseId: props.id,
    },
    fetchPolicy: "network-only",
  });
  const { data, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });
  let userId = 14;
  if (!loading && data && data.me) {
    userId = data.me.id;
  }
  const handleroute = () => {
    history.push(`/instructor`);
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      {!loadcourse && course && (
        <div className={classes.root}>
          <Grid container justify="center">
            <Paper className={classes.paper}>
              <Grid item container justify="space-between">
                <Typography variant="h5">Edit Course Detail</Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpen(true);
                  }}
                  className={classes.delete}
                >
                  Delete Course
                </Button>
              </Grid>

              <Formik
                initialValues={{
                  courseName: course.courseOne.courseName,
                  courseDescription: course.courseOne.courseDescription,
                  coverImageLink: course.courseOne.coverImage,
                  category: course.courseOne.category,
                  level: course.courseOne.level,
                  organization: course.courseOne.organization,
                  timetoFinish: course.courseOne.timeEstimation,
                }}
                validate={(values) => {
                  const errors: Record<string, string> = {};
                  if (values.courseName.includes("bob")) {
                    errors.courseName = "no bob";
                  }
                  return errors;
                }}
                onSubmit={async (data, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  //   make async call
                  const reponse = await updateCourse({
                    variables: {
                      courseId: props.id,
                      courseName: data.courseName,
                      courseDes: data.courseDescription,
                      category: data.category,
                      timeEst: data.timetoFinish.toString(),
                      level: data.level,
                      organization: data.organization,
                      coverImage: data.coverImageLink,
                    },
                  });
                  //   console.log(reponse);
                  setSubmitting(false);
                  resetForm();
                  history.push("/instructor");
                }}
              >
                {({
                  values,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  errors,
                }) => (
                  <Form>
                    <Grid container>
                      <Grid item xs={12} className={classes.margin}>
                        <TextField
                          fullWidth
                          name="courseName"
                          label="Course Name"
                          value={values.courseName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={errors.courseName}
                          error={!!errors.courseName}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.margin}>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          name="courseDescription"
                          label="Course Description"
                          value={values.courseDescription}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.margin}>
                        <TextField
                          fullWidth
                          name="coverImageLink"
                          label="Cover Image Link"
                          value={values.coverImageLink}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={6} className={classes.marginSelect}>
                        <InputLabel>Category</InputLabel>
                        <Field fullWidth name="category" as={Select}>
                          <MenuItem value="Data science">Data science</MenuItem>
                          <MenuItem value="Business">Business</MenuItem>
                          <MenuItem value="Computer science">
                            Computer Science
                          </MenuItem>
                          <MenuItem value="Personal Development">
                            Personal Development
                          </MenuItem>
                          <MenuItem value="Information Technology">
                            Information Technology
                          </MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={6} className={classes.marginSelect2}>
                        <InputLabel>Level</InputLabel>
                        <Field fullWidth name="level" as={Select}>
                          <MenuItem value="Beginner">Beginner</MenuItem>
                          <MenuItem value="Intermediate">Intermediate</MenuItem>
                          <MenuItem value="Advance">Advance</MenuItem>
                        </Field>
                      </Grid>
                      <Grid item xs={12} className={classes.margin}>
                        <TextField
                          fullWidth
                          name="organization"
                          label="Organization"
                          value={values.organization}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.margin}>
                        <TextField
                          fullWidth
                          name="timetoFinish"
                          label="Estimated Time to Finish"
                          value={values.timetoFinish}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="number"
                        />
                      </Grid>
                      <Grid item xs={12} className={classes.margin}>
                        <Grid container justify="flex-end">
                          <Button
                            variant="outlined"
                            onClick={() => {
                              history.push("/instructor");
                            }}
                            className={classes.cancel}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            disabled={isSubmitting}
                            type="submit"
                            className={classes.submitbut}
                          >
                            Submit
                          </Button>
                        </Grid>
                      </Grid>

                      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Paper>
          </Grid>
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
                <Grid container spacing={2}>
                  <Grid xs item container>
                    <Typography variant="h4">Confirm delete?</Typography>
                  </Grid>
                  <Grid item container>
                    <Typography variant="caption">
                      Your content will be permanently delete
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    className={classes.deleteButsec}
                    justify="flex-end"
                  >
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOpen(false);
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
                        await deleteCourse({
                          variables: {
                            courseId: props.id,
                          },
                        });
                        handleroute();
                        setOpen(false);
                      }}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Fade>
          </Modal>
        </div>
      )}
    </ThemeProvider>
  );
};
