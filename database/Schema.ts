
import { appSchema, tableSchema } from '@nozbe/watermelondb/Schema';

export const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'smiles',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'hunger', type: 'number' },
                { name: 'sleep', type: 'number' },
                { name: 'happy', type: 'number' },
                { name: 'image', type: 'string' },
            ],
        }),
    ],
});
