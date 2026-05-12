export interface Planet {
  id: string;
  name: string;
  classification: string;
  image: string;
  imageAlt: string;
  tagline: string;
  fact: string;
  stats: { label: string; value: string }[];
  accent: string;
}

export const PLANETS: readonly Planet[] = [
  {
    id: "mercury",
    name: "Mercury",
    classification: "Terrestrial · innermost",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
    imageAlt: "Mercury photographed by MESSENGER in true color",
    tagline: "A scorched cinder one-third the size of Earth.",
    fact: "A single Mercurian day — from sunrise to sunrise — lasts 176 Earth days, longer than its 88-day year. The planet rotates three times for every two orbits, locked in a strange 3:2 resonance.",
    stats: [
      { label: "Diameter", value: "4,879 km" },
      { label: "Day length", value: "176 d" },
      { label: "Year length", value: "88 d" },
      { label: "Surface temp", value: "−173 to 427°C" },
    ],
    accent: "#c9a880",
  },
  {
    id: "venus",
    name: "Venus",
    classification: "Terrestrial · Earth's twin",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg",
    imageAlt: "Venus in ultraviolet light from Mariner 10",
    tagline: "Hotter than Mercury, with rain made of sulfuric acid.",
    fact: "Venus rotates backwards — the Sun rises in the west. Its atmosphere is so dense that surface pressure equals being a kilometer underwater on Earth, and a runaway greenhouse effect bakes it at 462°C, hotter than Mercury despite being twice as far from the Sun.",
    stats: [
      { label: "Diameter", value: "12,104 km" },
      { label: "Day length", value: "243 d (retrograde)" },
      { label: "Year length", value: "225 d" },
      { label: "Surface pressure", value: "92× Earth" },
    ],
    accent: "#e8c97a",
  },
  {
    id: "earth",
    name: "Earth",
    classification: "Terrestrial · life-bearing",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1280px-The_Earth_seen_from_Apollo_17.jpg",
    imageAlt: "The Blue Marble — Earth photographed from Apollo 17",
    tagline: "The only known cradle of life in the universe.",
    fact: "Earth is a giant magnet. Its molten iron outer core, swirling at 3.8 billion amps, generates a magnetic field that deflects the solar wind and keeps the atmosphere from being stripped away. Mars lost its field 4 billion years ago and dried out.",
    stats: [
      { label: "Diameter", value: "12,742 km" },
      { label: "Day length", value: "23 h 56 m" },
      { label: "Year length", value: "365.25 d" },
      { label: "Moons", value: "1" },
    ],
    accent: "#6dd5ff",
  },
  {
    id: "mars",
    name: "Mars",
    classification: "Terrestrial · cold desert",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1280px-OSIRIS_Mars_true_color.jpg",
    imageAlt: "Mars in true color from the OSIRIS instrument",
    tagline: "Home to the tallest mountain in the solar system.",
    fact: "Olympus Mons stands 22 km tall — nearly three times the height of Everest — and is wider than Poland. Its summit is so high it pokes through most of the Martian atmosphere. Mars built it because the planet has no plate tectonics, so a single volcanic hotspot piled lava in place for billions of years.",
    stats: [
      { label: "Diameter", value: "6,779 km" },
      { label: "Day length", value: "24 h 37 m" },
      { label: "Year length", value: "687 d" },
      { label: "Olympus Mons", value: "22 km tall" },
    ],
    accent: "#ff7a5a",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    classification: "Gas giant · king of planets",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    imageAlt: "Jupiter and its Great Red Spot captured by Hubble",
    tagline: "A storm three times wider than Earth, blowing for 350 years.",
    fact: "Jupiter has 95 confirmed moons. Four of them — Io, Europa, Ganymede, Callisto — are worlds in their own right. Ganymede is bigger than Mercury. Europa likely hides a salty ocean under its icy shell containing more water than all of Earth's oceans combined.",
    stats: [
      { label: "Diameter", value: "139,820 km" },
      { label: "Mass", value: "318× Earth" },
      { label: "Moons", value: "95+" },
      { label: "Great Red Spot age", value: "~350 years" },
    ],
    accent: "#e8b87a",
  },
  {
    id: "saturn",
    name: "Saturn",
    classification: "Gas giant · ringed",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1280px-Saturn_during_Equinox.jpg",
    imageAlt: "Saturn during equinox by Cassini",
    tagline: "Rings 280,000 km wide, less than 30 meters thick.",
    fact: "Saturn's rings would float in a bathtub. The planet's mean density is only 0.687 g/cm³ — less than water. Scientists believe the rings are young, only 100–400 million years old, possibly the shattered remains of a moon that wandered too close.",
    stats: [
      { label: "Diameter", value: "116,460 km" },
      { label: "Density", value: "0.687 g/cm³" },
      { label: "Ring width", value: "282,000 km" },
      { label: "Moons", value: "146" },
    ],
    accent: "#f3d8a3",
  },
  {
    id: "uranus",
    name: "Uranus",
    classification: "Ice giant · sideways",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1280px-Uranus2.jpg",
    imageAlt: "Uranus photographed by Voyager 2",
    tagline: "An ice giant tipped 98° — orbiting the Sun on its side.",
    fact: "Uranus rolls around the Sun like a barrel. Each pole gets 42 years of continuous sunlight followed by 42 years of darkness. The tilt is thought to come from a colossal impact early in the planet's history. Its blue-green hue comes from methane absorbing red light.",
    stats: [
      { label: "Diameter", value: "50,724 km" },
      { label: "Axial tilt", value: "97.8°" },
      { label: "Year length", value: "84 yr" },
      { label: "Discovered", value: "1781" },
    ],
    accent: "#a5e8e0",
  },
  {
    id: "neptune",
    name: "Neptune",
    classification: "Ice giant · outermost",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/1280px-Neptune_Full.jpg",
    imageAlt: "Neptune photographed by Voyager 2 in 1989",
    tagline: "Where the wind hits 2,100 km/h — five times any Earth hurricane.",
    fact: "Neptune was the first planet found by mathematics. Astronomers noticed Uranus was being tugged by an unseen mass, predicted Neptune's position, pointed a telescope, and there it was — within one degree of the calculation. It takes 165 Earth years to orbit the Sun once.",
    stats: [
      { label: "Diameter", value: "49,244 km" },
      { label: "Wind speed", value: "2,100 km/h" },
      { label: "Year length", value: "165 yr" },
      { label: "Discovered", value: "1846" },
    ],
    accent: "#5b8df5",
  },
] as const;
