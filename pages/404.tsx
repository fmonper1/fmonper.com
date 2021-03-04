import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="text-center py-8 space-y-4">
      <h1 className="text-5xl">404</h1>
      <img src="/images/404/bender.png" className="mx-auto" />
      <h2 className="text-2xl">Page Not Found </h2>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </div>
  );
}
