import { Component, createSignal, Switch } from "solid-js";
import { render } from "solid-js/dom";
import { Route, RouterProvider } from "@amoutonbrady/solid-tiny-router";
import Home from "./views/home";
import ProductDetails from "./views/details";

const App: Component = () => {
  return (
    <Switch>
      <Route path="/:id" children={<ProductDetails />} />
      <Route path="/" children={<Home />} />
    </Switch>
  );
};

render(
  () => (
    <RouterProvider>
      <App />
    </RouterProvider>
  ),
  document.getElementById("app")
);
