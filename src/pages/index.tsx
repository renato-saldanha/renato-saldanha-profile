import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/styles.module.css";
import Home from "./Home";

const inter = Inter({ subsets: ["latin"] });

export default function App() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main >
        <Home />
      </main>
    </>
  );
}
