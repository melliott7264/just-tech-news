const router = require('express').Router();

const req = require('express/lib/request');

const sequelize = require('../../config/connection');

const {Post, User, Vote, Comment} = require('../../models');

// get posts for all users
router.get('/', (req, res) => {
    console.log('=========================');
    Post.findAll({
        // query configuration
        attributes: [
            'id',
            'post_url',
            'title', 
            'created_at',
            // adding in a special SQL query to count votes as 'vote_count'
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        // doing a table join as a array of tables/joins
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get one post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title', 
            'created_at',
            // adding in a special SQL query to count votes as 'vote_count'
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    // this method handles the return values (data or errors) from the findOne method
    .then(dbPostData => {
        // if nothing was returned send a 404 message
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        // in all cases return data or errors to the calling function
        res.json(dbPostData);
    })
    // this method handles any gross errors
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a new post
router.post('/', (req,res)=> {
    
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// returns single post by post_id with a vote count
router.put('/upvote', (req, res) => {

    // custom static method created in models/Post.js

   Post.upvote(req.body, {Vote})

    .then(updatedPostData => res.json(updatedPostData))

    .catch(err => {
       console.log(err);
       res.status(400).json(err);
    });

});   

// update a post title
router.put('/:id', (req, res)=> {
    Post.update({
        title: req.body.title
    },
    {
        where: {
            id: req.params.id
        }
    }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;