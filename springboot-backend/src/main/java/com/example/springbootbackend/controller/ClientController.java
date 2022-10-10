
package com.example.springbootbackend.controller;

import com.example.springbootbackend.dto.AdminDto;
import com.example.springbootbackend.dto.ClientDto;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Client;
import com.example.springbootbackend.model.User;
import com.example.springbootbackend.repository.ClientRepository;
import com.example.springbootbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3004/")
@RestController
@RequestMapping("/api/v1")
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;


    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }




    private AdminDto convertAdminToDto (User user){
        AdminDto adminDto = new AdminDto();
        adminDto.setUsername(user.getUsername());
        adminDto.setPassword(user.getPassword());

        return adminDto;
    }

 @GetMapping("/all/clients")
    public List<ClientDto> getAllClients(){
        ArrayList<ClientDto> clientDtoList = new ArrayList<>();
        List<Client> clients;
        clients= (List<Client>) clientRepository.findAll();
        Collections.sort(clients);
    for(Client client :  clients)
            clientDtoList.add(convertClientToDto(client));
        return clientDtoList;
    }
    @GetMapping("/admin/clients")
    public List<ClientDto> getAllClientsAdmin(){
        ArrayList<ClientDto> clientDtoList = new ArrayList<>();
        List<Client> clients;
        clients= (List<Client>) clientRepository.findAll();
        Collections.sort(clients);
        for(Client client :  clients)
            clientDtoList.add(convertClientToDto(client));
        return clientDtoList;
    }


    @GetMapping("/all/clients/a")
    public List<ClientDto> getAllClientsByHeader(@RequestParam(required = false,name="firstName" ) Optional<String> firstName ,
                                                 @RequestParam(required = false,name="lastName")Optional<String> lastName) {

        ArrayList<ClientDto> clientDtoList = new ArrayList<>();
        List<Client> clients;
        if(firstName.isPresent() && lastName.isPresent()) {
            clients = clientRepository.findByFirstNameAndLastName(firstName.get(), lastName.get());
            clients.addAll(clientRepository.findByFirstNameAndLastName(lastName.get(),firstName.get()));
        }else if(firstName.isPresent()){
            clients = clientRepository.findByFirstName(firstName.get());
            clients.addAll(clientRepository.findByLastName(firstName.get()));
        }else if(lastName.isPresent()){
            clients = clientRepository.findByLastName(lastName.get());
        }else{
            return null;
        }

        Collections.sort(clients);

        for (Client client : clients)
            clientDtoList.add(convertClientToDto(client));

        return clientDtoList;
     }

    private Sort.Direction getSortDirection(String direction) {
        if (direction.equals("asc")) {
            return Sort.Direction.ASC;
        } else if (direction.equals("desc")) {
            return Sort.Direction.DESC;
        }

        return Sort.Direction.ASC;
    }





        @GetMapping("all/clients/p")
public List<ClientDto> getAllClientsByHeader(@RequestHeader(required = true, name = "pageNo") int pageNo,
                                             @RequestHeader(required = true, name = "pageSize") int pageSize,
                                          @RequestHeader(required = false, name = "sort") String[] sort )
        {
            List<Order> orders = new ArrayList<Order>();

            if (sort[0].contains(",")) {
                for (String sortOrder : sort) {
                    String[] _sort = sortOrder.split(",");
                    orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
                }
            } else {
                // sort=[field, direction]
                orders.add(new Order(getSortDirection(sort[1]), sort[0]));
            }
            Pageable pagingSort = PageRequest.of(pageNo, pageSize, Sort.by(orders));
            Page<Client> pageClient = clientRepository.findAll(pagingSort);
            List<Client> pages = new ArrayList<Client>(pageClient.getContent());



    List<ClientDto> dtoList = new ArrayList<>();

    for(Client client : pages)
        dtoList.add(convertClientToDto(client));

    return dtoList;

        }
//
//    @GetMapping("/admin/clients/p")
//    public List<ClientDto> getAllClientsByHeaderAdmin(@RequestHeader(required = true, name = "pageNo") int pageNo,
//                                                 @RequestHeader(required = true, name = "pageSize") int pageSize,
//                                                 @RequestHeader(required = false, name = "sort") String[] sort )
//    {
//        List<Order> orders = new ArrayList<Order>();
//
//        if (sort[0].contains(",")) {
//            for (String sortOrder : sort) {
//                String[] _sort = sortOrder.split(",");
//                orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
//            }
//        } else {
//            // sort=[field, direction]
//            orders.add(new Order(getSortDirection(sort[1]), sort[0]));
//        }
//        Pageable pagingSort = PageRequest.of(pageNo, pageSize, Sort.by(orders));
//        Page<Client> pageClient = clientRepository.findAll(pagingSort);
//        List<Client> pages = new ArrayList<Client>(pageClient.getContent());
//
//
//
//        List<ClientDto> dtoList = new ArrayList<>();
//
//        for(Client client : pages)
//            dtoList.add(convertClientToDto(client));
//
//        return dtoList;
//
//    }






    // create employee rest api
    @PostMapping("/admin/clients")
    public ClientDto createEmployee(@RequestBody ClientDto clientDto) {
        return convertClientToDto(clientRepository.save(convertDtoToClient(clientDto)));
    }





    // get employee by id rest api
    @GetMapping("/admin/{id}")
    public ResponseEntity getEmployeeById(@PathVariable Long id) {
        Optional<Client> client = clientRepository.findById(id);
        if(client.isPresent())
            return ResponseEntity.ok(convertClientToDto(client.get()));
        else
            return ResponseEntity.badRequest().body("No client found by given id: " + id);
    }

    // update employee rest api

    @PutMapping("/admin/{id}")
    public ResponseEntity<ClientDto> updateClient(@PathVariable Long id, @RequestBody ClientDto clientDtoDetails){
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

        client.setFirstName(clientDtoDetails.getFirstName());
        client.setLastName(clientDtoDetails.getLastName());
        client.setEmail(clientDtoDetails.getEmail());

        Client updatedClient = clientRepository.save(client);
        return ResponseEntity.ok(convertClientToDto(updatedClient));
    }

    // delete employee rest api

    @DeleteMapping("/admin/{id}")
    public ResponseEntity deleteEmployee(@PathVariable Long id){
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
        clientRepository.delete(client);
        return ResponseEntity.ok("deleted");
    }
    private Client convertDtoToClient (ClientDto clientDto){
        Client client = new Client();
        client.setEmail(clientDto.getEmail());
        client.setLastName(clientDto.getLastName());
        client.setFirstName(clientDto.getFirstName());
        client.setId(clientDto.getId());
        return client;
    }

    private ClientDto convertClientToDto (Client client){
        ClientDto clientDto = new ClientDto();
        clientDto.setEmail(client.getEmail());
        clientDto.setLastName(client.getLastName());
        clientDto.setFirstName(client.getFirstName());
        clientDto.setId(client.getId());
        return clientDto;
    }




}





 //   @GetMapping
 //   public ResponseEntity<List<ClientDto>> getAllEmployees(
 //           @RequestParam(required = true) Integer pageNo,
   //         @RequestParam(required = true,defaultValue = "10") Integer pageSize,
     //       @RequestParam(required = false) String sortBy)
//    {
  //      List<Client> list = clientService.getAllClientsByHeader(pageNo, pageSize, sortBy);
//
  //      return new ResponseEntity<List<ClientDto>>(list, new HttpHeaders(), HttpStatus.OK);
    //}


//}

