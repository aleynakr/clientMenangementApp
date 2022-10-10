package com.example.springbootbackend.payload.response;

import com.example.springbootbackend.model.User;
import lombok.Data;

import java.util.List;
@Data
public class UserInfoResponse {
    Long id;
    String userName;

    public UserInfoResponse(User entity) {
        this.id = entity.getId();

        this.userName = entity.getUsername();
    }

}
