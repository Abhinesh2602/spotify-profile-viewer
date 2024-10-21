import { useEffect, useState } from "react";
import { ProfileCard } from "./profileCard";
import { Search } from "./Search";
import { Navbar } from "./Navbar";
import Cookies from "js-cookie"; // Assuming you're using js-cookie library
import Playlist from "./Playlist";

function App() {
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    // Attempt to get the token from cookies
    const storedToken = Cookies.get("spotify_access_token");
    if (storedToken) {
      setToken(storedToken);
      localStorage.setItem("spotify_access_token", storedToken);
    } else {
      console.log("No token found in Cookies.");
    }
  }, []);

  async function fetchWebApi(endpoint, method, body) {
    try {
      const res = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!search) return;

    const handler = setTimeout(() => {
      const fetchUser = async () => {
        setLoading(true);
        let API = search === "me" ? "me" : `users/${search}`;
        try {
          const profileData = await fetchWebApi(API, "GET");
          const playlistData = await fetchWebApi(`${API}/playlists`, "GET");
          setProfile(profileData);
          setPlaylists(playlistData);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, 300); // Adjust the debounce delay (in milliseconds) as needed

    return () => {
      clearTimeout(handler); // Clean up the timeout on unmount or when `search` changes
    };
  }, [search]);

  return (
    <>
      <Navbar />
      <div>
        <h1 className="font-bold text-center text-gray-600 text-6xl mt-[4rem] ">
          Welcome to Spotify <br />
          Profile Viewer
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-12">
        <Search setSearch={setSearch} />
        {search && (
          <ProfileCard profile={profile} loading={loading}>
            <Playlist playlists={playlists} />
          </ProfileCard>
        )}
      </div>
    </>
  );
}

export default App;
