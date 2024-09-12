import axios from "axios";
import { useEffect, useState } from "react";
import { endpoint } from "../lib/request";

export default function Authenticate() {
  // here we automatically authenticate the user - using axios

  const [token, setToken] = useState(null);
  const [isAuthenticated, setAuthentication] = useState(true);

  async function getToken() {
    try {
      const getTokenResponse = await axios.post(
        `${endpoint}token`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const gTr = getTokenResponse.data?.access_token;
      if (gTr) {
        setToken(gTr);
        setAuthentication(false);
        localStorage.setItem("bearer", gTr);
      }
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getToken()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {isAuthenticated && (
        <div className="fixed w-full h-screen bg-black/10 backdrop-blur-[1.7px] backdrop-saturate-100 top-0 flex items-center justify-center">
          <div className="flex items-center justify-center w-[60px] h-[60px] bg-white shadow-xl shadow-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="text-black"
              class="h-8 w-8 animate-spin"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
