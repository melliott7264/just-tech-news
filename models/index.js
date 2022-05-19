const User = require('./User');

const Post = require('./Post');

const Vote = require('./Vote');

const Comment = require('./Comment');

// create associations
// One to Many
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// Many to One
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// Many to Many through Votes
User.belongsToMany(Post, {
    through: Vote, 
    as: 'voted_posts',
    foreignKey: 'user_id'
});

// Many to Many through Votes
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

// Many to One
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// Many to One
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

// One to Many
User.hasMany(Vote, {
    foreignKey: 'user_id'
});

// One to Many
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// Many to one
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Many to one
Comment.belongsTo(Post, {
    foreignKey: 'post_id'    
});

// One to many
User.hasMany(Comment, {
   foreignKey: 'user_id'
});

// One to many
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});



module.exports = { User, Post, Vote, Comment };

