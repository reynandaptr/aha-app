import Link from "next/link"

import { cn } from "@/lib/utils"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { RootState } from "@/globalStates/_prototype"
import { useRouter } from "next/router"
import { useAuthLogout } from "@/hooks/query/auth"
import { setAuthData } from "@/globalStates/auth"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"

export const DashboardNavbar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const { authData } = useSelector(
    (state: RootState) => ({
      authData: state.auth.auth,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const { refetch: doAuthLogOut } = useAuthLogout({
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  }, {
    onSuccess: () => {
      router.replace('/')
      dispatch(setAuthData(undefined))
    },
    onError: () => {
      router.replace('/')
      dispatch(setAuthData(undefined))
    }
  })

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <nav
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
            {...props}
          >
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            {authData?.is_verified && (
              <>
                <Link
                  href="/app/dashboard/user"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  User Dashboard
                </Link>
              </>
            )}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{authData?.name ? authData.name[0].toUpperCase() : authData?.email[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    {authData?.name && <p className="text-sm font-medium leading-none">{authData.name}</p>}
                    <p className="text-xs leading-none text-muted-foreground">
                      {authData?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link href="/app/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => doAuthLogOut()} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div >

  )
}