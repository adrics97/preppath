package com.preppath.repository;

import com.preppath.model.PracticeSession;
import com.preppath.model.PracticeSession.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PracticeSessionRepository extends JpaRepository<PracticeSession, Long> {
    
    /**
     * Find all practice sessions for a specific user
     * @param userId user ID
     * @return List of user's practice sessions
     */
    List<PracticeSession> findByUserId(Long userId);
    
    /**
     * Find practice sessions for a specific question
     * @param questionId question ID
     * @return List of practice sessions for that question
     */
    List<PracticeSession> findByQuestionId(Long questionId);
    
    /**
     * Find practice sessions by user and question
     * @param userId user ID
     * @param questionId question ID
     * @return List of practice sessions
     */
    List<PracticeSession> findByUserIdAndQuestionId(Long userId, Long questionId);
    
    /**
     * Find recent practice sessions for a user (ordered by date)
     * @param userId user ID
     * @return List of practice sessions ordered by date descending
     */
    @Query("SELECT ps FROM PracticeSession ps WHERE ps.user.id = :userId " +
           "ORDER BY ps.practiceDate DESC")
    List<PracticeSession> findRecentByUserId(@Param("userId") Long userId);
    
    /**
     * Find practice sessions in a date range
     * @param userId user ID
     * @param startDate start date
     * @param endDate end date
     * @return List of practice sessions in that period
     */
    @Query("SELECT ps FROM PracticeSession ps WHERE ps.user.id = :userId " +
           "AND ps.practiceDate BETWEEN :startDate AND :endDate " +
           "ORDER BY ps.practiceDate DESC")
    List<PracticeSession> findByUserIdAndDateRange(
        @Param("userId") Long userId,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
    
    /**
     * Count practice sessions by user
     * @param userId user ID
     * @return Total number of practice sessions
     */
    Long countByUserId(Long userId);
    
    /**
     * Count practice sessions by user and rating
     * @param userId user ID
     * @param rating session rating
     * @return Number of sessions with that rating
     */
    Long countByUserIdAndRating(Long userId, Rating rating);
    
    /**
     * Get total time spent practicing by user
     * @param userId user ID
     * @return Total minutes spent practicing
     */
    @Query("SELECT COALESCE(SUM(ps.timeSpentMinutes), 0) FROM PracticeSession ps " +
           "WHERE ps.user.id = :userId")
    Integer getTotalTimeSpentByUserId(@Param("userId") Long userId);
    
    /**
     * Get practice sessions for the last N days
     * @param userId user ID
     * @param daysAgo number of days to look back
     * @return List of recent practice sessions
     */
    @Query("SELECT ps FROM PracticeSession ps WHERE ps.user.id = :userId " +
           "AND ps.practiceDate >= :cutoffDate ORDER BY ps.practiceDate DESC")
    List<PracticeSession> findRecentSessions(
        @Param("userId") Long userId,
        @Param("cutoffDate") LocalDateTime cutoffDate
    );
}
