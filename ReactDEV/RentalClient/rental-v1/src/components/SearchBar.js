import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';
import PropertyList from './PropertyList';
import Pagination from './Pagination';
import './SearchBar.css';

const SearchBar = () => {
const [address, setAddress] = useState('');
const [properties, setProperties] = useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [sort, setSort] = useState('');
const [sortOrder, setSortOrder] = useState('price-asc');
const [proximity, setProximity] = useState('');
const [propertyType, setPropertyType] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

  const fetchProperties = async (postalCodeAddress, currentPage) => {
    setLoading(true);
    // Effectuer une requête vers l'API Seloger
    const selogerOptions = {
      method: 'GET',
      url: 'https://seloger.p.rapidapi.com/properties/list',
      params: {
        zipCodes: postalCodeAddress,
        sort: sort,
        transactionType: 'location',
        pageNumber: currentPage,
        pageSize: 10,
        realtyTypes: propertyType,
        // Ajoutez les paramètres de proximité ici (en fonction de l'API)
      },
      headers: {
        'x-rapidapi-key': '4d6a8f6f06msh4f3c2a85c5d844bp195b10jsn03a2dab4b9b1',
        'x-rapidapi-host': 'seloger.p.rapidapi.com',
      },
    };

    try {
      const selogerResponse = await axios.request(selogerOptions);
      const listingsData = selogerResponse.data.items;

      // Récupérer les informations nécessaires pour chaque offre
      const propertiesData = listingsData.map((listing) => {
        return {
          id: listing.id,
          title: listing.title,
          price: listing.price,
          bedrooms: listing.bedrooms,
          city: listing.city,
          image: listing.photos[0],
          image1: listing.photos[1],
          image2: listing.photos[2],
          surface: listing.livingArea,
          listingURL: listing.permalink,
        };
      });

      setLoading(false);
      setProperties(propertiesData);
    } catch (error) {
      console.error(error);
      setLoading(false);s
      setError("Une erreur s'est produite lors de la récupération des données.");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Ici, vous devez récupérer à nouveau le code postal et mettre à jour les résultats
    // Pour simplifier, j'ai ajouté un nouvel état pour stocker le code postal
    const postalCodeAddress = storedPostalCodeAddress;
    fetchProperties(postalCodeAddress, newPage);
  };

  const sortProperties = (properties, order) => {
    return properties.sort((a, b) => {
      if (order === 'price-asc') {
        return a.price - b.price;
      } else if (order === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });
  };

  const filterProperties = (properties, propertyType) => {
    return properties.filter((property) => {
      if (propertyType === 'all') {
        return true;
      } else if (propertyType === 'house' && property.title.toLowerCase().includes('maison')) {
        return true;
      } else if (propertyType === 'apartment' && property.title.toLowerCase().includes('appartement')) {
        return true;
      } else if (propertyType === 'room' && property.title.toLowerCase().includes('chambre')) {
        return true;
      }
      return false;
    });
  };
  
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setProperties(sortProperties(properties, event.target.value));
  };

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
    setProperties(filterProperties(properties, event.target.value));
  };

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);

    // Effectuer une requête vers l'API Geocoding de Google pour obtenir l'adresse formattée
    const geocodingOptions = {
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        latlng: `${latLng.lat},${latLng.lng}`,
        key: 'AIzaSyCLQkWa3aZjC6TyXcFugxzCSDH9ghUlIi0'
      }
    };

    try {
      const geocodingResponse = await axios.request(geocodingOptions);
      const postalCodeAddress = geocodingResponse.data.results[0].address_components.find(component => component.types[0] === 'postal_code').long_name;

      fetchProperties(postalCodeAddress, 1);
    } catch (error) {
      console.error(error);
      setError("Une erreur s'est produite lors de la récupération des données.");
    }
  };

  return (
    <div className="App">
      <div className="hero">
        <h1 className="hero-title">Trouvez votre logement idéal</h1>
        <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className="search-bar">
              <input className="search-input" {...getInputProps({ placeholder: "Type address" })} />
              <div className="autocomplete-dropdown-container">
                {loading ? <div>Loading...</div> : null}
                {error && <div className="error-message">{error}</div>}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };

                  return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>

        <select value={propertyType} onChange={handlePropertyTypeChange}>
          <option value="all">Tous</option>
          <option value="house">Maison</option>
          <option value="apartment">Appartement</option>
          <option value="room">Chambre</option>
        </select>


      </div>
    
      
      {loading && <div>Recherche...</div>}
      <PropertyList properties={properties} />

      <Pagination currentPage={currentPage} handlePageChange={handlePageChange} />

    </div>
  );
};

export default SearchBar;