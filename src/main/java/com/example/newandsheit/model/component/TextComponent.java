package com.example.newandsheit.model.component;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class TextComponent extends Component {
    private String text;
}
