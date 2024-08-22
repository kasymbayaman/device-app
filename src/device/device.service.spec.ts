import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { DeviceRepository } from './device.repository';

describe('DeviceService', () => {
  let service: DeviceService;

  const repositoryMock = {
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        // deviceRepositoryProvider,
        {
          provide: 'DeviceEntityRepository',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a device', async () => {
    repositoryMock.save.mockResolvedValue({
      id: 'device-id',
    });
    repositoryMock.findOneBy.mockResolvedValue({
      id: 'device-id',
      name: 'Test Device',
      brand: {
        id: 'brand-id',
      },
    });

    const device = await service.create({
      name: 'Test Device',
      brandId: 'brand-id',
    });

    expect(device.name).toBe('Test Device');
    expect(device.brand.id).toBe('brand-id');
    expect(repositoryMock.save).toHaveBeenCalledWith({
      name: 'Test Device',
      brandId: 'brand-id',
    });
  });

  it('should update a device', async () => {
    repositoryMock.update.mockResolvedValue(true);
    repositoryMock.findOneBy.mockResolvedValue({
      id: 'device-id',
      name: 'Updated Device',
      brand: {
        id: 'brand-id',
      },
    });

    const device = await service.updateOne('device-id', {
      name: 'Updated Device',
    });

    expect(device.name).toBe('Updated Device');
    expect(repositoryMock.update).toHaveBeenCalledTimes(1);
  });

  it('should not update a device when empty payload provided', async () => {
    repositoryMock.update.mockResolvedValue(true);
    repositoryMock.findOneBy.mockResolvedValue({
      id: 'device-id',
      name: 'Test Device',
      brand: {
        id: 'brand-id',
      },
    });

    const device = await service.updateOne('device-id', {});

    expect(device.name).toBe('Test Device');
    expect(repositoryMock.update).toHaveBeenCalledTimes(0);
  });

  it('should delete a device', async () => {
    repositoryMock.delete.mockResolvedValue(true);

    await service.deleteOne('device-id');

    expect(repositoryMock.delete).toHaveBeenCalledWith('device-id');
  });
});
