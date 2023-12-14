import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AlternativeService } from './alternative.service';
import { Alternative } from './alternative.entity';

@Controller('alternative')
export class AlternativeController {
  constructor(private readonly alternativeService: AlternativeService) {}

  // Fetch all Alternatives for a given position
  // POST /alternative/all
  @Post('all')
  async findAll(@Body('position') position: string): Promise<any> {
    try {
      const alternatives = await this.alternativeService.findAll(position);
      return {
        statusCode: HttpStatus.OK,
        message: 'Alternatives fetched successfully',
        data: alternatives,
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: e.message,
      };
    }
  }

  // Remove an Alternative by id
  // POST /alternative/remove
  @Post('remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeById(@Body('id') id: string): Promise<any> {
    try {
      await this.alternativeService.removeById(id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Alternative removed successfully',
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: e.message,
      };
    }
  }

  @Post('remove')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeByPosition(@Body('position') position: string): Promise<any> {
    try {
      await this.alternativeService.removeByPosition(position);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'Alternatives removed successfully',
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: e.message,
      };
    }
  }

  // Create a new Alternative
  // POST /alternatives
  @Post()
  async create(@Body() alternative: Alternative): Promise<any> {
    try {
      const newAlternative = await this.alternativeService.create(alternative);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Alternative created successfully',
        data: newAlternative,
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }
}
