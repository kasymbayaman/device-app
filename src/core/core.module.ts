import { Global, Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config';

const providers = [
  {
    provide: AsyncLocalStorage,
    useValue: new AsyncLocalStorage(),
  },
];

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
  ],
  providers,
  exports: providers,
})
export class CoreModule {}
