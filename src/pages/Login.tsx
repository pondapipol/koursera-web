import { useState } from "react";
import clsx from "clsx";
import { RouteComponentProps } from "react-router";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import "../index.css";
import Typography from "@material-ui/core/Typography";

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
      marginTop: "10rem",
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
      width: "90%",
      borderRadius: "20px",
    },
    submargin: {
      marginRight: "5%",
      marginTop: "5%",
      boxSizing: "border-box",
      background: "#5C23FF",
      borderRadius: "10px",
      boxShadow: "none",
      fontWeight: "bold",
    },
    inputfield: {
      borderRadius: "10px",
    },
    headtext: {
      marginBottom: "1em",
    },
  })
);

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const [err, setErr] = useState("");
  const classes = useStyles();
  const [incorect, setIncorrect] = useState({
    err: "",
    idErr: false,
    errdesc: "",
  });
  const [passin, setPassin] = useState({
    idErr: false,
    errdesc: "",
  });

  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
    setPassin({
      ...passin,
      idErr: false,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Paper className={classes.paper}>
              <Grid item container justify="center">
                <Typography variant="h4" className={classes.headtext}>
                  Log in
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      console.log("form submitted");
                      const response = await login({
                        variables: {
                          email,
                          password,
                        },
                        update: (store, { data }) => {
                          if (!data) {
                            return null;
                          }

                          store.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {
                              me: data.login.user,
                            },
                          });
                        },
                      });

                      // console.log(response);

                      if (response && response.data) {
                        setAccessToken(response.data.login.accessToken);
                      }

                      history.push("/");
                    } catch (err) {
                      console.log(err.message);
                      if (err.message === "GraphQL error: Invalid Password") {
                        setErr("Password Invalid");
                        setPassin({
                          idErr: true,
                          errdesc: "Password Incorrect",
                        });
                      } else {
                        setErr("User not found");
                        setIncorrect({
                          ...incorect,
                          idErr: true,
                          errdesc: "User not found",
                        });
                      }
                    }
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-basic">Email</InputLabel>
                      <OutlinedInput
                        error={incorect.idErr}
                        value={email}
                        id="outlined-basic"
                        label="Email"
                        // helperText={incorect.errdesc}
                        // variant="outlined"
                        className={classes.inputfield}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIncorrect({
                            ...incorect,
                            errdesc: "",
                            idErr: false,
                          });
                        }}
                      />
                    </FormControl>
                  </Grid>
                  {/* <div>
                <input
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div>{err}</div>
              </div> */}
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        error={passin.idErr}
                        id="outlined-adornment-password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        className={classes.inputfield}
                        onChange={handleChange("password")}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
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
                        labelWidth={70}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="flex-end"
                  >
                    <ThemeProvider theme={theme}>
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        className={classes.submargin}
                      >
                        login
                      </Button>
                    </ThemeProvider>
                  </Grid>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
