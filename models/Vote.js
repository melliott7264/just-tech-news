const { Model, DataTypes }  = require('sequelize');

const sequelize =require('../config/connection');

class Vote extends Model {}

Vote.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    // Options for database build
    {
        sequelize,
        timestamps: false,
        // prevents the use of plurals in database names
        freezeTableName: true,
        // uses underscores as opposed to default camelCase in database names
        underscored: true,
        modelName: 'vote'
    }
);

module.exports = Vote;
