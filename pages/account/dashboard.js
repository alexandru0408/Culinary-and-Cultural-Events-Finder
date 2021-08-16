import { parseCookie } from "@/utils/index";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";

import Layout from "@/components/Layout/Layout";
import DashboardEvent from "@/components/DashboardEvent/DashboardEvent";

export default function DashboardView({ events, token }) {
  console.log("events: ", events);

  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm("Sind Sie sicher?")) {
      const res = await fetch(`${API_URL}/festivals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className="dashboard">
        <h1>DASHBOARD</h1>
        <h3>Meine Festivals</h3>
        {events.map((event) => (
          <DashboardEvent
            key={event.id}
            event={event}
            handleDeleteEvent={deleteEvent}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);
  const res = await fetch(`${API_URL}/festivals/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}
