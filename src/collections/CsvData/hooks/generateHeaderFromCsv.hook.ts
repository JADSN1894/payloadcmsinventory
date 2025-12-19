import { CsvDatum } from '@/payload-types'
import { FieldHook } from 'payload'
import { slugify } from 'payload/shared'
import fs from 'fs';

export const generateHeaderFromCsvHook: FieldHook<CsvDatum, string> = ({ value, data }) => {
    console.log(value, data)

    let filename = data?.filename!;

    if (!fs.existsSync(filename)) {
        console.error(`[generateHeaderFromCsvHook] File not found: ${filename}`);
        return ''; // Continue without parsing
    }

    return 'Alice';
}