package com.seb45main24.server.domain.reviews.controller;

import com.seb45main24.server.domain.reviews.dto.ReviewPostDto;
import com.seb45main24.server.domain.reviews.entity.Review;
import com.seb45main24.server.domain.reviews.mapper.ReviewMapper;
import com.seb45main24.server.domain.reviews.repository.ReviewRepository;
import com.seb45main24.server.domain.reviews.service.ReviewService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import com.seb45main24.server.global.utils.UriCreator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    private final ReviewService reviewService;
    private final ReviewRepository reviewRepository;
    private final ReviewMapper mapper;


    public ReviewController(ReviewService reviewService,
                            ReviewRepository reviewRepository,
                            ReviewMapper mapper) {
        this.reviewService = reviewService;
        this.reviewRepository = reviewRepository;
        this.mapper = mapper;

    }

    @PostMapping("/{accountId}")
    public ResponseEntity<Review> postReview(@LoginAccountId Long loginAccountId,
                                             @PathVariable("accountId") Long accountId,
                                             @Valid @RequestBody ReviewPostDto reviewDto){
        reviewDto.setAccountId(accountId);

        Review review = reviewService.createReview(
                mapper.reviewPostDtoToReview(reviewDto), loginAccountId
        );

        URI location = UriCreator.createUri("/reviews", review.getReviewId());

        return ResponseEntity.created(location).build();
    }
}
