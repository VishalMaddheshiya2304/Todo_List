import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import './App.css';


function App() {
  const [todo, setTodo] = useState('');
  const [priority, setPriority] = useState('Medium'); // Added state for priority
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setPriority(todoToEdit.priority); // Set priority for editing
      const newTodos = todos.filter(item => item.id !== id);
      setTodos(newTodos);
      saveToLS();
    }
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    if (todo.trim()) {
      setTodos([...todos, { id: uuidv4(), todo, priority, isCompleted: false }]);
      setTodo('');
      setPriority('Medium'); // Reset priority
      saveToLS();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value); // Update priority state
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>iTask - Manage your todos at one place</h1>
        <div className="addTodo">
          <h2>Add a Todo</h2>
          <div>
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter new task"
            />
            <select value={priority} onChange={handlePriorityChange}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
            >
              Save
            </button>
          </div>
        </div>
        <input
          id='show'
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />
        <label htmlFor="show">Show Finished</label>
        <div className='divider'></div>
        <h2>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div>No Todos to display</div>}
          {todos
            .filter(item => showFinished || !item.isCompleted)
            .map(item => (
              <div key={item.id} className={`todo ${item.priority.toLowerCase()}`}>
                <div>
                  <input
                    name={item.id}
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <span className={item.isCompleted ? 'line-through' : ''}>
                    {item.todo}
                  </span>
                </div>
                <div className="buttons">
                  <button
                    onClick={() => handleEdit(item.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
