import { Payload } from "payload";
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import { faker } from "@faker-js/faker";

export async function seedCsvData(payload: Payload, delimiter: (',' | ';' | '\t')) {
    try {
        const FILEPATH = 'src/scripts/seed/seeders/data.csv'
        const csvContent = fs.readFileSync(FILEPATH, 'utf8');
        const results = parse(csvContent, {
            delimiter,
            columns: false, // Return array of arrays
            trim: true,
        });

        const headers = results[0].map((header: string) => ({ data: header }));
        const payloadRows = results.slice(1).map((row: string[]) => ({
            data: row.map((cell: string) => ({ data: cell || "" })),
        }));

        await payload.create({
            collection: "csv-data",
            data: { delimiter, headers, rows: payloadRows },
            file: {
                data: fs.readFileSync(FILEPATH),
                mimetype: "text/csv",
                name: `${faker.person.fullName()}.csv`,
                size: fs.statSync(FILEPATH).size,
            },
            draft: true,
        });
    } catch (error) {
        console.error(`[seedCsvData]: ${error}`);

    }
}