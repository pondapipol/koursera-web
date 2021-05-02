import React, { useState } from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import ArtTrackRoundedIcon from "@material-ui/icons/ArtTrackRounded";
import AppBar from "@material-ui/core/AppBar";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Backdrop from "@material-ui/core/Backdrop";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Button, createMuiTheme, Grid, ThemeProvider } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import {
  useAuthandRoleQuery,
  useCourseSearchQuery,
  useLogoutMutation,
  useMeQuery,
  useUserprofileQuery,
} from "./generated/graphql";
import { setAccessToken } from "./accessToken";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import Avatar from "@material-ui/core/Avatar";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Montserrat"].join(","),
  },
  palette: {
    primary: {
      main: "#5C23FF",
      light: "#5C23FF",
    },
    action: {},
  },
});

const body = document.body,
  html = document.documentElement;

let height = Math.max(
  body.scrollHeight,
  body.offsetHeight,
  html.clientHeight,
  html.scrollHeight,
  html.offsetHeight
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bar: {
      background: "white",
      color: "#5C23FF",
      boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      paddingLeft: "10%",
      paddingRight: "10%",
      width: "100vw",
    },
    grow: {
      flexGrow: 1,
    },
    margin: {
      marginLeft: "5%",
    },
    login: {
      color: "#5C23FF",
    },
    explore: {
      marginLeft: "2ch",
      color: "white",
      boxShadow: "none",
      fontWeight: "bolder",
      borderRadius: "8px",
      background: "#5C23FF",
      "&:hover": {
        boxShadow: "0px 1px 5px rgba(85, 22, 188, 0.3)",
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
      fontWeight: "bold",
    },
    search: {
      position: "relative",
      borderRadius: "10px",
      backgroundColor: fade(theme.palette.common.black, 0.03),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.black, 0.05),
      },
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(3),
      width: "85%",
      [theme.breakpoints.down("sm")]: {
        marginLeft: theme.spacing(1),
        width: "25vw",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
      width: "100%",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    exploredropbut: {
      width: "100%",
      margin: theme.spacing(1.5, 2, 0, 2),
      padding: theme.spacing(1.5, 0, 1.5, 2),
      // border: "1px solid gray",
      borderRadius: "12px",
      color: "#543A7E",
      fontSize: "0.8vw",
      justifyContent: "flex-start",
      wordWrap: "break-word",
      "&:hover": {
        background: "white",
        boxShadow: "-1px 4px 40px -22px rgba(70,33,177,0.32)",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "0.9vw",
      },
    },
    exploredropdown: {
      margin: theme.spacing(4),
      padding: theme.spacing(1, 2),
      color: "white",
      boxShadow: "none",
      fontWeight: "bolder",
      borderRadius: "8px",
      background: "#5C23FF",
      "&:hover": {
        boxShadow: "0px 1px 5px rgba(85, 22, 188, 0.3)",
      },
    },
    iconexplore: {
      marginRight: theme.spacing(1),
    },
    avatarsize: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    searchresultitem: {
      padding: theme.spacing(1, 1, 1, 4),
      margin: theme.spacing(1),
      width: "100%",
      borderRadius: "12px",
      // fontSize: "2vw",
      "&:hover": {
        boxShadow: "0px 1px 2px rgba(85, 22, 188, 0.1)",
      },
    },
    searchresultitemwrap: {
      width: "40vw",
    },
    backdrop: {
      position: "absolute",
      zIndex: 1000,
      backdropFilter: "blur(10px)",
      backgroundColor: "rgba(200,200,200,0.1)",
      margin: theme.spacing(8, 0, 0, 0),
      height: `${height}px !important`,
    },
    emailtext: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "block",
      },
    },
    dropdown: {
      position: "absolute",
      width: "18vw",
      top: "7vh",
      left: "19%",
      // fontSize: "2vw",
      backgroundColor: "#f8f8fc",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      [theme.breakpoints.down("lg")]: {
        left: "25%",
      },
      [theme.breakpoints.down("md")]: {
        left: "22vw",
      },
      [theme.breakpoints.down("sm")]: {
        left: "15vw",
      },
    },
    searchresult: {
      position: "absolute",
      width: "32.5vw",
      top: "6.7vh",
      left: "27.8vw",
      backgroundColor: "white",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.18)",
      zIndex: 9999,
      [theme.breakpoints.down("lg")]: {
        width: "29vw",
        left: "29.5vw",
      },
      [theme.breakpoints.down("md")]: {
        left: "34.5vw",
      },
      [theme.breakpoints.down("sm")]: {
        left: "30vw",
      },
    },
  })
);

export const Navbar: React.FC = () => {
  const { data, loading } = useMeQuery({
    fetchPolicy: "network-only",
  });
  const [logout, { client }] = useLogoutMutation();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const history = useHistory();
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogoutClose = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    try {
      await logout();
      setAccessToken("");
      await client!.resetStore();
    } catch (err) {
      // console.log(err)
    }
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const [isdropdownOpen, setDropdown] = useState(false);
  const handleDropdownOpen = () => {
    setDropdown(!isdropdownOpen);
  };
  const handleDropdownbuttonEvent = (path: string) => {
    if (!path) {
      history.push(`/explore`);
    } else {
      history.push(`/explore/${path}`);
    }

    setDropdown(false);
  };

  const [keyword, setkeyword] = useState("");
  const [result, setresult] = useState(false);

  //   sub menu when click on profile
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <div>
      {!loading && data && data.me && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <Link to={`/profile/${data.me.id}`}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>

          <InstructorButnormal handlemenu={handleMenuClose} />
          <Link to="/userhome">
            <MenuItem onClick={handleMenuClose}>My Course</MenuItem>
          </Link>
          <MenuItem onClick={handleLogoutClose}>Log out</MenuItem>
        </Menu>
      )}
    </div>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <div>
      {!loading && data && data.me && (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <Link to={`/profile/${data.me.id}`}>
            <MenuItem onClick={handleMenuClose}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge color="secondary">
                  <AccountCircle />
                </Badge>
              </IconButton>
              <p>Profile</p>
            </MenuItem>
          </Link>

          <InstructorButMobile handlemenu={handleMenuClose} />
          <Link to="/userhome">
            <MenuItem onClick={handleMenuClose}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <ArtTrackRoundedIcon />
              </IconButton>
              <p>My Course</p>
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogoutClose}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>

            <p>Log Out</p>
          </MenuItem>
        </Menu>
      )}
    </div>
  );

  const [backdropOpen, setOpenbackdrop] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.grow}>
        <AppBar position="fixed" elevation={0}>
          <Toolbar className={classes.bar}>
            <Link
              to="/"
              onClick={() => {
                setOpenbackdrop(false);
                setresult(false);
                setDropdown(false);
              }}
            >
              <Typography className={classes.title} variant="h6" noWrap>
                KOURSE
              </Typography>
            </Link>
            <div className={classes.margin} />
            {/* Explore button */}
            <Button
              variant="contained"
              color="primary"
              className={classes.explore}
              onClick={() => {
                handleDropdownOpen();
                setOpenbackdrop(true);
                if (backdropOpen && result) {
                  setresult(false);
                } else if (backdropOpen) {
                  setOpenbackdrop(false);
                }
              }}
            >
              {!isdropdownOpen ? (
                <ExpandMoreRoundedIcon className={classes.iconexplore} />
              ) : (
                <ExpandLessRoundedIcon className={classes.iconexplore} />
              )}{" "}
              Explore
            </Button>
            {/* Explore button */}
            {isdropdownOpen && (
              <div className={classes.dropdown} id="dropdown">
                <Grid item container>
                  <Button
                    className={classes.exploredropbut}
                    onClick={() => {
                      handleDropdownbuttonEvent("datascience");
                      setOpenbackdrop(false);
                    }}
                  >
                    Data Science
                  </Button>

                  <Button
                    className={classes.exploredropbut}
                    onClick={() => {
                      handleDropdownbuttonEvent("computerscience");
                      setOpenbackdrop(false);
                    }}
                  >
                    Computer Science
                  </Button>
                  <Button
                    className={classes.exploredropbut}
                    onClick={() => {
                      handleDropdownbuttonEvent("business");
                      setOpenbackdrop(false);
                    }}
                  >
                    Business
                  </Button>
                  <Button
                    className={classes.exploredropbut}
                    onClick={() => {
                      handleDropdownbuttonEvent("personaldev");
                      setOpenbackdrop(false);
                    }}
                  >
                    Personal Development
                  </Button>
                  <Button
                    className={classes.exploredropbut}
                    onClick={() => {
                      handleDropdownbuttonEvent("it");
                      setOpenbackdrop(false);
                    }}
                  >
                    Information Technology
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.exploredropdown}
                    onClick={() => {
                      handleDropdownbuttonEvent("all");
                      setOpenbackdrop(false);
                    }}
                  >
                    EXPLORE
                  </Button>
                </Grid>
              </div>
            )}
            {/* End of Dropdown */}

            {/* Search Input */}
            <div className={classes.grow}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={(e) => {
                    setkeyword(e.target.value);
                  }}
                  onFocus={() => {
                    setresult(true);
                    setOpenbackdrop(true);
                    setDropdown(false);
                  }}
                  value={keyword}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      history.push(`/search/${keyword}`);
                      setkeyword("");
                      setresult(false);
                      setOpenbackdrop(false);
                    }
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>

            <div className={classes.grow} />
            {!loading && data && data.me ? (
              <Typography variant="body1" className={classes.emailtext}>
                {data.me.email}
              </Typography>
            ) : (
              <div>
                <Link to="/login">
                  <Button className={classes.login}>Log in</Button>
                </Link>
                <Link to="/register">
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.explore}
                    >
                      Register
                    </Button>
                  </ThemeProvider>
                </Link>
              </div>
            )}

            {!loading && data && data.me ? (
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={(e) => {
                    handleProfileMenuOpen(e);
                    setOpenbackdrop(false);
                    setDropdown(false);
                    setresult(false);
                  }}
                  color="inherit"
                >
                  <AvatarDisplay id={data.me.id} />
                </IconButton>
              </div>
            ) : null}
            {result && keyword.length != 0 && (
              <div className={classes.searchresult}>
                <SearchResult
                  word={keyword}
                  setresult={setresult}
                  setkeyword={setkeyword}
                  setbackdrop={setOpenbackdrop}
                />
              </div>
            )}
            {/* Mobile or scale down */}
            <div className={classes.sectionMobile}>
              {!loading && data && data.me && (
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Backdrop
          open={backdropOpen}
          className={classes.backdrop}
          onClick={() => {
            setOpenbackdrop(false);
            setresult(false);
            setDropdown(false);
          }}
        />
        {/* When clicked on Profile */}
        {renderMobileMenu}
        {renderMenu}
      </div>
    </ThemeProvider>
  );
};

interface avatar {
  id: number;
}

const AvatarDisplay: React.FC<avatar> = ({ id }) => {
  const classes = useStyles();
  const { data, loading, refetch } = useUserprofileQuery({
    variables: { userId: id },
    // fetchPolicy: "network-only",
  });
  return (
    <div>
      {!loading && data && (
        <Avatar
          src={data.usersid.profileimage}
          className={classes.avatarsize}
        />
      )}
    </div>
  );
};

interface search {
  word: string;
  setresult: any;
  setkeyword: any;
  setbackdrop: any;
}

const SearchResult: React.FC<search> = ({
  word,
  setresult,
  setkeyword,
  setbackdrop,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const { data, loading } = useCourseSearchQuery({
    variables: { name: `%${word}%` },
  });
  return (
    <Grid container>
      {!loading &&
        data &&
        data.courseSearch &&
        data.courseSearch.map((course) => (
          <Grid container>
            <Button
              className={classes.searchresultitem}
              onClick={() => {
                setresult(false);
                setkeyword("");
                setbackdrop(false);
                history.push(`/course/${course.courseId}`);
              }}
            >
              <Grid item container>
                <Typography variant="subtitle1">{course.courseName}</Typography>
              </Grid>
            </Button>
          </Grid>
        ))}
    </Grid>
  );
};

interface instructorbut {
  handlemenu: any;
}

const InstructorButnormal: React.FC<instructorbut> = ({ handlemenu }) => {
  const classes = useStyles();
  const { data, loading } = useAuthandRoleQuery();
  if (
    !loading &&
    data &&
    data.authandRole &&
    data.authandRole.id &&
    data.authandRole.role === "instructor"
  ) {
    return (
      <Link to="/instructor">
        <MenuItem onClick={handlemenu}>Instructor Home</MenuItem>
      </Link>
    );
  } else {
    return null;
  }
};

const InstructorButMobile: React.FC<instructorbut> = ({ handlemenu }) => {
  const classes = useStyles();
  const { data, loading } = useAuthandRoleQuery();
  if (
    !loading &&
    data &&
    data.authandRole &&
    data.authandRole.id &&
    data.authandRole.role === "instructor"
  ) {
    return (
      <Link to="/instructor">
        <MenuItem onClick={handlemenu}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge color="secondary">
              <SupervisorAccountIcon />
            </Badge>
          </IconButton>
          <p>Instructor Home</p>
        </MenuItem>
      </Link>
    );
  } else {
    return null;
  }
};
