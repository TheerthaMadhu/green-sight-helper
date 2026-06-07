export type Disease = {
  id: string;
  name: string;
  crop: string;
  status: "healthy" | "diseased";
  description: string;
  treatment: string;
  prevention: string;
};

export const DISEASES: Disease[] = [
  {
    id: "tomato_healthy",
    name: "Tomato — Healthy",
    crop: "Tomato",
    status: "healthy",
    description:
      "The leaf shows no visible signs of disease. Coloration, venation and surface texture are within normal parameters for a healthy tomato plant.",
    treatment:
      "No treatment required. Continue regular irrigation and balanced nutrition.",
    prevention:
      "Maintain good airflow between plants, water at the base, and inspect weekly for early symptoms.",
  },
  {
    id: "tomato_early_blight",
    name: "Tomato — Early Blight",
    crop: "Tomato",
    status: "diseased",
    description:
      "Fungal disease caused by Alternaria solani. Characterised by concentric brown lesions on older leaves, often surrounded by a yellow halo.",
    treatment:
      "Apply a copper-based fungicide or chlorothalonil at 7–10 day intervals. Remove and destroy affected leaves.",
    prevention:
      "Avoid overhead watering, mulch around plants, rotate crops yearly, and space plants for airflow.",
  },
  {
    id: "tomato_late_blight",
    name: "Tomato — Late Blight",
    crop: "Tomato",
    status: "diseased",
    description:
      "Aggressive disease caused by Phytophthora infestans. Produces large, water-soaked grey-green lesions that quickly turn brown.",
    treatment:
      "Apply mancozeb or chlorothalonil immediately. Remove and burn infected plants to prevent rapid spread.",
    prevention:
      "Plant resistant varieties, avoid wet foliage overnight, and monitor humidity during cool damp weather.",
  },
  {
    id: "potato_healthy",
    name: "Potato — Healthy",
    crop: "Potato",
    status: "healthy",
    description:
      "Leaf shows uniform green colour and intact structure. No lesions, curling, or discoloration detected.",
    treatment: "No treatment required.",
    prevention:
      "Continue regular monitoring; ensure consistent watering and balanced fertilisation.",
  },
  {
    id: "potato_early_blight",
    name: "Potato — Early Blight",
    crop: "Potato",
    status: "diseased",
    description:
      "Caused by Alternaria solani. Small dark spots with a 'target board' pattern appear, primarily on lower leaves.",
    treatment:
      "Use a protective fungicide such as mancozeb. Remove infected foliage from the field.",
    prevention:
      "Rotate crops, avoid plant stress, and use certified disease-free seed tubers.",
  },
  {
    id: "potato_late_blight",
    name: "Potato — Late Blight",
    crop: "Potato",
    status: "diseased",
    description:
      "Caused by Phytophthora infestans. Brown to black lesions with a pale green border; white mould may appear on the leaf underside.",
    treatment:
      "Apply systemic fungicide (e.g. metalaxyl + mancozeb) at first sign. Destroy infected plants.",
    prevention:
      "Plant resistant cultivars, ensure good drainage, and avoid overhead irrigation.",
  },
  {
    id: "pepper_healthy",
    name: "Pepper — Healthy",
    crop: "Pepper",
    status: "healthy",
    description: "Pepper leaf appears healthy with uniform green pigmentation.",
    treatment: "No treatment required.",
    prevention:
      "Keep soil moisture consistent and inspect regularly for pests and bacterial signs.",
  },
  {
    id: "pepper_bacterial_spot",
    name: "Pepper — Bacterial Spot",
    crop: "Pepper",
    status: "diseased",
    description:
      "Caused by Xanthomonas bacteria. Small water-soaked spots become dark and necrotic; leaves may yellow and drop.",
    treatment:
      "Apply copper-based bactericides. Remove and dispose of infected plant material.",
    prevention:
      "Use disease-free seed, avoid working with wet plants, and rotate with non-host crops.",
  },
];

export const getDisease = (id: string) =>
  DISEASES.find((d) => d.id === id) ?? DISEASES[0];
