import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { Protocol } from './protocol.entity';

@Controller('protocols')
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) {}

  // Fetch all protocols
  // POST /protocols/all
  @Post('all')
  async findAll(): Promise<any> {
    try {
      const protocols = await this.protocolService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Protocols fetched successfully',
        data: protocols,
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: e.message,
      };
    }
  }

  // Update a protocol by id
  // POST /protocols/update
  @Post('update')
  async update(
    @Body('id') id: number,
    @Body() updateProtocolDto: Protocol,
  ): Promise<any> {
    try {
      const updatedProtocol = await this.protocolService.update(
        id,
        updateProtocolDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Protocol updated successfully',
        data: updatedProtocol,
      };
    } catch (e) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: e.message,
      };
    }
  }
}
