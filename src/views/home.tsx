import {
  Component,
  createEffect,
  createResource,
  createSignal,
  createState,
  For,
  Suspense,
} from "solid-js";
import { ProductCard } from "../components/product";

const Home: Component = () => {
  const [data, load] = createResource([]);
  const [search, setSearch] = createSignal("");
  const [filtered, setFiltered] = createSignal(data());
  const [pagination, setPagination] = createState({
    perPage: 50,
    page: 0,
    data: [],
  });
  load(() => import("../final_data.json"));

  createEffect(() => setFiltered(data()));
  createEffect(() => setPagination({ page: 0, data: filtered() }));
  createEffect(() =>
    setFiltered(
      data().filter((row) =>
        row.translations.fr.includes(search().toLowerCase())
      )
    )
  );
  createEffect(() => {
    const newArray = filtered().slice(
      pagination.page * pagination.perPage,
      pagination.page * pagination.perPage + pagination.perPage
    );

    setPagination({ data: newArray });
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
      <header class="container mx-auto px-4 md:px-8 flex sticky top-4">
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
          placeholder={`Je cherche parmis ${data().length} produit...`}
        />
      </header>

      <main class="grid gap-4 md:gap-8 p-4 md:p-8 container mx-auto md:grid-cols-2 lg:grid-cols-3 mt-4 md:mt-8 mb-12">
        <For each={pagination.data}>
          {(product) => (
            <ProductCard name={product.translations.fr} gi={product.gi} />
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
            <input
              type="number"
              value={pagination.page + 1}
              onInput={(e) => setPagination("page", +e.target.value - 1)}
              class="bg-transparent w-12"
            />
            <span>&nbsp;/&nbsp;</span>
            <span>{Math.ceil(filtered().length / pagination.perPage)}</span>
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
