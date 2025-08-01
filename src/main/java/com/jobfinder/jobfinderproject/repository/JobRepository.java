package com.jobfinder.jobfinderproject.repository;

import com.jobfinder.jobfinderproject.entity.Job;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findByExperienceRequiredContainingIgnoreCaseAndMilitaryStatusRequiredIgnoreCase(
            String experience, String militaryStatus, Pageable pageable
    );
}
