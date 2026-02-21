package com.skillexchange;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findByRequesterEmail(String requesterEmail);

    // ✅ NEW: requests received by user
    List<Request> findByReceiverEmail(String receiverEmail);
}

