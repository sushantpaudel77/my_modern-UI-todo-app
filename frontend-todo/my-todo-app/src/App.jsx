// src/App.jsx
import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import styles from './App.module.css';
import * as api from './services/api'; 


function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.getTodos();
        setTodos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      const newTodo = {
        text: text.trim(),
        completed: false,
      };
      const response = await api.createTodo(newTodo);
      setTodos([response.data, ...todos]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await api.updateTodo(id, updatedTodo);
      setTodos(todos.map(todo =>
        todo.id === id ? updatedTodo : todo
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const clearCompleted = async () => {
    try {
     
      const completedIds = todos.filter(todo => todo.completed).map(todo => todo.id);
      await Promise.all(completedIds.map(id => api.deleteTodo(id)));
      setTodos(todos.filter(todo => !todo.completed));
    } catch (err) {
      setError(err.message);
    }
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.appContainer}>
      <div className={styles.backgroundGlow}></div>
      
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Task <span className={styles.highlight}>Manager</span>
          </h1>
          <p className={styles.subtitle}>
            Stay organized and boost your productivity with our modern task management solution.
          </p>
        </header>

        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{totalTodos}</div>
            <div className={styles.statLabel}>Total Tasks</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{activeTodos}</div>
            <div className={styles.statLabel}>Active</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{completedTodos}</div>
            <div className={styles.statLabel}>Completed</div>
          </div>
        </div>

        <div className={styles.todoContainer}>
          <TodoForm onAddTodo={addTodo} />
          <TodoList 
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}

export default App;