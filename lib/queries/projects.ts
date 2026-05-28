import { createClient } from "@/lib/supabase/client";

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  year: number;
  thumbnail_url: string;
  banner_url: string;
  video_url: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  project_id: string;
  image_url: string;
}

// Highly premium cinematic mock data fallback to keep the app look breathtaking and fully functional
// if Supabase is not fully configured yet.
export const MOCK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "The Last Horizon",
    slug: "the-last-horizon",
    category: "Feature Film",
    description: "An award-winning sci-fi epic exploring a dystopian future where humanity's last hope rests in the hands of an isolated astronaut orbiting a dying star. Filmed across remote icelandic landscapes with custom-built large format anamorphic lenses, 'The Last Horizon' is a slow-burn visual masterpiece that examines solitude, memory, and the cosmos.",
    year: 2025,
    thumbnail_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop",
    video_url: "https://assets.mixkit.co/videos/preview/mixkit-dramatic-dark-clouds-over-mountains-41761-large.mp4",
    created_at: new Date("2025-01-10").toISOString(),
  },
  {
    id: "p2",
    title: "Ethereal Echoes",
    slug: "ethereal-echoes",
    category: "Music Video",
    description: "An immersive visual poem matching the haunting ambient soundscape of London-based indie-electronic duo Sound & Silence. Shot on high-grain 35mm film, the piece uses expressionistic lighting, experimental choreography, and shadowplay to explore the phantom-like nature of grief in concrete urban jungles.",
    year: 2024,
    thumbnail_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop",
    video_url: "https://assets.mixkit.co/videos/preview/mixkit-waves-breaking-in-the-ocean-1527-large.mp4",
    created_at: new Date("2024-06-15").toISOString(),
  },
  {
    id: "p3",
    title: "Chasing Velocity",
    slug: "chasing-velocity",
    category: "Commercial",
    description: "A high-octane commercial campaign shot in the winding roads of the Swiss Alps, capturing the power and elegance of the new titanium hypercar. Utilizing precision camera arm cars, cinematic drone photography, and a dynamic orchestral soundscape, this commercial redefines speed, structure, and aerodynamic luxury.",
    year: 2025,
    thumbnail_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop",
    video_url: "https://assets.mixkit.co/videos/preview/mixkit-sports-car-drifting-on-a-wet-racetrack-39908-large.mp4",
    created_at: new Date("2025-03-20").toISOString(),
  },
  {
    id: "p4",
    title: "Whispers of the Deep",
    slug: "whispers-of-the-deep",
    category: "Documentary",
    description: "An intimate, visually breathtaking exploration of marine conservation efforts in the remote islands of French Polynesia. Following a team of marine biologists risking their lives to monitor coral bleaching and shark migrations, this documentary uses beautiful underwater macro-cinematography to detail the fragile balance of life in the deep blue.",
    year: 2023,
    thumbnail_url: "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1600&auto=format&fit=crop",
    banner_url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=2000&auto=format&fit=crop",
    video_url: "https://assets.mixkit.co/videos/preview/mixkit-school-of-fish-swimming-in-deep-blue-water-40221-large.mp4",
    created_at: new Date("2023-11-05").toISOString(),
  }
];

export const MOCK_GALLERY: Record<string, string[]> = {
  "p1": [
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=800"
  ],
  "p2": [
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800"
  ],
  "p3": [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800"
  ],
  "p4": [
    "https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=800",
    "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=800",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"
  ]
};

/**
 * Fetches all projects, falling back to mock projects on error or if empty.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Using mock projects database (either Supabase is not configured or empty).");
      return MOCK_PROJECTS;
    }
    return data as Project[];
  } catch {
    return MOCK_PROJECTS;
  }
}

/**
 * Fetches a single project by its slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      const mock = MOCK_PROJECTS.find((p) => p.slug === slug);
      return mock || null;
    }
    return data as Project;
  } catch {
    const mock = MOCK_PROJECTS.find((p) => p.slug === slug);
    return mock || null;
  }
}

/**
 * Fetches gallery images for a project.
 */
export async function getProjectGallery(projectId: string): Promise<string[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("image_url")
      .eq("project_id", projectId);

    if (error || !data || data.length === 0) {
      return MOCK_GALLERY[projectId] || [];
    }
    return data.map((item) => item.image_url);
  } catch {
    return MOCK_GALLERY[projectId] || [];
  }
}
