package com.preppath.repository;

import com.preppath.model.Application;
import com.preppath.model.Application.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
    /**
     * Find all applications for a specific user
     * @param userId user ID
     * @return List of user's applications
     */
    List<Application> findByUserId(Long userId);
    
    /**
     * Find applications by user and status
     * @param userId user ID
     * @param status application status
     * @return List of applications with that status
     */
    List<Application> findByUserIdAndStatus(Long userId, ApplicationStatus status);
    
    /**
     * Find applications by user and company
     * @param userId user ID
     * @param companyId company ID
     * @return List of applications to that company
     */
    List<Application> findByUserIdAndCompanyId(Long userId, Long companyId);
    
    /**
     * Find applications by user ordered by date (newest first)
     * @param userId user ID
     * @return List of applications sorted by date descending
     */
    @Query("SELECT a FROM Application a WHERE a.user.id = :userId ORDER BY a.applicationDate DESC")
    List<Application> findByUserIdOrderedByDateDesc(@Param("userId") Long userId);
    
    /**
     * Find applications in a date range for a user
     * @param userId user ID
     * @param startDate start date
     * @param endDate end date
     * @return List of applications in that period
     */
    @Query("SELECT a FROM Application a WHERE a.user.id = :userId " +
           "AND a.applicationDate BETWEEN :startDate AND :endDate " +
           "ORDER BY a.applicationDate DESC")
    List<Application> findByUserIdAndDateRange(
        @Param("userId") Long userId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
    
    /**
     * Count applications by user and status
     * @param userId user ID
     * @param status application status
     * @return Number of applications
     */
    Long countByUserIdAndStatus(Long userId, ApplicationStatus status);
    
    /**
     * Count total applications for a user
     * @param userId user ID
     * @return Total number of applications
     */
    Long countByUserId(Long userId);
    
    /**
     * Get applications with upcoming interviews
     * @param userId user ID
     * @param today today's date
     * @return List of applications with future interview dates
     */
    @Query("SELECT a FROM Application a WHERE a.user.id = :userId " +
           "AND a.interviewDate >= :today ORDER BY a.interviewDate ASC")
    List<Application> findUpcomingInterviews(
        @Param("userId") Long userId,
        @Param("today") LocalDate today
    );
}
