// 임시파일
/*
import { useState, useCallback } from "react";
import { useAppDispatch } from "../redux/hooks";

export const useThunk = thunk => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const runThunk = useCallback(
    arg => {
      setIsLoading(true);

      dispatch(thunk(arg))
        .unwrap()
        .catch(err => setError(err))
        .finally(() => setIsLoading(false));
    },
    [dispatch, thunk],
  );

  return [runThunk, isLoading, error];
};
*/
