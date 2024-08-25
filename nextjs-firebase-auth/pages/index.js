import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/auth";
import { signOut } from "firebase/auth";
import Layout from "@/components/Layout";
import { auth } from "@/utils/firebase";

const HomePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Prevent rendering anything while redirecting
  }

  return (
    <Layout>
      <h1>Hello, {user.displayName || "Guest"}</h1>
      <button
        onClick={async () => {
          try {
            await signOut(auth);
            router.push("/auth/login"); // Redirect to login page after logout
          } catch (error) {
            console.error("Error logging out: ", error);
          }
        }}
        className="mt-4 py-2 px-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700"
      >
        Logout
      </button>
      {/* Additional UI elements for gifs and search functionality */}
    </Layout>
  );
};

export default HomePage;
