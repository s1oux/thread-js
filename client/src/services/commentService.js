import callWebApi from 'src/helpers/webApiHelper';

export const addComment = async request => {
  const response = await callWebApi({
    endpoint: '/api/comments',
    type: 'POST',
    request
  });
  return response.json();
};

export const deleteComment = async request => {
  const response = await callWebApi({
    endpoint: '/api/comments',
    type: 'DELETE',
    request
  });
  return response.json();
}

export const getComment = async id => {
  const response = await callWebApi({
    endpoint: `/api/comments/${id}`,
    type: 'GET'
  });
  return response.json();
};

export const editComment = async request => {
  const response = await callWebApi({
    endpoint: '/api/comments',
    type: 'PUT',
    request
  });
  return response.json();
};


export const getCommentLikes = async commentId => {
  const response = await callWebApi({
    endpoint: `/api/comments/react/${commentId}`,
    type: 'GET',
  });
  return response.json();
}

export const likeComment = async commentId => {
  const response = await callWebApi({
    endpoint: '/api/comments/react',
    type: 'PUT',
    request: {
      commentId,
      isLike: true
    }
  });
  return response.json();
};

export const dislikeComment = async commentId => {
  const response = await callWebApi({
    endpoint: '/api/comments/react',
    type: 'PUT',
    request: {
      commentId,
      isLike: false
    }
  });
  return response.json();
};