export interface Galaxy {
  id: string;
  name: string;
  classification: string;
  image: string;
  imageAlt: string;
  distance: string;
  diameter: string;
  fact: string;
  body: string;
  accent: string;
}

export const GALAXIES: readonly Galaxy[] = [
  {
    id: "milky-way",
    name: "The Milky Way",
    classification: "Barred spiral · SBbc",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/1280px-ESO-VLT-Laser-phot-33a-07.jpg",
    imageAlt: "ESO laser guide star pointing toward the Milky Way center",
    distance: "0 ly (we live here)",
    diameter: "~100,000 ly",
    fact: "Home. The Sun is one of roughly 200 billion stars.",
    body: "Our galaxy is a barred spiral. From our position on the Orion Arm, two-thirds of the way out from the core, we orbit the galactic center once every 225 million years — a single galactic year. The last time the Sun was in this spot, the first dinosaurs were beginning to walk the Earth.",
    accent: "#a78bfa",
  },
  {
    id: "andromeda",
    name: "Andromeda (M31)",
    classification: "Spiral · SA(s)b",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/1280px-Andromeda_Galaxy_%28with_h-alpha%29.jpg",
    imageAlt: "Andromeda galaxy in visible light with H-alpha overlay",
    distance: "2.537 million ly",
    diameter: "~220,000 ly",
    fact: "On a collision course with us. Impact: 4.5 billion years.",
    body: "Andromeda is approaching at 110 km/s. In 4.5 billion years it will merge with the Milky Way to form an elliptical galaxy researchers nickname 'Milkomeda'. Despite the violence of the merger, the space between stars is so vast that the chance of any individual collision is essentially zero.",
    accent: "#6dd5ff",
  },
  {
    id: "triangulum",
    name: "Triangulum (M33)",
    classification: "Spiral · SA(s)cd",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Triangulum_Galaxy_M33.jpg/1280px-Triangulum_Galaxy_M33.jpg",
    imageAlt: "The Triangulum Galaxy (M33)",
    distance: "2.73 million ly",
    diameter: "~60,000 ly",
    fact: "The third member of our Local Group.",
    body: "Triangulum is the smallest of the three large spirals in our Local Group. It contains around 40 billion stars — modest compared to Andromeda's trillion — but it is one of the most distant objects visible to the naked eye from Earth.",
    accent: "#5eead4",
  },
  {
    id: "sombrero",
    name: "The Sombrero (M104)",
    classification: "Lenticular · SA(s)a",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/M104_ngc4594_sombrero_galaxy_hi-res.jpg/1280px-M104_ngc4594_sombrero_galaxy_hi-res.jpg",
    imageAlt: "Hubble image of the Sombrero Galaxy",
    distance: "29.3 million ly",
    diameter: "~50,000 ly",
    fact: "A bright nucleus wrapped in a dark dust lane.",
    body: "The Sombrero's dramatic silhouette comes from a dense, edge-on ring of dust circling a massive bulge of old stars. At its heart lurks a supermassive black hole of around 1 billion solar masses — one of the most massive in the nearby universe.",
    accent: "#ffb86b",
  },
  {
    id: "whirlpool",
    name: "The Whirlpool (M51)",
    classification: "Interacting spiral · SA(s)bc",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Messier51_sRGB.jpg/1280px-Messier51_sRGB.jpg",
    imageAlt: "Hubble image of the Whirlpool Galaxy and its companion",
    distance: "31 million ly",
    diameter: "~76,000 ly",
    fact: "Two galaxies caught mid-dance.",
    body: "The Whirlpool is the textbook example of a grand-design spiral, its bright arms drawn out and amplified by gravitational tugging from its smaller companion NGC 5195. The interaction is triggering new star formation along the spiral arms.",
    accent: "#ff5edb",
  },
  {
    id: "ngc1300",
    name: "NGC 1300",
    classification: "Barred spiral · SB(rs)bc",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg/1280px-Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg",
    imageAlt: "Hubble image of barred spiral galaxy NGC 1300",
    distance: "61 million ly",
    diameter: "~110,000 ly",
    fact: "A textbook barred spiral.",
    body: "Two-thirds of all spiral galaxies — including our own — host a central bar of stars. NGC 1300 shows the structure so cleanly it has become the canonical reference image. The bar funnels gas into the core, feeding star formation and the central black hole.",
    accent: "#8b5cff",
  },
] as const;
