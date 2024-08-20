import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class Smile extends Model {
    static table = 'smiles';

    @field('name') name!: string;
    @field('image') image!: string;
    @field('hunger') hunger!: number;
    @field('sleep') sleep!: number;
    @field('happy') happy!: number;
}
