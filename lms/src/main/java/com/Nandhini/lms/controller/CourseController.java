package com.Nandhini.lms.controller;

import com.Nandhini.lms.entity.Course;
import com.Nandhini.lms.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/courses")
@CrossOrigin(origins="http://localhost:5173")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping
    public Course addCourse(@Valid @RequestBody Course course){
        return courseService.addCourse(course);
    }

    @GetMapping
    public List<Course> getAllCourses(){
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id){
        return courseService.getCourseById(id);
    }

    @PutMapping("/{id}")
    public Course updateCourse(@PathVariable Long id, @RequestBody Course course){
        return courseService.updateCourse(id,course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourseById(@PathVariable Long id){
        courseService.deleteCourseById(id);
    }

}
