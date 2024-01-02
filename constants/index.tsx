import {
  FaBoxOpen,
  FaCog,
  FaRegCreditCard,
  FaRegHeart,
  FaShieldAlt,
  FaWallet,
} from "react-icons/fa";

export const menu = ["Tienda"];

export const myprofile = [
  {
    name: "Compras",
    url: "/profile/orders",
    icon: <FaBoxOpen size={20} />,
  },
  {
    name: "Favoritos",
    url: "/profile/favorites",
    icon: <FaRegHeart size={20} />,
  },
  {
    name: "Configuración",
    url: "/profile/account",
    icon: <FaCog size={20} />,
  },
];

export const collections = [
  {
    name: "Calzado",
    url: "/shop/calzado",
  },
  {
    name: "Ropa",
    url: "/shop/ropa",
  },
];

export const payments = [
  {
    name: "Seguridad y protección.",
    icon: <FaShieldAlt size={20} />,
  },
  {
    name: "Medios de pago más usados.",
    icon: <FaWallet size={20} />,
  },
  {
    name: "Cuotas con o sin tarjeta.",
    icon: <FaRegCreditCard size={20} />,
  },
  {
    name: "Envío gratuito a todo el país.",
    icon: <FaBoxOpen size={20} />,
  },
];

export const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const regions = [
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
