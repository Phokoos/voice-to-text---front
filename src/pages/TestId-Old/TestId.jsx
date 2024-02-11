import { useParams } from "react-router-dom";

const TestId = () => {
  const { id } = useParams("id");
  return (
    <>
      <h2>Test ID</h2>
      <h3>{id}</h3>
    </>
  );
};

export default TestId;
