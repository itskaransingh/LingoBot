"use client";

import { useState, Fragment } from "react";
import { Combobox, RadioGroup, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

type Props = {};

const languages = [
  { id: 1, name: "English" },
  { id: 2, name: "Mandarin Chinese" },
  { id: 3, name: "Spanish" },
  { id: 4, name: "French" },
  { id: 5, name: "Arabic" },
  { id: 6, name: "German" },
  { id: 7, name: "Japanese" },
  { id: 8, name: "Russian" },
  { id: 9, name: "Portuguese" },
  { id: 10, name: "Italian" },
];

const ConvSetup = (props: Props) => {
  const { register, handleSubmit } = useForm();
  const [isMale, setisMale] = useState(true);
  const [langselected, setlangselected] = useState(languages[0]);
  const [query, setQuery] = useState("");
  const [botname, setbotname] = useState("");
  const { data } = useSession();
  console.log(data);
  const user = data?.user ;

  const filteredLanguages =
    query === ""
      ? languages
      : languages.filter((lang) =>
          lang.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const onSave = async (fdata) => {
    // e.preventDefault();
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        botname: botname,
        langtolearn: langselected.name,
        isMalebot: isMale,  
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
            onChange={(e) => setbotname(e.target.value)}
            placeholder="Karan"
            className="input  input-bordered w-full "
          />
        </div>
        {/* Bot isMale   */}
        <RadioGroup
          className={"flex flex-col gap-2.5"}
          value={isMale}
          {...register("isMalebot")}
          onChange={setisMale}
          name="isMalebot"
        >
          <RadioGroup.Label className={""}>
            Choose You Conversation Partner
          </RadioGroup.Label>
          <div className="flex gap-5">
            <RadioGroup.Option refName="isMalebot"  value={true}>
              {({ checked }) => (
                <div
                  className={`${
                    checked ? "border border-primary" : ""
                  } h-40 md:cursor-pointer rounded-xl  w-40 gap-5 p-5 bg-base-300 flex justify-center items-center flex-col`}
                >
                  <Image
                    height={100}
                    width={100}
                    src="./svg/male_avatar.svg"
                    alt="male avatar"
                  />
                  <span className="text-lg">Male</span>
                </div>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option refName="isMalebot" value={false}>
              {({ checked }) => (
                <div
                  className={`${
                    checked ? "border border-primary" : ""
                  } h-40 md:cursor-pointer rounded-xl  w-40 gap-5 p-5 bg-base-300 flex justify-center items-center flex-col`}
                >
                  <Image
                    height={100}
                    width={100}
                    src="./svg/female_avatar.svg"
                    alt="female avatar"
                  />
                  <span className="text-lg">Female</span>
                </div>
              )}
            </RadioGroup.Option>
          </div>
        </RadioGroup>
        {/* Bot Gender end*/}

        {/* Learning Language*/}
        <div className="flex flex-col gap-2.5">
          <div className="">What Language will you learn?</div>
          {/* {...register("langtolearn")} */}
         
        </div>
        <input className="btn" value={'save'} type="submit"/>
      </form>
    </div>
  );
};

export default ConvSetup;
