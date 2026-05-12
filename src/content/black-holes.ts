export interface BlackHole {
  id: string;
  name: string;
  type: string;
  image: string;
  imageAlt: string;
  mass: string;
  distance: string;
  fact: string;
  body: string;
  accent: string;
}

export const BLACK_HOLES: readonly BlackHole[] = [
  {
    id: "m87",
    name: "M87*",
    type: "Supermassive · first image",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/1280px-Black_hole_-_Messier_87_crop_max_res.jpg",
    imageAlt: "First image of a black hole — M87* from the Event Horizon Telescope",
    mass: "6.5 billion suns",
    distance: "53.49 million ly",
    fact: "The first black hole ever photographed.",
    body: "Released in April 2019 by the Event Horizon Telescope collaboration, the silhouette of M87* required eight observatories synchronized to atomic clocks across four continents, effectively forming a telescope the size of Earth. The bright ring is light bent around the event horizon by the black hole's gravity.",
    accent: "#ffb86b",
  },
  {
    id: "sgr-a",
    name: "Sagittarius A*",
    type: "Supermassive · galactic center",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/A_view_of_the_Milky_Way_supermassive_black_hole_Sagittarius_A%2A_in_polarised_light_%28eso2406a%29.jpg/1280px-A_view_of_the_Milky_Way_supermassive_black_hole_Sagittarius_A%2A_in_polarised_light_%28eso2406a%29.jpg",
    imageAlt: "Event Horizon Telescope image of Sagittarius A* in polarized light",
    mass: "4.15 million suns",
    distance: "26,673 ly",
    fact: "The supermassive black hole at the heart of the Milky Way.",
    body: "Sgr A* anchors our galaxy. Stars near it orbit at over 5,000 km/s — fast enough to traverse Earth in a heartbeat. Its existence was confirmed by tracking these stellar orbits for 30 years, work that won the 2020 Nobel Prize in Physics.",
    accent: "#ff5edb",
  },
  {
    id: "cygnus-x1",
    name: "Cygnus X-1",
    type: "Stellar-mass · X-ray binary",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Black_Hole_Cygnus_X-1_%28Illustration%29_%284187-Image%29.png/1280px-Black_Hole_Cygnus_X-1_%28Illustration%29_%284187-Image%29.png",
    imageAlt: "Illustration of the Cygnus X-1 binary system",
    mass: "21.2 suns",
    distance: "7,200 ly",
    fact: "The first object identified as a black hole — and Stephen Hawking lost a bet over it.",
    body: "Discovered in 1964 by X-ray observations, Cygnus X-1 is a stellar-mass black hole stripping gas from a blue supergiant companion. The infalling matter heats to millions of degrees and screams in X-rays. Hawking famously bet Kip Thorne that it wasn't a black hole — and conceded the bet in 1990.",
    accent: "#6dd5ff",
  },
  {
    id: "quasar",
    name: "Quasar J0313–1806",
    type: "Ultramassive · ancient quasar",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Artist%E2%80%99s_impression_of_quasar_J0313-1806.jpg/1280px-Artist%E2%80%99s_impression_of_quasar_J0313-1806.jpg",
    imageAlt: "Artist's impression of the quasar J0313-1806",
    mass: "1.6 billion suns",
    distance: "13.0 billion ly",
    fact: "The most distant quasar known — fully formed when the universe was only 670 million years old.",
    body: "Quasars are galaxies whose central black holes are devouring matter so fast that the accretion disk outshines every star in the host galaxy combined. J0313–1806's existence is a puzzle: there shouldn't have been enough time after the Big Bang to grow a black hole this massive. The light from it has travelled for 13 billion years to reach us.",
    accent: "#8b5cff",
  },
] as const;
