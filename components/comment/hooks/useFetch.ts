import { useEffect, useState } from 'react';

export default function useFetch(url: string) {
  const [payload, setPayload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorConstructor>();

  const callUrl = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(url, { method: 'GET' })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((data) => setPayload(data))
      .catch((error) => {
        setError(error);
      });
    setLoading(false);
  };

  useEffect(() => {
    callUrl();
  }, []);

  return { payload, loading, error };
}
