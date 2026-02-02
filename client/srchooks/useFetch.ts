import { useEffect, useState } from "react";

// Note to self: Generic fetch hook for any API endpoint.
export function useFetch<T>(url: string | null) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Note to self: If url is null, skip fetching.
    if (!url) return;

    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Request failed");
        const json = (await res.json()) as T;

        // Note to self: Only update state if component is still mounted.
        if (isMounted) setData(json);
      } catch (err) {
        if (isMounted) setError((err as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
}
