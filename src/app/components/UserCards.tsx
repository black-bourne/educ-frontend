import React from "react";
import Image from "next/image";

const UserCards = ({ type }: { type: string }) => {
  return (
    <div className="rounded-3xl odd:bg-gray-600 even:bg-lime-600 p-6 flex-1">
      <div className="flex justify-between items-center">
        <span className="text-[13px] bg-white  px-1 py-1 text-indigo-950 rounded-xl">
          2025/04
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-xl my-2">1340</h1>
      <h2 className="capitalize font-serif ">{type}</h2>
    </div>
  );
};

export default UserCards;
