"use client";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {
};

const CreateUserN = ({}: Props) => {
  const [username, setUsername] = useState("");
  const { data } = useSession();
  console.log(data);
  const user = data?.user ;

  const senddata = async () => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center w-full justify-between gap-2.5">
      <input
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
        className="input  input-bordered w-full "
      />
      <button
        onClick={() => senddata()}
        className="h-full w-full flex-[0.2] btn px-3 "
      >
        Save
      </button>
      {/* <button className="h-full flex-[0.2] btn px-3 " onClick={() => signOut()}>
        log out
      </button> */}
    </div>
  );
};

export default CreateUserN;
