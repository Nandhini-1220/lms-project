package com.Nandhini.lms.controller;

import com.Nandhini.lms.entity.Enrollment;
import com.Nandhini.lms.service.EnrollmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin(origins = "http://localhost:5173")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping
    public Enrollment addEnrollment(@RequestBody Enrollment enrollment) {
        return enrollmentService.addEnrollment(enrollment);
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    @GetMapping("/{id}")
    public Enrollment getEnrollmentById(@PathVariable Long id) {
        return enrollmentService.getEnrollmentById(id);
    }

    @PutMapping("/{id}")
    public Enrollment updateEnrollment(@PathVariable Long id, @RequestBody Enrollment enrollment) {
        return enrollmentService.updateEnrollment(id, enrollment);
    }

    @GetMapping("/check")
    public boolean checkEnrollment(@RequestParam Long userId, @RequestParam Long courseId) {

        return enrollmentService.isAlreadyEnrolled(userId, courseId);
    }

    @DeleteMapping("/{id}")
    public void deleteEnrollmentById(@PathVariable Long id) {
        enrollmentService.deleteEnrollmentById(id);
    }

}
