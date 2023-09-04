export const cards = [
  {
    name: "Bombas para piscina",
    description: "Toda la línea de autocebantes Vulcano al mejor precio.",
    link: "/piscinas/bombas-autocebantes",
    url: "/assets/category_1-50.jpg",
  },
  {
    name: "Filtros para piscina",
    description: "Las mejores ofertas en filtros Vulcano.",
    link: "/piscinas/filtros",
    url: "/assets/category_2-50.jpg",
  },
];

export const categories = ["Piscinas"];

export const env = {
  MERCADOPAGO_TOKEN: process.env.MERCADOPAGO_TOKEN,
  MERCADOPAGO_URL: process.env.MERCADOPAGO_URL,
  MONGODB_URI: process.env.MONGODB_URI,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

export const features = [
  {
    name: "Accesorios de Instalación",
    url: "accesorios-de-instalacion",
    category: "Piscinas",
  },
  {
    name: "Automatización",
    url: "automatizacion",
    category: "Piscinas",
  },
  {
    name: "Bombas Autocebantes",
    url: "bombas-autocebantes",
    category: "Piscinas",
  },
  {
    name: "Climatización",
    url: "climatizacion",
    category: "Piscinas",
  },
  {
    name: "Diseño y Confort",
    url: "diseno-y-confort",
    category: "Piscinas",
  },
  {
    name: "Filtros",
    url: "filtros",
    category: "Piscinas",
  },
  {
    name: "Iluminación",
    url: "iluminacion",
    category: "Piscinas",
  },
  {
    name: "Limpieza",
    url: "limpieza",
    category: "Piscinas",
  },
];

export const payments = [
  {
    description: "Seguridad y protección.",
    icon: <i className="fi fi-rr-shield-check icon"></i>
  },
  {
    description: "Medios de pago más usados.",
    icon: <i className="fi fi-rr-wallet icon"></i>,
  },
  {
    description: "Cuotas con o sin tarjeta.",
    icon: <i className="fi fi-rr-credit-card icon"></i>,
  },
  {
    description: "Envío gratuito a todo el país.",
    icon: <i className="fi fi-rr-box-open-full icon"></i>,
  },
];

export const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const region = [
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

export const settings = [
  {
    name: "Compras",
    url: "/profile/orders",
    icon: <i className="fi fi-rr-box-open-full flex items-center text-xl"></i>,
  },
  {
    name: "Favoritos",
    url: "/profile/favorites",
    icon: <i className="fi fi-rr-heart flex items-center text-xl"></i>,
  },
  {
    name: "Configuración",
    url: "/profile/account",
    icon: <i className="fi fi-rr-settings flex items-center text-xl"></i>,
  },
];
