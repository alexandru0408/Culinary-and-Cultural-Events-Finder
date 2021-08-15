import Link from "next/link";
import Image from "next/image";

export default function EventCard({ event }) {
  return (
    <div className="event-card">
      <div className="event-card__img">
        <Image
          alt="street food"
          src={event.image ? event.image.formats.thumbnail.url : null}
          width={170}
          height={100}
        />
      </div>

      <div className="event-card__info">
        <span>
          {new Date(event.date).toLocaleDateString("de-DE")} um {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>
      <div className="event-card__link">
        <Link href={`/events/${event.slug}`}>
          <a>Details</a>
        </Link>
      </div>
    </div>
  );
}
