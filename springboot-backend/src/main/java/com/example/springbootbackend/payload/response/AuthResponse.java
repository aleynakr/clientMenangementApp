package com.example.springbootbackend.payload.response;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class AuthResponse {

        String message;
        Long userId;
        String accessToken;
        String refreshToken;


}
