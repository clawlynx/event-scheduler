"use client";
import { useState, ChangeEvent, FormEvent } from "react";

export const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    sdate: "",
    edate: "",
    startTime: "",
    endTime: "",
  });

  function handleClick() {
    const formDiv = document.getElementById("formdiv") as HTMLButtonElement;
    formDiv.classList.remove("hidden");
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("/api/updateForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await response.json();
      if (response.ok) {
        console.log("Data added to JSON file successfully!");
        setFormData({
          title: "",
          address: "",
          sdate: "",
          edate: "",
          startTime: "",
          endTime: "",
        });
        const formDiv = document.getElementById("formdiv") as HTMLButtonElement;
        formDiv.classList.add("hidden");
        window.location.reload();
      } else {
        console.error("Failed to update JSON file:", response.statusText);
      }
    } catch (error) {
      throw new Error();
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className=" p-3 mt-3 animate text-slate-200 rounded-3xl transition ease-in-out delay-150 bg-slate-900 hover:-translate-y-1 hover:scale-110 hover:bg-sky-800 duration-300 ..."
      >
        Add New
      </button>
      <div className="hidden" id="formdiv">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-xl gap-3 border-solid border-2 p-6 my-4 border-zinc-800 border-opacity-50 rounded-lg "
        >
          <div className="p-4 flex justify-between">
            <label htmlFor="titleId" className=" pr-3">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className=" border-zinc-800 border-2 border-opacity-20 hover:border-opacity-40 hover:border-sky-800 px-2 rounded-lg"
              id="titleId"
              required
            />
          </div>

          <div className="p-4 flex justify-between">
            <label htmlFor="addressId" className=" pr-3">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className=" border-zinc-800 border-2 border-opacity-20 hover:border-opacity-40 hover:border-sky-800 px-2 rounded-lg"
              id="addressId"
              required
            />
          </div>

          <div className="p-4 flex justify-between">
            <label htmlFor="sdateId" className=" pr-3">
              Start Date
            </label>
            <input
              type="date"
              name="sdate"
              value={formData.sdate}
              onChange={handleChange}
              className=" border-zinc-800 border-2 border-opacity-20 hover:border-opacity-40 hover:border-sky-800 px-2 rounded-lg"
              id="titleId"
              required
            />
          </div>

          <div className="p-4 flex justify-between">
            <label htmlFor="edateId" className=" pr-3">
              End Date
            </label>
            <input
              type="date"
              name="edate"
              value={formData.edate}
              onChange={handleChange}
              className=" border-zinc-800 border-2 border-opacity-20 hover:border-opacity-40 hover:border-sky-800 px-2 rounded-lg"
              id="etitleId"
              required
            />
          </div>

          <div className="p-4 flex justify-evenly">
            <label htmlFor="stime" className="pr-3">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className=" border-zinc-800 border-2 border-opacity-20 hover:border-opacity-40 hover:border-sky-800 px-2 rounded-lg"
              id="stime"
              required
            />
          </div>

          <div className="p-4 flex justify-evenly">
            <label htmlFor="etime" className="pr-3">
              End Time
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className=" border-zinc-800 border-2 border-opacity-20 hover:border-opacity-40 hover:border-sky-800 px-2 rounded-lg"
              id="etime"
              required
            />
          </div>
          <input
            type="submit"
            value="Create"
            className="rounded-full text-white py-1 transition ease-in-out delay-150 bg-slate-900 hover:-translate-y-1 hover:scale-105 hover:bg-sky-800 duration-300 ..."
          />
        </form>
      </div>
    </>
  );
};
