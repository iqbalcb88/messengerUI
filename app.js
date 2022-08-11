const messageContainer = document.getElementById('container');

fetch('./data.json')
  .then((res) => res.json())
  .then((data) => getPostElement(data));

function getPostElement(data) {
  console.log(data);

  data.comments.forEach((comment, id) => {
    const postContainer = document.createElement('div');
    postContainer.classList.add('post-container');
    getElement(postContainer, comment);

    messageContainer.append(postContainer);

    if (comment.replies.length > 0) {
      const replyContainer = document.createElement('section');
      replyContainer.setAttribute('id', 'reply-container');
      replyContainer.classList.add('reply-container');

      comment.replies.forEach((reply, id) => {
        const postReply = document.createElement('div');

        postReply.classList.add('post-reply');

        getElement(postReply, reply);

        replyContainer.append(postReply);
      });
      messageContainer.append(replyContainer);
    }
  });
  const commentEl = addComment(data.currentUser);
  messageContainer.append(commentEl);
}

function addComment(userData) {
  const commentBox = document.createElement('div');
  commentBox.classList.add('comment-div');
  commentBox.innerHTML = `<img class='user-avatar' style='width: 30px' src=${userData.image.png} alt=${userData.username} />
  <textarea id="comment" placeholder='Add a comment...' class='comment'></textarea>
  <button id='send' class='send'>SEND</button>`;
  return commentBox;
}

function getElement(element, post) {
  return (element.innerHTML = `<div class="counter">
  <span class="increment">
    <i class="fa fa-plus" aria-hidden="true"></i>
  </span>
  <span class="number">${post.score}</span>
  <span class="decrement">
    <i class="fa fa-minus" aria-hidden="true"></i>
  </span>
</div>
<div class="post">
  <div class="user-avatar">
    <img  src=${post.user.image.png} alt="avatar" />
    <h4 id="username">${post.user.username}</h4>
    <small id="createat">${post.createdAt}</small>
  </div>
  <p class="message">
    ${post.content}
  </p>
  <div class="reply">
    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
        fill="#5357B6"
      />
    </svg>
    <span>Reply</span>
  </div>
</div>
  
  `);
}
