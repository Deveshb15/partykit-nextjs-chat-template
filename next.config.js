const PARTYKIT_HOST = process.env.NEXT_PUBLIC_PARTYKIT_HOST || "127.0.0.1:1999";
const PARTYKIT_PROTOCOL =
  PARTYKIT_HOST?.startsWith("localhost") ||
  PARTYKIT_HOST?.startsWith("127.0.0.1")
    ? "http"
    : "https";
const PARTYKIT_URL = `${PARTYKIT_PROTOCOL}://${PARTYKIT_HOST}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "avatars.githubusercontent.com", "pbs.twimg.com", "api.dicebear.com"],
  },
};

module.exports = nextConfig;
