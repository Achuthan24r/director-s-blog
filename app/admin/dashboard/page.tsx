import { Metadata } from "next";
import { AdminDashboard } from "@/components/forms/admin-dashboard";
import { getProjects } from "@/lib/queries/projects";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Vance Control Gate",
  description: "Secure, authenticated control gate to add and manage cinematic archive items, inbox messages, and subscribers.",
};

export default async function AdminDashboardPage() {
  const projects = await getProjects();
  
  let contacts: any[] = [];
  let subscribers: any[] = [];

  try {
    const supabase = await createClient();
    
    // Fetch Contact submissions
    const { data: contactsData } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (contactsData) {
      contacts = contactsData;
    }

    // Fetch Newsletter subscribers
    const { data: subscribersData } = await supabase
      .from("subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (subscribersData) {
      subscribers = subscribersData;
    }
  } catch (error) {
    console.error("Dashboard Server Fetch Error (using fallbacks):", error);
  }

  return (
    <AdminDashboard
      initialProjects={projects}
      initialContacts={contacts}
      initialSubscribers={subscribers}
    />
  );
}
