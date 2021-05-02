import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import IconButton from "@material-ui/core/IconButton";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Button,
  createMuiTheme,
  Select,
  ThemeProvider,
  MenuItem,
  InputLabel,
} from "@material-ui/core";

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
      padding: "0.5em 1.2em",
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

interface editprops {
  id: number;
  refresh: any;
  setEdit: any;
  setrefresh: any;
}

const EditSubUnit: React.FC<editprops> = (props) => {
  const classes = useStyles();
  const [editsubUnitMutation] = useEditsubUnitMutation();
  const { data, loading } = useOneSubUnitQuery({
    variables: {
      subId: props.id,
    },
  });
  //   const [article, setArticle] = useState("");
  //   const [articleData, setData] = useState(0);
  let editorStatescope: any;
  if (!loading && data) {
    const contentBlock = htmlToDraft(data.subunitOne.content);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    editorStatescope = EditorState.createWithContent(contentState);
    draftToHtml(convertToRaw(editorStatescope.getCurrentContent()));
  }

  const [editorState, setEditorState] = useState(editorStatescope);
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
    // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    <Grid container>
      {!loading && data && (
        <Formik
          initialValues={{
            subname: data.subunitOne.subName,
            videopath: data.subunitOne.videoPath,
            videoDescription: data.subunitOne.videoDescription,
            contentType: data.subunitOne.contentType,
            unitId: data.subunitOne.UnitId,
            createDate: data.subunitOne.createDate,
          }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (values.subname == "") {
              errors.subname = "Topic is required";
            }
            if (values.contentType == "") {
              errors.contentType = "Content Type must be selected";
            }
            if (values.contentType == "video") {
              if (!ReactPlayer.canPlay(values.videopath)) {
                errors.videopath = "Your video is not playable";
              }
            }
            return errors;
          }}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            //   make async call
            const response = await editsubUnitMutation({
              variables: {
                subId: props.id,
                subName: data.subname,
                videoPath: data.videopath,
                videoDescription: data.videoDescription,
                contentType: data.contentType,
                content: draftToHtml(
                  convertToRaw(editorState.getCurrentContent())
                ),
                unitId: data.unitId,
                createDate: data.createDate,
              },
            });

            console.log(response);
            setSubmitting(false);
            props.setEdit(false);
            await props.refresh();
            props.setrefresh(true);
            resetForm();
            //   props.setOpen(false);
            //   props.setAdd(true);
            // history.push("/instructor");
          }}
        >
          {({ values, isSubmitting, handleChange, handleBlur, errors }) => (
            <Form className={classes.width100}>
              <Grid container>
                <Grid item xs={10}>
                  <Typography variant="h5" className={classes.margin}>
                    Edit Content
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Grid container justify="flex-end">
                    <Button
                      disabled={isSubmitting}
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        props.setEdit(false);
                      }}
                      className={classes.editbut}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <Grid container justify="flex-end">
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.savebut}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={10} className={classes.margin}>
                  <TextField
                    fullWidth
                    name="subname"
                    label="Content Topic"
                    value={values.subname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.subname}
                    error={!!errors.subname}
                  />
                </Grid>

                <Grid item xs={2} className={classes.marginType}>
                  <InputLabel>Category</InputLabel>
                  <Field
                    displayEmpty
                    fullWidth
                    name="contentType"
                    as={Select}
                    helperText={errors.contentType}
                    error={!!errors.contentType}
                  >
                    <MenuItem value="">Content Type</MenuItem>
                    <MenuItem value="video">Video</MenuItem>
                    <MenuItem value="article">Article</MenuItem>
                  </Field>
                </Grid>
                {values.contentType == "video" && (
                  <Grid container>
                    <Grid item xs={10} className={classes.marginType}>
                      <TextField
                        fullWidth
                        name="videopath"
                        label="Video Link"
                        value={values.videopath}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.videopath}
                        error={!!errors.videopath}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.marginType}>
                      <TextField
                        fullWidth
                        name="videoDescription"
                        label="Video Description"
                        value={values.videoDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.videoDescription}
                        error={!!errors.videoDescription}
                        multiline
                        rows={8}
                      />
                    </Grid>
                  </Grid>
                )}
                {values.contentType == "article" && (
                  <Grid container className={classes.editorcontentoverflow}>
                    <Grid item xs={12}>
                      <Grid container className={classes.containerWrapper}>
                        <Editor
                          editorState={editorState}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          onEditorStateChange={onEditorStateChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      )}
    </Grid>
  );
};

interface addprops {
  id: number;
  refresh: any;
}

const AddSubUnit: React.FC<addprops> = (props) => {
  const classes = useStyles();
  const [addSubUnit] = useAddSubunitMutation();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  return (
    <Grid container>
      <Formik
        initialValues={{
          subname: "",
          videopath: "",
          videoDescription: "",
          contentType: "",
          content: "",
        }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (values.subname == "") {
            errors.subname = "Topic is required";
          }
          if (values.contentType == "") {
            errors.contentType = "Content Type must be selected";
          }
          if (values.contentType == "video") {
            if (!ReactPlayer.canPlay(values.videopath)) {
              errors.videopath = "Your video is not playable";
            }
          }
          return errors;
        }}
        onSubmit={async (data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          //   make async call
          const response = await addSubUnit({
            variables: {
              subname: data.subname,
              videoPath: data.videopath,
              videoDescription: data.videoDescription,
              contentType: data.contentType,
              content: draftToHtml(
                convertToRaw(editorState.getCurrentContent())
              ),
              unitId: props.id,
            },
          });

          console.log(response);
          setSubmitting(false);
          resetForm();
          await props.refresh();
          //   props.setOpen(false);
          //   props.setAdd(true);
          // history.push("/instructor");
        }}
      >
        {({ values, isSubmitting, handleChange, handleBlur, errors }) => (
          <Form className={classes.width100}>
            <Grid container>
              <Grid item xs={10}>
                <Typography variant="h5" className={classes.margin}>
                  Add Content
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Grid container justify="flex-end">
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    variant="outlined"
                    color="primary"
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={10} className={classes.margin}>
                <TextField
                  fullWidth
                  name="subname"
                  label="Content Topic"
                  value={values.subname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.subname}
                  error={!!errors.subname}
                />
              </Grid>

              <Grid item xs={2} className={classes.marginType}>
                <InputLabel>Category</InputLabel>
                <Field
                  displayEmpty
                  fullWidth
                  name="contentType"
                  as={Select}
                  helperText={errors.contentType}
                  error={!!errors.contentType}
                >
                  <MenuItem value="">Content Type</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="article">Article</MenuItem>
                </Field>
              </Grid>
              {values.contentType == "video" && (
                <Grid container>
                  <Grid item xs={10} className={classes.marginType}>
                    <TextField
                      fullWidth
                      name="videopath"
                      label="Video Link"
                      value={values.videopath}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.videopath}
                      error={!!errors.videopath}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.marginType}>
                    <TextField
                      fullWidth
                      name="videoDescription"
                      label="Video Description"
                      value={values.videoDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.videoDescription}
                      error={!!errors.videoDescription}
                      multiline
                      rows={8}
                    />
                  </Grid>
                </Grid>
              )}
              {values.contentType == "article" && (
                <Grid container className={classes.editorcontentoverflow}>
                  <Grid item xs={12}>
                    <Grid container className={classes.containerWrapper}>
                      <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
};

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
  const [deleteSubUnit] = useDeleteSubUnitMutation();
  const { data, loading, refetch } = useOneSubUnitQuery({
    variables: {
      subId: props.id,
    },
  });
  if (props.refresh) {
    console.log("refresh");
    refetch().then(props.setrefresh(false));
  }
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container>
      {!loading && data && (
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h5">{data.subunitOne.subName}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Grid container justify="space-around">
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={handleOpen}
                  className={classes.editbut}
                >
                  Delete Content
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    props.setEdit(true);
                  }}
                  className={classes.editbut}
                >
                  Edit Content
                </Button>
              </Grid>
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
                        deleteSubUnit({
                          variables: {
                            subId: props.id,
                          },
                        });
                        await props.refreshsublist();
                        props.toggleDelete(true);
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
        </Grid>
      )}
    </Grid>
  );
};

interface Props {
  id: number;
}

export const EditUnit: React.FC<Props> = (props) => {
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
  const buttonText = !isAddOpen ? "+ Add Content" : "Close Add Content";
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
                    <Button
                      key="hello"
                      variant="outlined"
                      color="primary"
                      className={classes.unitAdd}
                      onClick={() => {
                        setAddOpen(!isAddOpen);
                        setEdit(false);
                        setdeleted(false);
                      }}
                    >
                      <Typography variant="h6" key="hello">
                        {buttonText}
                      </Typography>
                    </Button>
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
                  {/* {data.subunit.length == 0 && (
                    <AddSubUnit id={props.id} refresh={refetch} />
                  )} */}
                  {isAddOpen && <AddSubUnit id={props.id} refresh={refetch} />}

                  {/* {!isAddOpen &&
                    subValue == props.id &&
                    data.subunit.length != 0 &&
                    !isEditOpen && (
                      <SubContent
                        id={data.subunit[0].subId}
                        setEdit={setEdit}
                      />
                    )} */}
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
                  {isEditOpen && (
                    <EditSubUnit
                      id={subValue}
                      refresh={refetch}
                      setEdit={setEdit}
                      setrefresh={setrefresh}
                    />
                  )}
                  {isdeleted && (
                    <Grid container>
                      <Typography variant="h4">
                        The content is permanently deleted
                      </Typography>
                    </Grid>
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
