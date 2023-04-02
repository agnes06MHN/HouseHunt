package dev.agnes.selogerAPI;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentalService {
    @Autowired
    private RentalRepository rentalRepository;
    public List<Rental> allRentals(){
        return rentalRepository.findAll();
    }

    public Optional<Rental>  singleRental(ObjectId id){
        return rentalRepository.findById(id);
    }
}
