const price = (price) => {
  Number.prototype.format = function (n, x) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
  };
  return price.format();
};

const listing = [
  {
    "id": 347795,
    "location_id": 8,
    "type": "House",
    "price": 3500000,
    "price_bin": "Very High",
    "date_added": "7/17/2019",
    "description":
       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly",
     "owner": {
         "name": "Emad Zaheer",
         "metaid": "0x00000",
     },
     "address" : {
         "location": "Model Town",
         "city": "Lahore",
         "province_name": "Punjab",
         "locality": "Model Town, Lahore, Punjab",
         "latitude": 31.48386866,
         "longitude": 74.3256855,
         "area": "6 Kanal",
     },
     "amenities" :[
       "Air Conditioning",
       "Security System",
       "Parking Space",
       "Gym Room",
       "Free WIFI",
       "Fire Place",
     ],
     "features": {
         "status": true,
         "bedrooms": 5,
         "baths": 3,
         "area_marla": 120,
         "area_sqft": 32670.12,
         "corner": true,
         "pool": true,
         "furnished": true,
     },
     "images": "image2.jpg",
     "featured": true,
     "category": "Apartments",
  },
  {
    "id": 348796,
    "location_id": 9,
    "type": "Apartment",
    "price": 4850000,
    "price_bin": "Very High",
    "date_added": "7/17/2019",
    "description":
       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly",
     "owner": {
         "name": "Abdullah Tariq",
         "metaid": "0x00000",
     },
     "address" : {
         "location": "Officers Colony",
         "city": "Lahore",
         "province_name": "Punjab",
         "locality": "Officers Colony, Lahore, Punjab",
         "latitude": 31.48386866,
         "longitude": 74.3256855,
         "area": "4 Kanal",
     },
     "amenities" :[
       "Air Conditioning",
       "Security System",
       "Parking Space",
       "Gym Room",
       "Free WIFI",
       "Fire Place",
     ],
     "features": {
         "status": true,
         "bedrooms": 5,
         "baths": 3,
         "area_marla": 120,
         "area_sqft": 32670.12,
         "corner": true,
         "pool": true,
         "furnished": true,
     },
     "images": "image8.jpg",
     "featured": true,
     "category": "Apartments",
  }
];

export default listing;
