import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { ProjectDetailsClient } from "@/components/gallery/project-details-client";
import { getProjectBySlug, getProjects, getProjectGallery } from "@/lib/queries/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Dynamic SEO metadata tags based on project title
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title}`,
    description: `${project.description?.slice(0, 155)}...`,
    openGraph: {
      title: `${project.title} | Directed by Alistair Vance`,
      description: project.description,
      images: [{ url: project.thumbnail_url }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const gallery = await getProjectGallery(project.id);
  const allProjects = await getProjects();
  
  // Find current project index and retrieve next project for the teaser footer
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject =
    currentIndex !== -1 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0]; // loop back to first on end

  return (
    <>
      <Navbar />

      <main className="w-full flex-grow bg-black">
        <ProjectDetailsClient
          project={project}
          gallery={gallery}
          nextProject={nextProject && nextProject.id !== project.id ? nextProject : null}
        />
      </main>

      <Footer />
    </>
  );
}
