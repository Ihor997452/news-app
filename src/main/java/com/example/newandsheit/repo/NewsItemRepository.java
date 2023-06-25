package com.example.newandsheit.repo;

import com.example.newandsheit.model.NewsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsItemRepository extends JpaRepository<NewsItem, Integer> {
}
