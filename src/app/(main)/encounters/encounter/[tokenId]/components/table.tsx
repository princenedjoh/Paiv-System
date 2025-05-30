'use client'

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { columns } from "./data"
import Text from "@styles/components/text"
import theme from "@styles/theme"
import { TypographyBold } from "@styles/style.types"
import NoData from "@components/NoData/noData"
import { IClaims } from "@/app/(main)/claims/utils/types"

const Table = ({
    data,
    isLoading,
} : {
    data : IClaims[]
    isLoading : boolean,
}) => {
    const {getHeaderGroups, getRowModel} = useReactTable({
        data:data,
        columns : columns,
        getCoreRowModel:getCoreRowModel()
    })
    return (
        <>
            <table className="w-full min-w-[800px] max-w-[1024px] border-separate border-spacing-0">
                <thead className="bg-bg-secondary px-2">
                    {
                        getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header, index) => (
                                        <th className={`text-left border-y-[1px] border-solid border-border-primary ${index === 0 ? 'rounded-l-xl border-l-[1px]' : ''} ${index === headerGroup.headers.length - 1 ? 'rounded-r-xl border-r-[1px]' : ''}`} key={header.id}>
                                            <div className={`py-[12px] mt-[-5px] ${index === 0 ? 'pl-[30px]' : ''}`}>
                                                <Text
                                                    textColor={theme.colors.text.tetiary}
                                                    bold={TypographyBold.md}
                                                >
                                                    {header.isPlaceholder
                                                        ? null
                                                        : typeof header.column.columnDef.header === 'function'
                                                        ? header.column.columnDef.header(header.getContext()) // Call function if it's a header renderer
                                                        : header.column.columnDef.header} {/* Directly render if it's a string */}
                                                </Text>
                                            </div>
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                {
                    !isLoading && data.length ?
                    <tbody>
                        {
                            getRowModel().rows.map((row, index) => (
                                <tr className={`${index % 2 === 1 ? "bg-gray-50" : ""} hover:bg-bg-secondary cursor-pointer transition-colors duration-200`}>
                                    {
                                        row.getVisibleCells().map((cell, index) => (
                                            <td className={`py-[16px] ${index === 0 ? 'pl-[30px] rounded-l-xl' : ''}`} key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                    :
                    <></>
                }
            </table>
            {
                isLoading ?
                <div className="h-[100px] flex items-center">
                    <div className="normal-loader"></div>
                </div>
                :
                !data.length && <NoData />
            }
        </>
    )
}
export default Table