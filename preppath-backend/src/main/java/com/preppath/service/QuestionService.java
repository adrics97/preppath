package com.preppath.service;

import com.preppath.model.Question;
import com.preppath.model.Question.Difficulty;
import com.preppath.model.Question.QuestionCategory;
import com.preppath.model.User;
import com.preppath.repository.QuestionRepository;
import com.preppath.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    /**
     * Create a new question
     * @param question question to create
     * @param userId user ID
     * @return created question
     */
    public Question createQuestion(Question question, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        question.setUser(user);

        // Initialize times practiced if not set
        if (question.getTimesPracticed() == null) {
            question.setTimesPracticed(0);
        }

        return questionRepository.save(question);
    }

    /**
     * Get question by ID
     * @param id question ID
     * @return question if found
     */
    @Transactional(readOnly = true)
    public Optional<Question> getQuestionById(Long id) {
        return questionRepository.findById(id);
    }

    /**
     * Get all questions for a user
     * @param userId user ID
     * @return list of user's questions
     */
    @Transactional(readOnly = true)
    public List<Question> getQuestionsByUserId(Long userId) {
        return questionRepository.findByUserId(userId);
    }

    /**
     * Get questions by category
     * @param userId user ID
     * @param category question category
     * @return list of questions in that category
     */
    @Transactional(readOnly = true)
    public List<Question> getQuestionsByCategory(Long userId, QuestionCategory category) {
        return questionRepository.findByUserIdAndCategory(userId, category);
    }

    /**
     * Get questions by difficulty
     * @param userId user ID
     * @param difficulty question difficulty
     * @return list of questions with that difficulty
     */
    @Transactional(readOnly = true)
    public List<Question> getQuestionsByDifficulty(Long userId, Difficulty difficulty) {
        return questionRepository.findByUserIdAndDifficulty(userId, difficulty);
    }

    /**
     * Get favorite questions
     * @param userId user ID
     * @return list of favorite questions
     */
    @Transactional(readOnly = true)
    public List<Question> getFavoriteQuestions(Long userId) {
        return questionRepository.findByUserIdAndIsFavoriteTrue(userId);
    }

    /**
     * Search questions by keyword
     * @param userId user ID
     * @param keyword search keyword
     * @return list of matching questions
     */
    @Transactional(readOnly = true)
    public List<Question> searchQuestions(Long userId, String keyword) {
        return questionRepository.searchByKeyword(userId, keyword);
    }

    /**
     * Get questions that need review (least practiced)
     * @param userId user ID
     * @return list of questions to review
     */
    @Transactional(readOnly = true)
    public List<Question> getQuestionsToReview(Long userId) {
        return questionRepository.findQuestionsToReview(userId);
    }

    /**
     * Update question
     * @param id question ID
     * @param questionDetails updated question details
     * @return updated question
     */
    public Question updateQuestion(Long id, Question questionDetails) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

        question.setTitle(questionDetails.getTitle());
        question.setDescription(questionDetails.getDescription());
        question.setCategory(questionDetails.getCategory());
        question.setDifficulty(questionDetails.getDifficulty());
        question.setAnswer(questionDetails.getAnswer());
        question.setHints(questionDetails.getHints());
        question.setNotes(questionDetails.getNotes());
        question.setSourceUrl(questionDetails.getSourceUrl());
        question.setIsFavorite(questionDetails.getIsFavorite());

        return questionRepository.save(question);
    }

    /**
     * Toggle favorite status
     * @param id question ID
     * @return updated question
     */
    public Question toggleFavorite(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

        question.setIsFavorite(!question.getIsFavorite());
        return questionRepository.save(question);
    }

    /**
     * Increment times practiced
     * @param id question ID
     * @return updated question
     */
    public Question incrementTimesPracticed(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

        question.setTimesPracticed(question.getTimesPracticed() + 1);
        return questionRepository.save(question);
    }

    /**
     * Delete question
     * @param id question ID
     */
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new RuntimeException("Question not found with id: " + id);
        }
        questionRepository.deleteById(id);
    }

    /**
     * Get question statistics for a user
     * @param userId user ID
     * @return map with statistics
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getQuestionStats(Long userId) {
        Map<String, Object> stats = new HashMap<>();

        stats.put("total", questionRepository.countByUserId(userId));
        stats.put("favorites", questionRepository.findByUserIdAndIsFavoriteTrue(userId).size());

        // Count by category
        Map<String, Long> byCategory = new HashMap<>();
        for (QuestionCategory category : QuestionCategory.values()) {
            byCategory.put(category.name(), questionRepository.countByUserIdAndCategory(userId, category));
        }
        stats.put("byCategory", byCategory);

        return stats;
    }
}