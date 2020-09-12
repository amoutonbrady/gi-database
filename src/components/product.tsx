import { Component } from "solid-js";

export const ProductCard: Component<{ name: string; gi: string }> = (props) => {
  return (
    <article class="shadow rounded-lg text-gray-900 p-4 md:px-8 md:py-6 bg-gray-100">
      <header class="flex justify-between space-x-4">
        <h2 class="flex-1">{props.name}</h2>
        <strong
          class="h-12 w-12 leading-none rounded-full text-xl flex items-center justify-center bg-gray-900 text-gray-900"
          classList={{
            "bg-red-300 text-red-800": +props.gi >= 100,
            "bg-orange-300 text-orange-800": +props.gi >= 75 && +props.gi < 100,
            "bg-yellow-300 text-yellow-800": +props.gi >= 50 && +props.gi < 75,
            "bg-green-300 text-green-800": +props.gi < 50,
          }}
        >
          {props.gi}
        </strong>
      </header>
    </article>
  );
};
