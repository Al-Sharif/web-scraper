import { Controller, Get, Param } from '@nestjs/common';
import { ImdbService } from './imdb.service';

@Controller('imdb')
export class ImdbController {
  constructor(private readonly imdbService: ImdbService) { }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    console.log(id);
    return await this.imdbService.searchMovies(id);
  }
}
