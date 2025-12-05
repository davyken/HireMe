"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import MyJob from "@/Components/JobItem/MyJob";
import { useGlobalContext } from "@/context/globalContext";
import { useJobsContext } from "@/context/jobsContext";
import { Job } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function page() {
  const { userJobs, jobs } = useJobsContext();
  const { isAuthenticated, loading, userProfile } = useGlobalContext();

  const [activeTab, setActiveTab] = React.useState("posts");

  const userId = userProfile?._id;

  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("http://localhost:8000/login");
    }
  }, [isAuthenticated]);

  const likedJobs = jobs.filter((job: Job) => {
    return job.likes.includes(userId);
  });

  if (loading) {
    return null;
  }

  return (
    <div>
      <Header />

      <div className="mt-20 w-[90%] sm:w-full mx-auto flex flex-col px-2">
        <div className="self-center flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-4">
          <button
            className={`border border-gray-400 px-4 sm:px-8 py-2 rounded-full font-medium
          ${
            activeTab === "posts"
              ? "border-transparent bg-[#7263F3] text-white"
              : "border-gray-400"
          }`}
            onClick={() => setActiveTab("posts")}
          >
            My Job Posts
          </button>
          <button
            className={`border border-gray-400 px-4 sm:px-8 py-2 rounded-full font-medium
          ${
            activeTab === "likes"
              ? "border-transparent bg-[#7263F3] text-white"
              : "border-gray-400"
          }`}
            onClick={() => setActiveTab("likes")}
          >
            Liked Jobs
          </button>
        </div>

        {activeTab === "posts" && userJobs.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="text-2xl font-bold">No job posts found.</p>
          </div>
        )}

        {activeTab === "likes" && likedJobs.length === 0 && (
          <div className="mt-8 flex items-center">
            <p className="text-2xl font-bold">No liked jobs found.</p>
          </div>
        )}

        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {activeTab === "posts" &&
            userJobs.map((job: Job) => <MyJob key={job._id} job={job} />)}

          {activeTab === "likes" &&
            likedJobs.map((job: Job) => <MyJob key={job._id} job={job} />)}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default page;
