"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { auth, googleProvider } from "@/utils/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useAuth } from "@/utils/auth";
import { useToast } from "@/utils/ToastProvider";

import Link from "next/link";
import Loader from "@/components/Loader";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { loading, setUser, setLoading } = useAuth();
  const { notify } = useToast();

  const handleEmailSignUp = async e => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      await updateProfile(user, { displayName: username });
      setUser(user);
      notify("User registed successfully", "success");
      router.push("/");
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (!user.displayName) {
        await updateProfile(user, { displayName: user.email.split("@")[0] });
      }

      setUser(user);
      notify("User registed successfully", "success");
      router.push("/");
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        notify("An account with this email already exists.", "error");
      } else {
        notify(error.message, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex font-poppins items-center justify-center dark:bg-gray-900 min-w-screen min-h-screen">
      {loading && <Loader />}
      <div className="grid gap-8">
        <div id="back-div" className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4 ">
          <div className="border-[20px] border-transparent rounded-[22px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-1">
            <h1 className="pt-8 pb-6 font-bold text-5xl dark:text-gray-400 text-center cursor-default">Register</h1>
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              <div>
                <label htmlFor="username" className="mb-2 dark:text-gray-400 text-lg">
                  Username
                </label>
                <input id="username" className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300" type="text" maxLength="12" placeholder="Username" required value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 dark:text-gray-400 text-lg">
                  Email
                </label>
                <input id="email" className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300" type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 dark:text-gray-400 text-lg">
                  Password
                </label>
                <input id="password" className="border dark:bg-indigo-700 dark:text-gray-300 dark:border-gray-700 p-3 mb-2 shadow-md placeholder:text-base border-gray-300 rounded-lg w-full focus:scale-105 ease-in-out duration-300" type="password" placeholder="Password" required autoComplete="true" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out" type="submit">
                Register
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3>
                <span className="cursor-default dark:text-gray-300">Have an account?</span>
                <Link className="group text-blue-400 transition-all duration-100 ease-in-out" href={"/auth/login"}>
                  <span className="bg-left-bottom ml-1 bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">Login</span>
                </Link>
              </h3>
            </div>

            <div className="flex flex-col mt-2 items-center justify-center text-sm">
              <h3>
                <span className="dark:text-gray-300 mb-2 font-bold">Or</span>
              </h3>
              <img className="w-20 drop-shadow-md hover:scale-125 transition duration-300 ease-in-out" src="../../assets/googleLogo.png" alt="Google" onClick={handleGoogleSignUp} />
            </div>

            <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
              <p className="cursor-default">
                By signing up, you agree to our
                <a className="group text-blue-400 transition-all duration-100 ease-in-out" href="#">
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"> Terms </span>
                </a>
                and
                <a className="group text-blue-400 transition-all duration-100 ease-in-out" href="#">
                  <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out"> Privacy Policy</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
