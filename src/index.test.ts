import { sum } from './index';

describe('Application Tests', () => {
    it('should return the sum of two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
});