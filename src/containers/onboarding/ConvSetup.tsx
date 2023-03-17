"use client";

import { useState,Fragment } from "react";
import { Combobox, RadioGroup,Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import { OnBoardInput } from "@/components";
type Props = {};


const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]


const ConvSetup = (props: Props) => {
  let [gender, setgender] = useState("male");
  const [selected, setSelected] = useState(people[0])
  const [query, setQuery] = useState('')
  const [botname, setBotname] = useState('')
  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl text-center">
        Lets Setup Your <br /> Conversation
      </h1>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
        <div className=" ">
          Name You Partner
        </div>
        <input
        onChange={(e) => setBotname(e.target.value)}
        type="text"
        required
        placeholder="Karan"
        className="input  input-bordered w-full "
      />
          </div>
        {/* Bot Gender  */}
        <RadioGroup
          className={"flex flex-col gap-2.5"}
          value={gender}
          onChange={setgender}
        >
          <RadioGroup.Label className={""}>
            Choose You Conversation Partner
          </RadioGroup.Label>
          <div className="flex gap-5">
            <RadioGroup.Option value="male">
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
            <RadioGroup.Option value="female">
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
                  <span className="text-lg">Male</span>
                </div>
              )}
            </RadioGroup.Option>
          </div>
        </RadioGroup>
        {/* Bot Gender end*/}

        {/* Learning Language*/}
        <div className="flex flex-col gap-2.5">
        <div className="">
          What Language will you learn?
        </div>
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative bg-base-300 ">
          <div className="relative rounded-2xl w-full cursor-default overflow-hidden  text-left shadow-md focus:outline-none focus-visible:ring-2    sm:text-sm">
            <Combobox.Input
              className="w-full  outline-none bg-base-300 border-none py-2 pl-3 pr-10 text-lg leading-5  focus:ring-0"
              displayValue={(person) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-base-200 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary text-white' : ''
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
                      </div>
                      <button className='btn'type="submit">
                            Save
                      </button>
      </form>
    </div>
  );
};

export default ConvSetup;
