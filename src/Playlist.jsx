const Playlist = ({ playlists }) => {
  if (!playlists || !playlists.items || playlists.items.length === 0) {
    return <div className="text-gray-600">No playlists available</div>; // Optional: Display a message for no playlists
  }

  return (
    <div className="font-bold  text-sm text-gray-600 flex flex-col mt-2 gap-2">
      <h3>Playlist Details</h3>
      <div className="flex flex-row gap-2">
        {playlists.items.map((item) => (
          <PlaylistNames key={item.id} name={item.name} />
        ))}
      </div>
    </div>
  );
};

const PlaylistNames = ({ name }) => {
  return (
    <div className="flex  border-gray-500 border-2 rounded-md w-auto p-1 h-auto">
      {name}
    </div>
  );
};

export default Playlist;
