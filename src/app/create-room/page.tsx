"use client";
import { Input } from "@/app/components/common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRooms } from "@/app/hooks/useRooms";
import { useUser } from "@/app/hooks/useUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BackwardIcon } from "@heroicons/react/24/outline";
import { Button } from "../components/common/Button";

type FormValues = {
  name: string;
};
const CreateRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
    },
  });
  const { userData } = useUser();
  const { createChatRoom, isCreatingRoom } = useRooms(userData?.uuid || "");
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      await createChatRoom({
        name: values?.name,
        members: [userData!.uuid],
      });
      reset();
      toast.success("Room created");
      router.replace("/chats");
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    }
  };
  const isLoading = isCreatingRoom || isSubmitting;
  return (
    <main className="flex flex-col items-start justify-start w-full  h-screen bg-slate-700 gap-10">
      <button
        onClick={() => router.replace("/chats")}
        title="Back to chats"
        className="pl-3"
      >
        <BackwardIcon className="text-indigo-400 w-20 h-20 text-bold" />
      </button>
      <div className=" sm:mx-auto flex flex-col items-center justify-center w-full  h-full  gap-10">
        <section className="flex flex-col items-center justify-center gap-6 sm:mx-auto sm:w-full sm:max-w-[580px]">
          <h1 className="text-3xl mt-6 text-center font-bold leading-9 tracking-tight text-gray-200">
            Create a chat room
          </h1>
          <p className=" text-slate-500">
            Connect with friends and family by creating a chat room
          </p>
        </section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex  items-end justify-center h-24 gap-5 w-full "
        >
          <Input
            {...register("name", {
              required: true,
            })}
            error={errors.name?.message}
            placeholder="Room name"
          />
          <Button
            type="submit"
            className="text-white !bg-indigo-600 !border-0 px-9 py-1.5 rounded-md"
            isLoading={isLoading}
            disabled={isLoading}
            intent={"neutral"}
          >
            create
          </Button>
        </form>
      </div>
    </main>
  );
};

export default CreateRoom;
