import { Module } from '@nestjs/common';
import { MongoModule } from '../../common/mongo';
import { UtilsModule } from '../../common/utils';
import { CampsController } from './camps.controller';
import { CampsService } from './camps.service';

@Module({
  imports: [MongoModule, UtilsModule],
  controllers: [CampsController],
  providers: [CampsService],
})
export class CampsModule {}
