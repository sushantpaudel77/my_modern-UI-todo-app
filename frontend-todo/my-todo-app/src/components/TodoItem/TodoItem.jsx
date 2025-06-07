import React from 'react';
import { Trash2, Check, Circle } from 'lucide-react';
import styles from './TodoItem.module.css';

export default function TodoItem({ todo, onToggle, onDelete }) {
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(todo.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onDelete(todo.id);
  };

  return (
    <div className={`${styles.item} ${todo.completed ? styles.completed : ''}`}>
      <button
        onClick={handleToggle}
        className={styles.toggleButton}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {todo.completed ? (
          <div className={styles.checkboxChecked}>
            <Check className={styles.checkIcon} />
          </div>
        ) : (
          <Circle className={styles.checkboxUnchecked} />
        )}
      </button>

      <span className={styles.text}>
        {todo.text}
      </span>

      <button
        onClick={handleDelete}
        className={styles.deleteButton}
        aria-label="Delete task"
      >
        <Trash2 className={styles.deleteIcon} />
      </button>
    </div>
  );
}
