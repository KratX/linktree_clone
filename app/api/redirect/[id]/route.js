import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-client";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
    // Next.js 15 Fix: params is now a Promise, so we must await it
    const { id } = await params;

    // Validate the ID format
    if (!ObjectId.isValid(id)) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {
        const client = await clientPromise;
        const db = client.db();

        // Find the link by ID
        const link = await db.collection("links").findOne({ _id: new ObjectId(id) });

        if (!link) {
            return NextResponse.redirect(new URL("/", request.url));
        }

        // Increment the click counter by 1
        await db.collection("links").updateOne(
            { _id: new ObjectId(id) },
            { $inc: { clicks: 1 } }
        );

        // Redirect the user to the actual URL
        // We use a 302 status code for a standard temporary redirect
        return NextResponse.redirect(link.url, {
            status: 302,
            headers: {
                // Ensure the redirect target opens correctly
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("Redirect Error:", error);
        return NextResponse.redirect(new URL("/", request.url));
    }
}