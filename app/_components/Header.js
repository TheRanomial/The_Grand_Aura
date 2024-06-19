import Navigation from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";


function Header() {
  return (
    <div className=" px-8 py-4">
      <div className="flex justify-between items-center max-w-8xl">
        <Logo />
        <Navigation />
      </div>
    </div>
  );
}

export default Header;
