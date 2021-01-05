import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Camp, CampSchema } from 'src/common/mongo';
import { CampsController } from './camps.controller';
import { CampsService } from './camps.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Camp.name,
        schema: CampSchema,
      },
    ]),
  ],
  controllers: [CampsController],
  providers: [CampsService],
})
export class CampsModule {}
