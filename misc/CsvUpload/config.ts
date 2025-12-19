import { CollectionAfterChangeHook, CollectionConfig } from 'payload';

// hooks/parseCSV.ts
import { PayloadRequest } from 'payload';
import fs from 'fs';
import { Readable } from 'stream';
import { parse } from "csv-parse";
import path from 'path';
export const parseCSV_V1 = async (doc: any, req: PayloadRequest) => {
    try {
        const filePath = doc.filename; // Adjust based on your upload config
        const delimiter = doc.delimiter || ',';
        const headers: string[] = [];
        const rows: any[] = [];

        // Read and parse CSV
        await new Promise<void>((resolve, reject) => {
            const stream = fs.createReadStream(filePath).pipe(parse({ delimiter: delimiter }));

            stream.on('headers', (csvHeaders: any) => {
                headers.push(...csvHeaders);
            });

            stream.on('data', (data: any) => {
                rows.push(data);
            });

            stream.on('end', () => {
                resolve();
            });

            stream.on('error', (error: any) => {
                reject(error);
            });
        });

        // Create CSV data entry
        await req.payload.create({
            collection: 'csv-data',
            data: {
                sourceFile: doc.id,
                headers: headers.map(h => ({ headerName: h })),
                rows: rows.map(row => ({
                    values: Object.values(row).map(v => ({ value: String(v) }))
                })),
            },
        });

    } catch (error) {
        console.error('CSV parsing error:', error);
        // Optionally create an error log entry
    }
};

export const parseCSV = async (doc: any, req: PayloadRequest) => {
    try {
        // Get collection configuration
        const collectionConfig = req.payload.config.collections.find(
            (c) => c.slug === 'csv-uploads'
        );

        if (!collectionConfig?.upload) {
            throw new Error('CSV Uploads collection not configured for uploads');
        }

        // Resolve the full file path - this is the key fix
        const uploadDir = collectionConfig.upload.staticDir || './csv-uploads';
        const filePath = path.resolve(process.cwd(), uploadDir, doc.filename);

        // Debug log to verify path
        console.log(`[parseCSV] Attempting to read file at: ${filePath}`);
        console.log(`[parseCSV] Current working directory: ${process.cwd()}`);

        // Verify file exists before reading
        if (!fs.existsSync(filePath)) {
            throw new Error(
                `File not found: ${filePath}\n` +
                `Check that 'staticDir' in collection config matches your actual folder: ./csv-uploads`
            );
        }

        const delimiter = doc.delimiter || ',';
        const headers: string[] = [];
        const rows: any[] = [];

        // Parse CSV
        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(parse({ delimiter }))
                .on('headers', (csvHeaders: string[]) => {
                    headers.push(...csvHeaders);
                })
                .on('data', (data: any) => {
                    rows.push(data);
                })
                .on('end', () => {
                    console.log(`[parseCSV] Successfully parsed ${rows.length} rows`);
                    resolve();
                })
                .on('error', (error: Error) => {
                    reject(error);
                });
        });

        // Create CSV data entry
        await req.payload.create({
            collection: 'csv-data',
            data: {
                sourceFile: doc.id,
                headers: headers.map(h => ({ headerName: h })),
                rows: rows.map(row => ({
                    values: Object.values(row).map((v: any) => ({ value: String(v) }))
                })),
            },
        });

    } catch (error) {
        console.error(`[parseCSV] Error parsing ${doc.filename}:`, error);

        // Optional: Create error log entry
        // await req.payload.create({
        //   collection: 'error-logs',
        //   data: {
        //     message: `CSV parsing failed: ${error.message}`,
        //     sourceFile: doc.id,
        //     timestamp: new Date().toISOString(),
        //   },
        // }).catch(() => {});
    }
};

const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
    if (operation === 'create') {
        await parseCSV(doc, req);
    }
}
export const CSVUploads: CollectionConfig = {
    slug: 'csv-uploads',
    upload: {
        mimeTypes: ['text/csv'],
    },
    fields: [
        {
            name: 'filename',
            type: 'text',
            required: true,
        },
        {
            name: 'delimiter',
            type: 'select',
            options: [
                { label: 'Comma ( , )', value: ',' },
                { label: 'Semicolon ( ; )', value: ';' },
                { label: 'Tab ( \t )', value: '\t' },
            ],
            defaultValue: ',',
        },
    ],
    hooks: {
        afterChange: [
            afterChangeHook,
        ],
    },
};