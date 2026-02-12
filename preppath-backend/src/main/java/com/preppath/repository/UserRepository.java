package com.preppath.repository;

import com.preppath.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


//Patrón de diseño: Repository - La interfaz UserRepository actúa como un repositorio que proporciona una abstracción para acceder a los datos de los usuarios, permitiendo realizar operaciones CRUD sin exponer los detalles de la implementación de la base de datos.
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by email
     * @param email user's email
     * @return Optional containing user if found
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if user exists by email
     * @param email user's email
     * @return true if exists, false otherwise
     */
    Boolean existsByEmail(String email);
}
