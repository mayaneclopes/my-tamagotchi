import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './Schema';
import Smile from './Model';

const adapter = new SQLiteAdapter({
    schema: mySchema,
});

export const database = new Database({
    adapter,
    modelClasses: [Smile],
});
