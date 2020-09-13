import { Component, Switch } from "solid-js";
import { render } from "solid-js/dom";
import { Route, RouterProvider } from "@amoutonbrady/solid-tiny-router";
import Home from "./views/home";
import ProductDetails from "./views/details";
import { register } from "register-service-worker";
import { ProductsProvider } from "./services";

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
    <ProductsProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </ProductsProvider>
  ),
  document.getElementById("app")
);

if (process.env.NODE_ENV === "production") {
  register("/sw.js", {
    registered(registration) {
      console.log(`Service Worker registered!`);
    },
    error(err) {
      console.log(`Service Worker registration failed: ${err}`);
    },
  });
}
