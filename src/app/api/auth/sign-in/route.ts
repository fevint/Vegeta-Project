import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
        password: payload.password,
      },
    });

    const data = user;

    return Response({
      message: "Sign in Successfully",
      data,
    });
  } catch (error) {
    return Response({
      message: "Sign in failed",
      data: error,
      status: 500,
    });
  }
}
