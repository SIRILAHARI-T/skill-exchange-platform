package com.skillexchange;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ---------------- REGISTER ----------------
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email already in use"
            );
        }

        // Encrypt password
        user.setPassword(encoder.encode(user.getPassword()));

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }

    // ---------------- LOGIN ----------------
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginData) {

        User user = userRepository.findByEmail(loginData.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "User not found"
                ));

        if (!encoder.matches(loginData.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid password"
            );
        }

        // Do NOT send password back to frontend
        user.setPassword(null);

        return ResponseEntity.ok(user);
    }

    // ---------------- UPDATE PROFILE ----------------
    @PutMapping("/profile/{id}")
    public ResponseEntity<User> updateProfile(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        user.setUsername(updatedUser.getUsername());
        user.setBio(updatedUser.getBio());
        user.setPhone(updatedUser.getPhone());
        user.setCity(updatedUser.getCity());

        userRepository.save(user);

        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}
