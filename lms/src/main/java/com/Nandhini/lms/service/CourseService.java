package com.Nandhini.lms.service;

import com.Nandhini.lms.entity.Course;
import com.Nandhini.lms.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course addCourse(Course course){
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    public Course updateCourse(Long id,Course updatedCourse){
        Course course=courseRepository.findById(id).orElse(null);
        if (course != null) {
            course.setTitle(updatedCourse.getTitle());
            course.setDescription(updatedCourse.getDescription());
            course.setInstructor(updatedCourse.getInstructor());
            course.setPrice(updatedCourse.getPrice());
            course.setDuration(updatedCourse.getDuration());
            course.setCategory(updatedCourse.getCategory());

            return courseRepository.save(course);
        }

        return null;
    }

    public void deleteCourseById(Long id){
        courseRepository.deleteById(id);
    }
}
