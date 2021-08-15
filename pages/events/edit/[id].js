import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout/Layout";
import Modal from "@/components/Modal/Modal";
import ImgUpload from "@/components/ImgUpload/ImgUpload";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineFileAdd } from "react-icons/ai";
import moment from "moment";

export default function EditEventView({ event }) {
  const [values, setValues] = useState({
    name: event.name,
    countries: event.countries,
    address: event.address,
    date: event.date,
    time: event.time,
    description: event.description,
  });

  const [imagePreview, setImagePreview] = useState(
    event.image ? event.image.formats.thumbnail.url : null
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    const hasEmptyFields = Object.values(values).some((el) => el === "");
    if (hasEmptyFields) {
      toast.error("Bitte alle Formularfelder ausfüllen ");
    }

    const res = await fetch(`${API_URL}/festivals/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
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

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/festivals/${event.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add New Event">
      <div className="edit">
        <Link href="/events">
          <a className="edit__back">{"<"} Zurück</a>
        </Link>
        <h1>FESTIVAL BEARBEITEN</h1>
        <ToastContainer />
        <form className="edit__form" onSubmit={handleSubmit}>
          <div className="edit__grid">
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
                value={moment(values.date).format("yyyy-MM-DD")}
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
          <input type="submit" value="Festival Aktualisieren" className="btn" />
        </form>
        <h2>Bild des Festivals</h2>
        {imagePreview ? (
          <Image src={imagePreview} height={100} width={170} />
        ) : (
          <div>
            <p>Kein Bild hochgeladen</p>
          </div>
        )}
        <div className="edit__add-image-btns">
          <button
            className="edit__add-image"
            onClick={() => setShowModal(true)}
          >
            <AiOutlineFileAdd /> Bild Hinzufügen
          </button>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImgUpload eventId={event.id} imageUploaded={imageUploaded} />
        </Modal>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/festivals/${id}`);
  const event = await res.json();

  return {
    props: {
      event,
    },
  };
}
