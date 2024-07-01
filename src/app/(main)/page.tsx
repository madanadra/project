import type { Metadata } from "next";
import { get_member } from "@/fetch";
import { Suspense } from "react";
import Load from "../load";
import { GetMember } from "@/typing";
import Search from "./search";
import Add from "./add";
import Table from "./table";

export const metadata: Metadata = {
  title: "Test project",
};

export default function Page({searchParams}: {searchParams?: { [key: string]: string | string[] | undefined }}) {
  const search = searchParams?.s as string
  const page = searchParams?.page as string

  const Main = async () => {
    const member: {data?: GetMember, error?: string} = await get_member({search: search, page: page})

    if (!member.data || !member.data.data || member.error) {
      return (
          <div className="grid gap-y-4 text-slate-600 text-center p-4">
              {member.error && <h1>{member.error}</h1>}
          </div>
      )
    }

    return (
      <div className="grid gap-y-4">
        <div className="flex items-center gap-x-4">
          <Search value={search} />
          <Add />
        </div>
        <Table member={member.data} search={search} />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="grid justify-center p-4"><Load size="large" /></div>}>
      <Main />
    </Suspense>
  );
}
