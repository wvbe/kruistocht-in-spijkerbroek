import { describe, run, expect, it } from 'https://deno.land/x/tincan@1.0.1/mod.ts';

import createGeneratorDemo from './generator.ts';
import {
	FactoryBuildingEntity,
	PersonEntity,
	PERSON_NEEDS,
	SettlementEntity,
	TestDriver,
} from '@lib';

describe('Default generator', () => {
	const { game } = createGeneratorDemo(new TestDriver());
	// game.time.steps(1_050_000);

	// it('The game never finishes', () => {
	// 	expect(game.time.getNextEventAbsoluteTime()).toBeTruthy();
	// 	expect(game.time.getNextEventAbsoluteTime()).not.toBe(Infinity);
	// });

	it('Has several entities of various types', () => {
		expect(game.entities.filter((e) => e instanceof PersonEntity).length).toBeGreaterThanOrEqual(
			12,
		);
		expect(
			game.entities.filter((e) => e instanceof SettlementEntity).length,
		).toBeGreaterThanOrEqual(3);
		expect(
			game.entities.filter((e) => e instanceof FactoryBuildingEntity).length,
		).toBeGreaterThanOrEqual(6);
	});

	// game.stop();
});

run();
