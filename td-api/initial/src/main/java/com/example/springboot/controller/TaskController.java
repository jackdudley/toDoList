package com.example.springboot.controller;

import com.example.springboot.model.Task;
import org.springframework.web.bind.annotation.*;
import com.example.springboot.persistence.*;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tasks")
public class TaskController {
    
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<List<Task>> createTask(@RequestBody Task task) {
        taskRepository.save(task);
        return ResponseEntity.ok(taskRepository.findAll());
    }

    // ✅ PUT - Update a task
    @PutMapping("/{id}")
    public ResponseEntity<List<Task>> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Optional<Task> task = taskRepository.findById(id);
        if(task.isPresent()) {
            task.get().setContent(taskDetails.getContent());
            task.get().setCompleted(taskDetails.getCompleted());
            task.get().setDueDate(taskDetails.getDueDate());
            task.get().setDescription(taskDetails.getDescription());
            taskRepository.save(task.get());
            return ResponseEntity.ok(taskRepository.findAll());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/order")
    public ResponseEntity<List<Task>> orderTasks() {
        List<Task> tasks = taskRepository.findAllByOrderByDueDateAsc();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        if(task.isPresent()) {
            return ResponseEntity.ok(task.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Task>> deleteTask(@PathVariable Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return ResponseEntity.ok(taskRepository.findAll());
        } else {
            return ResponseEntity.notFound().build();
        }
}
}
