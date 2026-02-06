package com.preppath.service;

import com.preppath.model.PracticeSession;
import com.preppath.model.PracticeSession.Rating;
import com.preppath.model.Question;
import com.preppath.model.User;
import com.preppath.repository.PracticeSessionRepository;
import com.preppath.repository.QuestionRepository;
import com.preppath.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PracticeSessionService {

    private final PracticeSessionRepository practiceSessionRepository;
    private final UserRepository userRepository;
    private final QuestionRepository questionRepository;
    private final QuestionService questionService;

    /**
     * Create a new practice session
     * @param session session to create
     * @param userId user ID
     * @param questionId question ID
     * @return created session
     */
    public PracticeSession createPracticeSession(PracticeSession session, Long userId, Long questionId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found with id: " + questionId));

        session.setUser(user);
        session.setQuestion(question);

        // Set practice date if not provided
        if (session.getPracticeDate() == null) {
            session.setPracticeDate(LocalDateTime.now());
        }

        // Increment the question's times practiced counter
        questionService.incrementTimesPracticed(questionId);

        return practiceSessionRepository.save(session);
    }

    /**
     * Get practice session by ID
     * @param id session ID
     * @return session if found
     */
    @Transactional(readOnly = true)
    public Optional<PracticeSession> getPracticeSessionById(Long id) {
        return practiceSessionRepository.findById(id);
    }

    /**
     * Get all practice sessions for a user
     * @param userId user ID
     * @return list of user's practice sessions
     */
    @Transactional(readOnly = true)
    public List<PracticeSession> getPracticeSessionsByUserId(Long userId) {
        return practiceSessionRepository.findRecentByUserId(userId);
    }

    /**
     * Get practice sessions for a specific question
     * @param questionId question ID
     * @return list of practice sessions
     */
    @Transactional(readOnly = true)
    public List<PracticeSession> getPracticeSessionsByQuestionId(Long questionId) {
        return practiceSessionRepository.findByQuestionId(questionId);
    }

    /**
     * Get practice sessions by user and question
     * @param userId user ID
     * @param questionId question ID
     * @return list of practice sessions
     */
    @Transactional(readOnly = true)
    public List<PracticeSession> getPracticeSessionsByUserIdAndQuestionId(Long userId, Long questionId) {
        return practiceSessionRepository.findByUserIdAndQuestionId(userId, questionId);
    }

    /**
     * Get practice sessions in a date range
     * @param userId user ID
     * @param startDate start date
     * @param endDate end date
     * @return list of practice sessions in that period
     */
    @Transactional(readOnly = true)
    public List<PracticeSession> getPracticeSessionsByDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return practiceSessionRepository.findByUserIdAndDateRange(userId, startDate, endDate);
    }

    /**
     * Get recent practice sessions (last N days)
     * @param userId user ID
     * @param days number of days to look back
     * @return list of recent practice sessions
     */
    @Transactional(readOnly = true)
    public List<PracticeSession> getRecentPracticeSessions(Long userId, int days) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusDays(days);
        return practiceSessionRepository.findRecentSessions(userId, cutoffDate);
    }

    /**
     * Update practice session
     * @param id session ID
     * @param sessionDetails updated session details
     * @return updated session
     */
    public PracticeSession updatePracticeSession(Long id, PracticeSession sessionDetails) {
        PracticeSession session = practiceSessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Practice session not found with id: " + id));

        session.setPracticeDate(sessionDetails.getPracticeDate());
        session.setRating(sessionDetails.getRating());
        session.setTimeSpentMinutes(sessionDetails.getTimeSpentMinutes());
        session.setNotes(sessionDetails.getNotes());
        session.setCompleted(sessionDetails.getCompleted());

        return practiceSessionRepository.save(session);
    }

    /**
     * Delete practice session
     * @param id session ID
     */
    public void deletePracticeSession(Long id) {
        if (!practiceSessionRepository.existsById(id)) {
            throw new RuntimeException("Practice session not found with id: " + id);
        }
        practiceSessionRepository.deleteById(id);
    }

    /**
     * Get practice statistics for a user
     * @param userId user ID
     * @return map with statistics
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getPracticeStats(Long userId) {
        Map<String, Object> stats = new HashMap<>();

        stats.put("totalSessions", practiceSessionRepository.countByUserId(userId));
        stats.put("totalTimeMinutes", practiceSessionRepository.getTotalTimeSpentByUserId(userId));

        // Count by rating
        Map<String, Long> byRating = new HashMap<>();
        for (Rating rating : Rating.values()) {
            byRating.put(rating.name(), practiceSessionRepository.countByUserIdAndRating(userId, rating));
        }
        stats.put("byRating", byRating);

        // Recent activity (last 7 days)
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        List<PracticeSession> recentSessions = practiceSessionRepository.findRecentSessions(userId, weekAgo);
        stats.put("sessionsLastWeek", recentSessions.size());

        return stats;
    }

    /**
     * Get study streak (consecutive days with practice)
     * @param userId user ID
     * @return number of consecutive days
     */
    @Transactional(readOnly = true)
    public int getStudyStreak(Long userId) {
        List<PracticeSession> sessions = practiceSessionRepository.findRecentByUserId(userId);

        if (sessions.isEmpty()) {
            return 0;
        }

        int streak = 0;
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime checkDate = today.toLocalDate().atStartOfDay();

        for (PracticeSession session : sessions) {
            LocalDateTime sessionDate = session.getPracticeDate().toLocalDate().atStartOfDay();

            // Check if session is from checkDate
            if (sessionDate.equals(checkDate)) {
                streak++;
                checkDate = checkDate.minusDays(1);
            } else if (sessionDate.isBefore(checkDate)) {
                // Gap in streak, break
                break;
            }
        }

        return streak;
    }
}