package com.skillexchange;

public class RequestResponseDTO {

    private String responseMessage;

    // ✅ NEW: receiver details (for sender visibility)
    private String receiverName;
    private String receiverContact;

    // ---------- getters & setters ----------

    public String getResponseMessage() {
        return responseMessage;
    }

    public void setResponseMessage(String responseMessage) {
        this.responseMessage = responseMessage;
    }

    public String getReceiverName() {
        return receiverName;
    }

    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }

    public String getReceiverContact() {
        return receiverContact;
    }

    public void setReceiverContact(String receiverContact) {
        this.receiverContact = receiverContact;
    }
}
