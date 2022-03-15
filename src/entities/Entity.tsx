import * as THREE from 'three';
import { MATERIAL_LINES, MATERIAL_PERSONS } from '../constants/materials';
import { Game } from '../Game';
import { EntityI, GeometryI, JobI, TileI } from '../types';
const noop = () => {};

export class Entity implements EntityI {
	public readonly id: string;

	public location: TileI;

	/**
	 * The set of behaviour/tasks given to this entity.
	 */
	public job?: JobI;

	constructor(id: string, location: TileI) {
		this.id = id;
		this.location = location;
	}

	public get label(): string {
		return `${this.constructor.name} ${this.id}`;
	}
	public get title(): string {
		return 'Not doing anything';
	}

	toString() {
		return this.label;
	}

	public play(game: Game) {
		return this.job?.start(game) || noop;
	}

	public doJob(job: JobI) {
		this.job = job;

		// @TODO maybe some events
	}
	public destroy() {
		this.job?.destroy();
	}

	protected createGeometries(): GeometryI | GeometryI[] {
		throw new Error('Not implemented');
	}

	public createObject(material = MATERIAL_PERSONS) {
		const _geometries = this.createGeometries(),
			geometries = Array.isArray(_geometries) ? _geometries : [_geometries];

		const group = new THREE.Group();
		geometries.forEach(geo => {
			const mesh = new THREE.Mesh(geo, material);
			mesh.userData.entity = this;
			group.add(mesh);
			const edges = new THREE.EdgesGeometry(geo);
			const line = new THREE.LineSegments(edges, MATERIAL_LINES);
			group.add(line);
		});

		return group;
	}
}
