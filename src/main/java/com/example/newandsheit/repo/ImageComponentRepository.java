package com.example.newandsheit.repo;

import com.example.newandsheit.model.component.ImageComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageComponentRepository extends JpaRepository<ImageComponent, Long> {
}
