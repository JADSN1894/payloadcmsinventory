// hooks/parseCSVBeforeValidate.ts
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { PayloadRequest } from 'payload';

export const parseCSVBeforeValidate = async (data: any, req: PayloadRequest) => {
    try {
        console.log(`[parseCSV] Parsing: ${data.filename}`);

        // ✅ Get absolute path
        // const collectionConfig = req.payload.config.collections.find(c => c.slug === 'csv-data');
        // const basePath = process.cwd();
        // const uploadDir = collectionConfig?.upload?.staticDir || './csv-uploads';
        // const filePath = path.resolve(basePath, uploadDir, path.basename(data.filename)); // basename for security




        // const windowsBase = basePath.replace(/^\/home\/[^/]+/, '/mnt/c/Users')
        // const fallbackPath = path.resolve(windowsBase, uploadDir, path.basename(data.filename))

        // ✅ Debug directory
        // console.log(`[Parse] CWD: ${basePath}`);
        // console.log(`[Parse] Upload dir: ${uploadDir}`);
        // console.log(`[Parse] Full path: ${filePath}`);

        let filePath = 'mock/data.csv';

        if (!fs.existsSync(filePath)) {
            console.error(`[parseCSV] File not found: ${filePath}`);
            return data; // Continue without parsing
        }

        const csvContent = fs.readFileSync(filePath, 'utf8');
        const results = parse(csvContent, {
            delimiter: data.delimiter || ',',
            columns: false, // Return array of arrays
            trim: true,
        });

        if (results.length > 0) {
            const headers = results[0];
            const rows = results.slice(1);

            // ✅ Add parsed data directly to the document before save
            data.headers = headers.map(h => ({ data: String(h) }));
            data.rows = rows.map(row => ({
                data: row.map((v: any) => ({ data: String(v ?? '') }))
            }));
        }

        return data;

    } catch (error) {
        console.error(`[parseCSV] Error: ${error}`);
        return data; // Continue save without parsing
    }
};