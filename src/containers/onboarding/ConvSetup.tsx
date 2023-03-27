"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { ComboBox, GenderRadio } from "@/components";
import { User } from "next-auth";
import { languages } from "@/utils/data";
import { useState } from "react";
import { useAppContext } from "@/contexts/Providers";

type Props = {};

const ConvSetup = ({}: Props) => {
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const { data } = useSession();
  console.log(data);
  const user = data?.user as User;
  // const {rs} = useAppContext()

  const onSave = async (fdata: any) => {
    const { langtolearn, ...otherdata } = fdata;
    localStorage.setItem("langtolearn", langtolearn.name);
    localStorage.setItem("conversations", JSON.stringify([]));
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...otherdata,
        isSetupComplete: true,
        langtolearn: langtolearn.name,
      }),
    });
    const data = await res.json();
    if (data.success) {
      window.location.reload();
    } else {
      console.log(data);
      setSomethingWentWrong(true);
    }
  };

  return (
    <div className="flex  flex-col gap-10">
      <h1 className="text-2xl text-center">
        Lets Setup Your <br /> Conversation
      </h1>
      {somethingWentWrong && (
        <h2 className="text-xl text-red-500">Something Went Wrong</h2>
      )}
      <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2.5">
          <div className="">What Language will you learn?</div>
          <ComboBox defaultValue={languages[0]} dataArr={languages} name="langtolearn" control={control} />
        </div>
          <div className=" ">Name You Partner</div>
          <input
            {...register("botname", { required: true })}
            type="text"
            required
            placeholder="Karan"
            className="input  input-bordered w-full "
          />
        </div>

        <GenderRadio name="isMalebot" control={control} />

        {/* Learning Language*/}

        <button className="btn" value={"save"} type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default ConvSetup;
