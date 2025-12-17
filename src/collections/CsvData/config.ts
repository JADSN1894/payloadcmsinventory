// collections/CSVData.ts
import { CollectionConfig, Field } from 'payload';

export const CSVData: CollectionConfig = {
    slug: 'csv-data',
    fields: [
        // {
        //     name: 'sourceFile',
        //     type: 'relationship',
        //     // relationTo: 'csv-uploads',
        //     // hasMany: false,
        //     required: true,
        // },
        {
            name: 'sourceFile',
            type: 'relationship',
            relationTo: 'csv-uploads',
            hasMany: false,
            required: true,
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
};