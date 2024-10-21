export const Search = ({ setSearch }) => {
  return (
    <input
      placeholder="search"
      onChange={(e) => setSearch(e.target.value)}
      className="focus:outline-none w-[45rem] mb-[2rem] h-[3rem] p-[1rem] pl-[2rem] flex flex-row items-center bg-gray-300 rounded-3xl"
    />
  );
};
