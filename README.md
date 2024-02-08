PartyKit is an open source platform for developing multiplayer, real-time applications.

This is a [PartyKit](https://partykit.io) project using [Next.js](https://nextjs.org/)

## Getting Started

First, copy the `.env.example` file to `.env` in the project root.
```bash
cp .env.example .env
```

Then, open the created `.env` file and fill in the missing environment variables.

Then, run the development server:

```bash
npm install
npm run dev
```

This will start the PartyKit development server at port **1999**, and a Next.js development server at port **3000**.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
## What's included

This template application demonstrates various use cases of PartyKit.


The [`/party`](party/) directory contains partykit servers with the following examples:

## Deploy

### Deploy the PartyKit Server on PartyKit

When you're ready to deploy your application to the internet, run the following command to deploy the PartyKit Server:

```bash
npx partykit deploy
```

This will deploy the code to your PartyKit account — and if you don't have an account yet, we'll create one as part of the deployment.

### Configure environment variables

In development mode, PartyKit uses your `.env` file to read configuration values. 

For production, you'll need to set the production environment variables:

```bash

# Redeploy with new variables
npx partykit deploy
```


### Deploy the website on Vercel

The easiest way to deploy the Next.js frontend for your PartyKit app is to use the [Vercel Platform](https://vercel.com) from the creators of Next.js.

When you deploy the site to Vercel, remember to add the environment variables from your `.env` file in your Vercel project dashboard. 

The `NEXT_PUBLIC_PARTYKIT_HOST` variable should be set to be the domain of your partykit server, e.g. `https://my-project.my-username.partykit.dev`. The domain name will be displayed when you deploy the PartyKit project.


## Learn More

To learn more about PartyKit, take a look at [PartyKit documentation](https://docs.partykit.io).
