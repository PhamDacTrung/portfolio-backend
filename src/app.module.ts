import { configurations, DatabaseConfig, LogConfig } from '@config';
import {
  AchievementModule,
  AuthModule,
  ContactModule,
  PortfolioModule,
  ProjectModule,
  ProjectSkillModule,
  UserModule,
  UserSkillModule,
} from '@modules';
import { SwaggerDocsModule } from '@modules/swagger-docs/swagger-docs.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { validateConfig } from './config/config-validation';

const modules = [
  AuthModule,
  UserModule,
  PortfolioModule,
  ContactModule,
  AchievementModule,
  UserSkillModule,
  ProjectSkillModule,
  ProjectModule,
  SwaggerDocsModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: configurations,
      cache: true,
      validate: validateConfig,
    }),

    WinstonModule.forRootAsync({
      inject: [LogConfig.KEY],
      useFactory: (config: ConfigType<typeof LogConfig>) => {
        return config as WinstonModuleOptions;
      },
    }),

    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfig.KEY],
      useFactory: (config: ConfigType<typeof DatabaseConfig>) => {
        if (!config) {
          throw new Error('Cannot start app without ORM config');
        }
        return config as TypeOrmModuleOptions;
      },

      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    ...modules,
  ],
  providers: [],
})
export class AppModule {}
