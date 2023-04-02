import React from 'react';

const Property = ({ property }) => (
  <div key={property.id} className="listing">
    <div className="listing-img">
      <p className="listing-details-title">{property.title}</p>
      <img src={property.image} alt="property" style={{ width: "50px", height: "50px" }} />
      <img src={property.image1} alt="property" style={{ width: "50px", height: "50px" }} />
      <img src={property.image2} alt="property" style={{ width: "50px", height: "50px" }} />
    </div>
    <div className="listing-details">
      <div className="listing-details-top">
        <p className="listing-details-price">{property.price}€/mois</p>
        <p className="listing-details-location">{property.city}</p>
      </div>
      <div className="listing-details-bottom">
        <p className="listing-details-bedrooms">{property.bedrooms} chambres</p>
        <p className="listing-details-surface">{property.surface} m²</p>
        <p className="listing-details-link">
          <a href={property.listingURL} target="_blank" rel="noopener noreferrer">
            Lien vers l'annonce
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Property;
