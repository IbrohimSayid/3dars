import React, { useReducer } from "react";

const initialState = [{ name: "", number: "", remarks: "" }];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, { name: "", number: "", remarks: "" }];
    case "REMOVE_ROW":
      return state.filter((_, index) => index !== action.index);
    case "UPDATE_ROW":
      return state.map((row, index) =>
        index === action.index ? { ...row, [action.name]: action.value } : row
      );
    default:
      return state;
  }
};

const DynamicForm = () => {
  const [rows, dispatch] = useReducer(reducer, initialState);

  const handleChange = (index, e) => {
    dispatch({
      type: "UPDATE_ROW",
      index,
      name: e.target.name,
      value: e.target.value,
    });
  };

  const addRow = () => {
    dispatch({ type: "ADD_ROW" });
  };

  const removeRow = (index) => {
    dispatch({ type: "REMOVE_ROW", index });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(rows));
    alert("Form data saved to localStorage!");
  };

  return (
    <form className="flex flex-col items-center p-4" onSubmit={handleSubmit}>
      {rows.map((row, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            name="name"
            value={row.name}
            onChange={(e) => handleChange(index, e)}
            placeholder="Name"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="number"
            value={row.number}
            onChange={(e) => handleChange(index, e)}
            placeholder="Number"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="remarks"
            value={row.remarks}
            onChange={(e) => handleChange(index, e)}
            placeholder="Remarks"
            className="p-2 border border-gray-300 rounded"
          />
          {rows.length > 1 && (
            <button
              type="button"
              className="bg-red-500 text-white p-2 rounded"
              onClick={() => removeRow(index)}
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <div>
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded"
          onClick={addRow}
        >
          Add More
        </button>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
