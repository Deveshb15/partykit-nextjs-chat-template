import "./globals.css";
import type { Metadata } from "next";
import {  VT323 } from "next/font/google";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

const vt323 = VT323({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team 7",
  description: "cry alone on this valentines day",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={vt323.className}>
          <div
            className="flex flex-col justify-between relative"
            style={{ minHeight: "100dvh" }}
          >
            {/* <Header /> */}
            <div className="flex-grow p-4 sm:p-6">
              <div className="max-w-7xl m-auto w-full flex flex-col justify-start items-start">
                {children}
              </div>
            </div>
            {/* <Footer /> */}
          </div>
      </body>
    </html>
  );
}