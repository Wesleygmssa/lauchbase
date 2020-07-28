const db = require('../../config/db');

module.exports = {
  all() {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes 
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY recipes.created_at DESC
    `);
  },

  chefsSelectOptions() {
    return db.query('SELECT name, id FROM chefs');
  },

  create(data) {
    const query = `
      INSERT INTO recipes (
        chef_id,
        title,
        ingredients,
        preparation,
        information
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const values = [
      data.chef,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
    ];

    return db.query(query, values);
  },

  find(id) {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id) 
      WHERE recipes.id = $1
      GROUP BY recipes.id, chefs.name
    `, [id]);
  },

  findBy(filter) {
    return db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.title ILIKE '%${filter}%'
    `);
  },

  update(data) {
    const query = `
      UPDATE recipes SET
        chef_id=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5),
      WHERE id = $6
    `;

    const values = [
      data.chef,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.id
    ];

    return db.query(query, values);
  },

  delete(id) {
    return db.query('DELETE FROM recipes WHERE id = $1', [id]);
  },

  paginate(params) {
    const { filter, limit, offset } = params;

    let query = '',
        filterQuery = '',
        totalQuery = `( SELECT count(*) FROM recipes ) AS total`;

    if (filter) {
      filterQuery = ` ${query} WHERE recipes.title ILIKE '%${filter}%'`;
      totalQuery = `( SELECT count(*) FROM recipes ${filterQuery} ) AS total`;
    }

    query = `
      SELECT recipes.*, ${totalQuery}, name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ${filterQuery}
      ORDER BY updated_at DESC
      LIMIT $1 OFFSET $2
    `;

    return db.query(query, [limit, offset]);
  },

  files(id) {
    return db.query(`
      SELECT * FROM files
      LEFT JOIN recipe_files ON (recipe_files.file_id = files.id)
      LEFT JOIN recipes ON (recipes.id = recipe_files.recipe_id)
      WHERE recipe_files.file_id = files.id
      AND recipe_files.recipe_id = $1
    `, [id]);
  }
}