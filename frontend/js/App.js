import * as Sentry from "@sentry/react";
import React from "react";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import RecipeList from "./pages/RecipeList";
import { PATHS } from "./constants";
import configureStore from "./store";
import RecipeView from "./pages/RecipeView";

const store = configureStore({});
const App = () => (
  <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Container>
          <Routes>
            <Route element={<Home />} path={PATHS.HOME} />
            <Route element={<RecipeList />} path={PATHS.RECIPE_LIST} />
            <Route element={<RecipeView />} path={PATHS.RECIPE_VIEW} />
          </Routes>
        </Container>
      </BrowserRouter>
    </Provider>
  </Sentry.ErrorBoundary>
);

export default App;
