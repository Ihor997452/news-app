package com.example.newandsheit.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor

@Entity
public class NewsItem extends JpaEntity {
    private String title;
    private String imagePath;
    private String caption;

    @OneToMany
    private List<Component> components;

    @Builder
    public NewsItem(Integer id, String title, String imagePath, String caption, List<Component> components) {
        super(id);
        this.title = title;
        this.imagePath = imagePath;
        this.caption = caption;
        this.components = components;
    }
}
