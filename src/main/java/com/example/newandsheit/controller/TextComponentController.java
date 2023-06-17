package com.example.newandsheit.controller;

import com.example.newandsheit.model.component.TextComponent;
import com.example.newandsheit.repo.TextComponentRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/text-components")
public class TextComponentController {
    private final TextComponentRepository repository;

    public TextComponentController(TextComponentRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    public List<TextComponent> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<TextComponent> findById(@PathVariable Long id) {
        return repository.findById(id);
    }

    @PostMapping("/save")
    public TextComponent save(@RequestParam String text) {
        TextComponent textComponent = TextComponent.builder().text(text).build();
        return repository.save(textComponent);
    }
}

