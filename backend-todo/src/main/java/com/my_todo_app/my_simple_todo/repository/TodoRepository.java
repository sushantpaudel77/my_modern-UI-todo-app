package com.my_todo_app.my_simple_todo.repository;

import com.my_todo_app.my_simple_todo.entity.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends MongoRepository<Todo, String> {
}
