# 🎬 Movie Booking MERN Application

A Full Stack Movie Ticket Booking Web Application built using the MERN Stack (MongoDB, Express, React, Node.js).
Users can browse movies, select seats, choose date & time, book tickets, download PDF tickets, and view booking history.

## 📌 Project Overview

This project is a Single Page Application (SPA) for movie ticket booking where users can:
	•	Browse movies
	•	View movie details
	•	Select seats
	•	Choose date and show time
	•	View booking summary
	•	Confirm booking
	•	Download ticket PDF
	•	View booking history
	•	Cancel bookings

The application uses React for frontend, Node.js + Express for backend, and MongoDB for database.

## 🚀 Features

### 🎥 Movie Features
	•	View movie list
	•	Movie details page
	•	Movie posters
	•	Ratings and duration
	•	Search movies
	•	Filter by genre

### 🎟 Booking Features
	•	Seat selection UI
	•	Booked seats unavailable
	•	Dynamic seat pricing
	•	Select date (future dates only)
	•	Select show time
	•	Booking summary
	•	Booking confirmation
	•	Download ticket PDF
	•	Booking history
	•	Cancel booking

## 🛠 Tech Stack

| Category | Technology |
|---------|------------|
| Frontend | React JS |
| UI Framework | Bootstrap + Material UI |
| Routing | React Router DOM |
| Backend | Node.js |
| Server | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| PDF | jsPDF |
| Version Control | Git + GitHub |

## 📁 Project Structure
Movie-Booking-MERN
│
├── backend
│   ├── models
│   │   ├── Movie.js
│   │   └── Booking.js
│   │
│   ├── routes
│   │   ├── movieRoutes.js
│   │   └── bookings.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── App.js
│   │
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md

## 🌐 API Endpoints

#Movies API
| Method | Endpoint | Description |
|-------|---------|-------------|
| GET | /api/movies | Get all movies |
| POST | /api/movies | Add new movie |
| PUT | /api/movies/:id | Update booked seats |

### Bookings API
| Method | Endpoint | Description |
|-------|---------|-------------|
| GET | /api/bookings | Get booking history |
| POST | /api/bookings | Create booking |
| DELETE | /api/bookings/:id | Cancel booking |

### 💺 Dynamic Seat Pricing
| Row | Seat Price |
|-----|------------|
| A | ₹120 |
| B | ₹150 |
| C | ₹180 |
| D | ₹220 |
| E | ₹250 |

## 📄 Pages Included

| Page | Description |
|------|-------------|
| Home | Movie list |
| Movie Details | Movie info |
| Seat Selection | Select seats |
| Booking Summary | Booking details |
| Confirmation | Booking confirmation |
| History | Booking history |
| Profile | User profile |

## 🗄 Database Collections

### Movies Collection
| Field | Type |
|------|------|
| title | String |
| genre | String |
| language | String |
| duration | String |
| rating | Number |
| price | Number |
| poster | String |
| description | String |
| totalSeats | Number |
| bookedSeats | Array |

### Bookings Collection
| Field | Type |
|------|------|
| movieId | String |
| movieTitle | String |
| seats | Array |
| totalAmount | Number |
| showDate | String |
| showTime | String |

##👩‍💻 Author

Anshika Sinha
Full Stack Movie Booking MERN Application
