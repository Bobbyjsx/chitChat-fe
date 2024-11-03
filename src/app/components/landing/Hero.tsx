import Image from "next/image";
import "@/app/globals.css";
import { Anchor } from "../common/Anchor";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-indigo-600">
      <section className="sm:w-[70%] w-full flex flex-col justify-start sm:justify-center items-center h-[500px] min-h-1/2 max-h-full gap-y-5 sm:gap-y-10">
        <div
          className="flex flex-col text-5xl sm:text-6xl sm:flex-row gap-5 justify-center w-full font-bold"
          style={{
            color: "#fff",
            WebkitTextStroke: "1px #F8F8F8",
            textShadow: "0px 2px 4px red",
          }}
        >
          <p className="">Spontaneous,</p> <p className="">Secure,</p>{" "}
          <p className="">Stable.</p>
        </div>
        <div className=" text-5xl font-semibold text-indigo-200">
          Welcome To <span className="font-sans">chitChat</span>
        </div>
        <div className="w-full flex justify-center">
          <Link href="/sign-in">
            <button className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">
              Sign in
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
              <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
              <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                Sign Up
              </span>
            </button>
          </Link></div>
      </section>
      <section className="w-full absolute bottom-0 z-10 overflow-hidden">
        <Image
          src={"assets/characters.svg"}
          width={1000}
          height={1000}
          className="sm:w-[500px] w-[300px] opacity-70 sm:opacity-100 relative "
          alt=""
        />
      </section>
      <section className="w-full absolute bottom-0 overflow-hidden">
        <Image
          src={"assets/mountain.svg"}
          width={1000}
          height={1000}
          className="w-[1000px] sm:w-[3000px] relative "
          alt=""
        />
      </section>
    </div>
  );
};

export default Hero;
