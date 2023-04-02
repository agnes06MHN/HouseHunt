package dev.agnes.selogerAPI;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "rentals")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rental {
    @Id
    private ObjectId id;
    private String publicationId;
    private String thirdPartyId;
    private String title;
    private String permalink;
    private int bedrooms;
    private String city;
    private int price;
    private int rooms;

    private List<String> photos;



}
