import Hero from "../../components/landing/Hero";
import ConnectAndCommunicate from "../../components/landing/ConnectAndCommunicate";
import ExperiencePower from "../../components/landing/ExperiencePower";
import JoinTheConversation from "../../components/landing/JoinTheConversation";
import ExploreChatEnviroment from "../../components/landing/ExploreChatEnviroment";

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
