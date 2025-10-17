import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";


export async function GET() {
 
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    };
    const schoolAdmins = data.users.filter(
      (user) => user.user_metadata?.role === "school_admin"
    );
    return NextResponse.json({ users: schoolAdmins });
  
}



export async function POST(req: Request) {

    const body = await req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        role: "school_admin",
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: data.user });
  
}


export async function DELETE(req: Request) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User id is required" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id });
 
}