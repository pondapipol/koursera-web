import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  Button,
  Checkbox,
  createMuiTheme,
  FormControlLabel,
  ThemeProvider,
  Typography,
} from "@material-ui/core";

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
    root: {},
    paper: {
      padding: "2rem",
      marginTop: "8rem",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      borderRadius: "20px",
      width: "35em",
      [theme.breakpoints.down("sm")]: {
        width: "70vw",
      },
      [theme.breakpoints.down("xs")]: {
        width: "90vw",
      },
    },
    control: {
      padding: theme.spacing(2),
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
    submargin: {
      marginRight: "0%",
      marginLeft: "5%",
      boxSizing: "border-box",
      background: "#5C23FF",
      borderRadius: "10px",
      boxShadow: "none",
      fontWeight: "bold",
      "&:hover": {
        boxShadow: "none",
      },
    },
    inputfield: {
      borderRadius: "10px",
      width: "100%",
    },
    formwidth: {
      width: "90%",
      justifyContent: "center",
      marginBottom: "5%",
    },
    border: {
      borderRadius: "10px",
    },
    margininstructor: {
      marginLeft: "0%",
      marginTop: "1%",
    },
    headCreate: {
      marginBottom: "7%",
      marginTop: "2%",
    },
    errortext: {
      marginLeft: "2em",
      color: "red",
    },
  })
);

const schema = yup.object({
  name: yup.string().required().min(3),
  email: yup
    .string()
    .required("email need to be provided")
    .email("Valid email need to be provided"),
  password: yup.string().required("Password required"),
  changepassword: yup.string().when("password", {
    is: (val: string | any) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
});

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [register] = useRegisterMutation();

  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.root} spacing={0}>
        <Grid item container justify="center">
          <Paper className={classes.paper}>
            <Grid item container justify="center">
              <Typography variant="h4" className={classes.headCreate}>
                Create Account
              </Typography>
            </Grid>

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                changepassword: "",
                showPassword: false,
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
                const reponse = await register({
                  variables: {
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    role: data.role,
                  },
                });

                // console.log(reponse);
                setSubmitting(false);
                resetForm();
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
                <Form>
                  <Grid container>
                    <Grid item xs={12} className={classes.margin}>
                      <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        variant="outlined"
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
                        variant="outlined"
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
                      <FormControl
                        className={clsx(classes.textField)}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={values.showPassword ? "text" : "password"}
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!errors.password}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  setFieldValue(
                                    "showPassword",
                                    !values.showPassword
                                  );
                                }}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={90}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item container>
                      {!!errors.password && (
                        <Typography
                          variant="caption"
                          className={classes.errortext}
                        >
                          {errors.password}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} className={classes.margin}>
                      <FormControl
                        className={clsx(classes.textField)}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Confirm Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={values.showPassword ? "text" : "password"}
                          name="changepassword"
                          value={values.changepassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={!!errors.changepassword}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => {
                                  setFieldValue(
                                    "showPassword",
                                    !values.showPassword
                                  );
                                }}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {values.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={160}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item container>
                      {!!errors.changepassword && (
                        <Typography
                          variant="caption"
                          className={classes.errortext}
                        >
                          {errors.changepassword}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item container>
                      <FormControlLabel
                        className={classes.margininstructor}
                        control={
                          <Checkbox
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFieldValue("role", "instructor");
                              } else {
                                setFieldValue("role", "user");
                              }
                            }}
                            name="role"
                            color="primary"
                          />
                        }
                        label="Register as a instructor?"
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.margin}>
                      <Grid container justify="flex-end">
                        <Button
                          // className={classes.cancel}
                          onClick={() => {
                            history.push("/");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.submargin}
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
      </Grid>
    </ThemeProvider>
  );
};
