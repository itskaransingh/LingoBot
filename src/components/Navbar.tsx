import { authOption } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import SettingsBtn from "./SettingsBtn";

type Props = {
  botname: string;
};

const Navbar = ({ botname }: Props) => {
  return (
    <nav className=" fixed top-0 left-0 right-0 z-50 bg-base-300  ">
      <div className="navbar max-w-6xl px-5 md:px-0 mx-auto">
        <div className="navbar-start  ">
          <Image
            src={"./svg/icons/backarrow.svg"}
            alt="back arrow"
            className=""
            height={20}
            width={20}
          />
        </div>
        <div className="navbar-center">
          <div className="w-10 rounded-full">{botname}</div>
        </div>
        <div className="navbar-end">
         <SettingsBtn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
