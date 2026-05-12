export interface Nebula {
  id: string;
  name: string;
  type: string;
  image: string;
  imageAlt: string;
  distance: string;
  size: string;
  fact: string;
  body: string;
  accent: string;
}

export const NEBULAE: readonly Nebula[] = [
  {
    id: "pillars",
    name: "Pillars of Creation",
    type: "Emission · star nursery",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pillars_of_Creation_%28NIRCam_Image%29.jpg/1280px-Pillars_of_Creation_%28NIRCam_Image%29.jpg",
    imageAlt: "The Pillars of Creation inside the Eagle Nebula, JWST NIRCam",
    distance: "6,500 ly",
    size: "4-5 ly tall",
    fact: "Towers of gas where new stars are being born right now.",
    body: "Inside the Eagle Nebula (M16), three colossal columns of cool hydrogen and dust resist being eroded by intense ultraviolet light from nearby young stars. Globules at the pillars' tips are protostars — solar systems mid-assembly. Light from the pillars took 6,500 years to reach us; we're seeing them as they were when the first cities were built on Earth.",
    accent: "#5eead4",
  },
  {
    id: "orion",
    name: "The Orion Nebula",
    type: "Emission · diffuse",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/1280px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
    imageAlt: "The Orion Nebula photographed by Hubble",
    distance: "1,344 ly",
    size: "24 ly across",
    fact: "Visible to the naked eye — the closest stellar nursery to Earth.",
    body: "Hanging from Orion's belt is a smudge of light most of humanity has seen without realizing what they were looking at. The Orion Nebula contains some 2,000 young stars and is one of the most studied objects in the sky. The Trapezium cluster at its heart is illuminating the surrounding gas, making it glow.",
    accent: "#ff7a5a",
  },
  {
    id: "crab",
    name: "The Crab Nebula",
    type: "Supernova remnant",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/1280px-Crab_Nebula.jpg",
    imageAlt: "The Crab Nebula composite image from Hubble",
    distance: "6,500 ly",
    size: "11 ly across",
    fact: "The shrapnel of a star that exploded in 1054 CE.",
    body: "Chinese astronomers recorded a 'guest star' bright enough to see in daylight for 23 days in July 1054. We now know they were watching a supernova. Today, the expanding wreckage forms the Crab Nebula, with a pulsar at its center — a 20-km neutron star spinning 30 times a second, a stellar corpse the size of a city.",
    accent: "#ff5edb",
  },
  {
    id: "helix",
    name: "The Helix Nebula",
    type: "Planetary",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/NGC7293_%282004%29.jpg/1280px-NGC7293_%282004%29.jpg",
    imageAlt: "The Helix Nebula — the 'Eye of God' — from Hubble and Mosaic II",
    distance: "655 ly",
    size: "2.87 ly across",
    fact: "Nicknamed the Eye of God.",
    body: "The Helix is what a Sun-like star looks like in its final act. Having shed its outer layers, the dying star's core — now a white dwarf — illuminates the expelled gas into a glowing shell. Our own Sun will do this in about 5 billion years.",
    accent: "#6dd5ff",
  },
  {
    id: "carina",
    name: "The Carina Nebula",
    type: "Emission · star-forming complex",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/%E2%80%9CCosmic_Cliffs%E2%80%9D_in_the_Carina_Nebula_%28NIRCam_and_MIRI_Composite_Image%29.png/1280px-%E2%80%9CCosmic_Cliffs%E2%80%9D_in_the_Carina_Nebula_%28NIRCam_and_MIRI_Composite_Image%29.png",
    imageAlt: "The Cosmic Cliffs in the Carina Nebula, JWST NIRCam + MIRI",
    distance: "7,500 ly",
    size: "230 ly across",
    fact: "James Webb's 'Cosmic Cliffs' debut image.",
    body: "The Carina Nebula is one of the largest and brightest in our galaxy, four times bigger than the Orion Nebula. It contains Eta Carinae, a hypergiant 100 times more massive than the Sun and a leading candidate for the next nearby supernova. JWST's image of its 'cosmic cliffs' revealed hundreds of newborn stars hidden by dust in earlier observations.",
    accent: "#8b5cff",
  },
  {
    id: "ring",
    name: "The Ring Nebula",
    type: "Planetary",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Hubble_image_of_the_Ring_Nebula_%28Messier_57%29.jpg/1280px-Hubble_image_of_the_Ring_Nebula_%28Messier_57%29.jpg",
    imageAlt: "The Ring Nebula from Hubble",
    distance: "2,283 ly",
    size: "1.3 ly across",
    fact: "A dying star's perfect smoke ring.",
    body: "Once thought to be a hollow doughnut, the Ring Nebula is actually a barrel-shaped cloud we happen to be staring straight down. Its blue-green tint is oxygen, the red is ionized hydrogen. JWST recently mapped its complex inner knots, finding structure no telescope had ever resolved.",
    accent: "#5eead4",
  },
] as const;
