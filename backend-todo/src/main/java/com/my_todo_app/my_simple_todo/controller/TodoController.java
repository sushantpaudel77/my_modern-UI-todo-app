package com.my_todo_app.my_simple_todo.controller;

import com.my_todo_app.my_simple_todo.entity.Todo;
import com.my_todo_app.my_simple_todo.repository.TodoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private static final Logger log = LoggerFactory.getLogger(TodoController.class);
    @Autowired
    private TodoRepository todoRepository;

    // Get all todos
    @GetMapping
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Get todo by ID
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable String id) {
        Optional<Todo> todo = todoRepository.findById(id);
        return todo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create new todo
    @PostMapping
    public Todo createTodo(@RequestBody Todo todo) {
        log.info("Posted some todos: {}", todo);
        return todoRepository.save(todo);
    }

    // Update todo
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable String id, @RequestBody Todo todoUpdate) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);

        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setText(todoUpdate.getText());
            todo.setCompleted(todoUpdate.isCompleted());
            return ResponseEntity.ok(todoRepository.save(todo));
        }

        return ResponseEntity.notFound().build();
    }

    // Delete todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable String id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Delete all todos
    @DeleteMapping
    public ResponseEntity<Void> deleteAllTodos() {
        todoRepository.deleteAll();
        return ResponseEntity.ok().build();
    }
}