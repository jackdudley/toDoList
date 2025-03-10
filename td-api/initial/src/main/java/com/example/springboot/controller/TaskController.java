package com.example.springboot.controller;

import com.example.springboot.model.Task;
import org.springframework.web.bind.annotation.*;
import com.example.springboot.persistence.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/tasks")
public class TaskController {
    
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    // ✅ PUT - Update a task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        return taskRepository.findById(id).map(task -> {
            task.setContent(taskDetails.getContent());
            task.setCompleted(taskDetails.getCompleted());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found with id " + id));
    }

    // ✅ DELETE - Remove a task
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return "Task with ID " + id + " deleted!";
    }

    @GetMapping("/order")
    public List<Task> orderTasks() {
        List<Task> tasks = taskRepository.findAllByOrderByDueDateAsc();
        return tasks;
    }
}
