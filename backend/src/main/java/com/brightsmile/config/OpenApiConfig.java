package com.brightsmile.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI brightSmileOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("BrightSmile Dental Care REST API")
                        .description("Production-ready backend API documentation for managing client appointments and contact inquiries at BrightSmile Dental Care.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("BrightSmile Dental Clinic Systems Office")
                                .email("systems@brightsmiledental.com")
                                .url("https://brightsmiledental.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")));
    }
}
