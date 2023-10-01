import { RootState } from "@/globalStates/_prototype";
import { setAuthData } from "@/globalStates/auth";
import { useAuthLogout } from "@/hooks/query/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

interface Item {
  children?: React.ReactNode;
  href?: string;
  id: string
};

interface Items {
  items: Item[];
  heading?: string;
  id: string;
}

export default function AppLayout({ children }: { children: JSX.Element }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { authData } = useSelector(
    (state: RootState) => ({
      authData: state.auth.auth,
    }),
    shallowEqual,
  );
  const { refetch: doAuthLogOut } = useAuthLogout({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  }, {
    onSuccess: () => {
      dispatch(setAuthData(undefined))
    },
    onError: () => {
      dispatch(setAuthData(undefined))
    }
  })

  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState('');

  return (
    <>
      <main className="ml-72 p-4">
        <div className="mt-16" />
        {children}
      </main>
    </>
  )
}