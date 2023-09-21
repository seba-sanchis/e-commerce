# E-commerce - Online Retailers

Web application tailored for e-commerce, offering streamlined operations and enhanced customer experiences. This application harnesses the power of a serverless architecture for seamless scalability and cost-effective performance.

## Setups

Before you start, you will need to create the <code>.env.local</code> file in the root folder to connect to Google OAuth, Mercado Pago, MongoDB and NextAuth.

Open the .env file and type the following variables:

```bash
    GOOGLE_CLIENT_ID = *add your Google Client ID*
    GOOGLE_CLIENT_SECRET = *add your Google Client secret*
    MERCADOPAGO_ACCESS_TOKEN = *add your Mercado Pago token*
    MERCADOPAGO_URL = *add your Mercado Pago url*
    MONGODB_URI = *add your MongoDB uri*
    NEXTAUTH_SECRET = *add your NextAuth secret*
    NEXTAUTH_URL = *add your NextAuth url*
```

## Available Scripts

Install packages and all dependencies.

```bash
    npm i
```

Runs the app in the development mode.

```bash
    npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Learn More

To learn more about this project, take a look at the following resources:

- [Checkout Pro](https://www.mercadopago.com.ar/developers/en/docs/checkout-pro/landing) - Solution that allows its customers to make purchases through the payment pages of Mercado Pago in a safe, fast way.
- [MongoDB](https://www.mongodb.com/) - Source-available cross-platform document-oriented database program.
- [NextAuth](https://next-auth.js.org) - A complete open-source authentication solution for Next.js applications.
- [Next.js](https://nextjs.org/) - Web development framework providing React-based web applications with server-side rendering and static website generation.
- [React](https://reactjs.org/) - Frontend JavaScript library for building user interfaces based on components.
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework that it does not provide a series of predefined classes for elements.
- [Typescript](https://www.typescriptlang.org) - High-level programming language that adds static typing with optional type annotations to JavaScript.

## Deployment

Application hosted on AWS Lambda: https://e-commerce.sebastiansanchis.com/
