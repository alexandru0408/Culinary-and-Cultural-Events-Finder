// import Image from "next/image";
import EventCard from "@/components/EventCard/EventCard";
import Layout from "@/components/Layout/Layout";
import Pagination from "@/components/Pagination/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsView({ events, page, total }) {
  return (
    <Layout>
      <h1>Festivals :</h1>
      {events.length === 0 && <h3>Momentan gibt es keine Festivals</h3>}

      {events.map((evt) => (
        <EventCard key={evt.id} event={evt} />
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // fetch total
  const totalRes = await fetch(`${API_URL}/festivals/count`);
  const total = await totalRes.json();

  // fetch festivals
  const eventRes = await fetch(
    `${API_URL}/festivals?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}
