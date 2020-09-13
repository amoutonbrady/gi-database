import { Component, createContext, createSignal, useContext } from "solid-js";

interface WhereCondition {
  offset?: number;
  limit?: number;
  name?: string;
}

function createDataStore() {
  const [products, setProducts] = createSignal([]);

  const loadProducts = async () => {
    const data = await import("./final_data.json");
    setProducts(data);
  };

  const find = async (where: WhereCondition) => {
    if (!products().length) await loadProducts();

    const total = products().filter((p) =>
      p.translations.fr.includes(where.name || "")
    );
    const filtered = total.slice(where.offset, where.offset + where.limit);

    return [filtered, total.length] as const;
  };

  const findOne = async (where: { id: string }) => {
    if (!products().length) await loadProducts();

    return products().find((p) => p.id === +where.id);
  };

  return [products, { find, findOne, loadProducts }] as const;
}

const ProductsContext = createContext<ReturnType<typeof createDataStore>>();

export const ProductsProvider: Component = (props) => {
  const value = createDataStore();

  return (
    <ProductsContext.Provider value={value}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
