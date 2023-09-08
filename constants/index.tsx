export const cards = [
  {
    name: "Ropa",
    description: "Comprá la nueva línea.",
    link: "/category/ropa",
    url: "/assets/category-01.jpg",
  },
  {
    name: "Calzados",
    description: "¿Por qué esperar? Date el gusto.",
    link: "/category/calzado",
    url: "/assets/category-02.jpg",
  },
];

export const menu = ["Tienda"];

export const env = {
  MERCADOPAGO_TOKEN: process.env.MERCADOPAGO_TOKEN,
  MERCADOPAGO_URL: process.env.MERCADOPAGO_URL,
  MONGODB_URI: process.env.MONGODB_URI,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
};

export const categories = [
  {
    name: "Calzado",
    url: "calzado",
  },
  {
    name: "Ropa",
    url: "ropa",
  },
];

export const payments = [
  {
    name: "Seguridad y protección.",
    icon: <i className="fi fi-rr-shield-check icon"></i>,
  },
  {
    name: "Medios de pago más usados.",
    icon: <i className="fi fi-rr-wallet icon"></i>,
  },
  {
    name: "Cuotas con o sin tarjeta.",
    icon: <i className="fi fi-rr-credit-card icon"></i>,
  },
  {
    name: "Envío gratuito a todo el país.",
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
