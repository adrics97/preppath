package com.preppath.controller;

import com.preppath.dto.MessageResponse;
import com.preppath.dto.QuestionRequest;
import com.preppath.dto.QuestionResponse;
import com.preppath.model.Question;
import com.preppath.model.Question.Difficulty;
import com.preppath.model.Question.QuestionCategory;
import com.preppath.security.UserDetailsImpl;
import com.preppath.service.QuestionService;
import com.preppath.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class QuestionController {

    private final QuestionService questionService;
    private final SubscriptionService subscriptionService;

    /**
     * Create a new question
     * POST /api/questions
     */
    @PostMapping
    public ResponseEntity<?> createQuestion(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody QuestionRequest questionRequest) {
        try {
            // 🔥 VERIFICAR LÍMITE ANTES DE CREAR
            boolean canCreate = subscriptionService.canCreateQuestion(userDetails.getId());
            if (!canCreate) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You have reached the maximum number of questions for your plan. Please upgrade to Pro."));
            }

            Question question = Question.builder()
                    .title(questionRequest.getTitle())
                    .description(questionRequest.getDescription())
                    .category(questionRequest.getCategory())
                    .difficulty(questionRequest.getDifficulty() != null
                            ? questionRequest.getDifficulty()
                            : Difficulty.MEDIUM)
                    .answer(questionRequest.getAnswer())
                    .hints(questionRequest.getHints())
                    .notes(questionRequest.getNotes())
                    .sourceUrl(questionRequest.getSourceUrl())
                    .isFavorite(questionRequest.getIsFavorite() != null
                            ? questionRequest.getIsFavorite()
                            : false)
                    .build();

            Question savedQuestion = questionService.createQuestion(question, userDetails.getId());

            // 🔥 INCREMENTAR CONTADOR DESPUÉS DE CREAR
            subscriptionService.incrementQuestionCount(userDetails.getId());

            QuestionResponse response = mapToResponse(savedQuestion);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get all questions for current user
     * GET /api/questions
     */
    @GetMapping
    public ResponseEntity<?> getAllQuestions(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            List<Question> questions = questionService.getQuestionsByUserId(userDetails.getId());
            List<QuestionResponse> response = questions.stream()
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
     * Get question by ID
     * GET /api/questions/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getQuestionById(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        try {
            Question question = questionService.getQuestionById(id)
                    .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

            // Check if question belongs to current user
            if (!question.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to access this question"));
            }

            QuestionResponse response = mapToResponse(question);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get questions by category
     * GET /api/questions/category/{category}
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<?> getQuestionsByCategory(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable QuestionCategory category) {
        try {
            List<Question> questions = questionService.getQuestionsByCategory(userDetails.getId(), category);
            List<QuestionResponse> response = questions.stream()
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
     * Get questions by difficulty
     * GET /api/questions/difficulty/{difficulty}
     */
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<?> getQuestionsByDifficulty(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Difficulty difficulty) {
        try {
            List<Question> questions = questionService.getQuestionsByDifficulty(userDetails.getId(), difficulty);
            List<QuestionResponse> response = questions.stream()
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
     * Get favorite questions
     * GET /api/questions/favorites
     */
    @GetMapping("/favorites")
    public ResponseEntity<?> getFavoriteQuestions(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            List<Question> questions = questionService.getFavoriteQuestions(userDetails.getId());
            List<QuestionResponse> response = questions.stream()
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
     * Get questions to review (least practiced)
     * GET /api/questions/review
     */
    @GetMapping("/review")
    public ResponseEntity<?> getQuestionsToReview(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            List<Question> questions = questionService.getQuestionsToReview(userDetails.getId());
            List<QuestionResponse> response = questions.stream()
                    .limit(10) // Limit to 10 questions
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
     * Search questions by keyword
     * GET /api/questions/search?keyword=array
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchQuestions(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestParam String keyword) {
        try {
            List<Question> questions = questionService.searchQuestions(userDetails.getId(), keyword);
            List<QuestionResponse> response = questions.stream()
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
     * Get question statistics
     * GET /api/questions/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getQuestionStats(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            Map<String, Object> stats = questionService.getQuestionStats(userDetails.getId());
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Update question
     * PUT /api/questions/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQuestion(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id,
            @Valid @RequestBody QuestionRequest questionRequest) {
        try {
            Question question = questionService.getQuestionById(id)
                    .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

            // Check if question belongs to current user
            if (!question.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to update this question"));
            }

            Question questionToUpdate = Question.builder()
                    .title(questionRequest.getTitle())
                    .description(questionRequest.getDescription())
                    .category(questionRequest.getCategory())
                    .difficulty(questionRequest.getDifficulty())
                    .answer(questionRequest.getAnswer())
                    .hints(questionRequest.getHints())
                    .notes(questionRequest.getNotes())
                    .sourceUrl(questionRequest.getSourceUrl())
                    .isFavorite(questionRequest.getIsFavorite())
                    .build();

            Question updatedQuestion = questionService.updateQuestion(id, questionToUpdate);

            QuestionResponse response = mapToResponse(updatedQuestion);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Toggle favorite status
     * PATCH /api/questions/{id}/favorite
     */
    @PatchMapping("/{id}/favorite")
    public ResponseEntity<?> toggleFavorite(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        try {
            Question question = questionService.getQuestionById(id)
                    .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

            // Check if question belongs to current user
            if (!question.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to update this question"));
            }

            Question updatedQuestion = questionService.toggleFavorite(id);

            QuestionResponse response = mapToResponse(updatedQuestion);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Delete question
     * DELETE /api/questions/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQuestion(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        try {
            Question question = questionService.getQuestionById(id)
                    .orElseThrow(() -> new RuntimeException("Question not found with id: " + id));

            // Check if question belongs to current user
            if (!question.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to delete this question"));
            }

            questionService.deleteQuestion(id);

            // 🔥 DECREMENTAR CONTADOR DESPUÉS DE ELIMINAR
            subscriptionService.decrementQuestionCount(userDetails.getId());

            return ResponseEntity.ok(new MessageResponse("Question deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    // Helper method to map Question to QuestionResponse
    private QuestionResponse mapToResponse(Question question) {
        return QuestionResponse.builder()
                .id(question.getId())
                .title(question.getTitle())
                .description(question.getDescription())
                .category(question.getCategory())
                .difficulty(question.getDifficulty())
                .answer(question.getAnswer())
                .hints(question.getHints())
                .notes(question.getNotes())
                .sourceUrl(question.getSourceUrl())
                .isFavorite(question.getIsFavorite())
                .timesPracticed(question.getTimesPracticed())
                .createdAt(question.getCreatedAt())
                .updatedAt(question.getUpdatedAt())
                .build();
    }
}