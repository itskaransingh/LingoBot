"use client";

import { languages } from "@/utils/data";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ComboBox from "./ComboBox";

type Props = {};
//  {/* The button to open modal */}
// <label htmlFor="my-modal-4" className="btn">open modal</label>

const SettingsModel = (props: Props) => {
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);
  const { register, handleSubmit, control } = useForm();
  const { data } = useSession();
  // console.log(data);
  const user = data?.user as User;
  const currentLangToLearn = typeof window !== 'undefined' ?localStorage.getItem("langtolearn") : "English"
  
  const onSave = async (fdata: any) => {
    const { langtolearn, ...otherdata } = fdata;
    localStorage?.setItem("langtolearn", langtolearn.name);
    // localStorage.setItem("conversations", JSON.stringify([]));
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...otherdata,
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
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-4"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Your Learning Settings</h3>
          {somethingWentWrong && (
            <h4 className="text-base text-red-500">Something Went Wrong</h4>
          )}
          <form
            action=""
            onSubmit={handleSubmit(onSave)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2.5">
              <div className="">What Language will you learn?</div>
              <ComboBox
                defaultValue={languages.find(
                  (lang) => lang.name === currentLangToLearn
                )}
                dataArr={languages}
                name="langtolearn"
                control={control}
              />
            </div>
            <button className="btn" type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingsModel;
