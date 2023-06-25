package com.example.newandsheit.service;

import com.example.newandsheit.property.FileProperty;
import lombok.SneakyThrows;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

@Service
public class ResourceService {
    private final Path storageLocation;

    public ResourceService(FileProperty property) {
        this.storageLocation = Paths.get(property.getUploadDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.storageLocation);
        } catch (Exception ex) {
            //ignore
        }
    }

    @SneakyThrows
    public String store(MultipartFile multipartFile) {
        String fileName = new Date().getTime() + "_" + multipartFile.getOriginalFilename();

        Path target = this.storageLocation.resolve(fileName);
        Files.write(target, multipartFile.getBytes());

        return fileName;
    }

    @SneakyThrows
    public Resource get(String fileName) {
        try {
            Path filePath = this.storageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new Exception();
            }
        } catch (MalformedURLException ex) {
            throw new Exception("File not found " + fileName, ex);
        }
    }

    @SneakyThrows
    public void delete(String fileName) {
        Path target = this.storageLocation.resolve(fileName);
        Files.delete(target);
    }
}
