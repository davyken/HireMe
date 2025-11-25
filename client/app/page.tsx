"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import {
  Briefcase,
  Building,
  CheckCircleIcon,
  SearchIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import type { Job } from "@/types/types";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://hireme-yu0h.onrender.com/jobs");
        setJobs(res.data); 
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const features = [
    {
      icon: <Briefcase className="w-6 h-6 text-[#7263f3]" />,
      title: "Diverse Opportunities",
      description:
        "Access thousands of job listings across various industries and experience levels.",
      benefits: [
        "100,000+ active job listings",
        "50+ job categories",
        "Remote and on-site options",
      ],
      cta: "Explore Jobs",
      ctaLink: "/findwork",
    },
    {
      icon: <Building className="w-6 h-6 text-[#7263f3]" />,
      title: "Top Companies",
      description:
        "Connect with leading companies, from innovative startups to Fortune 500 corporations.",
      benefits: [
        "500+ verified employers",
        "Exclusive partnerships",
        "Direct application process",
      ],
      cta: "View Companies",
      ctaLink: "/findwork",
    },
    {
      icon: <Users className="w-6 h-6 text-[#7263f3]" />,
      title: "Talent Pool",
      description:
        "Employers can access a diverse pool of qualified candidates for their open positions.",
      benefits: [
        "1M+ registered job seekers",
        "Advanced search filters",
        "AI-powered matching",
      ],
      cta: "Post a Job",
      ctaLink: "/post",
    },
  ];

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#d7dedc] to-[#7263f3]/5 text-primary-foreground">
        <div className="container mx-auto px-4 text-center text-black">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[#7263f3]">
            Find Your Dream Job or Perfect Candidate
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Connect with thousands of employers and job seekers on our platform
          </p>
          <div className="max-w-full sm:max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 px-2">
            <Input
              type="text"
              placeholder="Job title or keyword"
              className="flex-grow bg-white text-black"
            />
            <Button className="bg-[#7263f3] text-white w-full sm:w-auto">
              <SearchIcon className="w-6 h-6" />
              <span className="ml-2">Search Jobs</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#f0f5fa]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Why Choose{" "}
            <span className="text-[#7263f3] font-extrabold">HireME</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col h-full rounded-xl border-none shadow-md"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={feature.ctaLink}>{feature.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Badge
              variant={"outline"}
              className="text-sm font-medium border-gray-400"
            >
              Trusted by 10,000+ companies worldwide
            </Badge>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Latest <span className="text-[#7263f3]">Job Openings</span>
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs available right now.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
              {jobs.map((job) => (
                <Card key={job._id} className="flex flex-col h-full rounded-xl shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                    <CardDescription>{job.createdBy.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 mb-4">{job.location}</p>
                    <p className="text-sm text-gray-500 line-clamp-3">
                      {job.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-[#7263f3] text-white">
                      <Link href={`/job/${job._id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[7rem] bg-[#d7dedc]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-2">
            <Button size={"lg"} asChild>
              <Link href={"/findwork"}>Find Work</Link>
            </Button>
            <Button size={"lg"} variant={"outline"} asChild>
              <Link href={"/post"}>Post a Job</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
