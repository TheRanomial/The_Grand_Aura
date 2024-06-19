import { auth } from "@/app/_lib/auth";
import { getServerSession } from "next-auth";

/*export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}*/
export const revalidate = 0;

export default function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <a href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </a>
        </li>
        <li>
          <a href="/about" className="hover:text-accent-400 transition-colors">
            About
          </a>
        </li>

        <li>
          <a
            href="/account"
            className="hover:text-accent-400 transition-colors"
          ></a>
        </li>
      </ul>
    </nav>
  );
}
