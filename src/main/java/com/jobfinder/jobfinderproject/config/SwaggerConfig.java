package com.jobfinder.jobfinderproject.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Job Finder API")
                        .version("1.0.0")
                        .description("Kullanıcı ve admin işlemleri için REST API dökümantasyonu.")
                        .contact(new Contact().name("Rukiye").email("ornek@eposta.com"))
                );
    }
}
