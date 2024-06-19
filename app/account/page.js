import { auth } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Account",
};

async function page() {

  const session=await auth();

  return <div className="text-accent-500 text-3xl">Welcome {session.user.name} to your profile</div>;
}

export default page;
