"use client";
import { starters } from "@/utils/data";
import { getls, setls } from "@/utils/helpers/ls";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  conv: any;
  setloading: any;
};

const PromptContainer = ({ conv, setloading }: Props) => {
  const { register, handleSubmit, reset } = useForm();

  const [starter, setStarter] = useState(starters);
  const { data: session } = useSession();
  const user = session?.user as User;

  const rawconversations = getls("rawconversations") || [];
  const conversations = getls("conversations") || [];

  const onSubmit = async (data: any) => {
    rawconversations.push({
      role: "user",
      content: data.message,
    });
    conversations.push({
      message: data.message,
      sender: "user",
      isbot: false,
      messagetype: "text",
    });
    setls("rawconversations", rawconversations);
    setls("conversations", conversations);

    setloading(true);
    console.log(conversations);
    reset();

    const reply = await fetch(`/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        botname: user?.botname,
        isMalebot: user?.isMalebot,
        lang: user?.lang,
        langtolearn: user?.langtolearn,
        username: user?.username,
        id: user?.id,
        conversations: rawconversations,
      }),
    });

    const result = await reply.json();
    if (result.success) {
      setloading(false);
      rawconversations.push({
        role: "assistant",
        content: result.rawreply,
      });
      conversations.push({
        message: result.message,
        isbot: true,
        sender: user?.botname,
        translation: result.translation,
        messagetype: "text",
      });
      setls("rawconversations", rawconversations);
      console.log(rawconversations);
      setls("conversations", conversations);
    } else {
      setloading(false);

      console.log(result);
    }
  };

  const sendStarter = (id: number, text: string) => {
    onSubmit({ message: text });
    setStarter(() => starter.filter((starter) => starter.id !== id));
  };

  return (
    <div className="fixed z-30 xl:px-0 px-2.5 bottom-0 left-0 right-0">
      <div className="max-w-6xl flex flex-col gap-3 my-5 mx-auto">
        <div className="overflow-x-auto  mx-1 hide-scrollbar">
          <div className="grid overflow-x-auto py-2 w-max grid-flow-col gap-2">
            {starter.map(({ id, text }) => (
              <div
                onClick={() => sendStarter(id, text)}
                className="bg-primary hover:brightness-90 border border-black  box-border md:cursor-pointer  px-3 py-2 rounded-full"
                key={id}
              >
                <div>{text}</div>
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
            {...register("message", { required: true })}
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
