package com.example.springbootbackend.model;

import javax.persistence.*;

@Entity
@Table(name="clients")
public class Client implements Comparable<Client>{
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "email")
    private String email;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public int compareTo(Client client) {
        if(firstName.compareTo(client.getFirstName())>0){
            return 1;
        }else if(firstName.compareTo(client.getFirstName())<0){
            return -1;
        }else{
            return Integer.compare(lastName.compareTo(client.getLastName()), 0);
        }
    }
}
