import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

const TodoList = ({ todos, onToggleTodo, onDeleteTodo, onClearCompleted }) => {
  const completedTodos = todos.filter(todo => todo.completed);
  const hasCompletedTodos = completedTodos.length > 0;

  if (todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <svg className={styles.circleIcon} viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
          </svg>
        </div>
        <p className={styles.emptyText}>No tasks yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </div>
      
      {hasCompletedTodos && (
        <div className={styles.clearContainer}>
          <button 
            className={styles.clearButton}
            onClick={onClearCompleted}
          >
            <svg className={styles.clearIcon} viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.5 1.75a.25.25 0 01.25-.25h2.5a.25.25 0 01.25.25V3h-3V1.75zm4.5 0V3h2.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H5V1.75C5 .784 5.784 0 6.75 0h2.5C10.216 0 11 .784 11 1.75zM4.496 6.675a.75.75 0 10-1.492.15l.66 6.6A1.75 1.75 0 005.405 15h5.19c.9 0 1.652-.681 1.741-1.576l.66-6.6a.75.75 0 00-1.492-.149l-.66 6.6a.25.25 0 01-.249.225h-5.19a.25.25 0 01-.249-.225l-.66-6.6z"/>
            </svg>
            Clear completed ({completedTodos.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;