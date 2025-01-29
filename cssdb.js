import initSqlJs from "./sql-asm.js";
import font from "./font.js";

class CssDatabase {
  constructor() {
    initSqlJs().then((SQL) => {
      const db = new SQL.Database();

      db.run(
        "CREATE TABLE colors (name, color); INSERT INTO colors VALUES ('Red', 'red'); INSERT INTO colors VALUES ('Blue', 'blue');"
      );

      this.db = db;
    });
  }
  static get inputProperties() {
    return ["--sql-db"];
  }

  async paint(ctx, size, properties) {
    const sql = properties.get("--sql-db");

    const result = await this.db.exec(sql + ";");

    const canvas = font.getPath(
      `Execute query >> ${JSON.stringify(result)}`,
      0,
      100,
      20
    );
    canvas.fill = "white";
    canvas.draw(ctx);
  }
}

registerPaint("cssdb", CssDatabase);
