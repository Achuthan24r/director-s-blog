"use server";

import { createClient } from "@/lib/supabase/server";
import { Project } from "@/lib/queries/projects";
import { revalidatePath } from "next/cache";

/**
 * Creates a new project in the Supabase projects database.
 */
export async function createProject(projectData: Omit<Project, "id" | "created_at">) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("projects")
      .insert([projectData])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/projects");
    return { success: true, project: data as Project };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

/**
 * Updates an existing project in the database.
 */
export async function updateProject(id: string, updateData: Partial<Project>) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${data.slug}`);
    return { success: true, project: data as Project };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

/**
 * Deletes a project by its ID from the database.
 */
export async function deleteProject(id: string, slug?: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/");
    revalidatePath("/projects");
    if (slug) {
      revalidatePath(`/projects/${slug}`);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
