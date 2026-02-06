package com.preppath.controller;

import com.preppath.dto.CompanyRequest;
import com.preppath.dto.CompanyResponse;
import com.preppath.dto.MessageResponse;
import com.preppath.model.Company;
import com.preppath.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class CompanyController {

    private final CompanyService companyService;

    /**
     * Create a new company
     * POST /api/companies
     */
    @PostMapping
    public ResponseEntity<?> createCompany(@Valid @RequestBody CompanyRequest companyRequest) {
        try {
            Company company = Company.builder()
                    .name(companyRequest.getName())
                    .location(companyRequest.getLocation())
                    .websiteUrl(companyRequest.getWebsiteUrl())
                    .linkedinUrl(companyRequest.getLinkedinUrl())
                    .industry(companyRequest.getIndustry())
                    .companySize(companyRequest.getCompanySize())
                    .description(companyRequest.getDescription())
                    .culture(companyRequest.getCulture())
                    .build();

            Company savedCompany = companyService.createCompany(company);

            CompanyResponse response = mapToResponse(savedCompany);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Get all companies
     * GET /api/companies
     */
    @GetMapping
    public ResponseEntity<?> getAllCompanies() {
        try {
            List<Company> companies = companyService.getAllCompanies();
            List<CompanyResponse> response = companies.stream()
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
     * Get company by ID
     * GET /api/companies/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getCompanyById(@PathVariable Long id) {
        try {
            Company company = companyService.getCompanyById(id)
                    .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));

            CompanyResponse response = mapToResponse(company);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Search companies by keyword
     * GET /api/companies/search?keyword=google
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchCompanies(@RequestParam String keyword) {
        try {
            List<Company> companies = companyService.searchCompanies(keyword);
            List<CompanyResponse> response = companies.stream()
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
     * Get companies by location
     * GET /api/companies/location/{location}
     */
    @GetMapping("/location/{location}")
    public ResponseEntity<?> getCompaniesByLocation(@PathVariable String location) {
        try {
            List<Company> companies = companyService.getCompaniesByLocation(location);
            List<CompanyResponse> response = companies.stream()
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
     * Update company
     * PUT /api/companies/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompany(
            @PathVariable Long id,
            @Valid @RequestBody CompanyRequest companyRequest) {
        try {
            Company companyToUpdate = Company.builder()
                    .name(companyRequest.getName())
                    .location(companyRequest.getLocation())
                    .websiteUrl(companyRequest.getWebsiteUrl())
                    .linkedinUrl(companyRequest.getLinkedinUrl())
                    .industry(companyRequest.getIndustry())
                    .companySize(companyRequest.getCompanySize())
                    .description(companyRequest.getDescription())
                    .culture(companyRequest.getCulture())
                    .build();

            Company updatedCompany = companyService.updateCompany(id, companyToUpdate);

            CompanyResponse response = mapToResponse(updatedCompany);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    /**
     * Delete company
     * DELETE /api/companies/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable Long id) {
        try {
            companyService.deleteCompany(id);
            return ResponseEntity.ok(new MessageResponse("Company deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    // Helper method to map Company to CompanyResponse
    private CompanyResponse mapToResponse(Company company) {
        return CompanyResponse.builder()
                .id(company.getId())
                .name(company.getName())
                .location(company.getLocation())
                .websiteUrl(company.getWebsiteUrl())
                .linkedinUrl(company.getLinkedinUrl())
                .industry(company.getIndustry())
                .companySize(company.getCompanySize())
                .description(company.getDescription())
                .culture(company.getCulture())
                .createdAt(company.getCreatedAt())
                .build();
    }
}