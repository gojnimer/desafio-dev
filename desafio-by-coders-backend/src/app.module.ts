import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health/health.controller';
import { CnabController } from './cnab/cnab.controller';
import { CnabService } from './cnab/cnab.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TerminusModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        // entities: ['src/**/*.entity{.ts,.js}'], << config for serverless deploy
        entities: ['dist/**/*.entity{.ts,.js}'],
        ssl: { rejectUnauthorized: true },
        synchronize: false,
        migrations: ['src/migration/**/*.js'],
        migrationsRun: true,
        cli: {
          entitiesDir: 'src/app/models',
          migrationsDir: 'src/migration',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [HealthController, CnabController],
  providers: [CnabService],
})
export class AppModule {}
