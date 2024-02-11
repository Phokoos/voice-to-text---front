import { useState, useEffect } from "react";

const Hooks = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${value} times`;
  }, [value]);

  return (
    <div>
      <p>You clicked {value} times</p>
      <button type="button" onClick={() => setValue(value + 1)}>
        Increment value by 1
      </button>
    </div>
  );
};

export default Hooks;
