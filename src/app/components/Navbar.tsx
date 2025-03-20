import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH BAR */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[2px] ring-gray-300 px-3">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[210px] p-2 bg-transparent outline-none"
        />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-5.5 justify-end w-full">
        {/*<div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">*/}
        {/*  <Image src="/message.png" alt="" width={20} height={20} />*/}
        {/*</div>*/}
        {/*<div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">*/}
        {/*  <Image src="/announcement.png" alt="" width={20} height={20} />*/}
        {/*  <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-blue-400 text-white rounded-full text-xs">*/}
        {/*    1*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className=" flex flex-col">
          <span className="text-xs leading-3 font-medium">Alex</span>
          <span className="text-xs leading-3 font-medium">Morgan</span>
        </div>
        <Image
          src="/icons-user.png"
          alt=""
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
