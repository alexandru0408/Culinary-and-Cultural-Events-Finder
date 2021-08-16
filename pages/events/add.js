import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import { parseCookie } from "@/utils/index";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEventView({ token }) {
  const [values, setValues] = useState({
    name: "",
    countries: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    const hasEmptyFields = Object.values(values).some((el) => el === "");
    if (hasEmptyFields) {
      toast.error("Bitte alle Formularfelder ausfüllen ");
    }

    const res = await fetch(`${API_URL}/festivals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorized");
        return;
      }
      toast.error("Etwas ist schiefgelaufen");
    } else {
      const event = await res.json();
      router.push(`/events/${event.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <div className="add">
        <Link href="/events">
          <a className="add__back">{"<"} Zurück</a>
        </Link>
        <h1>FESTIVAL HINZUFÜGEN</h1>
        <ToastContainer />
        <form className="add__form" onSubmit={handleSubmit}>
          <div className="add__grid">
            <div>
              <label htmlFor="name">Name des Festivals</label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="performers">Länder</label>
              <input
                type="text"
                name="countries"
                id="countries"
                value={values.countries}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                name="address"
                id="address"
                value={values.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="date">Datum</label>
              <input
                type="date"
                name="date"
                id="date"
                value={values.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="time">Zeit</label>
              <input
                type="text"
                name="time"
                id="time"
                value={values.time}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description">Beschreibung des Festivals</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={values.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <input type="submit" value="Festival Hinzufügen" className="btn" />
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  return {
    props: {
      token,
    },
  };
}
