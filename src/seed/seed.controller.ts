import { Controller, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';
import { RateLimit } from 'src/common/guards/rate-limit.guard';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Public()
  @RateLimit(5, 60_000)
  @Get()
  @ApiOperation({ summary: 'Ejecuta el seeder idempotente para poblar el Nuevo Test y sus preguntas de sueño' })
  runSeedGet() {
    return this.seedService.runSeed();
  }

  @Public()
  @RateLimit(5, 60_000)
  @Post()
  @ApiOperation({ summary: 'Ejecuta el seeder idempotente para poblar el Nuevo Test y sus preguntas de sueño' })
  runSeedPost() {
    return this.seedService.runSeed();
  }
}
