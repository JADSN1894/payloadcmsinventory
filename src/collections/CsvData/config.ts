// collections/CSVData.ts
import { CollectionConfig } from 'payload';
import { parseCSVBeforeValidate } from './hooks/parseCSVBeforeValidate.hook';
import { generateHeaderFromCsvHook } from './hooks/generateHeaderFromCsv.hook';

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
            fields: [{ name: 'data', type: 'text', required: true }],
            // hooks: { beforeValidate: [generateHeaderFromCsvHook] },
        },
        {
            name: 'rows',
            type: 'array',
            fields: [{
                name: 'data',
                type: 'array',
                fields: [{ name: 'data', type: 'text' }],
            }],
        },
    ],
    hooks: {
        beforeValidate: [
            async ({ data, req, operation }) => {
                // console.log("[HOOK]: beforeValidate() ");
                // console.log(data)
                // console.log(req)
                // console.log(operation)
                // Only parse on create with uploaded file
                if (operation === 'create' && data?.filename) {
                    return await parseCSVBeforeValidate(data, req);
                }
                return data;
            },
        ],
    },
};