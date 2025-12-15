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
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import Link from "next/link";
import type { Job } from "@/types/types";
import { formatDates } from "@/utils/fotmatDates";

axios.defaults.baseURL = "https://hireme-yu0h.onrender.com";
axios.defaults.withCredentials = true;

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("/api/v1/jobs");
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
    <main className="relative overflow-hidden">
      <Header />

      {/* Hero Background Decorative Blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#7263f3]/20 blur-3xl rounded-full animate-floatSlow" />
        <div className="absolute top-24 right-10 w-72 h-72 bg-[#9b8af9]/20 blur-3xl rounded-full animate-floatSlow delay-150" />
        <div className="absolute bottom-10 left-1/3 w-60 h-60 bg-[#d7dedc]/40 blur-2xl rounded-full animate-floatSlow delay-300" />
      </div>

      {/* Hero Section with moving bg and floating words */}
<section className="relative py-60 text-primary-foreground overflow-hidden">
  {/* Moving background image */}
  <div className="absolute inset-0 -z-10 bg-cover bg-center animate-bgMove opacity-40"
       style={{ backgroundImage: "url('/hero.png')" }} />

  {/* Gradient overlay for readability */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#eef2ff] via-white/50 to-white" />

  {/* Floating small “HireMe” words */}
  <div className="pointer-events-none absolute inset-0 -z-10">
    {/* Row 1 */}
    {/* <span className="absolute left-[-10%] top-20 text-[#7263f3] text-sm font-bold animate-flySlow">HireMe</span> */}
    <span className="absolute left-[-20%] top-36 text-[#9b8af9] text-xs font-bold animate-flyMedium">HireMe</span>
    <span className="absolute left-[-15%] top-56 text-[#7263f3] text-sm font-bold animate-flyFast">HireMe</span>
    {/* Row 2 */}
    <span className="absolute left-[-25%] top-80 text-[#7263f3] text-xs font-bold animate-flySlow delay-300">HireMe</span>
    <span className="absolute left-[-12%] top-96 text-[#9b8af9] text-sm font-bold animate-flyMedium delay-500">HireMe</span>
    <span className="absolute left-[-30%] top-[28rem] text-[#7263f3] text-xs font-bold animate-flyFast delay-700">HireMe</span>
  </div>

  <div className="container mx-auto px-4 text-center text-black relative">
    <Badge className="mb-4 bg-[#7263f3]/10 text-[#7263f3] border-none">
      Find talent faster • Get hired smarter
    </Badge>
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-[#1f2937]">
      Find Your Dream Job or Perfect Candidate
    </h1>
    <p className="text-lg sm:text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
      Connect with thousands of employers and job seekers on our platform. Powerful search, real results.
    </p>


    <div className="max-w-full sm:max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 px-2">
      <Input
        type="text"
        placeholder="Search by title, keyword or company"
        className="flex-grow bg-white text-black rounded-full shadow-lg focus:ring-2 focus:ring-[#7263f3]"
        id="home-search"
      />
      <Button 
        className="bg-gradient-to-r from-[#7263f3] to-[#9b8af9] text-white w-full sm:w-auto rounded-full hover:opacity-90 transition"
        onClick={() => {
          const searchInput = document.getElementById('home-search') as HTMLInputElement;
          const searchTerm = searchInput?.value?.trim();
          if (searchTerm) {
            window.location.href = `/findwork?search=${encodeURIComponent(searchTerm)}`;
          } else {
            window.location.href = '/findwork';
          }
        }}
      >
        <SearchIcon className="w-6 h-6" />
        <span className="ml-2">Search Jobs</span>
      </Button>
    </div>

    {/* Hero Stats */}
    <div className="mt-10 flex flex-wrap justify-center gap-6">
      <div className="px-6 py-3 rounded-full bg-white shadow-sm border text-gray-700">
        <span className="font-bold text-[#7263f3]">10k+</span> companies
      </div>
      <div className="px-6 py-3 rounded-full bg-white shadow-sm border text-gray-700">
        <span className="font-bold text-[#7263f3]">100k+</span> jobs
      </div>
      <div className="px-6 py-3 rounded-full bg-white shadow-sm border text-gray-700">
        <span className="font-bold text-[#7263f3]">1M+</span> talents
      </div>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-[#7263f3] font-extrabold">HireME</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col h-full rounded-2xl border-none shadow-md hover:shadow-lg transition hover:-translate-y-0.5 duration-300 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-[#7263f3]/10 flex items-center justify-center mb-4 shadow-inner">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full rounded-full bg-[#7263f3] hover:bg-[#5a4de0] text-white">
                    <Link href={feature.ctaLink}>{feature.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Badge
              variant={"outline"}
              className="text-sm font-medium border-gray-300 bg-white"
            >
              Trusted by 10,000+ companies worldwide
            </Badge>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Latest <span className="text-[#7263f3]">Job Openings</span>
            </h2>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/findwork">
                <Star className="w-4 h-4 text-[#7263f3] mr-2" />
                View all jobs
              </Link>
            </Button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-center text-gray-500">No jobs available right now.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2">
              {jobs.map((job, idx) => (
                <Card
                  key={job._id}
                  className="group relative flex flex-col h-full rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 animate-fadeIn"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >

                  {/* Featured ribbon example */}
                  {idx < 3 && (
                    <div className="absolute top-2 right-2 bg-[#fde68a] text-[#92400e] text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow z-10">
                      <Star className="w-3 h-3" /> Featured
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[#7263f3]" />
                      {job.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-gray-600">
                      <Building className="w-4 h-4 text-gray-500" />
                      {job.createdBy?.name || "External Source"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow space-y-3">
                    <p className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 text-[#7263f3] mr-2" />
                      {job.location}
                    </p>
                    <p className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 text-[#7263f3] mr-2" />
                      {formatDates(job.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {job.description}
                    </p>

                    {/* Example badges for job type (adjust based on your data) */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className="bg-[#7263f3]/10 text-[#7263f3] border-none rounded-full">
                        Full-time
                      </Badge>
                      <Badge className="bg-green-100 text-green-700 border-none rounded-full">
                        Remote
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 border-none rounded-full">
                        Urgent
                      </Badge>
                    </div>
                  </CardContent>

                  <CardFooter className="mt-auto">
                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-[#7263f3] to-[#9b8af9] text-white rounded-full hover:opacity-90 transition"
                    >
                      <Link href={`/job/${job._id}`}>View Details</Link>
                    </Button>
                  </CardFooter>

                  {/* Hover overlay accent */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-tr from-transparent via-transparent to-[#7263f3]/5" />
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[7rem] bg-[#eef2ff]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you’re hiring or looking for your next role, we’ve got tools to help you move faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 px-2">
            <Button size={"lg"} asChild className="rounded-full bg-[#7263f3] hover:bg-[#5a4de0]">
              <Link href={"/findwork"}>Find Work</Link>
            </Button>
            <Button
              size={"lg"}
              variant={"outline"}
              asChild
              className="rounded-full hover:border-[#7263f3]"
            >
              <Link href={"/post"}>Post a Job</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
