import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Smile extends Model {
    static table = 'smiles';

    @field('name') name!: string;
    @field('hunger') hunger!: number;
    @field('sleep') sleep!: number;
    @field('happy') happy!: number;
    @field('image') image!: string;
};
