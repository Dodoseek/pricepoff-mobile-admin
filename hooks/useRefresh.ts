import { useState, useCallback } from "react";

type RefetchFunction = () => Promise<unknown>;

export function useRefresh(refetch: RefetchFunction) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch().then(() => undefined);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return { refreshing, onRefresh };
}
