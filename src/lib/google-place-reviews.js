const GOOGLE_PLACE_ID = "ChIJwSztZwQTEg0Rv0lUXYxyDT4";
const GOOGLE_PLACE_URL =
  "https://www.google.com/maps/place/?q=place_id:ChIJwSztZwQTEg0Rv0lUXYxyDT4";
const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24;
const GOOGLE_API_KEY_ENV_NAMES = [
  "GOOGLE_API_KEY",
  "GOOGLE_PLACES_API_KEY",
  "GOOGLE_MAPS_API_KEY",
  "NEXT_PUBLIC_GOOGLE_API_KEY",
];

function resolveGoogleApiKey() {
  for (const envName of GOOGLE_API_KEY_ENV_NAMES) {
    const value = process.env[envName];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function normalizeLegacyReview(review) {
  return {
    author_name: review.author_name ?? "Cliente de Google",
    author_url: review.author_url ?? "",
    language: review.language ?? "es",
    profile_photo_url: review.profile_photo_url ?? "",
    rating: typeof review.rating === "number" ? review.rating : 0,
    relative_time_description: review.relative_time_description ?? "",
    text: review.text ?? "",
    time: typeof review.time === "number" ? review.time : 0,
  };
}

function normalizeNewReview(review) {
  const publishTime = review.publishTime
    ? Math.floor(new Date(review.publishTime).getTime() / 1000)
    : 0;

  return {
    author_name:
      review.authorAttribution?.displayName || "Cliente de Google",
    author_url: review.authorAttribution?.uri || "",
    language: review.originalText?.languageCode || review.text?.languageCode || "es",
    profile_photo_url: review.authorAttribution?.photoUri || "",
    rating: typeof review.rating === "number" ? review.rating : 0,
    relative_time_description: review.relativePublishTimeDescription || "",
    text: review.originalText?.text || review.text?.text || "",
    time: publishTime,
  };
}

async function fetchLegacyPlaceDetails(apiKey) {
  const endpoint = new URL(
    "https://maps.googleapis.com/maps/api/place/details/json",
  );

  endpoint.searchParams.set("place_id", GOOGLE_PLACE_ID);
  endpoint.searchParams.set(
    "fields",
    "name,rating,user_ratings_total,reviews,url",
  );
  endpoint.searchParams.set("reviews_sort", "newest");
  endpoint.searchParams.set("language", "es");
  endpoint.searchParams.set("key", apiKey);

  const response = await fetch(endpoint.toString(), {
    next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    return {
      ok: false,
      error: "Google Places API ha devuelto un error al consultar las reseñas.",
    };
  }

  const payload = await response.json();

  if (payload.status !== "OK" || !payload.result) {
    return {
      ok: false,
      error:
        payload.error_message ||
        "La respuesta de Google Places API no contiene reseñas validas.",
      code: payload.status,
    };
  }

  // Google Places (Legacy) puede devolver hasta 5 reseñas y permite reviews_sort=newest.
  const reviews = Array.isArray(payload.result.reviews)
    ? payload.result.reviews
        .map(normalizeLegacyReview)
        .sort((left, right) => right.time - left.time)
    : [];

  return {
    ok: true,
    data: {
      place_id: GOOGLE_PLACE_ID,
      place_url: payload.result.url || GOOGLE_PLACE_URL,
      name: payload.result.name ?? "Grupo Solarsur Energía Solar S.L.",
      rating:
        typeof payload.result.rating === "number" ? payload.result.rating : 0,
      user_ratings_total:
        typeof payload.result.user_ratings_total === "number"
          ? payload.result.user_ratings_total
          : 0,
      reviews,
      fetched_at: new Date().toISOString(),
      source: "legacy",
      sort_mode: "newest",
    },
  };
}

async function fetchNewPlaceDetails(apiKey) {
  const response = await fetch(
    `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "id,displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
      next: { revalidate: REVIEWS_REVALIDATE_SECONDS },
    },
  );

  if (!response.ok) {
    return {
      ok: false,
      error:
        "Places API (New) ha devuelto un error al consultar las reseñas.",
    };
  }

  const payload = await response.json();

  // Places API (New) solo devuelve un máximo de 5 reseñas y las devuelve por relevancia.
  // Ordenamos localmente por publishTime dentro de ese conjunto para mostrar primero las más recientes disponibles.
  const reviews = Array.isArray(payload.reviews)
    ? payload.reviews
        .map(normalizeNewReview)
        .sort((left, right) => right.time - left.time)
    : [];

  return {
    ok: true,
    data: {
      place_id: GOOGLE_PLACE_ID,
      place_url: payload.googleMapsUri || GOOGLE_PLACE_URL,
      name: payload.displayName?.text ?? "Grupo Solarsur Energía Solar S.L.",
      rating: typeof payload.rating === "number" ? payload.rating : 0,
      user_ratings_total:
        typeof payload.userRatingCount === "number" ? payload.userRatingCount : 0,
      reviews,
      fetched_at: new Date().toISOString(),
      source: "new",
      sort_mode: "relevance_then_local_date",
    },
  };
}

export async function getGooglePlaceReviews() {
  const apiKey = resolveGoogleApiKey();

  if (!apiKey) {
    return {
      ok: false,
      status: 500,
      error: `No se ha encontrado ninguna clave de Google Places. Revisa estas variables: ${GOOGLE_API_KEY_ENV_NAMES.join(", ")}.`,
    };
  }

  try {
    const legacyResult = await fetchLegacyPlaceDetails(apiKey);

    if (legacyResult.ok) {
      return {
        ok: true,
        data: legacyResult.data,
      };
    }

    const shouldFallbackToNew =
      legacyResult.code === "REQUEST_DENIED" ||
      String(legacyResult.error || "").includes("legacy API");

    if (shouldFallbackToNew) {
      const newResult = await fetchNewPlaceDetails(apiKey);

      if (newResult.ok) {
        return {
          ok: true,
          data: newResult.data,
        };
      }

      return {
        ok: false,
        status: 502,
        error: newResult.error,
      };
    }

    return {
      ok: false,
      status: 502,
      error: legacyResult.error,
    };
  } catch {
    return {
      ok: false,
      status: 500,
      error:
        "No se ha podido completar la consulta de reseñas por un error interno.",
    };
  }
}

export {
  GOOGLE_PLACE_ID,
  GOOGLE_PLACE_URL,
  REVIEWS_REVALIDATE_SECONDS,
};
