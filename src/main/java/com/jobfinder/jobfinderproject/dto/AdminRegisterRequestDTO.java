package com.jobfinder.jobfinderproject.dto;

import lombok.Data;

@Data
public class AdminRegisterRequestDTO {
    private String companyName;
    private String email;
    private String password;
}

