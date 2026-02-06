package com.preppath.repository;

import com.preppath.model.Question;
import com.preppath.model.Question.Difficulty;
import com.preppath.model.Question.QuestionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    /**
     * Find all questions for a specific user
     * @param userId user ID
     * @return List of user's questions
     */
    List<Question> findByUserId(Long userId);
    
    /**
     * Find questions by user and category
     * @param userId user ID
     * @param category question category
     * @return List of questions in that category
     */
    List<Question> findByUserIdAndCategory(Long userId, QuestionCategory category);
    
    /**
     * Find questions by user and difficulty
     * @param userId user ID
     * @param difficulty question difficulty
     * @return List of questions with that difficulty
     */
    List<Question> findByUserIdAndDifficulty(Long userId, Difficulty difficulty);
    
    /**
     * Find favorite questions for a user
     * @param userId user ID
     * @return List of favorite questions
     */
    List<Question> findByUserIdAndIsFavoriteTrue(Long userId);
    
    /**
     * Search questions by title or description (case-insensitive)
     * @param userId user ID
     * @param keyword search keyword
     * @return List of matching questions
     */
    @Query("SELECT q FROM Question q WHERE q.user.id = :userId " +
           "AND (LOWER(q.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(q.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Question> searchByKeyword(
        @Param("userId") Long userId,
        @Param("keyword") String keyword
    );
    
    /**
     * Get questions that need review (practiced least)
     * @param userId user ID
     * @param limit number of questions to return
     * @return List of questions ordered by times practiced (ascending)
     */
    @Query("SELECT q FROM Question q WHERE q.user.id = :userId " +
           "ORDER BY q.timesPracticed ASC, q.createdAt DESC")
    List<Question> findQuestionsToReview(@Param("userId") Long userId);
    
    /**
     * Count questions by user and category
     * @param userId user ID
     * @param category question category
     * @return Number of questions
     */
    Long countByUserIdAndCategory(Long userId, QuestionCategory category);
    
    /**
     * Count total questions for a user
     * @param userId user ID
     * @return Total number of questions
     */
    Long countByUserId(Long userId);
}
