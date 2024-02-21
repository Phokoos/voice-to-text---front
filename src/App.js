import "./App.css";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import NavigationTop from "./components/Navigation/Navigation";
import Login from "./pages/Login/Login";
import { lazy, Suspense } from "react";
// NEW Imports
import { Audio } from "react-loader-spinner";
import AuthContext from "./components/Auth/AuthContext";
import Home from "./pages/Home/Home";
import History from "./pages/History/History";
import EditFile from "./pages/EditFile/EditFile";

// const Products = lazy(() => import("./pages/Products-Old/Products"));

const AppShow = () => {
  return (
    <Suspense
      fallback={
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="three-dots-loading"
          wrapperStyle
          wrapperClass
        />
      }
    >
      <Routes>
        <Route path={"/"} element={<NavigationTop />}>
          <Route index element={<Home />} />
          <Route path={"/login"} element={<Login />} />;
          <Route path={"/edit-file/:fileId"} element={<EditFile />} />;
          <Route path={"/history"} element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  // setIsAuthenticated(true);

  return <div>{isAuthenticated ? <AppShow /> : <Login />}</div>;
};

export default App;
