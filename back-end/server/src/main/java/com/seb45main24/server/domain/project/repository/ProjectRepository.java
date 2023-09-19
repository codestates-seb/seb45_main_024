package com.seb45main24.server.domain.project.repository;

import com.seb45main24.server.domain.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    @Query("SELECT p FROM Project p WHERE p.account.id= :accountId")
    List<Project> findByAccountId(@Param("accountId") Long accountId);

    @Query("SELECT p FROM Project p WHERE p.memberBoard.id= :memberBoardId")
    List<Project> findByMemberBoardId(@Param("memberBoardId") Long memberBoardId);
}
