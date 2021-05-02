import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import IconButton from "@material-ui/core/IconButton";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field } from "formik";
import {
  useAddSubunitMutation,
  useCourseUnitOneQuery,
  useDeleteSubUnitMutation,
  useEditsubUnitMutation,
  useOneSubUnitQuery,
  useSubUnitQuery,
} from "../generated/graphql";
import { useState } from "react";
import ReactPlayer from "react-player";
import "../index.css";
import { useHistory } from "react-router";
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
  // palette: {
  //   primary: {
  //     main: "#FF9595",
  //     light: "#FFBFC3",
  //   },
  // },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: "10vh",
      //   marginBottom: "10vh",
      boxSizing: "border-box",
      fontFamily: "Montserrat",
    },
    width100: {
      width: "100%",
    },
    paper: {
      padding: theme.spacing(5),
      borderRadius: "20px",
      width: "100%",
      //   boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      boxShadow: "none",
      height: "78vh",
    },
    paperContent: {
      padding: theme.spacing(5),
      borderRadius: "15px",
      width: "100%",
      boxShadow: "none",
      height: "78vh",
    },
    content: {
      padding: theme.spacing(0, 2),
    },
    contentoverflow: {
      overflow: "auto",
      height: "100%",
    },
    bigcontentoverflow: {
      height: "65vh",
    },
    editorcontentoverflow: {
      height: "60vh",
    },
    heighthundred: {
      height: "100%",
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
    tophead: {
      padding: theme.spacing(2, 7, 0, 7),
    },
    padcontent: {
      padding: theme.spacing(2, 5, 0, 5),
    },
    unitItem: {
      padding: theme.spacing(2, 4),
      borderRadius: "10px",
      width: "100%",
      //   boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      boxShadow: "none",
      border: "1px lightgrey solid",

      marginBottom: "1em",
    },
    unitAdd: {
      padding: theme.spacing(3),
      borderRadius: "10px",
      width: "100%",
      //   boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      boxShadow: "none",

      marginBottom: "0.5em",
    },
    margin: {
      marginTop: "1%",
      marginBottom: "1%",
    },
    marginType: {
      marginTop: "1%",
    },
    containerWrapper: {
      border: "1px solid grey",
      borderRadius: "15px",
      height: "54vh",
      padding: theme.spacing(2),
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
    editbut: {
      padding: "0.5em 1.2em",
      borderRadius: "12px",
    },
    savebut: {
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
  })
);

interface subprops {
  id: number;
  setEdit: any;
  refresh: any;
  setrefresh: any;
  refreshsublist: any;
  toggleDelete: any;
}
const SubContent: React.FC<subprops> = (props) => {
  const classes = useStyles();
  const { data, loading, refetch } = useOneSubUnitQuery({
    variables: {
      subId: props.id,
    },
  });
  if (props.refresh) {
    console.log("refresh");
    refetch().then(props.setrefresh(false));
  }

  return (
    <Grid container>
      {!loading && data && (
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h5">{data.subunitOne.subName}</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption">
                {data.subunitOne.contentType}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                {data.subunitOne.contentType == "video" && (
                  <Grid container>
                    <Grid item xs={12} className={classes.contentoverflow}>
                      <Grid container justify="center">
                        <ReactPlayer
                          url={data.subunitOne.videoPath}
                          height="50vh"
                          width="70%"
                          controls={true}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>
                        {data.subunitOne.videoDescription}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {data.subunitOne.contentType == "article" && (
                  <Grid item xs={12} className={classes.bigcontentoverflow}>
                    <Grid container className={classes.contentoverflow}>
                      <Grid item xs={12}>
                        <Grid
                          dangerouslySetInnerHTML={{
                            __html: data.subunitOne.content,
                          }}
                        ></Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

interface Props {
  id: number;
}

export const LearnUnit: React.FC<Props> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEdit] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [isdeleted, setdeleted] = useState(false);
  const { data, loading, refetch } = useSubUnitQuery({
    variables: {
      unitId: props.id,
    },
  });
  let initialsubvalue: any;
  if (!loading && data && data.subunit.length != 0) {
    initialsubvalue = data.subunit[0].subId;
  }
  const [subValue, setSubValue] = useState(initialsubvalue);
  const { data: unitname, loading: loadunit } = useCourseUnitOneQuery({
    variables: {
      unitId: props.id,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      {!loading && data && unitname && !loadunit ? (
        <Grid container className={classes.root}>
          <Grid container className={classes.tophead}>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  history.goBack();
                }}
              >
                <ArrowBackIosRoundedIcon />
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <Typography variant="h4">
                {unitname.courseunitOne.unitName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.padcontent}>
            <Grid item xs={3} className={classes.content}>
              <Paper className={classes.paper}>
                <Grid
                  container
                  justify="flex-start"
                  className={classes.contentoverflow}
                >
                  <Grid item xs={12}>
                    {data.subunit.map((content) => (
                      <Button
                        key={content.subId}
                        className={classes.unitItem}
                        onClick={() => {
                          setSubValue(content.subId);
                          setAddOpen(false);
                          setEdit(false);
                          setdeleted(false);
                        }}
                      >
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid container justify="flex-start">
                              <Typography variant="h6">
                                {content.subName}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container justify="flex-start">
                              <Typography variant="caption">
                                {content.contentType}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Button>
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={9} className={classes.content}>
              <Paper className={classes.paperContent}>
                <Grid container className={classes.heighthundred}>
                  {!isAddOpen &&
                    subValue != props.id &&
                    !isEditOpen &&
                    !isdeleted && (
                      <SubContent
                        id={subValue}
                        setEdit={setEdit}
                        refresh={refresh}
                        setrefresh={setrefresh}
                        refreshsublist={refetch}
                        toggleDelete={setdeleted}
                      />
                    )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </ThemeProvider>
  );
};
