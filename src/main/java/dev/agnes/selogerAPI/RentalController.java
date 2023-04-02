package dev.agnes.selogerAPI;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/rentals")
public class RentalController {
    @Autowired
    private RentalService rentalService;
    @GetMapping
    public ResponseEntity<List<Rental>> getAllRentals(){
        return new ResponseEntity<List<Rental>>(rentalService.allRentals(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Rental>> getSingleRental(@PathVariable ObjectId id){
        return new ResponseEntity<Optional<Rental>>(rentalService.singleRental(id), HttpStatus.OK);
    }
}
