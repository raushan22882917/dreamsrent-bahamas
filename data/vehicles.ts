import { Vehicle, BookingExtra } from '../types/rental';

export const ALL_LOCATIONS = [
  'Nassau Airport (NAS)',
  'Paradise Island',
  'Cable Beach',
  'Freeport Hub',
  'Downtown Harbour'
];

export const VEHICLE_CATEGORIES = [
  'All',
  'Luxury',
  'Sport',
  'SUV / 4x4',
  'Sedan',
  'Convertible',
  'Economy'
];

export const BOOKING_EXTRAS: BookingExtra[] = [
  {
    id: 'extra-gps',
    name: 'GPS Navigation System',
    description: 'Real-time turn-by-turn navigation with live traffic updates',
    price: 15,
    priceType: 'per_day'
  },
  {
    id: 'extra-child-seat',
    name: 'Child Safety Seat',
    description: 'ISOFIX certified premium child & booster seat',
    price: 10,
    priceType: 'per_day'
  },
  {
    id: 'extra-additional-driver',
    name: 'Additional Driver License',
    description: 'Authorize an additional registered driver for the entire rental',
    price: 25,
    priceType: 'fixed'
  },
  {
    id: 'extra-insurance',
    name: 'Full Comprehensive Damage Waiver',
    description: 'Zero deductible protection covering collision, theft, and tires',
    price: 25,
    priceType: 'per_day'
  },
  {
    id: 'extra-wifi',
    name: 'Portable 5G Wi-Fi Hotspot',
    description: 'Unlimited high-speed internet hotspot for up to 5 devices',
    price: 12,
    priceType: 'per_day'
  }
];

export const VEHICLES_DATA: Vehicle[] = [
  {
    id: 'car-1',
    slug: '2024-tesla-model-3',
    title: '2024 Tesla Model 3 Long Range',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    category: 'Economy',
    pricePerDay: 110,
    hourlyPrice: 20,
    deposit: 200,
    featuredImage: '/images/cars/car-05.jpg',
    galleryImages: [
      '/images/cars/car-05.jpg',
      '/images/cars/car-01.jpg',
      '/images/cars/car-02.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Electric',
      seats: 5,
      doors: 4,
      luggage: '3 Bags',
      engine: 'Dual Motor AWD',
      airConditioning: true
    },
    features: [
      'Autopilot & Lane Assist',
      'Multi-zone A/C',
      'Navigation system',
      'Premium Sound System',
      'Bluetooth & Wireless Charging',
      'Keyless Start',
      'Heated front seats',
      '360 Camera'
    ],
    location: 'Nassau Airport (NAS)',
    rating: 4.9,
    reviewsCount: 38,
    status: 'Available',
    licensePlate: 'BS-7492',
    vin: '5YJ3E1EB8NF129841',
    featured: true
  },
  {
    id: 'car-2',
    slug: '2023-mercedes-c300-amg',
    title: '2023 Mercedes-Benz C300 AMG',
    brand: 'Mercedes-Benz',
    model: 'C300 AMG',
    year: 2023,
    category: 'Luxury',
    pricePerDay: 125,
    hourlyPrice: 25,
    deposit: 250,
    featuredImage: '/images/cars/car-01.jpg',
    galleryImages: [
      '/images/cars/car-01.jpg',
      '/images/cars/car-03.jpg',
      '/images/cars/car-04.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 5,
      doors: 4,
      luggage: '3 Bags',
      engine: '2.0L Turbo Inline-4',
      airConditioning: true
    },
    features: [
      'AMG Sport Package',
      'Panoramic Sunroof',
      'Burmester 3D Surround',
      'Multi-zone A/C',
      'Apple CarPlay & Android Auto',
      'Adaptive Cruise Control',
      'Memory seat',
      'Keyless Start'
    ],
    location: 'Paradise Island',
    rating: 4.8,
    reviewsCount: 42,
    status: 'Available',
    licensePlate: 'BS-8831',
    vin: 'W1KZF8DB8PA109283',
    featured: true
  },
  {
    id: 'car-3',
    slug: '2024-bmw-4-series-convertible',
    title: '2024 BMW 4 Series Convertible',
    brand: 'BMW',
    model: '430i Convertible',
    year: 2024,
    category: 'Convertible',
    pricePerDay: 140,
    hourlyPrice: 28,
    deposit: 300,
    featuredImage: '/images/cars/car-02.jpg',
    galleryImages: [
      '/images/cars/car-02.jpg',
      '/images/cars/car-04.jpg',
      '/images/cars/car-05.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 4,
      doors: 2,
      luggage: '2 Bags',
      engine: '2.0L BMW TwinPower Turbo',
      airConditioning: true
    },
    features: [
      'Power Retractable Soft Top',
      'Heated Seats & Neck Warmers',
      'Harman Kardon Sound',
      'Live Cockpit Professional',
      'Apple CarPlay',
      'Parking Assistant',
      'Ambient Lighting'
    ],
    location: 'Cable Beach',
    rating: 5.0,
    reviewsCount: 29,
    status: 'Available',
    licensePlate: 'BS-9912',
    vin: 'WBA43AR08PCF49102',
    featured: true
  },
  {
    id: 'car-4',
    slug: '2023-audi-q7-quattro',
    title: '2023 Audi Q7 Quattro 7-Seater',
    brand: 'Audi',
    model: 'Q7 Quattro',
    year: 2023,
    category: 'SUV / 4x4',
    pricePerDay: 135,
    hourlyPrice: 26,
    deposit: 250,
    featuredImage: '/images/cars/car-03.jpg',
    galleryImages: [
      '/images/cars/car-03.jpg',
      '/images/cars/car-06.jpg',
      '/images/cars/car-09.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 7,
      doors: 5,
      luggage: '5 Bags',
      engine: '3.0L TFSI V6 Quattro',
      airConditioning: true
    },
    features: [
      'Quattro All-Wheel Drive',
      '3rd Row Power Folding Seats',
      'Bang & Olufsen 3D Sound',
      'Virtual Cockpit Plus',
      'Four-zone Climate Control',
      'Panoramic Sunroof',
      'Lane Departure Warning'
    ],
    location: 'Nassau Airport (NAS)',
    rating: 4.9,
    reviewsCount: 51,
    status: 'Available',
    licensePlate: 'BS-6102',
    vin: 'WA1VAAF76PD019284',
    featured: true
  },
  {
    id: 'car-5',
    slug: '2024-porsche-911-carrera-s',
    title: '2024 Porsche 911 Carrera S',
    brand: 'Porsche',
    model: '911 Carrera S',
    year: 2024,
    category: 'Sport',
    pricePerDay: 250,
    hourlyPrice: 50,
    deposit: 500,
    featuredImage: '/images/cars/car-04.jpg',
    galleryImages: [
      '/images/cars/car-04.jpg',
      '/images/cars/car-02.jpg',
      '/images/cars/car-07.jpg'
    ],
    specs: {
      transmission: 'Dual-Clutch (PDK)',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 4,
      doors: 2,
      luggage: '2 Bags',
      engine: '3.0L Twin-Turbo Flat-6 (443 HP)',
      airConditioning: true
    },
    features: [
      'Sport Chrono Package',
      'PASM Sport Suspension',
      'BOSE High-End Audio',
      'Active Aerodynamics',
      'Launch Control',
      'Sport Exhaust System'
    ],
    location: 'Paradise Island',
    rating: 5.0,
    reviewsCount: 34,
    status: 'Available',
    licensePlate: 'BS-9110',
    vin: 'WP0AB2A98PS192831',
    featured: true
  },
  {
    id: 'car-6',
    slug: '2023-range-rover-sport',
    title: '2023 Range Rover Sport Dynamic',
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    year: 2023,
    category: 'Luxury',
    pricePerDay: 180,
    hourlyPrice: 35,
    deposit: 350,
    featuredImage: '/images/cars/car-06.jpg',
    galleryImages: [
      '/images/cars/car-06.jpg',
      '/images/cars/car-03.jpg',
      '/images/cars/mp-vehicle-01.png'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 5,
      doors: 5,
      luggage: '4 Bags',
      engine: '3.0L Turbocharged Mild Hybrid',
      airConditioning: true
    },
    features: [
      'Electronic Air Suspension',
      'Meridian 3D Sound',
      'Pivi Pro 13.1 Touchscreen',
      'Terrain Response 2',
      'Heated & Cooled Seats',
      'Soft-Close Doors'
    ],
    location: 'Cable Beach',
    rating: 4.9,
    reviewsCount: 47,
    status: 'Available',
    licensePlate: 'BS-4410',
    vin: 'SALWR2V48PA109284',
    featured: true
  },
  {
    id: 'car-7',
    slug: '2024-ford-mustang-gt',
    title: '2024 Ford Mustang GT Premium 5.0L',
    brand: 'Ford',
    model: 'Mustang GT',
    year: 2024,
    category: 'Sport',
    pricePerDay: 115,
    hourlyPrice: 22,
    deposit: 200,
    featuredImage: '/images/cars/car-07.jpg',
    galleryImages: [
      '/images/cars/car-07.jpg',
      '/images/cars/car-08.jpg',
      '/images/cars/car-04.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 4,
      doors: 2,
      luggage: '2 Bags',
      engine: '5.0L Coyote V8 (486 HP)',
      airConditioning: true
    },
    features: [
      'Active Valve Exhaust',
      'Brembo Brake System',
      'Digital Cockpit',
      'Apple CarPlay & Track Apps',
      'B&O Sound System',
      'Leather Sport Seats'
    ],
    location: 'Nassau Airport (NAS)',
    rating: 4.8,
    reviewsCount: 63,
    status: 'Available',
    licensePlate: 'BS-5000',
    vin: '1FA6P8CF4R5102948',
    featured: true
  },
  {
    id: 'car-8',
    slug: '2023-chevrolet-camaro-ss',
    title: '2023 Chevrolet Camaro SS V8',
    brand: 'Chevrolet',
    model: 'Camaro SS',
    year: 2023,
    category: 'Sport',
    pricePerDay: 120,
    hourlyPrice: 24,
    deposit: 200,
    featuredImage: '/images/cars/car-08.jpg',
    galleryImages: [
      '/images/cars/car-08.jpg',
      '/images/cars/car-07.jpg',
      '/images/cars/car-01.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 4,
      doors: 2,
      luggage: '2 Bags',
      engine: '6.2L LT1 V8 (455 HP)',
      airConditioning: true
    },
    features: [
      'Magnetic Ride Control',
      'Dual-Mode Exhaust',
      'Head-Up Display',
      'Bose Audio',
      'Ventilated Seats',
      'Rear Camera Mirror'
    ],
    location: 'Freeport Hub',
    rating: 4.7,
    reviewsCount: 39,
    status: 'Available',
    licensePlate: 'BS-6200',
    vin: '1G1FH1R75P0192849',
    featured: true
  },
  {
    id: 'car-9',
    slug: '2024-jeep-wrangler-rubicon',
    title: '2024 Jeep Wrangler Rubicon 4x4',
    brand: 'Jeep',
    model: 'Wrangler Rubicon',
    year: 2024,
    category: 'SUV / 4x4',
    pricePerDay: 105,
    hourlyPrice: 20,
    deposit: 200,
    featuredImage: '/images/cars/car-09.jpg',
    galleryImages: [
      '/images/cars/car-09.jpg',
      '/images/cars/car-03.jpg',
      '/images/cars/mp-vehicle-01.png'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 5,
      doors: 4,
      luggage: '3 Bags',
      engine: '3.6L Pentastar V6',
      airConditioning: true
    },
    features: [
      'Removable Freedom Hardtop',
      'Rock-Trac 4x4 System',
      'Front & Rear Locking Differentials',
      '12.3 Uconnect Touchscreen',
      'Alpine 9-Speaker Audio',
      'Off-Road Camera'
    ],
    location: 'Downtown Harbour',
    rating: 4.9,
    reviewsCount: 71,
    status: 'Available',
    licensePlate: 'BS-4912',
    vin: '1C4HJXFG8RW102934',
    featured: true
  },
  {
    id: 'car-10',
    slug: '2024-toyota-land-cruiser-prado',
    title: '2024 Toyota Land Cruiser Prado 7-Seater',
    brand: 'Toyota',
    model: 'Land Cruiser Prado',
    year: 2024,
    category: 'SUV / 4x4',
    pricePerDay: 130,
    hourlyPrice: 25,
    deposit: 250,
    featuredImage: '/images/cars/mp-vehicle-01.png',
    galleryImages: [
      '/images/cars/mp-vehicle-01.png',
      '/images/cars/car-06.jpg',
      '/images/cars/car-03.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Diesel',
      seats: 7,
      doors: 5,
      luggage: '5 Bags',
      engine: '2.8L Turbo Diesel D-4D',
      airConditioning: true
    },
    features: [
      'Multi-Terrain Select',
      'Crawl Control',
      'Cooler Box Console',
      'JBL 14-Speaker Sound',
      'Triple-zone Climate',
      'Roof Rails'
    ],
    location: 'Nassau Airport (NAS)',
    rating: 5.0,
    reviewsCount: 55,
    status: 'Available',
    licensePlate: 'BS-7711',
    vin: 'JTEBU4FJ8PK019284',
    featured: true
  },
  {
    id: 'car-11',
    slug: '2024-hyundai-tucson-hybrid',
    title: '2024 Hyundai Tucson Luxury Hybrid',
    brand: 'Hyundai',
    model: 'Tucson Hybrid',
    year: 2024,
    category: 'Economy',
    pricePerDay: 78,
    hourlyPrice: 15,
    deposit: 150,
    featuredImage: '/images/cars/mp-vehicle-02.png',
    galleryImages: [
      '/images/cars/mp-vehicle-02.png',
      '/images/cars/car-05.jpg',
      '/images/cars/mp-vehicle-03.png'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Hybrid',
      seats: 5,
      doors: 5,
      luggage: '3 Bags',
      engine: '1.6L Turbo Hybrid (38 MPG)',
      airConditioning: true
    },
    features: [
      'High Fuel Efficiency Hybrid',
      'Wireless Apple CarPlay',
      'Smart Cruise Control',
      'Blind-Spot View Monitor',
      'Hands-Free Smart Liftgate',
      'Heated Seats'
    ],
    location: 'Cable Beach',
    rating: 4.8,
    reviewsCount: 44,
    status: 'Available',
    licensePlate: 'BS-2309',
    vin: 'KM8J33A48RU109283',
    featured: false
  },
  {
    id: 'car-12',
    slug: '2023-honda-accord-touring',
    title: '2023 Honda Accord Touring',
    brand: 'Honda',
    model: 'Accord Touring',
    year: 2023,
    category: 'Sedan',
    pricePerDay: 72,
    hourlyPrice: 14,
    deposit: 150,
    featuredImage: '/images/cars/mp-vehicle-03.png',
    galleryImages: [
      '/images/cars/mp-vehicle-03.png',
      '/images/cars/car-02.jpg',
      '/images/cars/car-01.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 5,
      doors: 4,
      luggage: '3 Bags',
      engine: '2.0L VTEC Turbo (252 HP)',
      airConditioning: true
    },
    features: [
      'Honda Sensing Safety Suite',
      'Wireless Phone Charger',
      'Bose Centerpoint Audio',
      'Head-Up Display',
      'Ventilated Front Seats',
      'Wi-Fi Hotspot'
    ],
    location: 'Downtown Harbour',
    rating: 4.8,
    reviewsCount: 52,
    status: 'Available',
    licensePlate: 'BS-3198',
    vin: '1HGCV2F97PA019284',
    featured: false
  },
  {
    id: 'car-13',
    slug: '2024-nissan-gtr-nismo',
    title: '2024 Nissan GT-R Nismo Edition',
    brand: 'Nissan',
    model: 'GT-R Nismo',
    year: 2024,
    category: 'Sport',
    pricePerDay: 295,
    hourlyPrice: 60,
    deposit: 600,
    featuredImage: '/images/cars/mp-vehicle-04.png',
    galleryImages: [
      '/images/cars/mp-vehicle-04.png',
      '/images/cars/car-04.jpg',
      '/images/cars/car-08.jpg'
    ],
    specs: {
      transmission: 'Dual-Clutch (PDK)',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 4,
      doors: 2,
      luggage: '2 Bags',
      engine: '3.8L Twin-Turbo V6 (600 HP)',
      airConditioning: true
    },
    features: [
      'Carbon-Ceramic Brembo Brakes',
      'Nismo Tuned Suspension',
      'Recaro Carbon Racing Seats',
      'Bose Active Noise Cancellation',
      'Titanium Exhaust',
      'ATTESA E-TS All-Wheel Drive'
    ],
    location: 'Paradise Island',
    rating: 5.0,
    reviewsCount: 21,
    status: 'Available',
    licensePlate: 'BS-3500',
    vin: 'JN1GAR350RM102948',
    featured: true
  },
  {
    id: 'car-14',
    slug: '2023-lexus-rx-350-luxury',
    title: '2023 Lexus RX 350 Luxury AWD',
    brand: 'Lexus',
    model: 'RX 350 Luxury',
    year: 2023,
    category: 'Luxury',
    pricePerDay: 128,
    hourlyPrice: 25,
    deposit: 250,
    featuredImage: '/images/cars/mp-vehicle-05.png',
    galleryImages: [
      '/images/cars/mp-vehicle-05.png',
      '/images/cars/car-03.jpg',
      '/images/cars/car-06.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 5,
      doors: 5,
      luggage: '4 Bags',
      engine: '2.4L Turbocharged Inline-4',
      airConditioning: true
    },
    features: [
      'Mark Levinson 21-Speaker Audio',
      'Semi-Aniline Leather Seats',
      'Lexus Safety System+ 3.0',
      'Panoramic Glass Roof',
      'Hands-Free Power Back Door',
      'Wireless Apple CarPlay'
    ],
    location: 'Nassau Airport (NAS)',
    rating: 4.9,
    reviewsCount: 48,
    status: 'Available',
    licensePlate: 'BS-3509',
    vin: '2T2BAMCA5PC102938',
    featured: false
  },
  {
    id: 'car-15',
    slug: '2024-cadillac-escalade-platinum',
    title: '2024 Cadillac Escalade Platinum 8-Seater',
    brand: 'Cadillac',
    model: 'Escalade Platinum',
    year: 2024,
    category: 'Luxury',
    pricePerDay: 220,
    hourlyPrice: 45,
    deposit: 400,
    featuredImage: '/images/cars/car-03.jpg',
    galleryImages: [
      '/images/cars/car-03.jpg',
      '/images/cars/car-06.jpg',
      '/images/cars/mp-vehicle-01.png'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 8,
      doors: 5,
      luggage: '6 Bags',
      engine: '6.2L V8 (420 HP)',
      airConditioning: true
    },
    features: [
      'Curved 38-inch OLED Display',
      'AKG Studio Reference 36-Speaker',
      'Night Vision Assist',
      'Super Cruise Hands-Free Driving',
      'Rear Seat Entertainment Displays',
      'Air Ride Adaptive Suspension'
    ],
    location: 'Paradise Island',
    rating: 5.0,
    reviewsCount: 36,
    status: 'Available',
    licensePlate: 'BS-6201',
    vin: '1GYS4HKJ8RR102938',
    featured: true
  },
  {
    id: 'car-16',
    slug: '2023-chevrolet-corvette-stingray',
    title: '2023 Chevrolet Corvette Stingray C8',
    brand: 'Chevrolet',
    model: 'Corvette Stingray C8',
    year: 2023,
    category: 'Sport',
    pricePerDay: 195,
    hourlyPrice: 40,
    deposit: 400,
    featuredImage: '/images/cars/car-08.jpg',
    galleryImages: [
      '/images/cars/car-08.jpg',
      '/images/cars/car-04.jpg',
      '/images/cars/car-07.jpg'
    ],
    specs: {
      transmission: 'Dual-Clutch (PDK)',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 2,
      doors: 2,
      luggage: '2 Bags',
      engine: '6.2L Mid-Engine LT2 V8 (495 HP)',
      airConditioning: true
    },
    features: [
      'Mid-Engine Layout (0-60 in 2.9s)',
      'Z51 Performance Package',
      'Bose Performance 14-Speaker Audio',
      'Performance Data Recorder',
      'Removable Roof Panel',
      'GT2 Bucket Seats'
    ],
    location: 'Cable Beach',
    rating: 5.0,
    reviewsCount: 41,
    status: 'Available',
    licensePlate: 'BS-0080',
    vin: '1G1YB2D48P5102948',
    featured: true
  },
  {
    id: 'car-17',
    slug: '2024-kia-telluride-sx',
    title: '2024 Kia Telluride SX Prestige 7-Seater',
    brand: 'Kia',
    model: 'Telluride SX',
    year: 2024,
    category: 'SUV / 4x4',
    pricePerDay: 88,
    hourlyPrice: 18,
    deposit: 150,
    featuredImage: '/images/cars/car-06.jpg',
    galleryImages: [
      '/images/cars/car-06.jpg',
      '/images/cars/car-03.jpg',
      '/images/cars/mp-vehicle-01.png'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 7,
      doors: 5,
      luggage: '4 Bags',
      engine: '3.8L Lambda II V6',
      airConditioning: true
    },
    features: [
      'Dual Sunroofs',
      'Nappa Leather Captain Chairs',
      'Harman Kardon Premium Audio',
      'Surround View Monitor',
      'Highway Driving Assist 2',
      'Smart Power Tailgate'
    ],
    location: 'Freeport Hub',
    rating: 4.9,
    reviewsCount: 50,
    status: 'Available',
    licensePlate: 'BS-7192',
    vin: '5XYP64HC8RG102938',
    featured: false
  },
  {
    id: 'car-18',
    slug: '2023-volkswagen-golf-r',
    title: '2023 Volkswagen Golf R Performance',
    brand: 'Volkswagen',
    model: 'Golf R',
    year: 2023,
    category: 'Sport',
    pricePerDay: 82,
    hourlyPrice: 16,
    deposit: 150,
    featuredImage: '/images/cars/car-02.jpg',
    galleryImages: [
      '/images/cars/car-02.jpg',
      '/images/cars/car-05.jpg',
      '/images/cars/car-01.jpg'
    ],
    specs: {
      transmission: 'Dual-Clutch (PDK)',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 5,
      doors: 4,
      luggage: '3 Bags',
      engine: '2.0L TSI Turbo (315 HP 4MOTION)',
      airConditioning: true
    },
    features: [
      '4MOTION AWD with Torque Vectoring',
      'Drift Mode & Special Nürburgring Mode',
      'Harman Kardon Sound System',
      'Digital Cockpit Pro',
      'Heated R Sport Seats',
      'Dynamic Chassis Control'
    ],
    location: 'Downtown Harbour',
    rating: 4.8,
    reviewsCount: 33,
    status: 'Available',
    licensePlate: 'BS-2023',
    vin: 'WVWZZZCD8PW102948',
    featured: false
  },
  {
    id: 'car-19',
    slug: '2024-dodge-challenger-rt',
    title: '2024 Dodge Challenger R/T Scat Pack',
    brand: 'Dodge',
    model: 'Challenger Scat Pack',
    year: 2024,
    category: 'Sport',
    pricePerDay: 135,
    hourlyPrice: 28,
    deposit: 250,
    featuredImage: '/images/cars/car-07.jpg',
    galleryImages: [
      '/images/cars/car-07.jpg',
      '/images/cars/car-08.jpg',
      '/images/cars/car-04.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 5,
      doors: 2,
      luggage: '3 Bags',
      engine: '392 HEMI V8 (485 HP)',
      airConditioning: true
    },
    features: [
      'Brembo 4-Piston Brakes',
      'Active Exhaust System',
      'Launch Control with Line Lock',
      'SRT Performance Pages',
      'Alpine Audio System',
      'Heated Steering Wheel'
    ],
    location: 'Nassau Airport (NAS)',
    rating: 4.8,
    reviewsCount: 46,
    status: 'Available',
    licensePlate: 'BS-3920',
    vin: '2C3CDZFJ8RH102938',
    featured: false
  },
  {
    id: 'car-20',
    slug: '2023-mini-cooper-s-convertible',
    title: '2023 Mini Cooper S Convertible',
    brand: 'MINI',
    model: 'Cooper S Convertible',
    year: 2023,
    category: 'Convertible',
    pricePerDay: 75,
    hourlyPrice: 15,
    deposit: 150,
    featuredImage: '/images/cars/car-01.jpg',
    galleryImages: [
      '/images/cars/car-01.jpg',
      '/images/cars/car-02.jpg',
      '/images/cars/car-04.jpg'
    ],
    specs: {
      transmission: 'Automatic',
      mileage: 'Unlimited',
      fuelType: 'Petrol',
      seats: 4,
      doors: 2,
      luggage: '2 Bags',
      engine: '2.0L TwinPower Turbo (189 HP)',
      airConditioning: true
    },
    features: [
      '3-in-1 Electric Soft Top with Sunroof Mode',
      'Harman Kardon Hi-Fi Sound',
      'LED Headlights with Union Jack Taillights',
      'Touchscreen with Apple CarPlay',
      'Sport Driving Modes',
      'Rear View Camera'
    ],
    location: 'Cable Beach',
    rating: 4.9,
    reviewsCount: 58,
    status: 'Available',
    licensePlate: 'BS-1959',
    vin: 'WMWXR3C58P2109283',
    featured: true
  }
];
