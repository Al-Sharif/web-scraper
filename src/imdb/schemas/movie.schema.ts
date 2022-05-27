import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
    @Prop({ isRequired: true, unique: true })
    identifier: string;

    @Prop({ isRequired: true })
    title: string;

    @Prop()
    ageRating: string;

    @Prop()
    duration: number;

    @Prop([String])
    genres: String[];

    @Prop()
    rating: number;
    
    @Prop()
    poster:string;

    @Prop()
    storyline: string;

    @Prop()
    trailerId: string;

    @Prop([String])
    cast: string[];

    @Prop()
    releaseDate: Date;

    @Prop({default: new Date()})
    createdAt:Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);