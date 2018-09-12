module.exports = function(Sequelize, DataTypes) {
  var Task = Sequelize.define("Task", {
    taskID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    taskTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    taskDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });

  Task.associate = function(radix_db) {

    Task.belongsTo(radix_db.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Task;
};
