import { NextResponse } from "next/server";

import {
  REVIEWS_REVALIDATE_SECONDS,
  getGooglePlaceReviews,
} from "@/lib/google-place-reviews";

export const revalidate = 86400;

export async function GET() {
  const result = await getGooglePlaceReviews();

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
        reviews: [],
        rating: 0,
        user_ratings_total: 0,
      },
      {
        status: result.status,
        headers: {
          "Cache-Control": `s-maxage=${REVIEWS_REVALIDATE_SECONDS}, stale-while-revalidate=${REVIEWS_REVALIDATE_SECONDS}`,
        },
      },
    );
  }

  return NextResponse.json(result.data, {
    headers: {
      "Cache-Control": `s-maxage=${REVIEWS_REVALIDATE_SECONDS}, stale-while-revalidate=${REVIEWS_REVALIDATE_SECONDS}`,
    },
  });
}
