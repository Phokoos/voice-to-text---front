import css from "./Products.module.css";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams],
  );
  const { name, maxPrice, color } = params;

  return (
    <>
      <p>Name: {name}</p>
      <input onChange={(e) => setSearchParams({ name: e.target.value })} />
      <p>Color: {color}</p>
      <p>Max Price: {maxPrice}</p>
    </>
  );
};

export default Products;
