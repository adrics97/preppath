package com.preppath.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//Patrón de diseño: Data Transfer Object (DTO) - La clase UserResponse actúa como un DTO que se utiliza para transferir datos relacionados con el usuario entre diferentes capas de la aplicación (por ejemplo, entre el servicio y el controlador), encapsulando solo la información necesaria para la respuesta y evitando exponer detalles innecesarios del modelo de dominio.
//Patrón de diseño: Builder - La anotación @Builder de Lombok permite la creación de objetos UserResponse de manera flexible y legible, facilitando la construcción de instancias con solo los campos necesarios y mejorando la claridad del código al crear objetos complejos.
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String linkedinUrl;
    private String githubUrl;
    private String currentPosition;
    private Integer yearsOfExperience;
    private LocalDateTime createdAt;
}