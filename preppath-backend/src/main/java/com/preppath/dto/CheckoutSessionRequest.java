package com.preppath.dto;

import lombok.Data;

@Data
public class CheckoutSessionRequest {
    private Long userId;
    private String priceId;
    private String planName;
}