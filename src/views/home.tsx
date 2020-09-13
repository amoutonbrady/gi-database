import { useRouter } from "@amoutonbrady/solid-tiny-router";
import {
  Component,
  createEffect,
  createSignal,
  createState,
  For,
  Suspense,
} from "solid-js";
import { ProductCard } from "../components/product";
import { useProducts } from "../services";

const Home: Component = () => {
  const [_, { push }] = useRouter();
  const [products, { find }] = useProducts();
  const [search, setSearch] = createSignal("");
  const [pagination, setPagination] = createState({
    perPage: 50,
    page: 0,
    data: [],
    total: 0,
    get pageNumber(): number {
      return Math.ceil(pagination.total / pagination.perPage);
    },
  });

  createEffect(async () => {
    const [data, total] = await find({
      limit: pagination.perPage,
      offset: pagination.page * pagination.perPage,
      name: search(),
    });
    setPagination({ data, total });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return (
    <Suspense
      fallback={
        <p class="fixed top-1/2 left-0 w-full text-center animate-pulse text-3xl text-white">
          Chargement des données...
        </p>
      }
    >
      <header class="container mx-auto px-4 md:px-8 flex sticky top-4 z-20">
        <label for="search" class="sr-only">
          Recherher un produit
        </label>
        <input
          id="search"
          type="search"
          value={search()}
          onInput={(e) => setSearch(e.target.value)}
          class="flex-1 px-4 md:px-8 py-4 rounded-lg shadow text-center bg-gray-100 bg-opacity-50 focus:bg-opacity-100"
          style={{ "backdrop-filter": "blur(5px)" }}
          placeholder={`Je cherche parmis ${products().length} produit...`}
        />
      </header>

      <main class="grid gap-4 md:gap-8 p-4 md:p-8 container mx-auto md:grid-cols-2 lg:grid-cols-3 mt-4 md:mt-8 mb-12">
        <For each={pagination.data}>
          {(product) => (
            <ProductCard
              id={product.id}
              name={product.translations.fr}
              gi={product.gi}
            />
          )}
        </For>
      </main>

      <footer
        class="bottom-0 left-0 right-0 bg-gray-100 bg-opacity-50 fixed"
        style={{ "backdrop-filter": "blur(5px)" }}
      >
        <div class="flex container mx-auto justify-between px-4 md:px-8 py-4">
          <button
            onClick={() => setPagination("page", (p) => p - 1)}
            disabled={!pagination.page}
            class="uppercase text-sm leading-none"
            classList={{ "opacity-0": !pagination.page }}
          >
            Précédant
          </button>

          <div>
            <label for="page" class="sr-only">
              Choisir une page
            </label>
            <input
              id="page"
              type="number"
              value={pagination.page + 1}
              onInput={(e) => setPagination("page", +e.target.value - 1)}
              class="bg-transparent w-12"
            />
            <span>&nbsp;/&nbsp;</span>
            <span>{pagination.pageNumber}</span>
          </div>

          <button
            onClick={() => setPagination("page", (p) => p + 1)}
            class="uppercase text-sm leading-none"
          >
            Suivant
          </button>
        </div>
      </footer>
    </Suspense>
  );
};

export default Home;
