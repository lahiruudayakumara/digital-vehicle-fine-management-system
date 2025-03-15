package com.example.digital_fine_management_system.model.user;

public enum Role {
    ADMIN("Administrator"),
    POLICE_OFFICER("Police Officer"),
    RIDER("Rider"),
    DIVISION_ADMIN("Division Administrator");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }
}