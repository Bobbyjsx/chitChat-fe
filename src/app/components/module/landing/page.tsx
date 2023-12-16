import Hero from "../../landing/Hero";
import ConnectAndCommunicate from "../../landing/ConnectAndCommunicate";
import ExperiencePower from "../../landing/ExperiencePower";
import JoinTheConversation from "../../landing/JoinTheConversation";
import ExploreChatEnviroment from "../../landing/ExploreChatEnviroment";

const LandingModule = () => {
	return (
		<main className="">
			<section className="w-full bg-slate-100">
				<Hero />
			</section>
			<section className="w-full bg-slate-200">
				<ConnectAndCommunicate />
			</section>
			<section className="w-full bg-slate-100">
				<ExperiencePower />
			</section>
			<section className="w-full bg-slate-200">
				<ExploreChatEnviroment />
			</section>
			<section className="w-full bg-slate-100">
				<JoinTheConversation />
			</section>
		</main>
	);
};

export default LandingModule;
