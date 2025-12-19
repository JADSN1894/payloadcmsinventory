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

// const invoices = [
//     {
//         invoice: 'INV001',
//         paymentStatus: 'Paid',
//         totalAmount: '$250.00',
//         paymentMethod: 'Credit Card',
//     },
//     {
//         invoice: 'INV002',
//         paymentStatus: 'Pending',
//         totalAmount: '$150.00',
//         paymentMethod: 'PayPal',
//     },
//     {
//         invoice: 'INV003',
//         paymentStatus: 'Unpaid',
//         totalAmount: '$350.00',
//         paymentMethod: 'Bank Transfer',
//     },
//     {
//         invoice: 'INV004',
//         paymentStatus: 'Paid',
//         totalAmount: '$450.00',
//         paymentMethod: 'Credit Card',
//     },
//     {
//         invoice: 'INV005',
//         paymentStatus: 'Paid',
//         totalAmount: '$550.00',
//         paymentMethod: 'PayPal',
//     },
//     {
//         invoice: 'INV006',
//         paymentStatus: 'Pending',
//         totalAmount: '$200.00',
//         paymentMethod: 'Bank Transfer',
//     },
//     {
//         invoice: 'INV007',
//         paymentStatus: 'Unpaid',
//         totalAmount: '$300.00',
//         paymentMethod: 'Credit Card',
//     },
// ]

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
