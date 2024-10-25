import { Module } from '@nestjs/common';
import { TestsService } from './tests.service';
import { testsProviders } from './providers/tests.providers';
import { TestsController } from './tests.controller';

@Module({
  controllers: [TestsController],
  providers: [TestsService, ...testsProviders],
})
export class TestsModule { }
