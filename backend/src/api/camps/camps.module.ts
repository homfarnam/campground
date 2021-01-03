import { Module } from '@nestjs/common';
import { CampsController } from './camps.controller';
import { CampsService } from './camps.service';

@Module({
  controllers: [CampsController],
  providers: [CampsService],
})
export class CampsModule {}
