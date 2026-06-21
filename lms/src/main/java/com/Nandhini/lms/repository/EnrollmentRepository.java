package com.Nandhini.lms.repository;

import com.Nandhini.lms.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByUserIdAndCourseId(
            Long userId,
            Long courseId
    );
}
