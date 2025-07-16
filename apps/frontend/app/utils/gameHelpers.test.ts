import { describe, it, expect } from 'vitest';

describe('Game Helpers', () => {
	it('should return the correct score', () => {
		const score = calculateScore(10, 5);
		expect(score).toBe(15);
	});

	it('should reset the game state', () => {
		const state = resetGame();
		expect(state).toEqual(initialState);
	});
});