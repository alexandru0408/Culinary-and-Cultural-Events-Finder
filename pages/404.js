import Layout from "@/components/Layout/Layout";
import Link from "next/link";
import { BsExclamationTriangle } from "react-icons/bs";

export default function NotFoundView() {
  return (
    <Layout title="Page Not Found">
      <div className="not-found-page">
        <h1>
          <BsExclamationTriangle /> 404
        </h1>
        <h4>Sorry, the page your looking for does not exist.</h4>
        <Link href="/">
          <a>Go back Home</a>
        </Link>
      </div>
    </Layout>
  );
}
