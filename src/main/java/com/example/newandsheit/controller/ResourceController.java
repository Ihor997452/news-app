package com.example.newandsheit.controller;

import com.example.newandsheit.service.ResourceService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.SneakyThrows;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/resources")
public class ResourceController {
    private final ResourceService service;

    public ResourceController(ResourceService service) {
        this.service = service;
    }

    @GetMapping("/{resourceName}")
    @SneakyThrows
    public ResponseEntity<Resource> get(@PathVariable String resourceName, HttpServletRequest request) {
        Resource resource = service.get(resourceName);

        String contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{resourceName}")
    public void delete(@PathVariable String resourceName) {
        service.delete(resourceName);
    }
}
