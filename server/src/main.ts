import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors({
    origin: [
      'http://127.0.0.1:3000',
      /^http:\/\/127\.0\.0\.1:3000/,
      '*',
      'any',
      'http://127.0.0.0:3001',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      'http://localhost:3004',
      'http://localhost:3005',
      'http://localhost:3006',
      'http://localhost:3007',
      'http://localhost:3008',
      'http://localhost:3009',
      'http://localhost:3010',
      'http://localhost:3011',
      'http://localhost:3012',
      'http://localhost:3013',
      'http://localhost:3014',
      'http://localhost:3015',
      'http://localhost:3016',
      'http://localhost:3017',
      'http://localhost:3018',
      'http://localhost:3019',
      'http://localhost:3020',
      'http://localhost:3021',
      'http://localhost:3022',
      'http://localhost:3023',
      'http://localhost:3024',
      'http://localhost:3025',
      'http://localhost:3026',
      'http://localhost:3027',
      'http://localhost:3028',
      'http://localhost:3029',
      'http://localhost:3030',
      'http://localhost:3031',
      'http://localhost:3032',
      'http://localhost:3033',
      'http://localhost:3034',
      'http://localhost:3035',
      'http://localhost:3036',
      'http://localhost:3037',
      'http://localhost:3038',
      'http://localhost:3039',
      'http://localhost:3040',
      'http://localhost:3041',
      'http://localhost:3042',
      'http://localhost:3043',
      'http://localhost:3044',
      'http://localhost:3045',
      'http://localhost:3046',
      'http://localhost:3047',
      'http://localhost:3048',
      'http://localhost:3049',
      'http://localhost:3050',
      'http://localhost:3051',
      'http://localhost:3052',
      'http://localhost:3053',
      'http://localhost:3054',
      'http://localhost:3055',
      'http://localhost:3056',
      'http://localhost:3057',
      'http://localhost:3058',
      'http://127.0.0.1:3000',
      'https://127.0.0.1:3060',
      'https://localhost:3000',
      'http://localhost',
      'localhost',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  console.log('🚀 😁 Running in port ' + PORT);
  await app.listen(PORT);
}
bootstrap();
