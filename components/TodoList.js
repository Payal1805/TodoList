import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTodos(todos);
    } else {
      setFilteredTodos(
        todos.filter((todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, todos]);

  const addTodo = () => {
    if (!newTodo.title) return;
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewTodo({ title: "", desc: "" });
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [newTodo, setNewTodo] = useState({ title: "", desc: "" });

  return (
    <>
      <Head>
        <title>Todo List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              placeholder="Todo Title"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="desc"
              value={newTodo.desc}
              onChange={(e) => setNewTodo({ ...newTodo, desc: e.target.value })}
              placeholder="Todo Description"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            onClick={addTodo}
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Add Todo
          </button>

          <div className="mt-8 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search Todos"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Completed</th>
              </tr>
            </thead>
            <tbody>
              {filteredTodos.map((todo, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{todo.title}</td>
                  <td className="border px-4 py-2">{todo.desc}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
