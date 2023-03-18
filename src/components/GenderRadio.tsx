"use client"

import { RadioGroup } from '@headlessui/react'
import Image from 'next/image'
import React from 'react'
import { useController } from 'react-hook-form'

type Props = {
    name: string,
    control: any,
}

const GenderRadio = ({name,control}: Props) => {
    const {
        field: { value, onChange }
      } = useController({name, control,defaultValue: true})

  return(
    <RadioGroup
    onChange={onChange}
    value={Boolean(value)}
          className={"flex flex-col gap-2.5"}
        >
          <RadioGroup.Label className={""}>
            Choose You Conversation Partner
          </RadioGroup.Label>
    <div className="flex gap-5">
    <RadioGroup.Option
      value={true}
    refName="isMalebot" 
>
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
    <RadioGroup.Option
      value={false}
    refName="isMalebot">
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
  )
}

export default GenderRadio