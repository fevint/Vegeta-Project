import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const payload = await req.json();
  const product = await prisma.product.findFirst({
    where: {
      id: payload.product_id,
    },
  });
  if (!product) {
    return Response({
      message: "Product not found",
      status: 404,
    });
  }

  const checkout = await prisma.checkout.create({
    data: {
      productId: product.id,
      // userId: "clz9j9y5q0019qlzg1wwa1t87",
      userId: session?.user.id,
      qty: payload.qty,
      pricePerItem: payload.p,
    },
  });

  return Response({
    message: "Checkout success",
    data: checkout,
  });
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const checkouts = await prisma.checkout.findMany({
      where: {
        userId: session?.user.id,
        transactionId: null,
      },
      include: {
        product: true,
      },
    });
    return Response({
      message: "Checkout success",
      data: checkouts,
    });
  } catch (error) {
    return Response({
      message: "Checkout success",
      data: error,
      status: 500,
    });
  }
}
