import { useRouter } from "next/router";
import { useAuth } from "@/utils/auth";

import SearchComponent from "@/components/SearchComponent";
import { useEffect } from "react";

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
    return null;
  }

  return <SearchComponent />;
};

export default HomePage;
