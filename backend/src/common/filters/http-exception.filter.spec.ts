import { HttpExceptionFilter } from './http-exception.filter';

describe('CatchAllFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
});
