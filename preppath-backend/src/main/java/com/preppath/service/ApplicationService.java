package com.preppath.service;

import com.preppath.model.Application;
import com.preppath.model.Application.ApplicationStatus;
import com.preppath.model.Company;
import com.preppath.model.User;
import com.preppath.repository.ApplicationRepository;
import com.preppath.repository.CompanyRepository;
import com.preppath.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    /**
     * Create a new application
     * @param application application to create
     * @param userId user ID
     * @param companyId company ID
     * @return created application
     */
    public Application createApplication(Application application, Long userId, Long companyId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + companyId));

        application.setUser(user);
        application.setCompany(company);

        // Set default application date if not provided
        if (application.getApplicationDate() == null) {
            application.setApplicationDate(LocalDate.now());
        }

        return applicationRepository.save(application);
    }

    /**
     * Get application by ID
     * @param id application ID
     * @return application if found
     */
    @Transactional(readOnly = true)
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    /**
     * Get all applications for a user
     * @param userId user ID
     * @return list of user's applications
     */
    @Transactional(readOnly = true)
    public List<Application> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserIdOrderedByDateDesc(userId);
    }

    /**
     * Get applications by user and status
     * @param userId user ID
     * @param status application status
     * @return list of applications with that status
     */
    @Transactional(readOnly = true)
    public List<Application> getApplicationsByUserIdAndStatus(Long userId, ApplicationStatus status) {
        return applicationRepository.findByUserIdAndStatus(userId, status);
    }

    /**
     * Get applications by user and company
     * @param userId user ID
     * @param companyId company ID
     * @return list of applications to that company
     */
    @Transactional(readOnly = true)
    public List<Application> getApplicationsByUserIdAndCompanyId(Long userId, Long companyId) {
        return applicationRepository.findByUserIdAndCompanyId(userId, companyId);
    }

    /**
     * Get applications in a date range
     * @param userId user ID
     * @param startDate start date
     * @param endDate end date
     * @return list of applications in that period
     */
    @Transactional(readOnly = true)
    public List<Application> getApplicationsByDateRange(Long userId, LocalDate startDate, LocalDate endDate) {
        return applicationRepository.findByUserIdAndDateRange(userId, startDate, endDate);
    }

    /**
     * Get upcoming interviews
     * @param userId user ID
     * @return list of applications with upcoming interviews
     */
    @Transactional(readOnly = true)
    public List<Application> getUpcomingInterviews(Long userId) {
        return applicationRepository.findUpcomingInterviews(userId, LocalDate.now());
    }

    /**
     * Update application
     * @param id application ID
     * @param applicationDetails updated application details
     * @return updated application
     */
    public Application updateApplication(Long id, Application applicationDetails) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));

        application.setPosition(applicationDetails.getPosition());
        application.setStatus(applicationDetails.getStatus());
        application.setJobUrl(applicationDetails.getJobUrl());
        application.setExpectedSalary(applicationDetails.getExpectedSalary());
        application.setSalaryCurrency(applicationDetails.getSalaryCurrency());
        application.setNotes(applicationDetails.getNotes());
        application.setInterviewDate(applicationDetails.getInterviewDate());
        application.setRejectionDate(applicationDetails.getRejectionDate());
        application.setOfferDate(applicationDetails.getOfferDate());
        application.setFeedback(applicationDetails.getFeedback());

        return applicationRepository.save(application);
    }

    /**
     * Update application status
     * @param id application ID
     * @param status new status
     * @return updated application
     */
    public Application updateApplicationStatus(Long id, ApplicationStatus status) {
        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with id: " + id));

        application.setStatus(status);

        // Auto-set dates based on status
        switch (status) {
            case REJECTED:
                if (application.getRejectionDate() == null) {
                    application.setRejectionDate(LocalDate.now());
                }
                break;
            case OFFER:
            case ACCEPTED:
                if (application.getOfferDate() == null) {
                    application.setOfferDate(LocalDate.now());
                }
                break;
        }

        return applicationRepository.save(application);
    }

    /**
     * Delete application
     * @param id application ID
     */
    public void deleteApplication(Long id) {
        if (!applicationRepository.existsById(id)) {
            throw new RuntimeException("Application not found with id: " + id);
        }
        applicationRepository.deleteById(id);
    }

    /**
     * Get application statistics for a user
     * @param userId user ID
     * @return map with statistics
     */
    @Transactional(readOnly = true)
    public Map<String, Object> getApplicationStats(Long userId) {
        Map<String, Object> stats = new HashMap<>();

        stats.put("total", applicationRepository.countByUserId(userId));
        stats.put("applied", applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.APPLIED));
        stats.put("screening", applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.SCREENING));
        stats.put("technical", applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.TECHNICAL));
        stats.put("final", applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.FINAL));
        stats.put("offer", applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.OFFER));
        stats.put("rejected", applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.REJECTED));
        stats.put("accepted", applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.ACCEPTED));
        stats.put("withdrawn", applicationRepository.countByUserIdAndStatus(userId, ApplicationStatus.WITHDRAWN));

        return stats;
    }
}