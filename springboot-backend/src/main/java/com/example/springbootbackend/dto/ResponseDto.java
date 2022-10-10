package com.example.springbootbackend.dto;

import java.util.List;
public class ResponseDto {

    private List<ClientDto> clientDto;
    private int totalClient;

    public ResponseDto(List<ClientDto> clientDto, int totalClient) {
        this.clientDto = clientDto;
        this.totalClient = totalClient;
    }

    public List<ClientDto> getClientDto() {
        return clientDto;
    }

    public void setClientDto(List<ClientDto> clientDto) {
        this.clientDto = clientDto;
    }

    public int getTotalClient() {
        return totalClient;
    }

    public void setTotalClient(int totalClient) {
        this.totalClient = totalClient;
    }
}
