import { Router } from 'express';
import * as commentService from '../services/commentService';

const router = Router();

router
  .get('/:id', (req, res, next) => commentService.getCommentById(req.params.id)
    .then(comment => res.send(comment))
    .catch(next))
  .delete('/:id', (req, res, next) => commentService.deleteCommentById(req.params.id)
    .then(comment => res.send(comment))
    .catch(next))
  .post('/', (req, res, next) => commentService.create(req.user.id, req.body)
    .then(comment => res.send(comment))
    .catch(next))
  .put('/', (req, res, next) => commentService.update(req.body)
    .then(comment => res.send(comment))
    .catch(next))
  .get('/react/:id', (req, res, next) => commentService.getCommentReactions(req.params.id)
    .then(reactions => res.send(reactions))
    .catch(next))
  .put('/react', (req, res, next) => commentService.setReaction(req.user.id, req.body)
    .then(reaction => {
      if (reaction.comment && (reaction.comment.userId !== req.user.id)) {
        // notify a user if someone (not himself) liked his post
        req.io.to(reaction.comment.userId).emit('like', 'Your comment was liked!');
      }
      return res.send(reaction);
    })
    .catch(next));

export default router;
