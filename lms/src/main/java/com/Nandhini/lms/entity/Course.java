package com.Nandhini.lms.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title cannot  be empty")
    private String title;

    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotBlank(message = "Instructor cannot be empty")
    private String instructor;

    @Min(value = 0, message = "Price cannot be negative")
    private Double price;

    @NotBlank(message = "Category cannot be empty")
    private String category;

    @Min(value = 1, message = "Duration must be at least 1 hour")
    private Integer duration;

    public Course() {
    }

    public Course(Long id, String title, String description, String instructor, Double price, String category, Integer duration) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.instructor = instructor;
        this.price = price;
        this.category = category;
        this.duration = duration;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getInstructor() {
        return instructor;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getDuration() {
        return duration;
    }

    public String getCategory() {
        return category;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
