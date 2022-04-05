import { CnabService } from './cnab.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StoreTransactions } from './store-transactions.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('cnab')
export class CnabController {
  constructor(private cnabService: CnabService) {}

  @ApiTags('CNAB')
  @Get()
  async getTransactions() {
    return await this.cnabService.findAll();
  }

  @ApiTags('CNAB')
  @ApiBody({ type: [StoreTransactions] })
  @Post()
  async createTransactions(@Body() body: StoreTransactions[]) {
    return await this.cnabService.createMany(body);
  }

  @ApiTags('CNAB')
  @Delete('delete/:id')
  async deleteTransaction(@Param('id') id) {
    return await this.cnabService.delete(id);
  }

  @ApiTags('CNAB')
  @Delete('clear')
  async clearTransactions() {
    return await this.cnabService.clear();
  }
}
