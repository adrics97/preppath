package com.preppath.repository;

import com.preppath.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    
    /**
     * Find company by name (case-insensitive)
     * @param name company name
     * @return Optional containing company if found
     */
    Optional<Company> findByNameIgnoreCase(String name);
    
    /**
     * Search companies by name containing keyword (case-insensitive)
     * @param keyword search keyword
     * @return List of matching companies
     */
    List<Company> findByNameContainingIgnoreCase(String keyword);
    
    /**
     * Find companies by location
     * @param location company location
     * @return List of companies in that location
     */
    List<Company> findByLocation(String location);
    
    /**
     * Find companies by industry
     * @param industry company industry
     * @return List of companies in that industry
     */
    List<Company> findByIndustry(String industry);
    
    /**
     * Get all companies ordered by name
     * @return List of companies sorted alphabetically
     */
    @Query("SELECT c FROM Company c ORDER BY c.name ASC")
    List<Company> findAllOrderedByName();
}
