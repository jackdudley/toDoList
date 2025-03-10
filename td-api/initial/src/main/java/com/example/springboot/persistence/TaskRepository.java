package com.example.springboot.persistence;

import com.example.springboot.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface TaskRepository extends JpaRepository<Task, Long> {
    
    @Query("SELECT t FROM Task t ORDER BY t.dueDate ASC")
    List<Task> findAllByOrderByDueDateAsc();

}
