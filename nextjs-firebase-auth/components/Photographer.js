import React from "react";

function Photographer({ name, username, is_verified }) {
  return (
    <div className="flex flex-wrap gap-5 mx-1 justify-between mt-7 w-full">
      <div className="flex flex-col">
        <div className="text-2xl font-medium text-black">{name}</div>
        <div className="self-start mt-2 text-base text-gray-400">@{username}</div>
      </div>
      {is_verified && (
        <svg className="object-contain shrink-0 self-start aspect-[1.04] w-[25px]" xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
          <path d="M13.5 0L16.5309 9.32827H26.3393L18.4042 15.0935L21.4351 24.4217L13.5 18.6565L5.5649 24.4217L8.59584 15.0935L0.660737 9.32827H10.4691L13.5 0Z" fill="#F4CF08" />
        </svg>
      )}
    </div>
  );
}

export default Photographer;
