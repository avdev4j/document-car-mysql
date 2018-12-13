package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Document;

import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    @EntityGraph(attributePaths = "content")
    Optional<Document> findOneById(Long id);

}
