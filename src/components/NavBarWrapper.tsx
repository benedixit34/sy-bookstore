import { createClient } from "@/utils/supabase/server";
import { NavBar } from "./NavBar";

async function getLoginStatus(): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return Boolean(user); 
}


export async function NavBarWrapper() {
  const isLoggedIn = await getLoginStatus();
  return <NavBar isLoggedIn={isLoggedIn} />;
}