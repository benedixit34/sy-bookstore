"use server";

import { encodedRedirect } from "@/app/utils";
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    encodedRedirect("error", "/auth/register", "Email and password are required");
    return;
  }

  const { error } = await supabase.auth.signUp({
    
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${origin}/auth/login`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    encodedRedirect("error", "/auth/register", error.message);
  } else {
    encodedRedirect(
      "success",
      "/auth/register",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string ?? "";
  const password = formData.get("password") as string ?? "";
  const supabase = await createClient();

  if (!email || !password) {
    return encodedRedirect("error", "/auth/login", "Email and password are required");
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/auth/login", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/auth/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/auth/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/auth/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const code = formData.get("code") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/auth/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/auth/reset-password",
      "Passwords do not match",
    );
  }

  if (code) {
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    if (exchangeError) {
      console.error("Session exchange failed:", exchangeError.message);
      return encodedRedirect(
        "error",
        "/auth/reset-password",
        "Invalid or expired reset link",
      );
    }
  }
    const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return encodedRedirect(
      "error",
      "/auth/reset-password",
      "Invalid or expired reset link",
    );
  }


  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/auth/reset-password",
      "Password update failed",
    );
  }

  encodedRedirect("success", "/auth/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/auth/login");
};