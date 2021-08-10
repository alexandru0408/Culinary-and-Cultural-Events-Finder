import { GiFoodTruck } from "react-icons/gi";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero">
      <h1>Welcome to</h1>
      <div className="hero__logo">
        <Link href="/about">
          <a>
            <GiFoodTruck size="4rem" style={{ marginRight: "10px" }} /> Street
            Food
          </a>
        </Link>
      </div>

      <h2>Find the latest Street Food Festivals</h2>
    </div>
  );
}
