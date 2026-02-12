package com.preppath.service;

import com.preppath.model.User;
import com.preppath.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


//Patrón de diseño: Service - La clase UserService actúa como un servicio que contiene la lógica de negocio relacionada con los usuarios, separando esta lógica de la capa de presentación (controladores) y la capa de acceso a datos (repositorios).
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    //Patrón de diseño: Dependency Injection - Las dependencias (UserRepository y PasswordEncoder) se inyectan a través del constructor, lo que facilita la gestión de dependencias y mejora la testabilidad de la clase.
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Create a new user
     * @param user user to create
     * @return created user
     */
    public User createUser(User user) {
        // Check if email already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists: " + user.getEmail());
        }

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    /**
     * Get user by ID
     * @param id user ID
     * @return user if found
     */
    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Get user by email
     * @param email user email
     * @return user if found
     */
    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Get all users
     * @return list of all users
     */
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Update user information
     * @param id user ID
     * @param userDetails updated user details
     * @return updated user
     */
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Update fields (don't update password here, separate method for that)
        user.setName(userDetails.getName());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        user.setLinkedinUrl(userDetails.getLinkedinUrl());
        user.setGithubUrl(userDetails.getGithubUrl());
        user.setCurrentPosition(userDetails.getCurrentPosition());
        user.setYearsOfExperience(userDetails.getYearsOfExperience());

        return userRepository.save(user);
    }

    /**
     * Update user password
     * @param id user ID
     * @param newPassword new password (will be encrypted)
     * @return updated user
     */
    public User updatePassword(Long id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }

    /**
     * Delete user
     * @param id user ID
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    /**
     * Check if email exists
     * @param email email to check
     * @return true if exists
     */
    @Transactional(readOnly = true)
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
}