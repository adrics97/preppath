package com.preppath.controller;

import com.preppath.dto.ApplicationRequest;
import com.preppath.dto.ApplicationResponse;
import com.preppath.dto.CompanyResponse;
import com.preppath.dto.MessageResponse;
import com.preppath.model.Application;
import com.preppath.model.Application.ApplicationStatus;
import com.preppath.security.UserDetailsImpl;
import com.preppath.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class ApplicationController {

    private final ApplicationService applicationService;

    /**
     * Create a new application
     * POST /api/applications
     */
    @PostMapping
    public ResponseEntity<?> createApplication(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @Valid @RequestBody ApplicationRequest applicationRequest) {
        try {
            Application application = Application.builder()
                    .position(applicationRequest.getPosition())
                    .applicationDate(applicationRequest.getApplicationDate() != null
                            ? applicationRequest.getApplicationDate()
                            : LocalDate.now())
                    .status(applicationRequest.getStatus() != null
                            ? applicationRequest.getStatus()
                            : ApplicationStatus.APPLIED)
                    .jobUrl(applicationRequest.getJobUrl())
                    .expectedSalary(applicationRequest.getExpectedSalary())
                    .salaryCurrency(applicationRequest.getSalaryCurrency())
                    .notes(applicationRequest.getNotes())
                    .interviewDate(applicationRequest.getInterviewDate())
                    .feedback(applicationRequest.getFeedback())
                    .build();

            Application savedApplication = applicationService.createApplication(
                    application,
                    userDetails.getId(),
                    applicationRequest.getCompanyId()
            );

            ApplicationResponse response = mapToResponse(savedApplication);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get all applications for current user
     * GET /api/applications
     */
    @GetMapping
    public ResponseEntity<?> getAllApplications(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            List<Application> applications = applicationService.getApplicationsByUserId(userDetails.getId());
            List<ApplicationResponse> response = applications.stream()
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
     * Get application by ID
     * GET /api/applications/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getApplicationById(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        try {
            Application application = applicationService.getApplicationById(id)
                    .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));

            // Check if application belongs to current user
            if (!application.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to access this application"));
            }

            ApplicationResponse response = mapToResponse(application);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get applications by status
     * GET /api/applications/status/{status}
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getApplicationsByStatus(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable ApplicationStatus status) {
        try {
            List<Application> applications = applicationService
                    .getApplicationsByUserIdAndStatus(userDetails.getId(), status);
            List<ApplicationResponse> response = applications.stream()
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
     * Get upcoming interviews
     * GET /api/applications/interviews/upcoming
     */
    @GetMapping("/interviews/upcoming")
    public ResponseEntity<?> getUpcomingInterviews(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            List<Application> applications = applicationService.getUpcomingInterviews(userDetails.getId());
            List<ApplicationResponse> response = applications.stream()
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
     * Get application statistics
     * GET /api/applications/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<?> getApplicationStats(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        try {
            Map<String, Object> stats = applicationService.getApplicationStats(userDetails.getId());
            return ResponseEntity.ok(stats);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Update application
     * PUT /api/applications/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateApplication(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id,
            @Valid @RequestBody ApplicationRequest applicationRequest) {
        try {
            Application application = applicationService.getApplicationById(id)
                    .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));

            // Check if application belongs to current user
            if (!application.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to update this application"));
            }

            Application applicationToUpdate = Application.builder()
                    .position(applicationRequest.getPosition())
                    .status(applicationRequest.getStatus())
                    .jobUrl(applicationRequest.getJobUrl())
                    .expectedSalary(applicationRequest.getExpectedSalary())
                    .salaryCurrency(applicationRequest.getSalaryCurrency())
                    .notes(applicationRequest.getNotes())
                    .interviewDate(applicationRequest.getInterviewDate())
                    .feedback(applicationRequest.getFeedback())
                    .build();

            Application updatedApplication = applicationService.updateApplication(id, applicationToUpdate);

            ApplicationResponse response = mapToResponse(updatedApplication);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Update application status
     * PATCH /api/applications/{id}/status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id,
            @RequestParam ApplicationStatus status) {
        try {
            Application application = applicationService.getApplicationById(id)
                    .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));

            // Check if application belongs to current user
            if (!application.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to update this application"));
            }

            Application updatedApplication = applicationService.updateApplicationStatus(id, status);

            ApplicationResponse response = mapToResponse(updatedApplication);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Delete application
     * DELETE /api/applications/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteApplication(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        try {
            Application application = applicationService.getApplicationById(id)
                    .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));

            // Check if application belongs to current user
            if (!application.getUser().getId().equals(userDetails.getId())) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Error: You don't have permission to delete this application"));
            }

            applicationService.deleteApplication(id);
            return ResponseEntity.ok(new MessageResponse("Application deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    // Helper method to map Application to ApplicationResponse
    private ApplicationResponse mapToResponse(Application application) {
        CompanyResponse companyResponse = CompanyResponse.builder()
                .id(application.getCompany().getId())
                .name(application.getCompany().getName())
                .location(application.getCompany().getLocation())
                .websiteUrl(application.getCompany().getWebsiteUrl())
                .linkedinUrl(application.getCompany().getLinkedinUrl())
                .industry(application.getCompany().getIndustry())
                .companySize(application.getCompany().getCompanySize())
                .description(application.getCompany().getDescription())
                .culture(application.getCompany().getCulture())
                .createdAt(application.getCompany().getCreatedAt())
                .build();

        return ApplicationResponse.builder()
                .id(application.getId())
                .position(application.getPosition())
                .company(companyResponse)
                .applicationDate(application.getApplicationDate())
                .status(application.getStatus())
                .jobUrl(application.getJobUrl())
                .expectedSalary(application.getExpectedSalary())
                .salaryCurrency(application.getSalaryCurrency())
                .notes(application.getNotes())
                .interviewDate(application.getInterviewDate())
                .rejectionDate(application.getRejectionDate())
                .offerDate(application.getOfferDate())
                .feedback(application.getFeedback())
                .createdAt(application.getCreatedAt())
                .updatedAt(application.getUpdatedAt())
                .build();
    }
}