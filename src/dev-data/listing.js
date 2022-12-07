const price = (price) => {
  Number.prototype.format = function (n, x) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
  };
  return price.format();
};

const listing = [
  {
    id: 347795,
    type: "House",
    price: 3500000,
    date_added: "7/17/2019",
    images: "image2.jpg",
    featured: true,
    description:
      "Stunning large late 80’s contemporary home with soaring ceilings and windows, split levels, great floor plan including open dining and living room. Located in the beautiful hilly and treed, desirable Windmill Hill section of Desoto you are conveniently located to shops, dining, and 20 minutes to downtown Dallas.",
    owner: {
      name: "Emad Zaheer",
      metaid: "0x00000",
    },
    address: {
      location: "Model Town",
      city: "Lahore",
      province_name: "Punjab",
      latitude: 31.48386866,
      longitude: 74.3256855,
      area: "6 Kanal",
    },
    amenities: [
      "Air Conditioning",
      "Security System",
      "Parking Space",
      "Gym Room",
      "Free WIFI",
      "Fire Place",
    ],
    features: {
      status: true,
      bedrooms: 5,
      baths: 3,
      area_sqft: 32670.12,
      garage: true,
      pool: true,
      furnished: true,
    },
  },
  {
    id: 848796,
    type: "Apartment",
    price: 4850000,
    date_added: "7/17/2020",
    images: "image8.jpg",
    featured: true,
    description:
      "Excellent little home superbly located right off Old Fredericksburg Road!! The original owner is selling this home that backs up to a GREEN BELT. 3 bedrooms, 2 baths, with a covered back patio. The home also features a water softener, refrigerator, clothes washer, and clothes dryer!!! The roof was replaced in 2019, garage floor was professionally epoxied in 2019, exterior got new paint in 2019, and there has NEVER been a fire in the wood burning fireplace!!!",
    owner: {
      name: "Abdullah Tariq",
      metaid: "0x00000",
    },
    address: {
      location: "Officers Colony",
      city: "Lahore",
      province_name: "Punjab",
      latitude: 32.48386866,
      longitude: 75.3256855,
      area: "4 Kanal",
    },
    amenities: [
      "Air Conditioning",
      "Security System",
      "Parking Space",
      "Gym Room",
      "Free WIFI",
      "Fire Place",
    ],
    features: {
      status: true,
      bedrooms: 5,
      baths: 3,
      area_sqft: 32670.12,
      garage: true,
      pool: true,
      furnished: true,
    },
  },
  {
    id: 548796,
    type: "House",
    price: 9650000,
    date_added: "7/17/2022",
    images: "image5.jpg",
    featured: true,
    description:
      "Perfectly set on a tree-shaded lot, this North Waco beauty feels like home the minute you pull up. The living room is warm and inviting, centered by a wood-burning fireplace and built-in shelving. A spacious breakfast area looks out to the backyard and flows into the kitchen, where you’ll find a breakfast bar, double oven and built-in cook top.",
    owner: {
      name: "Amna Shiekh",
      metaid: "0x00000",
    },
    address: {
      location: "Askari 10",
      city: "Lahore",
      province_name: "Punjab",
      latitude: 33.48386866,
      longitude: 76.3256855,
      area: "15 Kanal",
    },
    amenities: [
      "Air Conditioning",
      "Security System",
      "Parking Space",
      "Gym Room",
      "Free WIFI",
      "Fire Place",
    ],
    features: {
      status: true,
      bedrooms: 8,
      baths: 6,
      area_sqft: 82670.12,
      garage: true,
      pool: true,
      furnished: true,
    },
  },
];

export default listing;
