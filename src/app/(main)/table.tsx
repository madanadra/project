'use client'

import { GetMember } from "@/typing";
import { useEffect, useState } from "react";
import Edit from "./edit";
import Delete from "./delete";
import Pagination from "./pagination";
import moment from "moment";

export default function Table({member, search}: {member: GetMember, search: string}) {
    const [data, setData] = useState<GetMember['data']>(member.data)

    useEffect(() => {
        setData(member.data)
    }, [member])

    const remove = (id: string) => {
        const value = data.filter(item => item.id !== id)
        setData(value)
    } 

    return (data.length ? <>
        <div className="bg-slate-50 rounded-md border border-slate-300 overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-slate-100 border-b border-slate-300">
                <tr className="font-medium text-sm">
                    <td className="p-4">ID</td>
                    <td className="p-4">Name</td>
                    <td className="p-4">Tel</td>
                    <td className="p-4">Birth date</td>
                    <td className="p-4">Actions</td>                  
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
                {data.map(item => 
                    <tr key={item.id}>
                        <td className="p-4 text-sm text-slate-600">{item.id.slice(0, 3)}...{item.id.slice(-4)}</td>
                        <td className="p-4 text-sm">{item.name}</td>
                        <td className="p-4 text-sm text-slate-600">{item.tel}</td>
                        <td className="p-4 text-sm text-slate-600">{moment(item.birth_date).format('ll')}</td>
                        <td className="p-4 flex items-center gap-x-2">
                            <Edit item={item} />
                            <Delete item={item} remove={remove} />
                        </td>
                    </tr>
                )}
            </tbody>
          </table>
        </div>
        <div className="grid justify-items-center sm:flex sm:justify-between items-center gap-4">
            <h1 className="text-sm">Showing <span className="font-medium">{member.from}</span> to <span className="font-medium">{member.to}</span> of <span className="font-medium">{member.total}</span> result{member.total > 1 ? 's' : ''}</h1>
          <Pagination current_page={member.current_page} last_page={member.last_page} />
        </div></> : search ? 
        <h1 className="text-slate-600 text-center py-4">No results for &quot;<span className="text-slate-950">{search}</span>&quot;</h1> :
        <h1 className="text-slate-600 text-center py-4">No data</h1>
    )
}