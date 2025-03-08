package com.example.springboot.model;


import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private boolean completed;
    private int task_length;
    @Column(name = "dueDate")
    private String dueDate;

    public Task() {
    }

    public Task(Long id, String content, boolean completed, int task_length, String dueDate) {
        this.id = id;
        this.content = content;
        this.completed = completed;
        this.task_length = task_length;
        this.dueDate = dueDate;
    }


    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }
    
    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public boolean getCompleted() {
        return completed;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public int getTask_length() {
        return task_length;
    }

    public void setTask_length(int task_length) {
        this.task_length = task_length;
    }
}