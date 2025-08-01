package com.jobfinder.jobfinderproject.controller;

import com.jobfinder.jobfinderproject.entity.Job;
import com.jobfinder.jobfinderproject.service.JobService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @GetMapping("/filter")
    public ResponseEntity<Page<Job>> getFilteredJobs(
            @RequestParam String experience,
            @RequestParam String militaryStatus,
            Pageable pageable) {
        return ResponseEntity.ok(jobService.getJobsFiltered(experience, militaryStatus, pageable));
    }

    @PostMapping("/create")
    public ResponseEntity<Job> createJob(@RequestBody Job job) {
        return ResponseEntity.ok(jobService.createJob(job));
    }
}
