import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: Params) {
  const id = params.params.id;

  return NextResponse.json(
    {
      success: true,
      message: `Get detail users by id ${id}`,
      data: [
        {
          id,
          name: "Z",
        },
      ],
    },
    { status: 200 }
  );
}
