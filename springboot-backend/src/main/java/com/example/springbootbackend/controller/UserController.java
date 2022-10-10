package com.example.springbootbackend.controller;

import com.example.springbootbackend.exception.UserNotFoundException;
import com.example.springbootbackend.model.User;
import com.example.springbootbackend.payload.response.UserInfoResponse;
import com.example.springbootbackend.security.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3004/")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;

        public UserController(UserService userService) {
            this.userService = userService;
        }

        @GetMapping
        public List<UserInfoResponse> getAllUsers(){
            return userService.getAllUsers().stream().map(u -> new UserInfoResponse(u)).collect(Collectors.toList());
        }

        @PostMapping
        public ResponseEntity<Void> createUser(@RequestBody User newUser) {
            User user = userService.saveOneUser(newUser);
            if(user != null)
                return new ResponseEntity<>(HttpStatus.CREATED);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        @GetMapping("/{userId}")
        public UserInfoResponse getOneUser(@PathVariable Long userId) {
            User user = userService.getOneUserById(userId);
            if(user == null) {
                throw new UserNotFoundException();
            }
            return new UserInfoResponse(user);
        }

        @PutMapping("/{userId}")
        public ResponseEntity<Void> updateOneUser(@PathVariable Long userId, @RequestBody User newUser) {
            User user = userService.updateOneUser(userId, newUser);
            if(user != null)
                return new ResponseEntity<>(HttpStatus.OK);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

        }

        @DeleteMapping("/{userId}")
        public void deleteOneUser(@PathVariable Long userId) {
            userService.deleteById(userId);
        }



        @ExceptionHandler(UserNotFoundException.class)
        @ResponseStatus(HttpStatus.NOT_FOUND)
        private void handleUserNotFound() {

        }


}
