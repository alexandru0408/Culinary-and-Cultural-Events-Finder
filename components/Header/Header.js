import Link from "next/link";
import { useContext } from "react";
import { GiFoodTruck } from "react-icons/gi";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import Search from "../Search/Search";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

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

      <Search />

      <nav className="header__menu">
        <ul>
          <li>
            <Link href="/events">
              <a>FESTIVALS</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>ÜBER UNS</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>FESTIVAL HINZUFÜGEN</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>DASHBOARD</a>
                </Link>
              </li>
              <li>
                <button className="header__logout-btn" onClick={() => logout()}>
                  <AiOutlineLogout style={{ marginRight: "5px" }} /> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login">
                  <a className="header__login-btn">
                    <AiOutlineLogin style={{ marginRight: "7px" }} /> LOGIN
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
