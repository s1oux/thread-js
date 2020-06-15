import { Router } from 'express';
import * as postService from '../services/postService';

const router = Router();

router
  .get('/', (req, res, next) => postService.getPosts(req.query)
    .then(posts => res.send(posts))
    .catch(next))
  .get('/:id', (req, res, next) => postService.getPostById(req.params.id)
    .then(post => {
      res.send(post);
    })
    .catch(next))
  .delete('/', (req, res, next) => postService.deletePostById(req.body.id)
    .then(result => {
      if (result) {
        res.send(req.body);
      }
    })
    .catch(next))
  .post('/', (req, res, next) => postService.create(req.user.id, req.body)
    .then(post => {
      req.io.emit('new_post', post); // notify all users that a new post was created
      return res.send(post);
    })
    .catch(next))
  .put('/', (req, res, next) => postService.update(req.body)
    .then(post => {
      req.io.emit('edit_post', post);
      return res.send(post);
    })
    .catch(next))
  .get('/react/:id', (req, res, next) => postService.getPostReactions(req.params.id)
    .then(reactions => res.send(reactions))
    .catch(next))
  .get('/react/likedby/:id', (req, res, next) => postService.getLikedByPostReactions(req.params.id)
    .then(reactions => res.send(reactions))
    .catch(next))
  .put('/react', (req, res, next) => postService.setReaction(req.user.id, req.body)
    .then(reaction => {
      if (reaction.post && (reaction.post.userId !== req.user.id)) {
        // notify a user if someone (not himself) liked his post
        req.io.to(reaction.post.userId).emit('like', 'Your post was liked!');
      }
      return res.send(reaction);
    })
    .catch(next));

export default router;
