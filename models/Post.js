const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// create the Post model
class Post extends Model {
    // set upvote method as a part of the Post model
    static upvote(body, models) {
        // returning the value of the method models.Vote.create which extends Models methods
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(() => {
            // Post extends the findOne method from Models
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'created_at',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post_id = vote.post_id)'),
                        'vote_count'
                    ]
                ]
            });
        });
    }
}

// create fields for Post model

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type:   DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    // Model options
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'

    }
);

module.exports = Post;