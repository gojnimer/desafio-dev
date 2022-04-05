/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('App module cover', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module).toBeDefined();
  });
});
