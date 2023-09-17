package com.seb45main24.server.domain.reviews.service;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.reviews.dto.ReviewResponseDto;
import com.seb45main24.server.domain.reviews.entity.Review;
import com.seb45main24.server.domain.reviews.repository.ReviewRepository;
import com.seb45main24.server.global.argumentresolver.LoginAccountId;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

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

    public Review createReview(Long loginAccountId,
                               Review review, Long revieweeId) {
        Account reviewer = accountRepository.findById(loginAccountId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        Account reviewee = accountRepository.findById(revieweeId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_ACCOUNT));

        if (loginAccountId.equals(revieweeId)) {
            throw new BusinessLogicException(ExceptionCode.NON_ACCESS);
        }

        review.setReviewer(reviewer);
        review.setReviewee(reviewee);

        return reviewRepository.save(review);
    }

    public List<Review> findReviews(Long revieweeId) {
        return reviewRepository.findAllByRevieweeId(revieweeId);







    }
}



