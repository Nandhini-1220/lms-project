package com.Nandhini.lms.controller;

import com.Nandhini.lms.entity.User;
import com.Nandhini.lms.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {

        List<User> users = userService.getAllUsers();

        for(User user : users) {

            if(user.getEmail().equals(loginUser.getEmail())
                    &&
                    user.getPassword().equals(loginUser.getPassword())) {

                return user;
            }
        }

        return null;
    }
}