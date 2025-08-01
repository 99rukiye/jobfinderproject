package com.jobfinder.jobfinderproject.service;

import com.jobfinder.jobfinderproject.entity.Job;
import com.jobfinder.jobfinderproject.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;

    public Page<Job> getJobsFiltered(String experience, String militaryStatus, Pageable pageable) {
        return jobRepository.findByExperienceRequiredContainingIgnoreCaseAndMilitaryStatusRequiredIgnoreCase(
                experience, militaryStatus, pageable
        );
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }
}
