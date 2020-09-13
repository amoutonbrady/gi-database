import { Link, useRouter } from "@amoutonbrady/solid-tiny-router";
import { Component, createResource, For, Show, Suspense } from "solid-js";
import { useProducts } from "../services";

const ProductDetails: Component = () => {
  const [router] = useRouter();
  const [_, { findOne }] = useProducts();
  const [product, loadProduct] = createResource<any>();
  loadProduct(() => findOne({ id: router.params.id }));

  return (
    <>
      <Show when={product.loading}>
        <p class="fixed top-1/2 left-0 w-full text-center animate-pulse text-3xl text-white">
          Chargement des données...
        </p>
      </Show>
      <Show when={!product.loading}>
        <main class="overflow-hidden max-w-2xl mx-auto py-8">
          <Link path="/">⬅️ Revenir à la liste des produits</Link>

          <div class="mt-8 md:px-8 md:py-6 p-4 bg-gray-100 rounded-lg shadow relative overflow-hidden">
            <strong
              class="h-12 w-12 leading-none text-xl flex items-center justify-center text-gray-900 absolute top-0 right-0 rounded-bl-lg"
              classList={{
                "bg-red-300 text-red-800": +product().gi >= 100,
                "bg-orange-300 text-orange-800":
                  +product().gi >= 75 && +product().gi < 100,
                "bg-yellow-300 text-yellow-800":
                  +product().gi >= 50 && +product().gi < 75,
                "bg-green-300 text-green-800": +product().gi < 50,
              }}
            >
              {product().gi}
            </strong>

            <h1 class="text-xl md:text-2xl">{product().translations.fr}</h1>
            <h2 class="italic">({product().name})</h2>

            <p class="mt-8 text-800">
              Ce test a été réalisé en{" "}
              <strong class="font-medium underline">
                {product().testYear}
              </strong>{" "}
              en/au{" "}
              <strong class="font-medium underline">{product().country}</strong>{" "}
              sur un échantillon de{" "}
              <strong class="font-medium underline">
                {product().testSubjectsNumber}
              </strong>{" "}
              personnes{" "}
              <strong class="font-medium underline">
                {product().testSubjectsType.toLowerCase()}
              </strong>{" "}
              sur une durée de{" "}
              <strong class="font-medium underline">
                {product().testPeriod}
              </strong>
              .
            </p>

            <p class="mt-2 text-800">
              Les portions servies étaient de{" "}
              <strong class="font-medium underline">
                {product().standardServe}g
              </strong>{" "}
              incluant{" "}
              <strong class="font-medium underline">
                {product().carbohydrateServe}g
              </strong>{" "}
              de glucide.
            </p>

            <ul class="space-y-1 mt-8 text-sm">
              <li
                class="flex flex-col md:flex-row"
                classList={{ hidden: !product().category }}
              >
                <span class="w-32 whitespace-no-wrap text-gray-800">
                  categorie
                </span>
                <span class="flex-1 text-gray-600">{product().category}</span>
              </li>
              <li
                class="flex flex-col md:flex-row"
                classList={{ hidden: !product().manufacturer }}
              >
                <span class="w-32 whitespace-no-wrap text-gray-800">
                  constructeur
                </span>
                <span class="flex-1 text-gray-600">
                  {product().manufacturer}
                </span>
              </li>
              <li
                class="flex flex-col md:flex-row"
                classList={{ hidden: !product().source }}
              >
                <span class="w-32 whitespace-no-wrap text-gray-800">
                  source
                </span>
                <span class="flex-1 text-gray-600">{product().source}</span>
              </li>
            </ul>
          </div>
        </main>
      </Show>
    </>
  );
};

export default ProductDetails;
