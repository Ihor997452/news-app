package com.example.newandsheit.controller;

import com.example.newandsheit.model.Component;
import com.example.newandsheit.repo.ComponentRepository;
import com.example.newandsheit.service.ResourceService;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/components")
public class ComponentController {
    private final ComponentRepository repository;
    private final ResourceService service;

    public ComponentController(ComponentRepository repository, ResourceService service) {
        this.repository = repository;
        this.service = service;
    }

    @GetMapping("/")
    public List<Component> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Component> findById(@PathVariable Integer id) {
        return repository.findById(id);
    }

    @PostMapping("/save")
    @SneakyThrows
    public Component save(@RequestParam(required = false) Integer id,
                          @RequestParam(required = false) String text,
                          @RequestParam(required = false) String cssStyle,
                          @RequestParam(required = false) MultipartFile multipartFile) {
        Component imageComponent = Component.builder()
                .id(id)
                .text(text)
                .cssStyle(cssStyle)
                .resourcePath(multipartFile != null
                        ? service.store(multipartFile)
                        : null)
                .build();

        return repository.save(imageComponent);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
