"use client";
import axios from "axios";
import Link from "next/link";
import React, { useRef, useState } from "react";
import NavBar from "../../../components/globals/NavBar";
import { ARROW_LEFT } from "../../../components/svgs";

export default function Page() {
  const username = useRef();
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState(null);
  function botRegister(e) {
    e.preventDefault();

    if (username.current.value != "" && username.current.value != undefined) {
      setProcessing(true);
      axios
        .post("/api/bot/register", {
          username: username.current.value,
        })
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          alert(err.response.data.error);
        })
        .finally(() => {
          setProcessing(false);
        });
    }
  }
  return (
    <main className="bg-emerald-50/5">
      <NavBar />
      <div className="my-12 px-4">
        <Link
          className="transition-all font-semibold text-lg w-fit py-1 px-3 mb-4 rounded-full text-emerald-700 ring-2 ring-emerald-400 active:scale-90 flex flex-row gap-1 justify-center items-center"
          href={"/register"}
        >
          <ARROW_LEFT className="w-6" /> Previous
        </Link>
        {user == null && (
          <>
            {" "}
            <div className="mt-12 text-xl text-justify sm:text-center">
              Now once you press start on bot, Just verify it by entering your
              telegram username
            </div>
            <div className="font-bold text-slate-800 mt-2 md:text-center">
              Small and Capital letters matter in username
            </div>
          </>
        )}

        <div className="transition-all w-full sm:w-96 mx-auto my-8 py-4 text-center">
          {/* only show form if not processign and no user data return from api */}
          {!processing && user == null && (
            <form
              onSubmit={(e) => botRegister(e)}
              className="w-full transition-all"
            >
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                min={1}
                max={200}
                required={true}
                ref={username}
                autoCapitalize="off"
                className="transition-all font-semibold text-lg w-full py-2 px-3 mb-4 rounded-full text-emerald-700 outline-none ring-2 ring-emerald-200 focus:ring-emerald-400"
                autoComplete="off"
              />
              <button
                type="submit"
                className="transition-all font-semibold text-lg w-fit py-1 px-3 rounded-full text-emerald-50 ring-2 ring-emerald-600 bg-emerald-600 active:scale-90 float-right"
              >
                Continue
              </button>
            </form>
          )}
          {/* In case of processing show loader */}
          {processing && (
            <>
              <div className="loader w-32 mx-auto bg-emerald-200 rounded-full relative h-2 overflow-hidden">
                <div className="loader-inner absolute h-2 bg-emerald-500 rounded-full"></div>
              </div>
              <div className="font-semibold text-slate-600 pt-4">
                Please wait we are checking data on server
              </div>
            </>
          )}
        </div>

        {user && (
          <div className="text-xl xl:text-2xl  mx-auto w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
            <div className="font-semibold text-2xl lg:text-3xl">
              Hello {user.first_name},
            </div>
            <div className="mt-4">
              Your unique url to get anonymous messages directly in your
              telegram
            </div>

            <code
              className="cursor-pointer text-emerald-900 mt-2 block py-1 px-2 rounded-md bg-emerald-100 overflow-x-auto horizontal-scroll"
              title="copy"
              onClick={() =>
                copyMessageUrl(
                  `https://anomm.pushkaryadav.in/message/${user.id}`
                )
              }
            >
              https://anomm.pushkaryadav.in/message/{user.id}
            </code>
          </div>
        )}
      </div>
    </main>
  );
}
function copyMessageUrl(url) {
  navigator.clipboard.writeText(url);
  alert("Link Copied");
}
