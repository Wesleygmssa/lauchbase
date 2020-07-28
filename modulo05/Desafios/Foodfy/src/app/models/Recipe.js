const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `
      INSERT INTO recipes (
        image,
        title,
        ingredients,
        preparation,
        information,
        chef_id
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows[0]);
    });
  },

  find(id, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id) 
      WHERE recipes.id = $1
      GROUP BY recipes.id, chefs.name`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows[0]);
    });
  },

  findBy(filter, callback) {
    db.query(`
      SELECT recipes.*, chefs.name AS chef_name 
      FROM recipes
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.title ILIKE '%${filter}%'`, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows);
    });
  },

  update(data, callback) {
    const query = `
      UPDATE recipes SET
        image=($1),
        title=($2),
        ingredients=($3),
        preparation=($4),
        information=($5),
        chef_id=($6)
      WHERE id = $7
    `;

    const values = [
      data.image,
      data.title,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef,
      data.id
    ];

    db.query(query, values, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback();
    });
  },

  chefsSelectOptions(callback) {
    db.query(`SELECT name, id FROM chefs`, (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows);
    });
  },

  paginate(params) {
    const { filter, limit, offset, callback } = params;

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
      ORDER BY created_at
      LIMIT $1 OFFSET $2
    `;

    db.query(query, [limit, offset], (err, results) => {
      if (err) throw `Database Error! ${err}`;
      callback(results.rows);
    });
  }
}