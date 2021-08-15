import Link from "next/link";

export default function Footer() {
  const actualDate = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Copyright &copy; Street Food {actualDate}</p>
      <p>
        <Link href="/about">
          <a>Street Food Projekt</a>
        </Link>
      </p>
    </footer>
  );
}
