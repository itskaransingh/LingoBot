"use client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";


type Props = {

};

const UserN = ({ }: Props) => {
  const [existingusern, setExistingusern] = useState(false)
  const [somethingWentWrong, setSomethingWentWrong] = useState(false)
  const { register, handleSubmit, control } = useForm();
  const { data } = useSession();

  const user = data?.user as User;



  const onSave = async (fdata: any) => {
    const { username } = fdata;

    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });
    const data = await res.json();
    if (data.success) {
      window.location.reload();
    }
    else {
      console.log(data)
      data.status === 500 ? setSomethingWentWrong(true) : setExistingusern(true)

    }

  };

  return (
    <div className="flex items-center gap-5 flex-col">
      <h1 className="text-2xl text-center">Setup Your Profile</h1>
      {somethingWentWrong && <h2 className="text-xl text-red-500">Something Went Wrong</h2>}
      <form
        onSubmit={handleSubmit(onSave)}
        className="flex flex-col items-start w-full justify-between gap-2.5"
      >
        <div className="">Create Your Username</div>
        {existingusern && <div className="text-lg text-red-500">Username Already Exist</div>}
        <input
          {...register("username", { required: true })}
          type="text"
          placeholder="Username"
          className="input  input-bordered w-full "
        />

        <button value={'save'} type="submit" className="h-full w-full flex-[0.2] btn px-3 ">
          Save
        </button>
      </form>
    </div>
  );
};

{
  /* <button className="h-full flex-[0.2] btn px-3 " onClick={() => signOut()}>
  log out
</button> */
}
export default UserN;


