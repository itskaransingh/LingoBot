import Image from "next/image";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className=" bg-base-300  ">
      <div className="navbar max-w-6xl px-5 md:px-0 mx-auto">
        <div className="navbar-start  ">
          <Image src={'./svg/icons/backarrow.svg'} alt='back arrow' className="" height={20} width={20} />
        </div>
        <div className="navbar-center">
          <div className="w-10 rounded-full">Karan</div>
        </div>
        <div className="navbar-end ">
          <div className="hover:rotate-90 md:cursor-pointer transition-all duration-500">
          <Image src={'./svg/icons/settings.svg'} alt='Settings' className="" height={20} width={20} />
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
