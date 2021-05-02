import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
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
  useAddunitMutation,
  useCourseUnitOneQuery,
  useDeleteunitMutation,
  useIndividualCourseQuery,
  useUnitQuery,
  useUpdateunitdetailMutation,
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
      margin: theme.spacing(20, 0),
      width: "40%",
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

    papermodal: {
      backgroundColor: "white",
      borderRadius: "20px",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      outline: 0,
      padding: "1.5% 2%",
      width: "25vw",
    },

    margin: {
      marginTop: "5%",
      marginBottom: "2%",
    },
    modalHead: {
      marginTop: "10px",
      color: "grey",
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
    minimargin: {
      marginRight: "2em",
    },
    backdrop: {
      backdropFilter: "blur(10px)",
      // background: "",
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    deleteButsec: {
      marginTop: "4%",
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
  })
);

interface editunit {
  id: number;
}

export const EditCourseUnit: React.FC<editunit> = (props) => {
  const classes = useStyles();
  const { data, loading, error } = useCourseUnitOneQuery({
    variables: {
      unitId: props.id, // value for 'unitId'
    },
  });
  const [deleteUnit] = useDeleteunitMutation();
  const [updateUnitDetail] = useUpdateunitdetailMutation();
  const history = useHistory();
  const handleroute = (id: number) => {
    history.push(`/edit/${id}`);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      {!loading && data && (
        <Grid container justify="center">
          <Paper className={classes.paper}>
            <Grid item container>
              <Formik
                initialValues={{
                  unitname: data.courseunitOne.unitName,
                  unitdescription: data.courseunitOne.unitDescription,
                  courseid: data.courseunitOne.courseId,
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
                  const reponse = await updateUnitDetail({
                    variables: {
                      unitId: props.id,
                      unitName: data.unitname,
                      unitDes: data.unitdescription,
                    },
                  });
                  // console.log(reponse);
                  setSubmitting(false);
                  resetForm();
                  handleroute(data.courseid);
                  // props.setAdd(true);
                  // history.push("/instructor");
                }}
              >
                {({
                  values,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  errors,
                }) => (
                  <Form className={classes.grow}>
                    <Grid container>
                      <Grid item container justify="space-between">
                        <Typography variant="h5" className={classes.modalHead}>
                          Edit Unit
                        </Typography>
                        <Button className={classes.delete} onClick={handleOpen}>
                          Delete Unit
                        </Button>
                      </Grid>

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
                            variant="outlined"
                            className={classes.cancel}
                            onClick={() => {
                              handleroute(data.courseunitOne.courseId);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            disabled={isSubmitting}
                            type="submit"
                            color="primary"
                            className={classes.edit}
                          >
                            Save
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
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
                      onClick={handleClose}
                      className={classes.cancelmodal}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.deleteBut}
                      onClick={async () => {
                        await deleteUnit({
                          variables: {
                            UnitId: props.id,
                          },
                        });
                        handleroute(data.courseunitOne.courseId);
                      }}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Fade>
          </Modal>
        </Grid>
      )}
    </ThemeProvider>
  );
};
