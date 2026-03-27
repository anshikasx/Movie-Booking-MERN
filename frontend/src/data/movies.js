import animal from "../assets/animal.jpg";
import toAllTheBoys from "../assets/toalltheboys.jpg";
import madagascar from "../assets/madagascar.jpg";
import haq from "../assets/haq.jpg";
import metroInDino from "../assets/metroindino.jpg";
import peopleWeMeet from "../assets/peoplewemeetonvacation.jpg";

const movies = [
  {
    id: 1,
    title: "Animal",
    genre: "Action/Drama",
    language: "Hindi",
    duration: "3h 21m",
    rating: 8.5,
    price: 250,
    poster: animal,
    description:
      "A father-son bond turns intense as power, revenge and love collide."
  },
  {
    id: 2,
    title: "To All the Boys I've Loved Before",
    genre: "Romance/Comedy",
    language: "English",
    duration: "1h 39m",
    rating: 7.1,
    price: 180,
    poster: toAllTheBoys,
    description:
      "A teenage girl's secret love letters get mailed, and her life turns upside down."
  },
  {
    id: 3,
    title: "Madagascar",
    genre: "Animation/Comedy",
    language: "English",
    duration: "1h 26m",
    rating: 7.0,
    price: 160,
    poster: madagascar,
    description:
      "A group of zoo animals escape to the wild and end up on the island of Madagascar."
  },
  {
    id: 4,
    title: "HAQ",
    genre: "Drama/Romance",
    language: "Hindi",
    duration: "2h 05m",
    rating: 7.8,
    price: 200,
    poster: haq,
    description:
      "A heartfelt story of love, emotions, and relationships."
  },
  {
    id: 5,
    title: "Metro In Dino",
    genre: "Romance/Drama",
    language: "Hindi",
    duration: "2h 20m",
    rating: 8.0,
    price: 230,
    poster: metroInDino,
    description:
      "A modern-day emotional journey through relationships in city life."
  },
  {
    id: 6,
    title: "People We Meet On Vacation",
    genre: "Romance/Comedy",
    language: "English",
    duration: "1h 55m",
    rating: 7.6,
    price: 190,
    poster: peopleWeMeet,
    description:
      "Two best friends take yearly vacations, until feelings change everything."
  }
];

export default movies;