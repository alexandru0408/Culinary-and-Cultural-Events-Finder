// import Image from "next/image";
import EventCard from "@/components/EventCard/EventCard";
import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function HomeView({ events }) {
  return (
    <Layout>
      <h1>Bevorstehende Festivals :</h1>
      {events.length === 0 && <h3>No Festivals for the moment</h3>}

      {events.map((evt) => (
        <EventCard key={evt.id} event={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a
            style={{
              color: "#0197f6",
              textDecoration: "none",
              fontWeight: "400",
            }}
          >
            Sehen Sie alle Festivals
          </a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/festivals?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events: events },
  };
}
