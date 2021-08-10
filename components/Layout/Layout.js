import Head from "next/head";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import { useRouter } from "next/router";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();

  return (
    <div className="layout">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      {router.pathname === "/" && <Hero />}
      <div className="layout__container">{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Street Food Festivals|Find the latest Street Food Festivals",
  description: "Find the latest Street Food Festivals",
  keywords: "food, drink, art,beer, pizza,hamburger, street",
};
