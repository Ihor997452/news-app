package com.example.newandsheit.controller;

import com.example.newandsheit.model.Component;
import com.example.newandsheit.model.NewsItem;
import com.example.newandsheit.repo.NewsItemRepository;
import com.example.newandsheit.service.ResourceService;
import com.fasterxml.jackson.core.type.TypeReference;
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
    private final ResourceService resourceService;

    public NewsItemController(NewsItemRepository repository, ResourceService resourceService) {
        this.repository = repository;
        this.resourceService = resourceService;
    }

    @GetMapping("/")
    public List<NewsItem> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<NewsItem> findById(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @PostMapping("/save")
    @SneakyThrows
    public NewsItem save(@RequestParam(required = false) Integer id,
                         @RequestParam String title,
                         @RequestParam String caption,
                         @RequestParam(required = false) String componentsJson,
                         @RequestParam MultipartFile multipartFile) {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Component> components = (objectMapper.readValue(componentsJson, new TypeReference<List<Component>>() {}));

        NewsItem newsItem = NewsItem.builder()
                .id(id)
                .title(title)
                .caption(caption)
                .components(components)
                .imagePath(resourceService.store(multipartFile))
                .build();
        return repository.save(newsItem);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
