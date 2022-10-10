package com.example.springbootbackend.repository;
import com.example.springbootbackend.model.Client;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClientRepository extends PagingAndSortingRepository<Client,Long> {

    List<Client> findByFirstNameAndLastName(String firstName,String lastName);
    List<Client> findByFirstName(String firstName);
    List<Client> findByLastName(String lastName);


}
