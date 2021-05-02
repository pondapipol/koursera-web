import {
  useCourseexploreQuery,
  useCoursehomeQuery,
  useUsersQuery,
} from "../generated/graphql";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
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
    headpaper: {
      width: "100%",
      margin: theme.spacing(0, 4.2, 5, 4.2),
      padding: theme.spacing(10, 5, 5, 5),
      borderRadius: "20px",
      color: "rgba(84, 58, 126, 0.69)",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
    },
    paperitem: {
      boxShadow: "-1px 4px 20px -12px rgba(70,33,177,0.32)",
      borderRadius: "20px",
      background: "white",
      width: "85%",
      // margin: theme.spacing(0, 5),
      padding: theme.spacing(2),
      height: "100%",
    },
    itemwrap: {
      // height: "30vh",
      height: "100%",
    },
    initemwrap: {
      padding: theme.spacing(1.5),
      color: "rgba(84, 58, 126, 0.69)",
      height: "8vw",
      [theme.breakpoints.down("md")]: {
        height: "11vw",
      },
      [theme.breakpoints.down("sm")]: {
        height: "15vw",
      },
      [theme.breakpoints.down("sm")]: {
        height: "19vw",
      },
    },
    cover: {
      backgroundColor: "lightgray",
      width: 330,
      [theme.breakpoints.down("md")]: {
        width: 330,
      },
      [theme.breakpoints.down("sm")]: {
        width: 330,
      },
      [theme.breakpoints.down("sm")]: {
        width: 400,
      },
    },
    card: {
      display: "flex",
      height: "8vw",
      [theme.breakpoints.down("md")]: {
        height: "11vw",
      },
      [theme.breakpoints.down("sm")]: {
        height: "15vw",
      },
      [theme.breakpoints.down("sm")]: {
        height: "19vw",
      },
      width: "100%",
      boxShadow: "none",
      borderRadius: "20px",
    },
    downsecItem: {},
    iconitem: {
      fontSize: "1.5vw",
      [theme.breakpoints.down("md")]: {
        fontSize: "2vw",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "2.7vw",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "3.5vw",
      },
    },
    downsecItemwarp: {},
    marginitem: {
      margin: theme.spacing(0, 0, 4, 0),
    },
  })
);

interface Props {
  method: string;
}
export const ExploreCourse: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { data, loading } = useCourseexploreQuery({
    variables: {
      method: props.method,
    },
  });

  type nameMaptype = {
    [key: string]: string;
  };

  const nameMap: nameMaptype = {
    datascience: "Data Science",
    computerscience: "Computer Science",
    business: "Business",
    personaldev: "Personal Development",
    it: "Information Technology",
  };
  return (
    <ThemeProvider theme={theme}>
      {!loading && data && (
        <Grid container className={classes.root}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10}>
            {/* Head Paper */}
            <Grid item container>
              <Paper className={classes.headpaper}>
                <Grid item container>
                  <Typography variant="h3">
                    Explore {nameMap[props.method]} Courses
                  </Typography>
                </Grid>
              </Paper>
            </Grid>
            <Grid item container>
              <Grid item container>
                {data.courseExplore.map((course) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={course.courseId}
                    className={classes.marginitem}
                  >
                    <Grid
                      container
                      className={classes.itemwrap}
                      justify="center"
                    >
                      <Paper className={classes.paperitem}>
                        <Link to={`/course/${course.courseId}`}>
                          <Grid item container>
                            <Card className={classes.card}>
                              <CardMedia
                                className={classes.cover}
                                image={course.coverImage}
                              />
                            </Card>
                          </Grid>
                          <Grid
                            item
                            container
                            className={classes.initemwrap}
                            alignContent="space-between"
                          >
                            <Grid item container>
                              <Typography variant="h6">
                                {course.courseName}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              container
                              className={classes.downsecItem}
                              justify="space-between"
                            >
                              <Grid item>
                                <Grid container alignItems="flex-end">
                                  <Typography variant="caption">
                                    {course.organization}
                                  </Typography>
                                </Grid>
                              </Grid>

                              <ChevronRightRoundedIcon
                                className={classes.iconitem}
                              />
                            </Grid>
                          </Grid>
                        </Link>
                      </Paper>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
};
