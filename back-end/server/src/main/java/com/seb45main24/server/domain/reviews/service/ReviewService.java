package com.seb45main24.server.domain.reviews.service;

import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.reviews.entity.Review;
import com.seb45main24.server.domain.reviews.repository.ReviewRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ReviewService {
    @Autowired
    private final ReviewRepository reviewRepository;
    private final AccountService accountService;
    private final AccountRepository accountRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         AccountService accountService,
                         AccountRepository accountRepository) {
        this.reviewRepository = reviewRepository;
        this.accountService = accountService;
        this.accountRepository = accountRepository;
    }

    public Review createReview(Review review, Long accountId) {
        if (review.getAccount().getId().equals(accountId)) {
            throw new BusinessLogicException(ExceptionCode.NON_ACCESS);
        }

        return reviewRepository.save(review);
    }

    public Page<Review> findReviews(Long accountId, int page) {
        return reviewRepository.findAllByAccount_Id(accountId,
                PageRequest.of(page, 10, Sort.by("reviewId").descending()));
    }

}


