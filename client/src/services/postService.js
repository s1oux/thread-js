import callWebApi from 'src/helpers/webApiHelper';

export const getAllPosts = async filter => {
  const response = await callWebApi({
    endpoint: '/api/posts',
    type: 'GET',
    query: filter
  });
  return response.json();
};

export const addPost = async request => {
  const response = await callWebApi({
    endpoint: '/api/posts',
    type: 'POST',
    request
  });
  return response.json();
};

export const sharePost = async request => {
  const response = await callWebApi({
    endpoint: 'api/posts/sharelink',
    type: 'POST',
    request
  });
  return response.json();
}

export const deletePost = async request => {
  const response = await callWebApi({
    endpoint: '/api/posts',
    type: 'DELETE',
    request
  });
  return response.json();
}

export const editPost = async request => {
  const response = await callWebApi({
    endpoint: '/api/posts',
    type: 'PUT',
    request
  });
  return response.json();
}

export const getPost = async id => {
  const response = await callWebApi({
    endpoint: `/api/posts/${id}`,
    type: 'GET'
  });
  const post = await response.json();
  
  const updated = {
    ...post,
    comments: post.comments.map(comment => ({
      ...comment,
      likeCount: comment.commentReactions.filter(reaction => reaction.isLike).length,
      dislikeCount: comment.commentReactions.filter(reaction => !reaction.isLike).length
    }))
  };
  return updated;
};

export const getPostLikes = async postId => {
  const response = await callWebApi({
    endpoint: `/api/posts/react/${postId}`,
    type: 'GET',
  });
  return response.json();
};

export const getLikedByPostReactions = async userId => {
  const response = await callWebApi({
    endpoint: `/api/posts/react/likedby/${userId}`,
    type: 'GET'
  });
  return response.json();
};

export const likePost = async postId => {
  const response = await callWebApi({
    endpoint: '/api/posts/react',
    type: 'PUT',
    request: {
      postId,
      isLike: true
    }
  });
  return response.json();
};

export const dislikePost = async postId => {
  const response = await callWebApi({
    endpoint: '/api/posts/react',
    type: 'PUT',
    request: {
      postId,
      isLike: false
    }
  });
  return response.json();
};

export const getPostByHash = async hash => getPost(hash);
