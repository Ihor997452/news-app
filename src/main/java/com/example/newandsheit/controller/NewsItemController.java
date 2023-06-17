package com.example.newandsheit.controller;

import com.example.newandsheit.model.NewsItem;
import com.example.newandsheit.repo.NewsItemRepository;
import com.example.newandsheit.service.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/news")
public class NewsItemController {

    private final NewsItemRepository repository;
    private final ImageService service;

    public NewsItemController(NewsItemRepository repository, ImageService service) {
        this.repository = repository;
        this.service = service;
    }

    @GetMapping("/")
    public List<NewsItem> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<NewsItem> findById(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping("/save")
    @SneakyThrows
    public NewsItem save(@RequestParam String json,
                         @RequestParam MultipartFile multipartFile) {
        ObjectMapper objectMapper = new ObjectMapper();
        NewsItem newsItem = objectMapper.readValue(json, NewsItem.class);
        System.out.println(newsItem);

        newsItem.setImagePath(service.store(multipartFile));
        return repository.save(newsItem);
    }
}
