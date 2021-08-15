// import Image from "next/image";
import EventCard from "@/components/EventCard/EventCard";
import Layout from "@/components/Layout/Layout";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import Link from "next/link";

import qs from "qs";

export default function SearchView({ events }) {
  const router = useRouter();

  return (
    <Layout title="Search">
      <div className="search">
        <div>
          <Link href="/events">
            <a className="search__back">{"<"} Zurück</a>
          </Link>
        </div>
        <h1>Suchergebnisse für {router.query.term} :</h1>
        {events.length === 0 && <h3>Momentan gibt es keine Festivals</h3>}

        {events.map((evt) => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { countries_contains: term },
        { address_contains: term },
        { description_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/festivals?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}
