package com.example.newandsheit.model;

import jakarta.persistence.*;
import lombok.*;

import java.lang.annotation.Annotation;

@Getter
@Setter
@ToString
@NoArgsConstructor

@Entity
public class Component extends JpaEntity {
    private String text;
    private String cssStyle;
    private String resourcePath;

    @Builder
    public Component(Integer id, String text, String cssStyle, String resourcePath) {
        super(id);
        this.text = text;
        this.cssStyle = cssStyle;
        this.resourcePath = resourcePath;
    }
}
