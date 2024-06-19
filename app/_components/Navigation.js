import Link from "next/link";
import { auth } from "../api/auth/[...nextauth]/route";

export const revalidate = 0;

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-l mx-10 text-primary-100">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Rooms
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>

        {session?.user?.name ? (
          <Link
          href="/account"
          className="hover:text-accent-400 transition-colors flex items-center gap-3"
        >
          <img className="h-8 rounded-full" src={session.user.image} alt={session.user.image} referrerPolicy="no-referrer"/>
          Guest area
        </Link>
        ) : (
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
