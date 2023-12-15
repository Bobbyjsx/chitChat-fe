import Image from "next/image";
import '@/app/globals.css'

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
					}}>
					<p className="">Spontaneous,</p>{" "}
					<p className="">Secure,</p>{" "}
					<p className="">Stable.</p>
				</div>
				<div
					className=" text-5xl font-semibold text-indigo-200">
					Welcome To{" "}
					<span className="font-sans">chitChat</span>
				</div>
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
