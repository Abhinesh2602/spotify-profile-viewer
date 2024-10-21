// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQAjOEWfIYpu1BxsP4r8uYy4jDrvYeKXIyys0ylvcNtSUeZGTJvmlpgx8EGVZAUP4IiS2tTkAV-SNBiwxEIfy3mwyiO6MN8MLEdR0W1obSMp8YcnKDz2Vx_97zIsA5jh7tungyoN27CjCshU5LlwD2wd3mkRLw6b00-Q5TsFFEupXYzl29A_e3rP0WJwjUG80k4qmByDb9GIZGgLDpfchBSA544cqdXLENGLHN4awH6UtoOsUz-hnR9j2cPk6VJyplmJXs7t3I0UHaA4jxaZGB5tEjRa2JTMzJmw";
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

const tracksUri = [
  "spotify:track:2p8IUWQDrpjuFltbdgLOag",
  "spotify:track:6MZyrnqwsLnrWY5Gk0AyXg",
  "spotify:track:0ljjmkJocnhXzP62JYNW8p",
  "spotify:track:6anGj4SX83j5DyG3aZOzqc",
  "spotify:track:322TxW77VZdX9gHynK5Xue",
  "spotify:track:3USxtqRwSYz57Ewm6wWRMp",
  "spotify:track:7MXVkk9YMctZqd1Srtv4MB",
  "spotify:track:3GCdLUSnKSMJhs4Tj6CV3s",
  "spotify:track:46ydq5g3k17iLJs3qMDvO6",
  "spotify:track:3DXncPQOG4VBw3QHh3S817",
];

async function createPlaylist(tracksUri) {
  const { id: user_id } = await fetchWebApi("v1/me", "GET");

  const playlist = await fetchWebApi(`v1/users/${user_id}/playlists`, "POST", {
    name: "My recommendation playlist",
    description: "Playlist created by the tutorial on developer.spotify.com",
    public: false,
  });

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(",")}`,
    "POST"
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
