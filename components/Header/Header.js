import Link from "next/link";
import { GiFoodTruck } from "react-icons/gi";

export default function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link href="/">
          <a>
            <GiFoodTruck size="2.7rem" style={{ marginRight: "10px" }} /> Street
            Food
          </a>
        </Link>
      </div>

      <nav className="header__menu">
        <ul>
          <li>
            <Link href="/events">
              <a>FESTIVALS</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
