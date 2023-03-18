"use client";
import { ComboBox } from "@/components";
import { languages } from "@/utils/data";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

type Props = {};

const UserN = (props: Props) => {
  const { register, handleSubmit, control } = useForm();
  const { data } = useSession();
  console.log(data);
  const user = data?.user as User;

  const onSave = async (fdata: any) => {
    const { lang, ...otherdata } = fdata;

    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...otherdata,
        lang: lang.name,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex items-center gap-5 flex-col">
      <h1 className="text-2xl text-center">Setup Your Profile</h1>
      <form
        onSubmit={handleSubmit(onSave)}
        className="flex flex-col items-center w-full justify-between gap-2.5"
      >
        <div className="">Create Your Username</div>
        <input
          {...register("username", { required: true })}
          type="text"
          placeholder="Username"
          className="input  input-bordered w-full "
        />
        <div className="">Choose Your Native Language</div>
        <ComboBox control={control} name="lang" dataArr={languages} />
      </form>
      <button type="submit" className="h-full w-full flex-[0.2] btn px-3 ">
        Save
      </button>
    </div>
  );
};

{
  /* <button className="h-full flex-[0.2] btn px-3 " onClick={() => signOut()}>
  log out
</button> */
}
export default UserN;
