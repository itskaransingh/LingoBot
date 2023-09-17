import SettingsBtn from "./SettingsBtn";

type Props = {
  botname: string;
};

const Navbar = ({ botname }: Props) => {
  return (
    <nav className=" fixed top-0 left-0 right-0 z-50 bg-base-300  ">
      <div className="navbar   max-w-6xl px-5 xl:px-0 mx-auto">
        <div className="navbar-start">
          <div className=" break-words text-lg rounded-full">{botname}</div>
        </div>
        <div className="navbar-end">
         <SettingsBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
