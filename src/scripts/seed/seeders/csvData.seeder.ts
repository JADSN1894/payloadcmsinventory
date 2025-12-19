import { Payload } from "payload";
import { parse } from 'csv-parse/sync';
import fs from 'fs';

export async function seedCsvData(payload: Payload) {
    try {
        let filePath = 'src/scripts/seed/seeders/data.csv';

        if (!fs.existsSync(filePath)) {
            console.error(`[seedCsvData] File not found: ${filePath}`);
            // return data; // Continue without parsing
        }

        const csvContent = fs.readFileSync(filePath, 'utf8');
        const results = parse(csvContent, {
            delimiter: ';',
            columns: false, // Return array of arrays
            trim: true,
        });

        if (results.length > 0) {

            // ✅ Add parsed data directly to the document before save
            let headers = results.map(h => ({ headerName: String(h) }));
            let rows = results.map(row => ({
                values: row.map((v: any) => ({ value: String(v ?? '') }))
            }));

            await payload.create({
                collection: 'csv-data',
                data: {
                    id: 1,
                    headers,
                    rows,

                },
                draft: true,
            })

        }
    } catch (error) {
        console.error(`[seedCsvData]: ${error}`);

    }
}