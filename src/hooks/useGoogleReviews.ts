import { useState, useEffect } from "react";

export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhotoUrl?: string;
  rating: number;
  title?: string;
  text: string;
  relativeTime: string;
}

const FALLBACK: GoogleReview[] = [
  {
    id: "f1",
    authorName: "Vander Araújo",
    rating: 5,
    title: "Ótima qualidade",
    text: "Ótima qualidade, preço e atendimento! Não conhecia o Igor e sua equipe antes do trabalho contratado e fiquei muito feliz com o resultado! Recomendo!",
    relativeTime: "",
  },
  {
    id: "f2",
    authorName: "Julia Pereira",
    rating: 5,
    title: "Assistência pós-venda",
    text: "Somos clientes desde 2016 e, ao longo desse tempo, sempre fomos muito bem atendidos. O trabalho é ótimo e de muita qualidade. Sempre que precisamos de alguma assistência ou ajuste, a equipe esteve pronta para nos atender. 🙏🏻🥰",
    relativeTime: "",
  },
  {
    id: "f3",
    authorName: "Andre Luiz Campos Pereira",
    rating: 5,
    title: "Ótimo atendimento",
    text: "Empresa com um ótimo atendimento! Cumpriram prazo com uma excelente qualidade do móveis feitos por eles !!!! Fiz a casa inteira com a Concetto e indico o trabalho realizado por eles !",
    relativeTime: "",
  },
];

interface PlacesReview {
  name: string;
  relativePublishTimeDescription?: string;
  rating: number;
  text: { text: string };
  authorAttribution?: {
    displayName: string;
    photoUri?: string;
  };
}

export function useGoogleReviews(): { reviews: GoogleReview[]; loading: boolean } {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY as string | undefined;
    const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID as string | undefined;

    if (!apiKey || !placeId) {
      setReviews(FALLBACK);
      setLoading(false);
      return;
    }

    fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ reviews?: PlacesReview[] }>;
      })
      .then(({ reviews: raw = [] }) => {
        const mapped = raw
          .filter((r) => r.rating >= 4 && r.text?.text)
          .map((r) => ({
            id: r.name,
            authorName: r.authorAttribution?.displayName ?? "Anônimo",
            authorPhotoUrl: r.authorAttribution?.photoUri,
            rating: r.rating,
            text: r.text.text,
            relativeTime: r.relativePublishTimeDescription ?? "",
          }));
        setReviews(mapped.length > 0 ? mapped : FALLBACK);
      })
      .catch(() => setReviews(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return { reviews, loading };
}
