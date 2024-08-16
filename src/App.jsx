import { useState } from "react";
import DynamicForm from "./components/DynamicToDo/DynamicToDo";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DynamicForm />{" "}
    </>
  );
}

export default App;
