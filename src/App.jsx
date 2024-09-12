import { useEffect, useState } from "react";
import Authenticate from "./component/authenticate";
import { endpoint, isAuthenticated, request } from "./lib/request";

export default function App() {
  const [error, setError] = useState({
    errorMsg: "",
    isError: false,
  });

  const [success, setSuccess] = useState({
    successMsg: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect if the user is not authenticated
      location.href = "/stats";
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return null; // Optionally render nothing while redirecting
  }

  const [isLoading, setLoader] = useState(false);

  async function submit(ev) {
    try {
      ev.preventDefault();

      const { name, email, portfolio_url } = ev.target;

      // validate - since we are using required lets just it simple
      const portfolio_url_regx = /^(https:\/\/|www.|)[a-z]*[.com]/;

      if (!portfolio_url_regx.test(portfolio_url.value)) {
        setError({
          ...error,
          errorMsg: "portfolio url is wrong. ex. hello.com, http://hello.com",
          isError: true,
        });
        return;
      } else {
        setError({
          errorMsg: "",
          isError: false,
        });
      }

      setLoader(true);
      if (name.value || email.value || portfolio_url.value) {
        const resp = await request.post(`${endpoint}submit_user_info`, {
          name: name.value,
          email: email.value,
          portfolio_url: portfolio_url.value,
        });

        setLoader(false);

        // clear error if any.
        if (error.isError) {
          setError({
            errorMsg: "",
            isError: false,
          });
        }

        setSuccess({
          successMsg: "User data submitted successfully",
          isSuccess: true,
        });
        const stringifyData = JSON.stringify(resp.data);
        localStorage.setItem("data", stringifyData);

        location.href = "/stats";
      }
    } catch (error) {
      console.log(error);
      setError({
        ...error,
        errorMsg: error?.response.data?.detail || "Something went wrong :(",
        isError: true,
      });
      setLoader(false);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="alluvium"
            src="/favicon.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="font-light mt-10 text-center text-2xl leading-9 tracking-tight text-gray-900">
            Welcome to Alluvium Frontend Developer Test
          </h2>
        </div>

        {error.isError && (
          <p
            className={`${
              error.isError ? "text-red-600 font-regular text-center mt-5" : ""
            }`}
          >
            {error.errorMsg}
          </p>
        )}

        {success.isSuccess && (
          <p
            className={`${
              success.isSuccess
                ? "text-emerald-600 font-regular text-center mt-5"
                : ""
            }`}
          >
            {success.successMsg}
          </p>
        )}

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            onSubmit={submit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="portfolio_url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Portfolio Url
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="portfolio_url"
                  name="portfolio_url"
                  type="portfolio_url"
                  required
                  autoComplete="off"
                  className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full disabled:opacity-65 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <Authenticate />
    </>
  );
}
