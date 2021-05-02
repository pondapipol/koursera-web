import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Bye } from "./pages/Bye";
// import { Header } from "./Header";
import { InstructorHome } from "./pages/InstructorHome";
import { Navbar } from "./Navbar";
import { CreateCourse } from "./pages/CreateCourse";
import { EditCourse } from "./pages/EditCourse";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import { EditUnit } from "./pages/EditUnit";
import { EditCourseUnit } from "./pages/EditCourseUnit";
import { EditCourseDetail } from "./pages/EditCourseDetail";
import { CourseDisplay } from "./pages/CourseDisplay";
import { UserHome } from "./pages/UserHome";
import { LearnCourse } from "./pages/LearnCourse";
import { LearnUnit } from "./pages/LearnUnit";
import { ExploreCourse } from "./pages/Explore";
import { Profile } from "./pages/Profile";
import { SearchCourse } from "./pages/SearchPages";
// import { Footer } from "./Footer";
import { useAuthandRoleQuery } from "./generated/graphql";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "antialiased",
          fontFamily: ["Montserrat"].join(","),
        },
        "*::-webkit-scrollbar": {
          width: "0.5em",
        },
        "*::-webkit-scrollbar-track": {
          "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
        },
        body: {
          margin: 0,
          overflowX: "hidden",
        },
      },
    },
  },
});

export const Routes: React.FC = () => {
  const { data, loading, error } = useAuthandRoleQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>loading</div>;
  }
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="app">
          <CssBaseline />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route
              path="/explore/:method"
              render={(props) => {
                const method = props.match.params.method;
                return <ExploreCourse method={method} />;
              }}
            ></Route>
            <Route
              path="/course/:id"
              render={(props) => {
                const id = props.match.params.id;
                return <CourseDisplay id={parseInt(id)} />;
              }}
            ></Route>
            <Route
              path="/profile/:id"
              render={(props) => {
                const id = props.match.params.id;
                return <Profile id={parseInt(id)} />;
              }}
            ></Route>
            <Route
              path="/search/:param"
              render={(props) => {
                const param = props.match.params.param;
                return <SearchCourse param={param} />;
              }}
            ></Route>
            <Route exact path="/bye" component={Bye} />

            <ProtectRoute path="/userhome" component={UserHome} />
            <ProtectRouteOnlyInstructor
              path="/createcourse"
              component={CreateCourse}
            />
            <ProtectRouteOnlyInstructor
              path="/instructor"
              component={InstructorHome}
            />

            <ProtectRouteEditCourse path="/edit/:id" />
            {/*  */}
            <ProtectRouteEditUnitdetail path="/editunit/:id" />
            {/* unitId */}

            {/* courseID */}
            <ProtectRouteEditCourseUnit path="/editunitdetail/:id" />

            {/* courseId */}
            <ProtectRouteEditCourseDetail path="/editcoursedetail/:id" />

            <Route
              path="/learncourse/:id"
              render={(props) => {
                const id = props.match.params.id;
                return <LearnCourse id={parseInt(id)} />;
              }}
            ></Route>

            <ProtectRouteLearn path="/learnunit/:id" />
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

interface protect {
  path: string;
  component: any;
}

const ProtectRoute: React.FC<protect> = ({ path, component }) => {
  const { data, loading, error } = useAuthandRoleQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>loading....</div>;
  }

  if (data && data.authandRole && data.authandRole.id) {
    return <Route exact path={path} component={component} />;
  } else {
    return <Redirect to="/login" />;
  }
};

interface protect {
  path: string;
  component: any;
}

const ProtectRouteOnlyInstructor: React.FC<protect> = ({ path, component }) => {
  const { data, loading, error } = useAuthandRoleQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>loading....</div>;
  }

  if (
    data &&
    data.authandRole &&
    data.authandRole.id &&
    data.authandRole.role === "instructor"
  ) {
    return <Route exact path={path} component={component} />;
  } else {
    return <Redirect to="/login" />;
  }
};

interface path {
  path: string;
}

const ProtectRouteEditCourse: React.FC<path> = ({ path }) => {
  const { data, loading, error } = useAuthandRoleQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>loading....</div>;
  }

  if (
    data &&
    data.authandRole &&
    data.authandRole.id &&
    data.authandRole.role === "instructor"
  ) {
    return (
      <Route
        path={path}
        render={(props) => {
          const id = props.match.params.id;
          return <EditCourse id={id!} />;
        }}
      ></Route>
    );
  } else {
    return <Redirect to="/" />;
  }
};

interface path {
  path: string;
}

const ProtectRouteLearn: React.FC<path> = ({ path }) => {
  const { data, loading, error } = useAuthandRoleQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>loading....</div>;
  }

  if (data && data.authandRole && data.authandRole.id) {
    return (
      <Route
        path={path}
        render={(props) => {
          const id = props.match.params.id;
          return <LearnUnit id={parseInt(id!)} />;
        }}
      ></Route>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const ProtectRouteEditUnitdetail: React.FC<path> = ({ path }) => {
  const { data, loading, error } = useAuthandRoleQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>loading....</div>;
  }

  if (
    data &&
    data.authandRole &&
    data.authandRole.id &&
    data.authandRole.role === "instructor"
  ) {
    return (
      <Route
        path={path}
        render={(props) => {
          const id = props.match.params.id;
          return <EditUnit id={parseInt(id!)} />;
        }}
      ></Route>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const ProtectRouteEditCourseUnit: React.FC<path> = ({ path }) => {
  const { data, loading, error } = useAuthandRoleQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>loading....</div>;
  }

  if (
    data &&
    data.authandRole &&
    data.authandRole.id &&
    data.authandRole.role === "instructor"
  ) {
    return (
      <Route
        path={path}
        render={(props) => {
          const id = props.match.params.id;
          return <EditCourseUnit id={parseInt(id!)} />;
        }}
      ></Route>
    );
  } else {
    return <Redirect to="/" />;
  }
};

const ProtectRouteEditCourseDetail: React.FC<path> = ({ path }) => {
  const { data, loading, error } = useAuthandRoleQuery({
    fetchPolicy: "network-only",
  });
  if (loading) {
    return <div>loading....</div>;
  }

  if (data && data.authandRole && data.authandRole.id) {
    return (
      <Route
        path={path}
        render={(props) => {
          const id = props.match.params.id;
          return <EditCourseDetail id={parseInt(id!)} />;
        }}
      ></Route>
    );
  } else {
    return <Redirect to="/" />;
  }
};
