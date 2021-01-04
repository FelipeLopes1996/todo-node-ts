import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
	return knex.schema
		.withSchema('public')
		.createTable('roles', function (table) {
			table.increments().primary()
			table.string('name', 100).notNullable()
		})

}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('roles')
}

