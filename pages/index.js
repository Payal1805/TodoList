import Image from "next/image";
import { Inter } from "next/font/google";
import TodoList from '../components/TodoList';

const todos = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build a todo app', completed: true },
  { id: 3, title: 'Add Tailwind CSS', completed: false },
];

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
    <h1 className="text-2xl font-bold text-center mt-8">Todo List</h1>
    <TodoList todos={todos} />
  </div>
  );
}
