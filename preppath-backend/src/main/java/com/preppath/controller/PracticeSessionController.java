package com.preppath.controller;

import com.preppath.dto.MessageResponse;
import com.preppath.dto.PracticeSessionRequest;
import com.preppath.dto.PracticeSessionResponse;
import com.preppath.dto.QuestionResponse;
import com.preppath.model.PracticeSession;
import com.preppath.security.UserDetailsImpl;
import com.preppath.service.PracticeSessionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/practice-sessions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class PracticeSessionController {

    private final PracticeSessionService practiceSessionService;

    /**
     * Create a new practice session
     * POST /api/practice-sessions
     */
    @PostMapping
    public ResponseEntity<?> createPracticeSession(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody PracticeSessionRequest sessionRequest) {
        try {
            PracticeSession session = PracticeSession.builder()
                    .practiceDate(sessionRequest.getPracticeDate() != null
                            ? sessionRequest.getPracticeDate()
                            : LocalDateTime.now())
                    .rating(sessionRequest.getRating())
                    .timeSpentMinutes(sessionRequest.getTimeSpentMinutes())
                    .notes(sessionRequest.getNotes())
                    .completed(sessionRequest.getCompleted() != null
                            ? sessionRequest.getCompleted()
                            : true)
                    .build();

            PracticeSession savedSession = practiceSessionService.createPracticeSession(
                    session,
                    userDetails.getId(),
                    sessionRequest.getQuestionId()
            );

            PracticeSessionResponse response = mapToResponse(savedSession);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get all practice sessions for current user
     * GET /api/practice-sessions
     */
    @GetMapping
    public ResponseEntity<?> getAllPracticeSessions(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            List<PracticeSession> sessions = practiceSessionService.getPracticeSessionsByUserId(userDetails.getId());
            List<PracticeSessionResponse> response = sessions.stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get practice session by ID
     * GET /api/practice-sessions/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getPracticeSessionById(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        try {
            PracticeSession session = practiceSessionService.getPracticeSessionById(id)
                    .orElseThrow(() -> new RuntimeException("Practice session not found with id: " + id));

            // Check if session belongs to current user
            if (!session.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to access this session"));
            }

            PracticeSessionResponse response = mapToResponse(session);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get practice sessions for a specific question
     * GET /api/practice-sessions/question/{questionId}
     */
    @GetMapping("/question/{questionId}")
    public ResponseEntity<?> getPracticeSessionsByQuestion(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long questionId) {
        try {
            List<PracticeSession> sessions = practiceSessionService
                    .getPracticeSessionsByUserIdAndQuestionId(userDetails.getId(), questionId);
            List<PracticeSessionResponse> response = sessions.stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get recent practice sessions (last N days)
     * GET /api/practice-sessions/recent?days=7
     */
    @GetMapping("/recent")
    public ResponseEntity<?> getRecentPracticeSessions(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam(defaultValue = "7") int days) {
        try {
            List<PracticeSession> sessions = practiceSessionService
                    .getRecentPracticeSessions(userDetails.getId(), days);
            List<PracticeSessionResponse> response = sessions.stream()
                    .map(this::mapToResponse)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get practice statistics
     * GET /api/practice-sessions/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getPracticeStats(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            Map<String, Object> stats = practiceSessionService.getPracticeStats(userDetails.getId());
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get study streak
     * GET /api/practice-sessions/streak
     */
    @GetMapping("/streak")
    public ResponseEntity<?> getStudyStreak(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            int streak = practiceSessionService.getStudyStreak(userDetails.getId());
            return ResponseEntity.ok(Map.of("streak", streak));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Update practice session
     * PUT /api/practice-sessions/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePracticeSession(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id,
            @Valid @RequestBody PracticeSessionRequest sessionRequest) {
        try {
            PracticeSession session = practiceSessionService.getPracticeSessionById(id)
                    .orElseThrow(() -> new RuntimeException("Practice session not found with id: " + id));

            // Check if session belongs to current user
            if (!session.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to update this session"));
            }

            PracticeSession sessionToUpdate = PracticeSession.builder()
                    .practiceDate(sessionRequest.getPracticeDate())
                    .rating(sessionRequest.getRating())
                    .timeSpentMinutes(sessionRequest.getTimeSpentMinutes())
                    .notes(sessionRequest.getNotes())
                    .completed(sessionRequest.getCompleted())
                    .build();

            PracticeSession updatedSession = practiceSessionService.updatePracticeSession(id, sessionToUpdate);

            PracticeSessionResponse response = mapToResponse(updatedSession);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Delete practice session
     * DELETE /api/practice-sessions/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePracticeSession(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        try {
            PracticeSession session = practiceSessionService.getPracticeSessionById(id)
                    .orElseThrow(() -> new RuntimeException("Practice session not found with id: " + id));

            // Check if session belongs to current user
            if (!session.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to delete this session"));
            }

            practiceSessionService.deletePracticeSession(id);
            return ResponseEntity.ok(new MessageResponse("Practice session deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    // Helper method to map PracticeSession to PracticeSessionResponse
    private PracticeSessionResponse mapToResponse(PracticeSession session) {
        QuestionResponse questionResponse = QuestionResponse.builder()
                .id(session.getQuestion().getId())
                .title(session.getQuestion().getTitle())
                .description(session.getQuestion().getDescription())
                .category(session.getQuestion().getCategory())
                .difficulty(session.getQuestion().getDifficulty())
                .answer(session.getQuestion().getAnswer())
                .hints(session.getQuestion().getHints())
                .notes(session.getQuestion().getNotes())
                .sourceUrl(session.getQuestion().getSourceUrl())
                .isFavorite(session.getQuestion().getIsFavorite())
                .timesPracticed(session.getQuestion().getTimesPracticed())
                .createdAt(session.getQuestion().getCreatedAt())
                .updatedAt(session.getQuestion().getUpdatedAt())
                .build();

        return PracticeSessionResponse.builder()
                .id(session.getId())
                .question(questionResponse)
                .practiceDate(session.getPracticeDate())
                .rating(session.getRating())
                .timeSpentMinutes(session.getTimeSpentMinutes())
                .notes(session.getNotes())
                .completed(session.getCompleted())
                .createdAt(session.getCreatedAt())
                .build();
    }
}