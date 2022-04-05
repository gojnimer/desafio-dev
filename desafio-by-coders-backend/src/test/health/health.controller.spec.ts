import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../../health/health.controller';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

describe('HealthController', () => {
  let controller: HealthController;
  let dbCheck: TypeOrmHealthIndicator;
  let healthCheck: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: TypeOrmHealthIndicator,
          useValue: {
            pingCheck: jest.fn(),
          },
        },
        {
          provide: HealthCheckService,
          useValue: {
            check: jest
              .fn()
              .mockImplementation((fn: (() => void)[]) =>
                fn.forEach((run) => run()),
              ),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    dbCheck = module.get<TypeOrmHealthIndicator>(TypeOrmHealthIndicator);
    healthCheck = module.get<HealthCheckService>(HealthCheckService);
  });

  it('Should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return app health info', () => {
    controller.check();
    expect(healthCheck.check).toBeCalled();
    expect(dbCheck.pingCheck).toBeCalled();
  });
});
