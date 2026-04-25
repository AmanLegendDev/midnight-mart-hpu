import { connectDB } from "@/lib/db";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const match = await bcrypt.compare(
      password,
      admin.password
    );

    if (!match) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = createToken({
      id: admin._id,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: false, // dev mode fix
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}