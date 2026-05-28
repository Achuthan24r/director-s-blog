"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  PlusCircle,
  Inbox,
  Users,
  LogOut,
  Trash2,
  Edit,
  Check,
  AlertTriangle,
  FolderOpen,
  Send,
  Loader
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/queries/projects";
import { createClient } from "@/lib/supabase/client";
import { createProject, updateProject, deleteProject } from "@/lib/actions/projects";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface SubscriberRow {
  id: string;
  email: string;
  created_at: string;
}

interface AdminDashboardProps {
  initialProjects: Project[];
  initialContacts: ContactSubmission[];
  initialSubscribers: SubscriberRow[];
}

// Gorgeous mock inbox for demo evaluation mode
const DEMO_CONTACTS: ContactSubmission[] = [
  {
    id: "c1",
    name: "Universal Pictures Creative Team",
    email: "development@universalpictures.com",
    message: "Alistair, we loved your framing on 'The Last Horizon'. We have a sci-fi thriller screenplay currently in active development for early 2027 and would love to schedule a private video consultation to discuss your availability.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "c2",
    name: "Warner Bros. Discovery Agency",
    email: "bookings@warnerbros.com",
    message: "We are putting together a premium commercial campaign in partnership with a leading sustainable lifestyle brand. We require a director with high-contrast, atmospheric aesthetics. Let us know if we can forward the specs.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "c3",
    name: "Celine Global Brand Director",
    email: "campaigns@celine.fr",
    message: "Alistair, we want to shoot a series of monochrome cinematic vignettes in Paris for our Winter Collection. We require your signature 35mm high-grain camera movement. Please connect with our marketing office.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  }
];

const DEMO_SUBSCRIBERS: SubscriberRow[] = [
  { id: "s1", email: "producer@aurafilms.co.uk", created_at: new Date().toISOString() },
  { id: "s2", email: "curator@venicefilmguild.org", created_at: new Date().toISOString() },
  { id: "s3", email: "cinematography@kodak.com", created_at: new Date().toISOString() },
];

export function AdminDashboard({
  initialProjects,
  initialContacts,
  initialSubscribers,
}: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"works" | "add" | "contacts" | "subscribers">("works");
  const [projects, setProjects] = React.useState<Project[]>(initialProjects);
  const [contacts, setContacts] = React.useState<ContactSubmission[]>(initialContacts);
  const [subscribers, setSubscribers] = React.useState<SubscriberRow[]>(initialSubscribers);
  const [demoMode, setDemoMode] = React.useState(false);

  // Project Editing states
  const [editingProject, setEditingProject] = React.useState<Project | null>(null);

  // Form states
  const [newProject, setNewProject] = React.useState({
    title: "",
    slug: "",
    category: "Feature Film",
    year: new Date().getFullYear(),
    description: "",
    thumbnail_url: "",
    banner_url: "",
    video_url: "",
  });

  const [formStatus, setFormStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formError, setFormError] = React.useState("");

  // Check demo mode localStorage flag on mount
  React.useEffect(() => {
    const isDemo = localStorage.getItem("vance_demo_session") === "active";
    setDemoMode(isDemo);
    if (isDemo) {
      if (contacts.length === 0) setContacts(DEMO_CONTACTS);
      if (subscribers.length === 0) setSubscribers(DEMO_SUBSCRIBERS);
    }
  }, [contacts.length, subscribers.length]);

  // Handle Title input change to auto-slugify!
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    if (editingProject) {
      setEditingProject((prev) => prev ? ({ ...prev, title, slug }) : null);
    } else {
      setNewProject((prev) => ({ ...prev, title, slug }));
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.slug || !newProject.category || !newProject.year) {
      setFormError("Title, Slug, Category, and Year are mandatory fields.");
      setFormStatus("error");
      return;
    }

    setFormStatus("submitting");

    // Standard high-quality defaults for quick styling if links are empty
    const finalProject = {
      ...newProject,
      thumbnail_url: newProject.thumbnail_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80",
      banner_url: newProject.banner_url || "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80",
      video_url: newProject.video_url || "https://assets.mixkit.co/videos/preview/mixkit-dramatic-dark-clouds-over-mountains-41761-large.mp4"
    };

    if (demoMode) {
      // In-Memory save for Demo Gate
      const mockProj: Project = {
        id: `demo-${Date.now()}`,
        ...finalProject,
        created_at: new Date().toISOString()
      };
      setProjects((prev) => [mockProj, ...prev]);
      setFormStatus("success");
      setTimeout(() => {
        setNewProject({
          title: "",
          slug: "",
          category: "Feature Film",
          year: new Date().getFullYear(),
          description: "",
          thumbnail_url: "",
          banner_url: "",
          video_url: "",
        });
        setFormStatus("idle");
        setActiveTab("works");
      }, 1500);
      return;
    }

    // Execute server action
    try {
      const res = await createProject(finalProject);
      if (res.success && res.project) {
        setProjects((prev) => [res.project!, ...prev]);
        setFormStatus("success");
        setTimeout(() => {
          setNewProject({
            title: "",
            slug: "",
            category: "Feature Film",
            year: new Date().getFullYear(),
            description: "",
            thumbnail_url: "",
            banner_url: "",
            video_url: "",
          });
          setFormStatus("idle");
          setActiveTab("works");
        }, 1500);
      } else {
        setFormStatus("error");
        setFormError(res.error || "Failed to create project.");
      }
    } catch {
      setFormStatus("error");
      setFormError("Something went wrong during transmission.");
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setFormStatus("submitting");

    if (demoMode) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? editingProject : p))
      );
      setFormStatus("success");
      setTimeout(() => {
        setEditingProject(null);
        setFormStatus("idle");
      }, 1500);
      return;
    }

    try {
      const res = await updateProject(editingProject.id, editingProject);
      if (res.success && res.project) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? res.project! : p))
        );
        setFormStatus("success");
        setTimeout(() => {
          setEditingProject(null);
          setFormStatus("idle");
        }, 1500);
      } else {
        setFormStatus("error");
        setFormError(res.error || "Failed to update project.");
      }
    } catch {
      setFormStatus("error");
      setFormError("Failed to transmit updates.");
    }
  };

  const handleDeleteProject = async (id: string, slug: string) => {
    if (!confirm("Are you absolute certain you want to purge this cinematic project? This action cannot be revoked.")) return;

    if (demoMode) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      return;
    }

    try {
      const res = await deleteProject(id, slug);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(res.error || "Failed to delete project.");
      }
    } catch {
      alert("Something went wrong.");
    }
  };

  const handleSignOut = async () => {
    if (demoMode) {
      document.cookie = "vance_demo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      localStorage.removeItem("vance_demo_session");
      router.push("/");
      router.refresh();
      return;
    }

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-foreground flex flex-col md:flex-row">
      
      {/* 1. LEFT SIDEBAR PANEL */}
      <aside className="w-full md:w-64 bg-[#080808] border-r border-white/5 p-6 flex flex-col justify-between">
        
        {/* Brand/Branding */}
        <div className="space-y-8">
          <div className="flex items-center space-x-3 pb-6 border-b border-white/5">
            <Film className="w-5 h-5 text-brand-gold" />
            <span className="font-sans font-light tracking-[0.2em] text-sm uppercase text-white">
              Vance Control
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col space-y-2">
            <button
              onClick={() => { setActiveTab("works"); setEditingProject(null); }}
              className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-300 rounded-none text-left cursor-pointer ${
                activeTab === "works" ? "bg-white/5 border-l-2 border-brand-gold text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              <span>Selected Works</span>
            </button>

            <button
              onClick={() => { setActiveTab("add"); setEditingProject(null); }}
              className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-300 rounded-none text-left cursor-pointer ${
                activeTab === "add" ? "bg-white/5 border-l-2 border-brand-gold text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Production</span>
            </button>

            <button
              onClick={() => { setActiveTab("contacts"); setEditingProject(null); }}
              className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-300 rounded-none text-left cursor-pointer ${
                activeTab === "contacts" ? "bg-white/5 border-l-2 border-brand-gold text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Contact Inbox</span>
              {contacts.length > 0 && (
                <span className="ml-auto bg-brand-gold text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {contacts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab("subscribers"); setEditingProject(null); }}
              className={`flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-300 rounded-none text-left cursor-pointer ${
                activeTab === "subscribers" ? "bg-white/5 border-l-2 border-brand-gold text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Subscribers</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sign Out */}
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-4 py-3 text-xs uppercase tracking-widest font-sans font-medium text-red-500 hover:text-red-400 hover:bg-white/5 transition-colors duration-300 rounded-none text-left cursor-pointer focus:outline-none mt-8"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Dashboard</span>
        </button>
      </aside>

      {/* 2. MAIN WORKSPACE PANEL */}
      <main className="flex-grow p-6 md:p-12 space-y-8 overflow-y-auto max-h-screen">
        
        {/* Glowing Demo Warning indicator */}
        {demoMode && (
          <div className="flex items-center space-x-3 bg-amber-500/10 border border-amber-500/20 p-4 rounded-none text-amber-500 font-sans text-xs">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <div className="leading-relaxed">
              <span className="font-semibold uppercase tracking-wider">Demo Sandbox Session Active:</span> Currently in simulated local environment. Database modifications are saved in temporary window memory. Connect your Supabase credentials to link persistent PostgreSQL database.
            </div>
          </div>
        )}

        {/* Tab contents */}
        <div className="relative">
          
          {/* TAB 1: LIST PROJECTS */}
          {activeTab === "works" && !editingProject && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <h2 className="font-serif font-light text-2xl md:text-3xl text-white">
                  Filmography <span className="italic">Portfolio</span>
                </h2>
                <span className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest">
                  Total works: {projects.length}
                </span>
              </div>

              <div className="glass-panel overflow-x-auto rounded-none">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-neutral-500 uppercase tracking-wider">
                      <th className="py-4 px-6 font-semibold">Title</th>
                      <th className="py-4 px-6 font-semibold">Category</th>
                      <th className="py-4 px-6 font-semibold">Year</th>
                      <th className="py-4 px-6 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-300">
                        <td className="py-4 px-6 font-medium text-white">{project.title}</td>
                        <td className="py-4 px-6 text-neutral-400">{project.category}</td>
                        <td className="py-4 px-6 text-neutral-400 tracking-widest">{project.year}</td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2 border border-white/10 hover:border-brand-gold text-neutral-400 hover:text-brand-gold transition-colors duration-300 rounded-none cursor-pointer"
                            title="Edit Project specs"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id, project.slug)}
                            className="p-2 border border-white/10 hover:border-red-500 text-neutral-400 hover:text-red-500 transition-colors duration-300 rounded-none cursor-pointer"
                            title="Purge Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {projects.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-neutral-500 italic">
                          No cinematic productions registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 1 EDIT PROJECT VIEW */}
          {editingProject && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setEditingProject(null)}
                    className="font-sans text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white"
                  >
                    &larr; Cancel
                  </button>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  <h2 className="font-serif font-light text-2xl text-white">
                    Edit spec: <span className="italic">{editingProject.title}</span>
                  </h2>
                </div>
              </div>

              <form onSubmit={handleUpdateProject} className="glass-panel p-8 space-y-6 rounded-none relative">
                {formStatus === "success" && (
                  <div className="flex items-center space-x-2 text-xs text-green-500 bg-green-950/20 border border-green-500/20 p-4 rounded-none">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>Project successfully synchronized! Redirecting...</span>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="flex items-center space-x-2 text-xs text-red-500 bg-red-950/20 border border-red-500/20 p-4 rounded-none">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Project Title</label>
                    <Input
                      type="text"
                      required
                      value={editingProject.title}
                      onChange={handleTitleChange}
                      disabled={formStatus === "submitting"}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Slug</label>
                    <Input
                      type="text"
                      required
                      value={editingProject.slug}
                      onChange={(e) => setEditingProject((p) => p ? ({ ...p, slug: e.target.value }) : null)}
                      disabled={formStatus === "submitting"}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Category</label>
                    <select
                      value={editingProject.category}
                      onChange={(e) => setEditingProject((p) => p ? ({ ...p, category: e.target.value }) : null)}
                      disabled={formStatus === "submitting"}
                      className="w-full bg-[#0a0a0a] border-b border-white/10 px-0 py-3 text-sm text-foreground focus:border-brand-gold focus:outline-none font-sans"
                    >
                      <option value="Feature Film">Feature Film</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Documentary">Documentary</option>
                      <option value="Music Video">Music Video</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Year</label>
                    <Input
                      type="number"
                      required
                      value={editingProject.year}
                      onChange={(e) => setEditingProject((p) => p ? ({ ...p, year: parseInt(e.target.value) }) : null)}
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Synopsis Specs</label>
                  <Textarea
                    required
                    rows={4}
                    value={editingProject.description}
                    onChange={(e) => setEditingProject((p) => p ? ({ ...p, description: e.target.value }) : null)}
                    disabled={formStatus === "submitting"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Thumbnail URL</label>
                    <Input
                      type="url"
                      value={editingProject.thumbnail_url}
                      onChange={(e) => setEditingProject((p) => p ? ({ ...p, thumbnail_url: e.target.value }) : null)}
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Banner URL</label>
                    <Input
                      type="url"
                      value={editingProject.banner_url}
                      onChange={(e) => setEditingProject((p) => p ? ({ ...p, banner_url: e.target.value }) : null)}
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Video Trailer URL</label>
                    <Input
                      type="url"
                      value={editingProject.video_url}
                      onChange={(e) => setEditingProject((p) => p ? ({ ...p, video_url: e.target.value }) : null)}
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                </div>

                <div className="pt-4 flex space-x-4">
                  <Button
                    type="submit"
                    variant="gold"
                    className="w-full md:w-auto cursor-pointer"
                    disabled={formStatus === "submitting"}
                  >
                    <span>{formStatus === "submitting" ? "Transmitting..." : "Update Specifications"}</span>
                  </Button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-6 py-3 border border-white/10 text-xs font-sans uppercase tracking-widest text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: ADD NEW PROJECT */}
          {activeTab === "add" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <h2 className="font-serif font-light text-2xl md:text-3xl text-white">
                  Add Cinematic <span className="italic">Production</span>
                </h2>
              </div>

              <form onSubmit={handleCreateProject} className="glass-panel p-8 space-y-6 rounded-none relative">
                {formStatus === "success" && (
                  <div className="flex items-center space-x-2 text-xs text-green-500 bg-green-950/20 border border-green-500/20 p-4 rounded-none">
                    <Check className="w-4 h-4 flex-shrink-0" />
                    <span>Production registered in archive successfully! Redirecting...</span>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="flex items-center space-x-2 text-xs text-red-500 bg-red-950/20 border border-red-500/20 p-4 rounded-none">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Project Title</label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. Aliquot Shadows"
                      value={newProject.title}
                      onChange={handleTitleChange}
                      disabled={formStatus === "submitting"}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Slug</label>
                    <Input
                      type="text"
                      required
                      placeholder="aliquot-shadows"
                      value={newProject.slug}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, slug: e.target.value }))}
                      disabled={formStatus === "submitting"}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Category</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, category: e.target.value }))}
                      disabled={formStatus === "submitting"}
                      className="w-full bg-[#0a0a0a] border-b border-white/10 px-0 py-3 text-sm text-foreground focus:border-brand-gold focus:outline-none font-sans"
                    >
                      <option value="Feature Film">Feature Film</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Documentary">Documentary</option>
                      <option value="Music Video">Music Video</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Year</label>
                    <Input
                      type="number"
                      required
                      value={newProject.year}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, year: parseInt(e.target.value) }))}
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Synopsis specs</label>
                  <Textarea
                    required
                    rows={4}
                    placeholder="Provide details about story composition, film length, casting, visual choices..."
                    value={newProject.description}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                    disabled={formStatus === "submitting"}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Thumbnail URL (Optional)</label>
                    <Input
                      type="url"
                      placeholder="https://unsplash.com/... or blank for cinematic placeholder"
                      value={newProject.thumbnail_url}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, thumbnail_url: e.target.value }))}
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Banner URL (Optional)</label>
                    <Input
                      type="url"
                      placeholder="https://unsplash.com/... or blank for cinematic placeholder"
                      value={newProject.banner_url}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, banner_url: e.target.value }))}
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-sans text-[9px] uppercase tracking-widest text-neutral-500">Trailer Video URL (Optional)</label>
                    <Input
                      type="url"
                      placeholder="https://assets.mixkit.co/... or blank for cinematic placeholder"
                      value={newProject.video_url}
                      onChange={(e) => setNewProject((prev) => ({ ...prev, video_url: e.target.value }))}
                      disabled={formStatus === "submitting"}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="gold"
                    className="w-full md:w-auto cursor-pointer"
                    disabled={formStatus === "submitting"}
                  >
                    <span>{formStatus === "submitting" ? "Transmitting Specs..." : "Register Cinematic Production"}</span>
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: CONTACT INQUIRIES */}
          {activeTab === "contacts" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <h2 className="font-serif font-light text-2xl md:text-3xl text-white">
                  Contact <span className="italic">Inquiries Inbox</span>
                </h2>
                <span className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest">
                  Messages: {contacts.length}
                </span>
              </div>

              <div className="space-y-6">
                {contacts.map((msg) => (
                  <div key={msg.id} className="glass-panel p-6 rounded-none relative space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-3">
                      <div>
                        <h4 className="font-sans text-sm font-semibold text-white tracking-wide">{msg.name}</h4>
                        <span className="font-sans text-[10px] text-neutral-500 font-light">{msg.email}</span>
                      </div>
                      <span className="font-sans text-[10px] text-brand-gold tracking-widest pt-2 md:pt-0">
                        {new Date(msg.created_at).toLocaleString()}
                      </span>
                    </div>
                    <p className="font-sans font-light text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
                      {msg.message}
                    </p>
                  </div>
                ))}

                {contacts.length === 0 && (
                  <div className="glass-panel p-12 text-center text-neutral-500 italic rounded-none">
                    Inbox is currently empty.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: NEWSLETTER SUBSCRIBERS */}
          {activeTab === "subscribers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <h2 className="font-serif font-light text-2xl md:text-3xl text-white">
                  Newsletter <span className="italic">Subscribers</span>
                </h2>
                <span className="font-sans text-[10px] text-neutral-500 uppercase tracking-widest">
                  Total Subscribers: {subscribers.length}
                </span>
              </div>

              <div className="glass-panel overflow-x-auto rounded-none">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-neutral-500 uppercase tracking-wider">
                      <th className="py-4 px-6 font-semibold">Subscriber Email</th>
                      <th className="py-4 px-6 font-semibold">Signed Up Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((row) => (
                      <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition-colors duration-300">
                        <td className="py-4 px-6 font-medium text-white">{row.email}</td>
                        <td className="py-4 px-6 text-neutral-400 tracking-widest">
                          {new Date(row.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}

                    {subscribers.length === 0 && (
                      <tr>
                        <td colSpan={2} className="py-12 text-center text-neutral-500 italic">
                          No newsletter club members registered yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
