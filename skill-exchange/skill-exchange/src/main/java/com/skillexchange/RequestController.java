package com.skillexchange;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/requests")
@CrossOrigin(origins = "http://localhost:3000")
public class RequestController {

    private final RequestRepository requestRepository;

    public RequestController(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    // ---------------- CREATE REQUEST ----------------
    @PostMapping
    public Request sendRequest(@RequestBody Request request) {
        return requestRepository.save(request);
    }

    // ---------------- SENT REQUESTS ----------------
    @GetMapping("/my")
    public List<Request> getMyRequests(@RequestParam String email) {
        return requestRepository.findByRequesterEmail(email);
    }

    // ---------------- RECEIVED REQUESTS ----------------
    @GetMapping("/received")
    public List<Request> getReceivedRequests(@RequestParam String email) {
        return requestRepository.findByReceiverEmail(email);
    }

    // ---------------- ACCEPT REQUEST ----------------
    @PutMapping("/{id}/accept")
    public Request acceptRequest(
            @PathVariable Long id,
            @RequestBody RequestResponseDTO body
    ) {
        Request req = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus("ACCEPTED");

        // ✅ NULL-SAFE (prevents React crash / spam)
        if (body != null && body.getResponseMessage() != null) {
            req.setResponseMessage(body.getResponseMessage());
        }

        return requestRepository.save(req);
    }

    // ---------------- REJECT REQUEST ----------------
    @PutMapping("/{id}/reject")
    public Request rejectRequest(
            @PathVariable Long id,
            @RequestBody RequestResponseDTO body
    ) {
        Request req = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        req.setStatus("REJECTED");

        // ✅ NULL-SAFE
        if (body != null && body.getResponseMessage() != null) {
            req.setResponseMessage(body.getResponseMessage());
        }

        return requestRepository.save(req);
    }
}

