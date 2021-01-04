import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
	return knex.schema
		.withSchema('public')
		.createTable('users', table => {
			table.increments().primary()
			table.string('name', 100)
			table.string('avata')
			table.string('username', 35).notNullable()
			table.string('email').notNullable()
			table.string('password').notNullable()
		})
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropSchemaIfExists('users')
}

