const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

const getPosts = async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  ).catch(error => console.log(error));

  const data = await response.json();
  return data;
};

const showPosts = async () => {
  const posts = await getPosts();
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
    <h2 class="post-title">${post.title}</h2>
    <p class="post-body">${post.body}</p>
    </div>
    `;
    postsContainer.appendChild(postEl);
  });
};

const showLoading = () => {
  loading.classList.add('show');

  setTimeout(() => {
    page++;
    showPosts();
    loading.classList.remove('show');
  }, 300);
};

const filterPosts = e => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.includes(term) || body.includes(term)) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
};

// show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);
