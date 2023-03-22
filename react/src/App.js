import {Fragment} from "react";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider";
import {Navbar, PrivateRoute} from "./components";
import {TemplateProvider} from "./context/TemplateProvider";
import {CatTempByUserProvider} from "./context/CatTempByUserContext";
import {CatTempByRolProvider} from "./context/CatTempByRolContext";
import Login from "./containers/login";
import Categorieen from "./containers/categorieen";
import Categorie from "./containers/categorie";
import Sdg from "./containers/sdg";
import SubSDG from "./containers/subSDG";
import Mvo from "./containers/mvo";
import SubMVO from "./containers/subMVO";
import CategorieTemplate from "./containers/categorietemplate";
import RolTemplate from "./containers/roltemplate";

function App() {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: "#44546A",
      },
      secondary: {
        main: "#B2D234",
      },
      background: {
        default: "#FFF",
      },
    },
    typography: {
      fontFamily: "Comfortaa",
    },
  });

  return (
    <Fragment>
      <AuthProvider>
        <TemplateProvider>
          <CatTempByUserProvider>
            <CatTempByRolProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container sx={{ marginTop: 2 }}>
                  <Router>
                    <Routes>
                      <Route path={"*"} element={<Navbar />} />
                      <Route path={"/login"} element={<Login />} />
                    </Routes>
                    <Routes>
                      <Route
                        path={"/"}
                        element={
                          <PrivateRoute>
                            <Categorieen />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={"/categorie"}
                        element={
                          <PrivateRoute>
                            <Categorie />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={"/categorietemplate"}
                        element={
                          <PrivateRoute>
                            <CategorieTemplate />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={"/sdg"}
                        element={
                          <PrivateRoute>
                            <Sdg />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={"/subsdg"}
                        element={
                          <PrivateRoute>
                            <SubSDG />
                          </PrivateRoute>
                        }
                      />
                      <Route
                        path={"/roltemplate"}
                        element={
                            <PrivateRoute mvoCoordinator>
                                <RolTemplate/>
                            </PrivateRoute>
                        }
                      />
                        <Route
                            path={"/mvo"}
                            element={<PrivateRoute><Mvo/></PrivateRoute>}
                        />
                        <Route
                            path={"/submvo"}
                            element={<PrivateRoute><SubMVO/></PrivateRoute>}
                        />
                    </Routes>
                  </Router>
                </Container>
              </ThemeProvider>
            </CatTempByRolProvider>
          </CatTempByUserProvider>
        </TemplateProvider>
      </AuthProvider>
    </Fragment>
  );
}

export default App;
