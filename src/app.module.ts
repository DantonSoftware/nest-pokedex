import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationSchema } from './config/jooi.validation';
import * as dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB,{
      dbName: 'pokemonsdb'  
    }),
    PokemonModule,
    CommonModule,
    SeedModule 
  ],

})
export class AppModule {
  constructor(private readonly configService: ConfigService) {
    console.log('MONGODB desde ConfigService:', this.configService.get('MONGODB'));
    console.log('PORT desde ConfigService:', this.configService.get('PORT'));
  }
}
