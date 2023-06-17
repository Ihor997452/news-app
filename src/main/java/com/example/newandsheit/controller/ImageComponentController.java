package com.example.newandsheit.controller;

import com.example.newandsheit.model.component.ImageComponent;
import com.example.newandsheit.repo.ImageComponentRepository;
import com.example.newandsheit.service.ImageService;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/image-components")
public class ImageComponentController {
    private final ImageComponentRepository repository;
    private final ImageService service;

    public ImageComponentController(ImageComponentRepository repository, ImageService service) {
        this.repository = repository;
        this.service = service;
    }

    @GetMapping("/")
    public List<ImageComponent> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<ImageComponent> findById(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping("/save")
    @SneakyThrows
    public ImageComponent save(@RequestParam MultipartFile multipartFile) {
        ImageComponent imageComponent = ImageComponent.builder()
                .imagePath(service.store(multipartFile))
                .build();

        return repository.save(imageComponent);
    }
}
