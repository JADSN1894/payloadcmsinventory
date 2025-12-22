import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Fragment } from 'react/jsx-runtime'

export function TableExperimentItens({ headers, rows }: { headers: string[]; rows: string[][] }) {
    // headers: string[], rows: string[][]
    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    {headers.map((headerName, index) => (
                        <Fragment key={index}>
                            {<TableHead className="text-center">{headerName}</TableHead>}
                        </Fragment>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={index}>
                        {row.map((row, index) => (
                            <TableCell key={index} className="font-medium text-left">
                                {row}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
