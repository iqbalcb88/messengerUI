const messageContainer = document.getElementById('container');
let currentUser;

function setLocalStorage(data) {
  localStorage.setItem('data', JSON.stringify(data));
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('data'));
  return data;
}

fetch('./data.json')
  .then((res) => res.json())
  .then((data) => setLocalStorage(data));

function getPostElement() {
  const data = getLocalStorage();
  currentUser = data.currentUser.username;
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
        postReply.setAttribute('userName', currentUser);

        getElement(postReply, reply);

        replyContainer.append(postReply);
        console.log(currentUser);
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
  ${
    currentUser === post.user.username
      ? `<div class='edit-delete'>
        <div class='delete'><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
          <span>Delete</span>
        </div>
        <div class='edit'>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
          <span>Edit</span>
        </div>
      </div>`
      : `<div class="reply">
      <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
          fill="#5357B6"
        />
      </svg>
      <span>Reply</span>
    </div>`
  }
  
</div>
  
  `);
}

getPostElement();
