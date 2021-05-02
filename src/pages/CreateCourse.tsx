import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps, useHistory } from "react-router-dom";

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
import { useCreatecourseMutation, useMeQuery } from "../generated/graphql";

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
      width: "50em",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      // [theme.breakpoints.down("md")]: {
      //   width: "40vw",
      // },
      [theme.breakpoints.down("sm")]: {
        width: "70vw",
      },
      [theme.breakpoints.down("xs")]: {
        width: "90vw",
      },
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
    edit: {
      marginBottom: "0.5em",
      color: "white",
      padding: "0.7em 1.2em",
      boxShadow: "none",
      borderRadius: "12px",
      fontSize: "0.75vw",
      fontWeight: "bold",
      background: "linear-gradient(92.74deg, #5C23FF 0.32%, #3300C5 97.43%)",
      "&:hover": {
        boxShadow: "0px 6px 24px rgba(85, 22, 188, 0.2)",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1vw",
      },
    },
    cancel: {
      marginBottom: "0.5em",
      padding: "0.7em 1.2em",
      boxShadow: "none",
      borderRadius: "12px",
      fontSize: "0.75vw",
      marginRight: "1vw",
      border: "1px solid grey",
      "&:hover": {
        border: "1px solid grey",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1vw",
      },
    },
  })
);

interface Props {}

export const CreateCourse: React.FC<RouteComponentProps> = ({ history }) => {
  const classes = useStyles();
  const [createCourse] = useCreatecourseMutation();
  const { data, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });
  let userId = 14;
  if (!loading && data && data.me) {
    userId = data.me.id;
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Grid container justify="center">
          <Paper className={classes.paper}>
            <Typography variant="h5">Create Course</Typography>
            <Formik
              initialValues={{
                courseName: "",
                courseDescription: "",
                coverImageLink: "",
                category: "",
                level: "",
                organization: "",
                timetoFinish: "",
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
                const reponse = await createCourse({
                  variables: {
                    CourseName: data.courseName,
                    CourseDescription: data.courseDescription,
                    category: data.category,
                    timeEst: data.timetoFinish.toString(),
                    level: data.level,
                    Organization: data.organization,
                    creatorId: userId,
                    coverImage: data.coverImageLink,
                  },
                });
                console.log(reponse);
                setSubmitting(false);
                resetForm();
                history.push("/instructor");
              }}
            >
              {({ values, isSubmitting, handleChange, handleBlur, errors }) => (
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
                          className={classes.cancel}
                          onClick={() => {
                            history.push("/instructor");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          className={classes.edit}
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
      </div>
    </ThemeProvider>
  );
};
