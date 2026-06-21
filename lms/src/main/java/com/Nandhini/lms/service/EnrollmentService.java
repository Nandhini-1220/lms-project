package com.Nandhini.lms.service;

import com.Nandhini.lms.entity.Enrollment;
import com.Nandhini.lms.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public Enrollment addEnrollment(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Enrollment getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id).orElse(null);
    }

    public Enrollment updateEnrollment(Long id, Enrollment updatedEnrollment) {
        Enrollment enrollment = enrollmentRepository.findById(id).orElse(null);

        if (enrollment != null) {
            enrollment.setUserId(updatedEnrollment.getUserId());
            enrollment.setCourseId(updatedEnrollment.getCourseId());
            enrollment.setEnrollmentDate(updatedEnrollment.getEnrollmentDate());
            enrollment.setStatus(updatedEnrollment.getStatus());

            return enrollmentRepository.save(enrollment);
        }
        return null;
    }

    public boolean isAlreadyEnrolled(Long userId, Long courseId) {
        return enrollmentRepository.existsByUserIdAndCourseId(userId, courseId);
    }

    public void deleteEnrollmentById(Long id) {
        enrollmentRepository.deleteById(id);
    }
}
