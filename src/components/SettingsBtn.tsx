'use client'

import { setls } from '@/utils/helpers/ls'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

type Props = {}

function SettingsBtn({}: Props) {
  return (
    <div className="dropdown  dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="hover:rotate-90 md:cursor-pointer h-6 w-6 transition-all duration-500">
                <Image
                  src={"./svg/icons/settings.svg"}
                  alt="Settings"
                  className=""
                  height={10}
                  width={10}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li onClick={()=> {
                 setls("rawconversations", []);
                 setls("conversations", []);
                 window.location.reload();
              }}>
               <a >

                  Clear conversation
               </a>
      
              </li>
              <li>
              <label htmlFor="settingsModal" >Settings</label>
              </li>
              <li onClick={()=> signOut()}  >
                <a >

                Logout
                </a>
              </li>
            </ul>
          </div>
  )
}

export default SettingsBtn