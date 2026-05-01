import { NextResponse } from "next/server";

import {
  REVIEWS_REVALIDATE_SECONDS,
  getGooglePlaceReviews,
} from "@/lib/google-place-reviews";

export const revalidate = REVIEWS_REVALIDATE_SECONDS;

export async function GET() {
  const reviewsResult = await getGooglePlaceReviews();

  if (!reviewsResult.ok) {
    return NextResponse.json(
      {
        reviews: [],
        rating: 0,
        total: 0,
        status:
          reviewsResult.status === 500
            ? "CONFIG_OR_INTERNAL_ERROR"
            : "UPSTREAM_ERROR",
        error_message: reviewsResult.error,
      },
      { status: reviewsResult.status },
    );
  }

  return NextResponse.json(
    {
      ...reviewsResult.data,
      total: reviewsResult.data.user_ratings_total,
      status: "OK",
      error_message: null,
    },
    {
      status: 200,
      headers: {
        "Cache-Control": `s-maxage=${REVIEWS_REVALIDATE_SECONDS}, stale-while-revalidate=${REVIEWS_REVALIDATE_SECONDS}`,
      },
    },
  );
}
