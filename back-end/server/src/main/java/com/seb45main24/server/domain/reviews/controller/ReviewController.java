package com.seb45main24.server.domain.reviews.controller;

import com.seb45main24.server.domain.pagination.MultiResponseDto;
import com.seb45main24.server.domain.reviews.dto.ReviewPostDto;
import com.seb45main24.server.domain.reviews.dto.ReviewResponseDto;
import com.seb45main24.server.domain.reviews.entity.Review;
import com.seb45main24.server.domain.reviews.mapper.ReviewMapper;
import com.seb45main24.server.domain.reviews.repository.ReviewRepository;
import com.seb45main24.server.domain.reviews.service.ReviewService;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import com.seb45main24.server.global.utils.UriCreator;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/mypages/reviews")
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

    @PostMapping("/{revieweeId}")
    public ResponseEntity<Review> postReview(@LoginAccountId Long loginAccountId,
                                             @PathVariable("revieweeId") Long revieweeId,
                                             @Valid @RequestBody ReviewPostDto reviewDto) {
        reviewDto.setRevieweeId(revieweeId);

        Review review = reviewService.createReview(
                loginAccountId, mapper.reviewPostDtoToReview(reviewDto), revieweeId);

        URI location = UriCreator.createUri("/mypages/reviews", review.getReviewId());

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/{revieweeId}")
    public ResponseEntity getReviews(@LoginAccountId Long loginAccountId,
                                     @PathVariable("revieweeId") Long revieweeId) {
        List<Review> reviewList = reviewService.findReviews(revieweeId);

        List<ReviewResponseDto> response = mapper.reviewsToReviewResponseDtos(reviewList);

        return new ResponseEntity<>(response, HttpStatus.OK);


    }

}
