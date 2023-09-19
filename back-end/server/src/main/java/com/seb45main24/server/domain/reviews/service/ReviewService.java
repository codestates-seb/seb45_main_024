package com.seb45main24.server.domain.reviews.service;

import com.seb45main24.server.domain.account.entity.Account;
import com.seb45main24.server.domain.account.repository.AccountRepository;
import com.seb45main24.server.domain.account.service.AccountService;
import com.seb45main24.server.domain.project.entity.Project;
import com.seb45main24.server.domain.project.repository.ProjectRepository;
import com.seb45main24.server.domain.reviews.entity.Review;
import com.seb45main24.server.domain.reviews.repository.ReviewRepository;
import com.seb45main24.server.global.exception.advice.BusinessLogicException;
import com.seb45main24.server.global.exception.exceptionCode.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ReviewService {
    @Autowired
    private final ReviewRepository reviewRepository;
    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final ProjectRepository projectRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         AccountService accountService,
                         AccountRepository accountRepository,
                         ProjectRepository projectRepository) {
        this.reviewRepository = reviewRepository;
        this.accountService = accountService;
        this.accountRepository = accountRepository;
        this.projectRepository = projectRepository;
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
        List<Review> reviewList = reviewRepository.findAllByRevieweeId(revieweeId);
        return reviewList;


    }

    public boolean authorizeReview(Long loginAccountId, Long revieweeId, List<Project> projectList) {
        boolean isLoginAccount = false;
        boolean isrevieweeId = false;

        for (int i = 0; i < projectList.size(); i++) {
            if (projectList.get(i).getAccount().getId() == loginAccountId) {
                isLoginAccount = true;
            } else if (projectList.get(i).getAccount().getId() == revieweeId) {
                isrevieweeId = true;
            }
        }
        return isLoginAccount && isrevieweeId;


    }
}



