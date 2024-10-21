import { useEffect, useState } from "react";
import logo from "./assets/spotifylogo.png";
import Cookies from "js-cookie";

export const Navbar = () => {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("spotify_access_token");
    if (token) {
      setLoggedin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    Cookies.remove("spotify_access_token");
    setLoggedin(false);
  };

  return (
    <div className="w-full bg-green-600 flex justify-between p-5 pt-4 pb-4 overflow-hidden">
      <img src={logo} alt="logo" className="h-10 w-auto" />

      {loggedin ? (
        <button
          onClick={handleLogout}
          className="p-1 font-bold bg-black h-10 w-[6rem] rounded-3xl text-white flex justify-center items-center"
        >
          Logout
        </button>
      ) : (
        <a href="https://spotify-backend-1yfa.onrender.com/login">
          <button className="p-1 font-bold bg-black h-10 w-[6rem] rounded-3xl text-white flex justify-center items-center">
            Login
          </button>
        </a>
      )}
    </div>
  );
};
