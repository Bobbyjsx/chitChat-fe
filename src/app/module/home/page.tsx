"use client";
import React, { ChangeEvent, useState, useEffect } from "react";
import Typing from "../../components/Typing";
import { Input } from "../../components/common/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import AuthBtn from "../../components/common/AuthBtn";
import { useAuth } from "@/app/hooks/useAuth";

interface MessageProps {
  message: string;
  time: string;
  uuid: string;
  recieverId: string;
}

interface FormInput {
  input: string;
}

const HomeModule = () => {
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormInput>({
    defaultValues: {
      input: "",
    },
  });

  const [typing, setTyping] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTyping(true);
    resetTimer();
  };

  const handleKeyPress = () => {
    setTyping(true);
    resetTimer();
  };

  const resetTimer = () => {
    setTyping(true);

    // Clear the existing timer
    clearTimeout(timerId);

    // Set a new timer to reset typing after 2000 milliseconds (2 seconds)
    timerId = setTimeout(() => {
      setTyping(false);
    }, 2000);
  };

  let timerId: NodeJS.Timeout;

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const getTime = new Date().toUTCString();
    const fullPayload: MessageProps = {
      message: data.input,
      time: getTime,
      uuid: "2n3ld-22ieks-2728m-727282",
      recieverId: "2n3ld-22ieks-2728m-727282",
    };
    try {
      // Assume there is a sendMessage function
      // sendMessage(fullPayload);
      // Reset the form after sending the message
      console.log(fullPayload);

      reset();
      setTyping(false); // Ensure typing is set to false after submitting the form
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    // Clear the timer when the component unmounts
    return () => clearTimeout(timerId);
  }, []);

  const payload = {
    email: "ezealagodswill@gmail.com",
    username: "Bobby",
    password: "password",
    confirmPassword: "password",
  };

  const { signUpAndSignIn } = useAuth();
  return (
    <div>
      <Typing typing={typing} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("input", { required: true })}
          placeholder="Type a message"
          onBlur={() => setTyping(false)}
          onKeyDown={handleKeyPress}
          trailingIcon={
            <button className="w-10 h-7" title="Send" type="submit">
              <PaperAirplaneIcon className="text-indigo-600 h-full w-full" />
            </button>
          }
        />
      </form>
      <AuthBtn />

      <button
        onClick={async () => {
          const user = await signUpAndSignIn(payload);
          console.log(user);
        }}
      >
        test sign-in endpoint
      </button>
    </div>
  );
};

export default HomeModule;
