"use client";

import 'tailwindcss/tailwind.css'
import "@/public/css/global.css";

import {NextUIProvider} from "@nextui-org/react";


export default function RootLayout({children}) {

    return (
        <html lang="en">
        <body className={"bg-white"}>
        <NextUIProvider>
            {children}
        </NextUIProvider>
        </body>
        </html>
    );
}
