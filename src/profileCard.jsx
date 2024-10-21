import { FaExternalLinkAlt } from "react-icons/fa";

export const ProfileCard = ({ profile, loading, children }) => {
  const { display_name, followers, external_urls, images } = profile;
  console.log(profile);

  const genImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_3BNZw4G45qsnyRTopol8ESLnkfejmN_WcA&s";

  return (
    <div className="w-[40rem] h-[16rem] bg-gray-200 rounded-2xl flex flex-row justify-center items-center overflow-hidden">
      <div className="w-[35%] bg-black h-full rounded-2xl overflow-hidden">
        <img
          src={images ? images[0]?.url : genImg}
          alt="pfp"
          className="w-full h-full  object-cover "
        />
      </div>
      <div className="w-[65%] bg-gray-200 h-full flex flex-col p-[2rem] gap-y-2">
        <div className="flex flex-row justify-start items-center gap-3">
          <h1 className="font-bold text-[2rem] text-gray-600">
            {display_name}
          </h1>
          <a href={external_urls} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkAlt size={16} color="#4b5563" />
          </a>
        </div>
        <div className="flex flex-row justify-start items-center gap-3">
          <h3 className="font-bold text-[1rem] text-gray-600">
            {followers?.total || 0} Followers
          </h3>
          {/* <h3 className="font-bold text-[1rem] text-gray-600">29 Following</h3> */}
        </div>
        {children}
      </div>
    </div>
  );
};
