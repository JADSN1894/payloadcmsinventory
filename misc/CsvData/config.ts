import { AfterOperationHook } from 'node_modules/payload/dist/collections/config/types';
import { CollectionAfterChangeHook, CollectionBeforeOperationHook, CollectionConfig, PayloadRequest } from 'payload';
import fs from 'fs';
import { parse } from "csv-parse";
import path from 'path';

const parseCSV = async (doc: any, req: PayloadRequest) => {
    try {

        if (!doc?.id) throw new Error('Document ID is missing');
        if (!doc.filename) throw new Error('Filename is missing');

        const collectionConfig = req.payload.config.collections.find(
            (c) => c.slug === 'csv-data'
        );

        if (!collectionConfig?.upload) {
            throw new Error('Collection not configured for uploads');
        }

        // Resolve correct file path
        const uploadDir = collectionConfig.upload.staticDir || './csv-uploads';
        const filePath = path.resolve(process.cwd(), uploadDir, doc.filename);


        // ✅ Verify file exists with detailed error
        if (!fs.existsSync(filePath)) {
            throw new Error(
                `File not found: ${filePath}\n` +
                `Working dir: ${process.cwd()}\n` +
                `Upload dir: ${uploadDir}\n` +
                `Filename: ${doc.filename}`
            );
        }

        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        const delimiter: string = doc.delimiter || ',';
        let headers: string[] = [];
        let rows: any[] = [];

        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(filePath, 'utf8')
                .pipe(parse({ delimiter }))
                .on('headers', (headers) => {
                    console.log(`[parseCSV] Raw headers:`, headers); // Debug
                })
                .on('data', (data: any) => {
                    if (headers.length === 0) {
                        headers = data; // First row is headers
                    } else {
                        rows.push(data);
                    }
                })
                .on('end', () => {
                    console.log(`[parseCSV] Successfully parsed ${rows.length} rows`);
                    resolve();
                })
                .on('error', (error: Error) => {
                    reject(error);
                });
        });

        if (headers.length === 0 || rows.length === 0) {
            throw new Error('CSV parsing failed: no data extracted. Check delimiter and file format.');
        }

        console.log("HEADERS", headers);
        console.log("ROWS", rows);

        console.log(req);
        console.log(doc);

        // ✅ Update with direct database access to bypass caching issues
        // const db = req.payload.db;

        await req.payload.update({
            collection: 'csv-data',
            where: { id: { equals: doc.id } },
            data: {
                headers: headers.map(headerName => ({ headerName })),
                rows: rows.map(row => ({
                    values: row.map((v: any) => ({ value: String(v) }))
                })),
            },
        });

        console.log(`[parseCSV] Success: ${doc.filename} (${headers.length} headers, ${rows.length} rows)`);

    } catch (error) {
        console.error(`[parseCSV] ❌ Error parsing ${doc.filename}:`, error);
    }
}

const afterOperationHook: AfterOperationHook = async ({
    result,
    operation,
    req,

}) => {
    // Only parse on initial creation
    if (operation === 'create') {
        await parseCSV(result, req);
    }
}

export const CSVData: CollectionConfig = {
    slug: 'csv-data',
    upload: {
        mimeTypes: ['text/csv'],
        staticDir: './csv-uploads',
    },
    fields: [
        {
            name: 'delimiter',
            type: 'select',
            options: [
                { label: 'Comma ( , )', value: ',' },
                { label: 'Semicolon ( ; )', value: ';' },
                { label: 'Tab ( \t )', value: '\t' },
            ],
            defaultValue: ';',
        },
        {
            name: 'headers',
            type: 'array',
            fields: [
                {
                    name: 'headerName',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'rows',
            type: 'array',
            fields: [
                {
                    name: 'values',
                    type: 'array',
                    fields: [
                        {
                            name: 'value',
                            type: 'text',
                        },
                    ],
                },
            ],
        },
    ],
    hooks: {
        afterOperation: [
            afterOperationHook
        ],

        // afterChange: [
        //     async ({ doc, req, operation }) => {
        //         // ✅ Prevents infinite loop: Only parse on create when not already parsed
        //         if (operation === 'create' && doc.filename && !doc.isParsed) {

        //             // Mark as parsed first
        //             await req.payload.update({
        //                 collection: 'csv-data',
        //                 id: doc.id,
        //                 data: { isParsed: true },
        //             });

        //             // Then parse CSV
        //             await parseCSV(doc, req);
        //         }
        //     },
        // ],
    },
};