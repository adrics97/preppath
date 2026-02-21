package com.preppath.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GithubAuthRequest {

    @NotBlank
    private String code;
}
