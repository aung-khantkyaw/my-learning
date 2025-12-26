import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of cats', () => {
    expect(controller.findAll()).toBe('This action returns all cats');
  });

  it("should return a list of cats' breed", () => {
    expect(controller.findBreeds()).toBe(
      "This action returns all cats' breeds",
    );
  });

  it('should create a new cat', () => {
    expect(controller.create()).toBe('This action adds a new cat');
  });

  it('should handle wildcard routes', () => {
    expect(controller.findWildcard()).toBe(
      'This action handles wildcard routes',
    );
  });

  it('should return a 404 status code', () => {
    expect(controller.getHttpStatus()).toBe(
      'This action returns a 404 status code',
    );
  });

  it('should handle Cache Control as no-store with response header', () => {
    expect(controller.getResponseHeader()).toBe(
      'This action handles Cache Control as no-store with response header',
    );
  });

  it('should redirect to NestJS website', () => {
    const redirectResult = controller.getDocs(undefined);
    expect(redirectResult).toEqual({ url: 'https://nestjs.com' });

    const redirectResultV5 = controller.getDocs('5');
    expect(redirectResultV5).toEqual({ url: 'https://docs.nestjs.com/v5/' });
  });

  it('should return a cat by id', () => {
    const catId = '123';
    expect(controller.findOne(catId)).toBe(
      `This action returns a #${catId} cat`,
    );
  });

  it('should return an empty array asynchronously', async () => {
    const result = await controller.asynchronous();
    expect(result).toEqual([]);
  });

  it('should return an empty array as an observable stream', (done) => {
    const observable = controller.observableStreams();
    observable.subscribe((result) => {
      expect(result).toEqual([]);
      done();
    });
  });

  it('should add a new cat with request payloads', () => {
    const createCatDto = { name: 'Whiskers', age: 3, breed: 'Siamese' };
    expect(controller.requestPayloads(createCatDto)).toBe(
      `This action adds a new cat by ${JSON.stringify(createCatDto)}`,
    );
  });

  it('should return cats filtered by query parameters', () => {
    const age = 2;
    const breed = 'Persian';
    expect(controller.queryParameter(age, breed)).toBe(
      `This action returns all cats filtered by age: ${age} and breed: ${breed}`,
    );
  });
});
