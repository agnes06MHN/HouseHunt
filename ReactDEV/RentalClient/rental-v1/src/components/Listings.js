// Listings.js

function Listings({ listings }) {
  return (
    <div>
      {listings && listings.map((listing) => (
        <div key={listing.id}>
          <h2>{listing.title}</h2>
          <p>{listing.description}</p>
          <p>{listing.price}</p>
          <img src={listing.photos[0]} alt={listing.title} />
        </div>
      ))}
    </div>
  );
}

export default Listings;
