import axios from "axios";
import { endpoint, request } from "../lib/request";
import { useState } from "react";

export default function DemoUrl({ showM, setModal }) {
  const [isLoadingDemoUrl, setLoadingDemoUrl] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    msg: "",
  });

  function submit(ev) {
    ev.preventDefault();

    const url = ev.target.demo_url;

    if (url.value) {
      setLoadingDemoUrl(true);
      request
        .post(`${endpoint}submit_demo_url?demo_url=${url.value}`)
        .then((res) => {
          setAlert({
            ...alert,
            type: "success",
            msg: res.data.message,
          });
          setLoadingDemoUrl(false);
          setModal(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingDemoUrl(false);
          setAlert({
            ...alert,
            type: "error",
            msg:
              typeof err.response.data?.detail === "string"
                ? err.response.data?.detail
                : "something went wrong",
          });
        });
    }
  }
  return (
    <>
      {showM && (
        <div className="fixed w-full h-screen bg-black/10 backdrop-blur-[1.7px] backdrop-saturate-100 top-0 flex items-center justify-center">
          <div
            className="absolute w-full h-screen z-[-1]"
            onClick={() => setModal(false)}
          ></div>

          <form
            action="#"
            method="POST"
            onSubmit={submit}
            className="space-y-6 w-[350px] bg-white p-5 rounded-md"
          >
            <p
              className={`${
                alert.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {alert.msg}
            </p>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="portfolio_url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Demo Url
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="demo_url"
                  name="demo_url"
                  type="demo_url"
                  placeholder="www.demo_url.com"
                  autoComplete="off"
                  className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoadingDemoUrl}
                className="flex w-full disabled:opacity-65 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
