package com.jobfinder.jobfinderproject.dto;

import lombok.Data;

@Data
public class UserProfileUpdateDTO {
    private String fullName;
    private String phone;
    private String experience;
    private String militaryStatus;
    private String cvText;
}
