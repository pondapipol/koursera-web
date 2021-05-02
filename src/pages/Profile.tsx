import {
  useCoursehomeQuery,
  useMeQuery,
  useUpdateUserMutation,
  useUserprofileQuery,
  useUsersQuery,
} from "../generated/graphql";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, FieldAttributes, useField, Field } from "formik";
import * as yup from "yup";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useState } from "react";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

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
      marginTop: "6.5vw",
      [theme.breakpoints.down("md")]: {
        marginTop: "9vw",
      },
      [theme.breakpoints.down("sm")]: {
        marginTop: "10vw",
      },
      [theme.breakpoints.down("xs")]: {
        marginTop: "13vw",
      },
      marginBottom: "10vh",
      boxSizing: "border-box",
      fontFamily: "Montserrat",
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
      width: "40vw",
    },
    backdrop: {
      backdropFilter: "blur(10px)",
      // background: "",
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    headpaper: {
      width: "100%",
      //   margin: theme.spacing(0, 4.5, 1, 4.5),
      height: "22vh",
      backgroundImage: `url(https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)`,
      //   padding: theme.spacing(15, 5, 15, 5),
      borderRadius: "20px",
      color: "rgba(84, 58, 126, 0.69)",
      boxShadow: "-1px 4px 20px -12px rgba(70,33,177,0.12)",
    },
    rolewrap: {
      border: "1px solid gray",
      padding: theme.spacing(0.5, 1),
      margin: theme.spacing(1, 0, 0, 0),
      borderRadius: "10px",
    },
    cover: {
      backgroundColor: "lightgray",
      width: 330,
      [theme.breakpoints.down("md")]: {
        width: 380,
      },
      [theme.breakpoints.down("sm")]: {
        width: 400,
      },
      [theme.breakpoints.down("sm")]: {
        width: 420,
      },
    },
    card: {
      display: "flex",
      margin: theme.spacing(-10, 7, 0, 7),
      height: "8.9vw",
      [theme.breakpoints.down("md")]: {
        height: "11vw",
        margin: theme.spacing(-5, 3, 0, 3),
      },
      [theme.breakpoints.down("sm")]: {
        margin: theme.spacing(-5, 1, 0, 1),
        height: "12vw",
      },
      [theme.breakpoints.down("xs")]: {
        height: "19vw",
      },
      width: "100%",
      boxShadow: "none",
      borderRadius: "20px",
    },
    headwrap: {
      marginTop: theme.spacing(2),
      // width: "100%",
    },
    secwrap: {
      margin: theme.spacing(6, 0, 0, 3),
    },
    iconwrap: {
      position: "relative",
    },
    iconbut: {
      position: "absolute",
      right: 10,
      top: 10,
    },
    margin: {
      margin: theme.spacing(1),
      borderRadius: "20px",
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: "100%",
      borderRadius: "20px",
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
    headeditwrap: {
      margin: theme.spacing(2, 0),
    },
    profilewrap: {
      padding: theme.spacing(3),
      background: "white",
      borderRadius: "20px",
      boxShadow: "-1px 4px 40px -25px rgba(70,33,177,0.22)",
    },
  })
);
interface iconprops {
  id: number;
  setmodal: any;
}

const IconBut: React.FC<iconprops> = ({ id, setmodal }) => {
  const classes = useStyles();
  const { data, loading } = useMeQuery();
  return (
    <div>
      {!loading && data && data.me && data.me.id == id && (
        <IconButton className={classes.iconbut} onClick={() => setmodal(true)}>
          <EditRoundedIcon />
        </IconButton>
      )}
    </div>
  );
};

const schema = yup.object({
  name: yup.string().required().min(3).max(40),
  email: yup
    .string()
    .required("email need to be provided")
    .email("Valid email need to be provided"),
  aboutme: yup.string().required(),
});

interface formprops {
  data: any;
  setmodal: any;
  id: number;
  refresh: any;
}

const UpdateForm: React.FC<formprops> = ({ data, setmodal, id, refresh }) => {
  const classes = useStyles();
  const [updateUser] = useUpdateUserMutation();
  return (
    <Grid container>
      <Grid item container justify="center" className={classes.headeditwrap}>
        <Typography variant="h4">Edit Profile</Typography>
      </Grid>
      <Formik
        initialValues={{
          userId: data.userId,
          name: data.name,
          email: data.email,
          aboutme: data.aboutme,
          profileimage: data.profileimage,
          age: data.age,
          role: "user",
        }}
        validationSchema={schema}
        validate={(values) => {
          const errors: Record<string, string> = {};

          return errors;
        }}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          //   make async call
          const reponse = await updateUser({
            variables: {
              userId: id,
              name: data.name,
              email: data.email,
              profileimage: data.profileimage,
              aboutme: data.aboutme,
              age: data.aboutme,
            },
          });

          // console.log(reponse);
          setSubmitting(false);
          resetForm();
          await refresh();
          setmodal(false);
          // history.push("/");
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, errors }) => (
          <Form>
            <Grid container>
              <Grid item xs={12} className={classes.margin}>
                <TextField
                  fullWidth
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.name}
                  error={!!errors.name}
                />
              </Grid>
              <Grid item xs={12} className={classes.margin}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email}
                  error={!!errors.email}
                />
              </Grid>
              <Grid item xs={12} className={classes.margin}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="aboutme"
                  label="About Me"
                  value={values.aboutme}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.aboutme}
                  error={!!errors.aboutme}
                />
              </Grid>
              <Grid item xs={12} className={classes.margin}>
                <TextField
                  fullWidth
                  name="profileimage"
                  label="Profile Image"
                  value={values.profileimage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.profileimage}
                  error={!!errors.profileimage}
                />
              </Grid>
              <Grid item xs={12} className={classes.margin}>
                <TextField
                  fullWidth
                  name="age"
                  label="Age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.age}
                  error={!!errors.age}
                />
              </Grid>

              <Grid item xs={12} className={classes.margin}>
                <Grid container justify="flex-end">
                  <Button
                    className={classes.cancel}
                    onClick={() => {
                      setmodal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.edit}
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>

              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

interface Props {
  id: number;
}

export const Profile: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { data, loading, refetch } = useUserprofileQuery({
    variables: { userId: props.id },
  });
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
        <Grid container className={classes.root}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {/* Head Paper */}

            <Grid item container className={classes.profilewrap}>
              <Grid item container>
                <Paper className={classes.headpaper}>
                  <Grid container className={classes.iconwrap}>
                    <IconBut id={props.id} setmodal={setOpen} />
                  </Grid>
                </Paper>
                <Grid item xs={3}>
                  <Grid item container>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cover}
                        image={data.usersid.profileimage}
                      />
                    </Card>
                  </Grid>
                </Grid>
                <Grid item xs={9}>
                  <Grid item container>
                    <Grid item xs={12}>
                      {" "}
                      <Typography className="profilename">
                        {data.usersid.name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item container>
                    <Grid item className={classes.rolewrap}>
                      <Typography variant="caption">
                        {data.usersid.role}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              {/* seccond section */}
              <Grid item container className={classes.secwrap}>
                <Grid item container>
                  <Typography variant="h6">About Me</Typography>
                </Grid>
                <Grid item container>
                  <Typography variant="body1">
                    {data.usersid.aboutme}
                  </Typography>
                </Grid>
              </Grid>
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
                <UpdateForm
                  data={data.usersid}
                  setmodal={setOpen}
                  id={props.id}
                  refresh={refetch}
                />
              </div>
            </Fade>
          </Modal>
        </Grid>
      )}
    </ThemeProvider>
  );
};
