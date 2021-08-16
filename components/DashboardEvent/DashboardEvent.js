import Link from "next/link";

import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function DashboardEvent({ event, handleDeleteEvent }) {
  return (
    <div className="dashboard-event">
      <h4>
        <Link href={`/events/${event.slug}`}>
          <a>{event.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${event.id}`}>
        <a className="dashboard-event__edit">
          <AiOutlineEdit /> <span>Festival Bearbeiten</span>
        </a>
      </Link>
      <a
        href="#"
        className="dashboard-event__delete"
        onClick={() => handleDeleteEvent(event.id)}
      >
        <AiOutlineDelete style={{ color: "#d7263d" }} />{" "}
        <span>Festival Entfernen</span>
      </a>
    </div>
  );
}
