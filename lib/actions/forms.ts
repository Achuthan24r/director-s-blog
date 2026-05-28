"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Subscribes a user's email to the newsletter subscribers list.
 */
export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("subscribers")
      .insert([{ email }]);

    if (error) {
      // Handle Postgres unique violation constraint (already subscribed)
      if (error.code === "23505") {
        return { success: true, message: "Already subscribed." };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}

/**
 * Submits a contact inquiry.
 */
export async function submitContactForm(formData: { name: string; email: string; message: string }) {
  const { name, email, message } = formData;
  
  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("contacts")
      .insert([{ name, email, message }]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "An unexpected error occurred." };
  }
}
