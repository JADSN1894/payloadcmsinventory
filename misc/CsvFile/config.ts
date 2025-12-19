import type { CollectionConfig, CollectionAfterChangeHook } from 'payload'

import fs from 'fs';
import path from 'path';
import { parse } from "csv-parse";
import { readCSV } from './helpers/csv';

const afterChangeHook: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  // Check if a file was part of the request and the operation was create or update
  if (req.file && (operation === 'create' || operation === 'update')) {
    // Access the uploaded file details
    console.log('File uploaded:', req.file.name);
    console.log('Document ID:', doc.id);

    console.log(doc);

    const headers = req.file.data.length > 0 ? Object.keys(req.file.data[0]).map(key => ({ value: key })) : [];
    const rows = req.file.data.map(record => ({ values: Object.values(record).map(value => ({ value: value as string })) }));

    console.log(headers);

    // You can perform custom logic here, such as:
    // 1. Converting the file to other formats (e.g., WebP)
    // 2. Uploading the file to an external service (e.g., S3, FTP)
    // 3. Updating other fields in the current document using the Local API

    // Example of using the Local API within the same transaction (pass req to local calls)
    // The maintainers recommend passing the `req` object for in-transaction updates.

    try {
      await req.payload.update({
        collection: 'csv-files',
        id: doc.id,
        data: {
          headers,
          rows
          // updated data fields
        },
        req, // Pass the request object to stay within the same transaction
      });
    } catch (error) {
      console.error('Error updating document after file change:', error);
    }

  }

  return doc;
}

export const CsvFiles: CollectionConfig = {
  slug: 'csv-files',
  admin: {
    useAsTitle: 'name',
  },
  upload: {
    mimeTypes: ["text/csv"]
  },
  hooks: {
    afterChange: [afterChangeHook]
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'delimiter',
      type: 'text',
      required: true,
      defaultValue: ',',
    },
    {
      name: 'headers',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
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



