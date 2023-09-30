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
      <aside className="w-72 bg-gray-800 fixed h-screen overflow-auto z-5">
        <div>
          <Link href="/app" className="flex items-center justify-center h-16 ext-2xl font-semibold text-gray-50 bg-gray-900">
            TheWatcher
          </Link>
          <div className="p-4">
            <Link href="/app/project" className={`block text-gray-50 rounded mb-3 py-3 px-4 ${router.pathname.includes('/app/project') && "bg-gray-700"}`}>Project</Link>
            <Link href="/app/settings" className={`block text-gray-50 rounded mb-3 py-3 px-4 ${router.pathname.includes('/app/settings') && "bg-gray-700"}`}>Settings</Link>
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-4 flex justify-center">
          <a href="https://www.buymeacoffee.com/reynandaptr" target="_blank">
            <Image src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" className="w-40" width={160} height={1} />
          </a>
        </div>
      </aside >

      <nav className="h-16 flex items-center justify-between p-4 fixed w-full z-1 shadow bg-white">
        <div className="w-full ml-72 mr-4">

        </div>

      </nav>
      <main className="ml-72 p-4">
        <div className="mt-16" />
        {children}
      </main>
    </>
  )
}