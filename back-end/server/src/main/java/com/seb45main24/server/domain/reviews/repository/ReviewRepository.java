package com.seb45main24.server.domain.reviews.repository;

import com.seb45main24.server.domain.reviews.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    Page<Review> findAllByAccount_Id(Long accountId, Pageable pageable);
}
