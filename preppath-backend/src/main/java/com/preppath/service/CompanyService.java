package com.preppath.service;

import com.preppath.model.Company;
import com.preppath.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CompanyService {

    private final CompanyRepository companyRepository;

    /**
     * Create a new company
     * @param company company to create
     * @return created company
     */
    public Company createCompany(Company company) {
        // Check if company with same name already exists
        Optional<Company> existing = companyRepository.findByNameIgnoreCase(company.getName());
        if (existing.isPresent()) {
            throw new RuntimeException("Company already exists with name: " + company.getName());
        }

        return companyRepository.save(company);
    }

    /**
     * Get company by ID
     * @param id company ID
     * @return company if found
     */
    @Transactional(readOnly = true)
    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    /**
     * Get company by name
     * @param name company name
     * @return company if found
     */
    @Transactional(readOnly = true)
    public Optional<Company> getCompanyByName(String name) {
        return companyRepository.findByNameIgnoreCase(name);
    }

    /**
     * Get all companies
     * @return list of all companies
     */
    @Transactional(readOnly = true)
    public List<Company> getAllCompanies() {
        return companyRepository.findAllOrderedByName();
    }

    /**
     * Search companies by keyword
     * @param keyword search keyword
     * @return list of matching companies
     */
    @Transactional(readOnly = true)
    public List<Company> searchCompanies(String keyword) {
        return companyRepository.findByNameContainingIgnoreCase(keyword);
    }

    /**
     * Get companies by location
     * @param location company location
     * @return list of companies in that location
     */
    @Transactional(readOnly = true)
    public List<Company> getCompaniesByLocation(String location) {
        return companyRepository.findByLocation(location);
    }

    /**
     * Get companies by industry
     * @param industry company industry
     * @return list of companies in that industry
     */
    @Transactional(readOnly = true)
    public List<Company> getCompaniesByIndustry(String industry) {
        return companyRepository.findByIndustry(industry);
    }

    /**
     * Update company information
     * @param id company ID
     * @param companyDetails updated company details
     * @return updated company
     */
    public Company updateCompany(Long id, Company companyDetails) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));

        company.setName(companyDetails.getName());
        company.setLocation(companyDetails.getLocation());
        company.setWebsiteUrl(companyDetails.getWebsiteUrl());
        company.setLinkedinUrl(companyDetails.getLinkedinUrl());
        company.setIndustry(companyDetails.getIndustry());
        company.setCompanySize(companyDetails.getCompanySize());
        company.setDescription(companyDetails.getDescription());
        company.setCulture(companyDetails.getCulture());

        return companyRepository.save(company);
    }

    /**
     * Delete company
     * @param id company ID
     */
    public void deleteCompany(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new RuntimeException("Company not found with id: " + id);
        }
        companyRepository.deleteById(id);
    }
}