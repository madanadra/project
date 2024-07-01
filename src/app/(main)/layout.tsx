import Logout from "./logout";
import { Suspense } from "react";
import Load from "../load";
import { GetUser } from "@/typing";
import { get_user } from "@/fetch";
import Logo from "./logo";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const User = ({name}: {name: string}) => {
    return (
      <div className="flex items-center justify-between gap-x-4">
        <h1 className="text-slate-600">{name}</h1>
        <Logout />
      </div>
    )
  }

  const Main = async () => {
    const user: {data?: GetUser, error?: string}  = await get_user()

    if (!user.data || user.error) {
      return (
        <div className="grid place-content-center h-dvh p-4">
          <h1 className="text-slate-600 text-center">{user.error}</h1>
        </div>
      )
    }

    return (
      <div className="flex flex-col min-h-dvh">
        <div className="sm:hidden bg-slate-100 border-b border-slate-300 p-4 sm:px-8">
          <User name={user.data.username} />
        </div>
        <div className="flex items-center justify-between gap-x-4 h-16 px-4 sm:px-8 border-b border-slate-300 bg-slate-50">
          <Logo />
          <div className="hidden sm:grid">
            <User name={user.data.username} />
          </div>
        </div>
        <div className="grow py-8 px-4 sm:px-8 w-full max-w-5xl mx-auto">
          {children}
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="grid place-content-center h-dvh p-4">
        <Load size="large" />
      </div>
    }>
      <Main />
    </Suspense>
  )
}