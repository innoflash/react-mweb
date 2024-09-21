'use client'

import store from '@mweb/app/store';
import localFont from "next/font/local";
import "./globals.css";
import { Provider } from 'react-redux';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Provider store={ store }>
      <body className={ `${ geistSans.variable } ${ geistMono.variable } antialiased` }>
      <div className="container w-screen mx-auto my-4">
        { children }
      </div>
      </body>
    </Provider>
    </html>
  );
}
