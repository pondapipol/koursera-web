import { useEnrolledCourseQuery, useMeQuery } from "../generated/graphql";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InstructorBackground from "../Image/useback.svg";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
// import { Link } from "react-router-dom";
import { UserCourse } from "../components/userCourse";

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
      boxSizing: "border-box",
      fontFamily: "Montserrat",
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
    },
    paper: {
      padding: theme.spacing(5),
      boxSizing: "border-box",
      color: "white",
      borderRadius: "30px",
      backgroundImage: `url(${InstructorBackground})`,
      fontFamily: "Montserrat",
      backgroundSize: "100%",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
    },
    paperInside: {
      padding: theme.spacing(2),
      marginTop: "5%",
      boxSizing: "border-box",
      color: theme.palette.text.secondary,
      borderRadius: "30px",
      background: "rgba( 255, 255, 255, 0.03 )",
      boxShadow: " 0 8px 32px 0 rgba( 31, 38, 135, 0.05 )",
      backdropFilter: "blur( 10.0px )",
      border: "1px solid rgba( 255, 255, 255, 0.18 )",
    },
    profilebut: {
      height: "100%",
    },
    status: {
      background: "none",
      boxShadow: "none",
      color: "white",
    },
    statusMargin: {
      marginTop: "10px",
      marginBottom: "20px",
      fontSize: "1vw",
      [theme.breakpoints.down("md")]: {
        fontSize: "1.5vw",
      },
    },
    explore: {
      color: "white",
      padding: "0.8em 1.5em",
      boxShadow: "none",
      fontWeight: "bolder",
      borderRadius: "12px",
      background: "linear-gradient(92.74deg, #FF9595 0.32%, #FFBFC3 97.43%)",
      top: "90vh",
      right: "3vw",
      fontSize: "1em",
      position: "fixed",
      "&:hover": {
        boxShadow: "0px 6px 24px rgba(255, 191, 195, 0.5)",
      },
    },
    headtext: {
      fontSize: "3vw",
    },
    numde: {
      fontSize: "2.2vw",
      [theme.breakpoints.down("md")]: {
        fontSize: "2.6vw",
      },
    },
  })
);

interface courseProps {
  userId: number;
}

const CourseSection: React.FC<courseProps> = (props) => {
  const classes = useStyles();
  //   const { data: course, loading: load } = useInstructorCourseQuery({
  //     variables: {
  //       creatorId: props.userId,
  //     },
  //     fetchPolicy: "network-only",
  //   });
  const { data, loading, refetch } = useEnrolledCourseQuery({
    variables: {
      userId: props.userId,
    },
    fetchPolicy: "network-only",
  });
  //   if (!loading && data) {
  //     console.log(course.instructorCourse);
  //   }
  // console.log(course);
  return (
    <div>
      {!loading && data ? (
        <div>
          {data.enrolledCourse.map((course) => (
            <UserCourse
              id={course.courseId}
              userid={props.userId}
              refetchlist={refetch}
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

interface Props {}

export const UserHome: React.FC<Props> = () => {
  const classes = useStyles();
  const { data, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  return (
    <ThemeProvider theme={theme}>
      {!loading && data && data.me ? (
        <div className={classes.root}>
          <Grid container>
            <Grid xs={2}></Grid>
            <Grid xs={8}>
              <Paper className={classes.paper}>
                <Grid container className={classes.root}>
                  <Grid item xs={12}>
                    <Typography variant="caption" display="block" gutterBottom>
                      {today.toDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="h2"
                      component="h2"
                      className={classes.headtext}
                    >
                      Welcome back {data.me.email}!
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              <CourseSection userId={data.me.id} />
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>no data</div>
      )}
    </ThemeProvider>
  );
};
