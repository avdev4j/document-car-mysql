package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Content;
import io.github.jhipster.application.repository.ContentRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing Content.
 */
@RestController
@RequestMapping("/api")
public class ContentResource {

    private final Logger log = LoggerFactory.getLogger(ContentResource.class);

    private static final String ENTITY_NAME = "content";

    private final ContentRepository contentRepository;

    public ContentResource(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    /**
     * POST  /contents : Create a new content.
     *
     * @param content the content to create
     * @return the ResponseEntity with status 201 (Created) and with body the new content, or with status 400 (Bad Request) if the content has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contents")
    @Timed
    public ResponseEntity<Content> createContent(@Valid @RequestBody Content content) throws URISyntaxException {
        log.debug("REST request to save Content : {}", content);
        if (content.getId() != null) {
            throw new BadRequestAlertException("A new content cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Content result = contentRepository.save(content);
        return ResponseEntity.created(new URI("/api/contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contents : Updates an existing content.
     *
     * @param content the content to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated content,
     * or with status 400 (Bad Request) if the content is not valid,
     * or with status 500 (Internal Server Error) if the content couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contents")
    @Timed
    public ResponseEntity<Content> updateContent(@Valid @RequestBody Content content) throws URISyntaxException {
        log.debug("REST request to update Content : {}", content);
        if (content.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Content result = contentRepository.save(content);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, content.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contents : get all the contents.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of contents in body
     */
    @GetMapping("/contents")
    @Timed
    public List<Content> getAllContents(@RequestParam(required = false) String filter) {
        if ("document-is-null".equals(filter)) {
            log.debug("REST request to get all Contents where document is null");
            return StreamSupport
                .stream(contentRepository.findAll().spliterator(), false)
                .filter(content -> content.getDocument() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Contents");
        return contentRepository.findAll();
    }

    /**
     * GET  /contents/:id : get the "id" content.
     *
     * @param id the id of the content to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the content, or with status 404 (Not Found)
     */
    @GetMapping("/contents/{id}")
    @Timed
    public ResponseEntity<Content> getContent(@PathVariable Long id) {
        log.debug("REST request to get Content : {}", id);
        Optional<Content> content = contentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(content);
    }

    /**
     * DELETE  /contents/:id : delete the "id" content.
     *
     * @param id the id of the content to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contents/{id}")
    @Timed
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        log.debug("REST request to delete Content : {}", id);

        contentRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
