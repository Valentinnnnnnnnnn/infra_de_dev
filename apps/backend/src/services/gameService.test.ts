import { describe, it, expect } from 'vitest';
import { yourFunction } from './gameService';

describe('Game Service', () => {
	it('should return expected result', () => {
		const result = yourFunction();
		expect(result).toBe('expected result');
	});
});