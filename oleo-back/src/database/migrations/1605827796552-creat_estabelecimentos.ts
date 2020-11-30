import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class creatEstabelecimentos1605827796552 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'estabelecimentos',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'telefone',
					type: 'varchar'
				},
				{
					name: 'latitude',
					type: 'decimal',
					scale: 10,
					precision: 2
				},
				{
					name: 'longitude',
					type: 'decimal',
					scale: 10,
					precision: 2
				},
				{
					name: 'about',
					type: 'text'
				},
				{
					name: 'instructions',
					type: 'text'
				},
				{
					name: 'opening_hours',
					type: 'varchar'
				},
				{
					name: 'zap',
					type: 'boolean',
					default: false
				},
				{
					name: 'open_on_weekends',
					type: 'boolean',
					default: false
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('estabelecimentos')
	}
}
