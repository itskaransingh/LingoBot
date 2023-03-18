"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { ComboBox, GenderRadio } from "@/components";
import { User } from "next-auth";
import { languages } from "@/utils/data";

type Props = {};

const ConvSetup = (props: Props) => {
  const { register, handleSubmit,control } = useForm();
  const { data } = useSession();
  console.log(data);
  const user = data?.user as User ;


  const onSave = async (fdata:any) => {
     const {langtolearn,...otherdata} = fdata;

    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...otherdata,
        isSetupComplete:true,
        langtolearn: langtolearn.name,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl text-center">
        Lets Setup Your <br /> Conversation
      </h1>
      <form
        onSubmit={handleSubmit(onSave)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <div className=" ">Name You Partner</div>
          <input
            {...register("botname", { required: true })}
            type="text"
            required
            placeholder="Karan"
            className="input  input-bordered w-full "
          />
        </div>

        <GenderRadio name="isMalebot" control={control}/>

        {/* Learning Language*/}
        <div className="flex flex-col gap-2.5">
          <div className="">What Language will you learn?</div>
         <ComboBox dataArr={languages} name="langtolearn" control={control} />
        </div>

        <button className="btn" value={'save'} type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default ConvSetup;
