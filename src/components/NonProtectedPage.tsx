import { setAuthData } from "@/globalStates/auth";
import { useAuthValidateToken } from "@/hooks/query/auth";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Loading } from "./Loading";
import { RootState } from "@/globalStates/_prototype";

export default function NonProtectedPage({ children }: { children: JSX.Element }) {
  const router = useRouter()
  const dispatch = useDispatch();
  const { authData } = useSelector(
    (state: RootState) => ({
      authData: state.auth.auth,
    }),
    shallowEqual,
  );

  const { isLoading: isLoadingValidateToken } = useAuthValidateToken({
    retry: false,
    refetchOnWindowFocus: false,
  }, {
    onSuccess(data) {
      dispatch(setAuthData(data.data.data))
    },
    onError() {
      dispatch(setAuthData(undefined));
    }
  });

  if (authData) router.replace('/app')
  if (authData || isLoadingValidateToken) return (<Loading />);

  return (
    <>
      {children}
    </>
  )
}
