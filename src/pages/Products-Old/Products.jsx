import css from "./Products.module.css";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import AudioPlayer from "../../components/Audio/AudioPlayer";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams],
  );
  const { name, maxPrice, color } = params;

  return (
    <>
      <AudioPlayer />
    </>
  );
};

export default Products;
