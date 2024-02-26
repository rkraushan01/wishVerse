import { useEffect, useState, useMemo } from 'react';
import TodoForm from "./components/TodoForm";
import './App.css';
import { TodoProvider } from './contexts';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));

    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const memoizedTodos = useMemo(() => (
    todos.map(todo => (
      <div key={todo.id} className='w-full'>
        <TodoItem todo={todo} />
      </div>
    ))
  ), [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-3xl font-extrabold text-center mb-8 mt-2 text-white">
            "Discover joy and gratitude on our page! Share your heartfelt wishes and gratitude notes. Embrace positivity and watch your dreams unfold. Start manifesting happiness today"
          </h1>

          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Render memoized todos */}
            {memoizedTodos}
          </div>




        </div>
        <h1 className="text-3xl font-extrabold text-center mb-8 mt-2 text-white">
          Here are few examples

        </h1>
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white h-[300px]">
          <h1 className="text-3xl font-extrabold text-center mb-8 mt-2">
            I am a rich person and I attract more money.
          </h1>
        </div>

      </div>
    </TodoProvider>
  );
}

export default App;
