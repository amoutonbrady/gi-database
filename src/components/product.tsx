import { Link } from "@amoutonbrady/solid-tiny-router";
import { Component } from "solid-js";

export const ProductCard: Component<{
  id: number;
  name: string;
  gi: string;
}> = (props) => {
  return (
    <Link
      path={`/${props.id}`}
      class="transform transition duration-300 hover:-translate-y-2"
    >
      <article class="shadow rounded-lg text-gray-900 p-4 md:px-8 md:py-6 bg-gray-100 relative overflow-hidden">
        <header class="flex justify-between space-x-4">
          <h2 class="flex-1">{props.name}</h2>
          <strong
            class="h-8 w-8 absolute top-0 right-0 leading-none rounded-bl-lg flex items-center justify-center bg-gray-900 text-gray-900"
            classList={{
              "bg-red-300 text-red-800": +props.gi >= 100,
              "bg-orange-300 text-orange-800":
                +props.gi >= 75 && +props.gi < 100,
              "bg-yellow-300 text-yellow-800":
                +props.gi >= 50 && +props.gi < 75,
              "bg-green-300 text-green-800": +props.gi < 50,
            }}
          >
            {props.gi}
          </strong>
        </header>
      </article>
    </Link>
  );
};
