import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAnalyticsUsers, useAnalyticsUsersOnline } from "@/hooks/query/analytics"
import { UserAnalyticsResponse } from "@reynandaptr/aha-types/dist/types"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import moment from "moment"

const columns: ColumnDef<UserAnalyticsResponse>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'is_verified',
    header: 'Verified',
    accessorFn: (row) => row.is_verified ? '✅' : '❌',
  },
  {
    accessorKey: 'provider',
    header: 'Login Provider',
  },
  {
    accessorKey: 'login_count',
    header: 'Login Count',
  },
  {
    accessorKey: 'signup_timestamp',
    header: 'Signup Timestamp',
    accessorFn: (row) => moment(row.signup_timestamp).format('LLL') || '-',
  },
  {
    accessorKey: 'last_session_timestamp',
    header: 'Last Session Timestamp',
    accessorFn: (row) => moment(row.last_session_timestamp).format('LLL') || '-',
  }
]

export default function UserDashboard() {
  const { data: analyticUsers } = useAnalyticsUsers()
  const { data: analyticUsersOnline } = useAnalyticsUsersOnline()
  console.log(analyticUsersOnline?.data.data)
  const table = useReactTable({
    data: analyticUsers?.data.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="rounded-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardDescription className="text-4xl text-center text-black">{analyticUsersOnline?.data.data?.user_count}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-xl text-center justify-end text-gray-500">Total User</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardDescription className="text-4xl text-center text-black">{analyticUsersOnline?.data.data?.user_active_session_count}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-xl text-center justify-end text-gray-500">Today&rsquo;s Total User Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1">
            <CardDescription className="text-4xl text-center text-black">{analyticUsersOnline?.data.data?.average_active_user}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-xl text-center justify-end text-gray-500">Average Active User in last 7 days rolling</p>
          </CardContent>
        </Card>
      </div>
      <Separator className="my-4" />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

UserDashboard.UseClientSideLayout = true
