import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Blog | Ayush Kushwaha",
  description: "Thoughts, tutorials, and case studies on Full-Stack Product Engineering.",
  openGraph: {
    title: "Blog | Ayush Kushwaha",
    description: "Thoughts, tutorials, and case studies on Full-Stack Product Engineering.",
    url: "https://ayushkushwaha.com/blog",
    images: [
      {
        url: "https://ayushkushwaha.com/assets/ayush-kushwaha-logo.webp",
        width: 1200,
        height: 630,
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Ayush Kushwaha",
    description: "Thoughts, tutorials, and case studies on Full-Stack Product Engineering.",
    images: ["https://ayushkushwaha.com/assets/ayush-kushwaha-logo.webp"],
  }
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-32 pb-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
            Writing
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Articles, tutorials, and deep dives on software engineering and product design coming soon.
          </p>
        </div>
      </div>
      <Contact title="Let's Talk" description="Have a topic you want me to write about?" />
    </main>
  );
}
