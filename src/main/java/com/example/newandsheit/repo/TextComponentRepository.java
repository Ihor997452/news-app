package com.example.newandsheit.repo;

import com.example.newandsheit.model.component.TextComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TextComponentRepository extends JpaRepository<TextComponent, Long> {
}
