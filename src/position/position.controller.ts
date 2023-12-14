import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PositionService } from './position.service';
import { Position } from './position.entity';

@Controller('position')
export class PositionController {
  constructor(private readonly userPositionService: PositionService) {}

  // Fetch all Positions based on wallet address
  @Post('all')
  async getAll(@Body('walletAddress') walletAddress: string): Promise<any> {
    try {
      const positions = await this.userPositionService.findAll(walletAddress);
      return {
        statusCode: HttpStatus.OK,
        message: 'User Positions retrieved successfully',
        data: positions,
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: e.message,
      };
    }
  }

  // Remove Positions based on wallet address
  @Post('remove')
  @HttpCode(204)
  async remove(@Body('walletAddress') walletAddress: string): Promise<any> {
    try {
      await this.userPositionService.remove(walletAddress);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'User Positions removed successfully',
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: e.message,
      };
    }
  }

  // Create new Position
  @Post()
  async create(@Body() userPosition: Position): Promise<any> {
    try {
      const newPosition = await this.userPositionService.create(userPosition);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User Position created successfully',
        data: newPosition,
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
      };
    }
  }
}
