import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Missing Replicate API token" },
        { status: 500 }
      );
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(
      "replicate/flux-schnell",
      {
        input: {
          prompt,
          aspect_ratio: "1:1",
          output_format: "png",
        },
      }
    );

    return NextResponse.json({
      image: output[0],
    });

  } catch (err: any) {
    console.error("❌ Image generation failed:", err);
    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}
