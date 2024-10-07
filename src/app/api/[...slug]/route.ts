/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }, // 'slug' is an array capturing all dynamic segments
) {
  return handleRequest(request, params);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } },
) {
  return handleRequest(request, params);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string[] } },
) {
  return handleRequest(request, params);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string[] } },
) {
  return handleRequest(request, params);
}

async function handleRequest(
  request: NextRequest,
  { slug }: { slug: string[] },
) {
  const query = request.nextUrl.search;
  const urlPath = slug.join("/");
  console.log("🚀 ~ urlPath:", urlPath);

  try {
    const response = await axios({
      method: request.method,
      url: `http://localhost:4000/${urlPath}${query ? `${query}` : ""}`,
      data: request.method !== "GET" ? await request.json() : undefined,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      error?.response?.data || { error: "Internal server error" },
      {
        status: error?.response?.status || 500,
      },
    );
  }
}
