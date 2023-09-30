import NonProtectedPage from "@/components/NonProtectedPage";
import ProtectedPage from "@/components/ProtectedPage";
import type { AppProps } from 'next/app'
import { useRouter } from "next/router";
import AppLayout from "./AppLayout";

export const DynamicLayout = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const path = router.pathname
  switch (path) {
    case '/app/login':
      return (
        <NonProtectedPage>
          <main>
            <Component {...pageProps} />
          </main>
        </NonProtectedPage>
      )
    default:
      return (
        <ProtectedPage>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ProtectedPage>
      )
  }
};
