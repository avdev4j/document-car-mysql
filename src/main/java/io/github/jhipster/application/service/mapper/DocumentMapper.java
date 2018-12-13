package io.github.jhipster.application.service.mapper;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.github.jhipster.application.domain.Document;

@Service
public class DocumentMapper {
   private final Logger log = LoggerFactory.getLogger(DocumentMapper.class);
   public Set<Document> multiPartFilesToDocuments(List<MultipartFile> files){
       return files.stream()
           .map((this::multiPartFileToDocument))
           .collect(Collectors.toSet());
   }

   public Document multiPartFileToDocument(MultipartFile file) {
       Document document = new Document();
       document.setTitle(file.getOriginalFilename());
       document.setSize(file.getSize());
       document.setMimeType(file.getContentType());
       try {
           document.addContent(file.getBytes());
       } catch (IOException e) {
           log.error(e.getMessage());
       }

       return document;
   }
}