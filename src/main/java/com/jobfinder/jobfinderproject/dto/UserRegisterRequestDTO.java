package com.jobfinder.jobfinderproject.dto;

import lombok.Data;

@Data
public class UserRegisterRequestDTO {
    private String fullName;
    private String phone;
    private String experience;
    private String militaryStatus;
    private String cvText;
    private String email;
    private String password;
}
