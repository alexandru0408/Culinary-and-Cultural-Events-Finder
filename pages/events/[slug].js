import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import FestivalMap from "@/components/FestivalMap/FestivalMap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventView({ event }) {
  const router = useRouter();

  return (
    <Layout>
      <div className="event">
        <span>
          {new Date(event.date).toLocaleString("de-DE")} um {event.time}
        </span>
        <h1>{event.name}</h1>
        <ToastContainer />
        {event.image && (
          <div className="event__image">
            <Image
              alt=""
              src={event.image.formats.thumbnail.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Foods that you can taste:</h3>
        <p>{event.countries}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <p>{event.address}</p>

        <FestivalMap event={event} />

        <Link href="/events">
          <a className="event__back">{"<"} Zurück</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/festivals`);
  const events = await res.json();

  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/festivals?slug=${slug}`);
  const events = await res.json();

  return {
    props: { event: events[0] },
    // revalidate: 1,
  };
}
