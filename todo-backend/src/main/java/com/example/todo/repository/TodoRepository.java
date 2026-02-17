package com.example.todo.repository;

import com.example.todo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    // Find all todos by completion status
    List<Todo> findByCompleted(Boolean completed);

    // Find todos by title containing (case-insensitive search)
    List<Todo> findByTitleContainingIgnoreCase(String title);
}