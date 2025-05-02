package com.example.digital_fine_management_system.dto;

import java.util.List;

public class DataResponse<T> {
    private List<T> data;

    public DataResponse(List<T> data) {
        this.data = data;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }
}
