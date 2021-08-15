import { GiFoodTruck } from "react-icons/gi";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__center">
        <h1>Reisen und Entdecken Sie nach Ihrem Geschmack</h1>
        <div className="hero__logo">
          <Link href="/about">
            <a>
              <GiFoodTruck size="4rem" style={{ marginRight: "10px" }} /> Street
              Food
            </a>
          </Link>
        </div>

        <h2>Finden Sie die neuesten Street Food Festivals</h2>
      </div>
    </div>
  );
}
