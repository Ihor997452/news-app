package com.example.newandsheit;

import com.example.newandsheit.property.FileProperty;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(FileProperty.class)
public class NewAndSheitApplication {

    public static void main(String[] args) {
        SpringApplication.run(NewAndSheitApplication.class, args);
    }

}
