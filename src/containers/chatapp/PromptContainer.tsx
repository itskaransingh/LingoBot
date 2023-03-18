"use client";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

const someSent = [
  { id: 1, name: "Lorem ipsum dolor sit " },
  { id: 2, name: "Lorem ipsum dolor sit amet" },
  { id: 3, name: "Lorem ipsum dolor " },
  { id: 4, name: "Lorem ipsum dolor sit amet" },
  { id: 5, name: "Lorem ipsum dolor sit amet" },
  { id: 6, name: "Lorem ipsum " },
  { id: 7, name: "Lorem ipsum dolor sit amet" },
];

const PromptContainer = (props: Props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div className="max-w-6xl flex flex-col gap-3 my-5 mx-auto">
        <div className="overflow-x-auto">
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
