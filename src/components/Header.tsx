import logo from "../assets/marjanemall-logo.svg";

export default function Header() {
  const handleLogoClick = () => {};
  return (
    <header className="shadow-md bg-[#0b4d54]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center sm:justify-between h-16">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-auto hover:cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>
          <div className="flex items-center"></div>
        </div>
      </div>
    </header>
  );
}
