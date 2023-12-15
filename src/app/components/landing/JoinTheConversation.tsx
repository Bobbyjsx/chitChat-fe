import { Anchor } from '../common/Anchor';

const JoinTheConversation = () => {
    return (
        <div className="w-full h-[50vh] flex flex-col items-center justify-center bg-transparent space-y-7">
            <h2 className="text-3xl font-bold mb-4">
                Join the Conversation
            </h2>
            <p>
                Ready to experience the power of ChitChat? Sign up
                today and start connecting instantly!
            </p>
            <Anchor
                className=""
                href="/sign-up">
                <button className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">
                    Sign Up
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-indigo-600 rotate-12 transform scale-x-0 group-hover:scale-x-50 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
                    <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
                        Sign Up
                    </span>
                </button>
            </Anchor>
            {/* Add signup button */}
        </div>
    );
}

export default JoinTheConversation;
