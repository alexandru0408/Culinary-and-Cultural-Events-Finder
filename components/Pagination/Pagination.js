import Link from "next/link";
import { PER_PAGE } from "@/config/index";

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <div className="pagination">
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="pagination__page">Vorherige</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="pagination__page">Nächste</a>
        </Link>
      )}
    </div>
  );
}
