package com.seb45main24.server.domain.accountprofile.controller;

import com.seb45main24.server.domain.accountprofile.dto.TechTagDto;
import com.seb45main24.server.domain.accountprofile.entity.TechTag;
import com.seb45main24.server.domain.accountprofile.mapper.TagMapper;
import com.seb45main24.server.domain.accountprofile.repository.TechTagRepository;
import com.seb45main24.server.domain.accountprofile.service.TagsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagController {
    private TagsService service;
    private TagMapper mapper;

    public TagController(TagsService service, TagMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping("/tech")
    public ResponseEntity getTechTagList() {
         List<TechTag> techTagDtoList = service.findAllTechTag();

        return new ResponseEntity<>(mapper.techTagListToTechTagDtoList(techTagDtoList), HttpStatus.OK);
    }
}
