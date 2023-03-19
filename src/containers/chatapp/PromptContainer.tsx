"use client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
 conv : any
};

const someSent = [
  { id: 1, name: "Lorem ipsum dolor sit " },
  { id: 2, name: "Lorem ipsum dolor sit amet" },
  { id: 3, name: "Lorem ipsum dolor " },
  { id: 4, name: "Lorem ipsum dolor sit amet" },
  { id: 5, name: "Lorem ipsum dolor sit amet" },
  { id: 6, name: "Lorem ipsum " },
  { id: 7, name: "Lorem ipsum dolor sit amet" },
];

const PromptContainer =  ({conv}: Props) => {
  const { register, handleSubmit,reset } = useForm();
  const { data: session } = useSession();
  const user = session?.user as User
  const onSubmit = async (data: any) => {
    console.log(data);
    reset();
 
    const reply = await fetch(`/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        botname:user?.botname,
        isMalebot:user?.isMalebot,
        lang:user?.lang,
        langtolearn:user?.langtolearn,
        username:user?.username,
        id:user?.id,
        convid: conv?.id || 0,
        prompt: data.prompt,
      }),
    });
    const result = await reply.json();
    console.log(result);
  };
  return (
    <div className="fixed md:px-0 px-2.5 bottom-0 left-0 right-0">
      <div className="max-w-6xl flex flex-col gap-3 my-5 mx-auto">
        <div className="overflow-x-auto  mx-1 hide-scrollbar">
          <div className="grid overflow-x-auto py-2 w-max grid-flow-col gap-2">
            {someSent.map(({ id, name }) => (
              <div
                className="bg-primary hover:brightness-90 border border-black  box-border md:cursor-pointer  px-3 py-2 rounded-full"
                key={id}
              >
                <div>{name}</div>
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-lg overflow-hidden outline outline-primary outline-1  flex"
          action=""
        >
          <input
            className="w-full input bg-base-300  outline-none rounded-none"
            type="text"
            {...register("prompt", { required: true })}
          />
          <button className="btn rounded-none" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 text-secondary h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromptContainer;
