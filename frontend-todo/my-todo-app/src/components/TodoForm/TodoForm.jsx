import React, { useState } from 'react';
import styles from './TodoForm.module.css';

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className={styles.input}
          autoFocus
        />
        <div className={styles.inputFocus}></div>
      </div>
      <button type="submit" className={styles.button} disabled={!inputValue.trim()}>
        <svg className={styles.icon} viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"/>
        </svg>
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;