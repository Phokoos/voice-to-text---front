import logo from "./logo.svg";
import "./App.css";
import Product from "./components/Product";
import BookList from "./components/BookList";
import { Alert } from "./components/Alert-Old/Alert";
import { Component, useContext, useEffect, useRef, useState } from "react";
import LoginForm from "./components/LoginForm-Old/LoginForm";
import ArticleListComponent from "./components/ArticleList-Old/ArticleList";
import Hooks from "./components/Hooks-Old/Hooks";
import { UserMenu } from "./components/User-Old/UserMenu";
import Player, { CustomButtonWithRef } from "./components/Player-Old/Player";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import TestId from "./pages/TestId-Old/TestId";
import Group, { One, Three, Two } from "./pages/Group-Old/Group";
import NavigationTop from "./components/Navigation/Navigation";
import Login from "./pages/Login/Login";
// import Products-Old from "./pages/Products-Old/Products-Old";
import { lazy, Suspense } from "react";
// NEW Imports
import { Audio } from "react-loader-spinner";
import AuthContext from "./components/Auth/AuthContext";
import Home from "./pages/Home/Home";

const Products = lazy(() => import("./pages/Products-Old/Products"));

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
          <Route path={"/hooks"} element={<Hooks />} />
          <Route path={"/login"} element={<Login />} />;
          <Route path={"/second"} element={<Products />} />
          <Route path={"/article"} element={<ArticleListComponent />} />
          <Route path={"group"} element={<Group />}>
            <Route path={"one"} element={<One />} />
            <Route path={"two"} element={<Two />} />
            <Route path={"three"} element={<Three />} />
          </Route>
          <Route
            path={"/player"}
            element={
              <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />
            }
          />
          <Route path={"/userMenu"} element={<UserMenu />} />
          <Route path={"/test/:id"} element={<TestId />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

const App = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  // setIsAuthenticated(true);

  return (
    <div>
      {isAuthenticated ? <AppShow /> : <Login />}

      {/*<CustomButtonWithRef />*/}
      {/*<Hooks-Old />*/}
      {/*<header className="App-header">*/}
      {/*  <Counter step={5} initialValue={5} />*/}
      {/*  <span>{this.state.message}</span>*/}
      {/*  <Button label="Change message" changeMessage={this.updateMessage} />*/}
      {/*  <LoginForm-Old onSubmit={(values) => console.log("props func", values)} />*/}

      {/*<Alert-Old variant="info">*/}
      {/*    Would you like to browse our recommended products?*/}
      {/*</Alert-Old>*/}
      {/*<Alert-Old variant="error" elevated>*/}
      {/*    There was an error during your last transaction*/}
      {/*</Alert-Old>*/}
      {/*<Alert-Old variant="success" outlined>*/}
      {/*    Payment received, thank you for your purchase*/}
      {/*</Alert-Old>*/}
      {/*<Alert-Old variant="warning" outlined elevated>*/}
      {/*    Please update your profile contact information*/}
      {/*</Alert-Old>*/}
      {/*<img src={logo} className="App-logo" alt="logo" />*/}
      {/*<p>*/}
      {/*  Edit <code>src/App.js</code> and save to reload.*/}
      {/*</p>*/}
      {/*<a*/}
      {/*  className="App-link"*/}
      {/*  href="https://reactjs.org"*/}
      {/*  target="_blank"*/}
      {/*  rel="noopener noreferrer"*/}
      {/*>*/}
      {/*  Learn React*/}
      {/*</a>*/}
      {/*{1 > 0 ? (*/}
      {/*    <Product name={"Mykola"} price={100}/>*/}
      {/*) : (*/}
      {/*    <h2>Error</h2>*/}
      {/*)}*/}
      {/*<BookList books={favouriteBooks}/>*/}
      {/*<h4 >Test</h4>*/}
      {/*</header>*/}
    </div>
  );
};

export default App;
