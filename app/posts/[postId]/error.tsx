"use client";

import NotFound from "app/not-found";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      {error.message === "post not found" ? (
        <NotFound />
      ) : (
        <section>
          <h2>{error.message}</h2>
          <button onClick={() => reset()}>Try again</button>
        </section>
      )}
    </>
  );
}
