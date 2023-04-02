import React from 'react';
import Property from './Property';

const PropertyList = ({ properties }) => (
  <div className="listings-container">
    {properties.map((property) => (
      <Property key={property.id} property={property} />
    ))}
  </div>
);

export default PropertyList;
