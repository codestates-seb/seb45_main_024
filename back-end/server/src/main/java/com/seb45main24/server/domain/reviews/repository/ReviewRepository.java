package com.seb45main24.server.domain.reviews.repository;

import com.seb45main24.server.domain.reviews.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
