import * as Sequelize from "sequelize";

class SequelizeQueryGenerator {
  static instance: SequelizeQueryGenerator;
  constructor() {}

  static get(): SequelizeQueryGenerator {
    if (!SequelizeQueryGenerator.instance) {
      SequelizeQueryGenerator.instance = new SequelizeQueryGenerator();
    }
    return SequelizeQueryGenerator.instance;
  }

  searchRegex({ search, columns }: { search: string; columns: string[] }): any {
    const filter = [];
    for (const column of columns) {
      filter.push({ [column]: { [Sequelize.Op.iLike]: "%" + search + "%" } });
    }
    return filter;
  }
}

const sequelizeQueryGenerator = SequelizeQueryGenerator.get();

export { sequelizeQueryGenerator as SequelizeQueryGenerator };
