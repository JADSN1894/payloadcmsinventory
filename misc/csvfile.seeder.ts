import { Payload } from "payload";
import fs from "node:fs/promises";

export async function seedCsvFile(payload: Payload) {

    try {
        // const csv = await readCSV("src/scripts/seed/seeders/data.csv", ",")

        // const headers = csv.length > 0 ? Object.keys(csv[0]).map(key => ({ value: key })) : [];
        // const rows = csv.map((record: { [s: string]: unknown; } | ArrayLike<unknown>) => ({ values: Object.values(record).map(value => ({ value: value as string })) }));

        // await payload.create({
        //     collection: 'csv-files',
        //     data: {
        //         headers,
        //         rows,
        //         delimiter: ",",
        //     },
        //     draft: true,
        // })
    } catch (error) {
        console.error('Failed to seed article', error)
    }

}