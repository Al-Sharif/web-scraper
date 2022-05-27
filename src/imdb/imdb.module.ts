import { Module } from '@nestjs/common';
import { ImdbService } from './imdb.service';
import { ImdbController } from './imdb.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
  controllers: [ImdbController],
  providers: [ImdbService]
})
export class ImdbModule {}
