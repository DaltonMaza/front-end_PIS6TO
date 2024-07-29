import { Lato } from "next/font/google";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css'
import "./globals.css";
import Chatbot from "./components/chat-bot";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "./components/NavBar";
import Header from "./components/Header";

const lato = Lato({ subsets: ["latin"], weight: '900' });

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Helios</title>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" />
      </head>

      <body className={lato.className} style={{ height: "100vh" }}>
        <AuthProvider>
          <Header/>
          <div className="app-container">
            <NavBar/>
            {children}
            <Chatbot></Chatbot>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}