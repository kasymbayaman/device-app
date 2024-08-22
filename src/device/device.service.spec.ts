import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from './device.service';
import { BrandService } from '../brand/brand.service';

describe('DeviceService', () => {
  let service: DeviceService;

  const repositoryMock = {
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOneBy: jest.fn(),
    find: jest.fn(),
  };
  const brandServiceMock = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: 'DeviceEntityRepository',
          useValue: repositoryMock,
        },
        {
          provide: BrandService,
          useValue: brandServiceMock,
        }
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

  it('should find many devices by name', async () => {
    repositoryMock.find.mockResolvedValue([
      {
        id: 'device-id-1',
        name: 'Test Device 1',
        brand: {
          id: 'brand-id',
          name: 'Test Brand',
        },
      },
    ]);

    const devices = await service.findMany({
      name: 'Test Device 1',
      limit: 10,
      offset: 20,
    });

    expect(brandServiceMock.findOne).toHaveBeenCalledTimes(0);
    expect(devices).toHaveLength(1);
    expect(devices[0].name).toBe('Test Device 1');
    expect(repositoryMock.find).toHaveBeenCalledWith({
      where: {
        name: 'Test Device 1',
      },
      take: 10,
      skip: 20,
    });
  });

  it('should find many devices by brand name', async () => {
    repositoryMock.find.mockResolvedValue([
      {
        id: 'device-id-1',
        name: 'Test Device 1',
        brand: {
          id: 'brand-id',
          name: 'Test Brand',
        },
      },
      {
        id: 'device-id-2',
        name: 'Test Device 2',
        brand: {
          id: 'brand-id',
          name: 'Test Brand',
        },
      },
    ]);
    brandServiceMock.findOne.mockResolvedValue({
      id: 'brand-id',
      name: 'Test Brand',
    });

    const devices = await service.findMany({
      brandName: 'Test Brand',
      limit: 10,
      offset: 20,
    });

    expect(brandServiceMock.findOne).toHaveBeenCalledWith({
      name: 'Test Brand',
    });
    expect(devices).toHaveLength(2);
    expect(devices[0].name).toBe('Test Device 1');
    expect(devices[1].name).toBe('Test Device 2');
    expect(repositoryMock.find).toHaveBeenCalledWith({
      where: {
        brandId: 'brand-id',
      },
      take: 10,
      skip: 20,
    });
  });
});
