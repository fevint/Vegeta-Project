import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({});

    return Response({
      message: "Get all products",
      data: products,
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error)
    return Response({
      message: "Failed to get products",
      data: error,
      status: 500,
    });
  }
}
