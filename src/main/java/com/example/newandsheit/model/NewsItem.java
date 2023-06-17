package com.example.newandsheit.model;

import com.example.newandsheit.model.component.Component;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class NewsItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String imagePath;
    private String caption;

    @OneToMany
    private List<Component> components;
}
