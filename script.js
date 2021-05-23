const container = document.getElementById('blog_posts');

const showPost = async post_id => {
  const imageEl = document.querySelector('#blog_post .image');
  const titleEl = document.querySelector('#blog_post h1');
  const publishedEl = document.querySelector('#blog_post .published');
  const contentEl = document.querySelector('#blog_post .content');
  const editedEl = document.querySelector('#blog_post .edited');

  // Clear previous post
  imageEl.removeAttribute('src');
  titleEl.innerHTML = 'loading...';
  publishedEl.innerHTML = '';
  contentEl.innerHTML = '';
  editedEl.innerHTML = '';

  document.body.classList.add('blog');

  // Fetch post
  const res = await fetch(`https://us-central1-flour-app-services.cloudfunctions.net/notionBlogPost?page_id=${post_id}`);
  const post = await res.json();

  // Set metadata
  imageEl.src = post.page.properties.Image.files[0].name;
  titleEl.innerHTML = post.page.properties.Title.title[0].plain_text;
  publishedEl.innerHTML = (new Date(post.page.properties.Published.date.start)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  editedEl.innerHTML = (new Date(post.page.properties['Last edited'].last_edited_time)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Parse and set content
  post.content.results.forEach(block => {
    if (block.type === 'paragraph') {
      const paragraph = document.createElement('p');
      block.paragraph.text.forEach(node => {
        if (node.type === 'text') {
          const text = document.createElement(node.text.link === null ? 'span' : 'a');
          if (node.text.link !== null) {
            text.href = node.text.link.url;
            text.target = '_blank';
          }
          text.appendChild(document.createTextNode(node.text.content));
          text.style.fontWeight = node.annotations.bold ? 'bold' : 'normal';
          text.style.fontStyle = node.annotations.italic ? 'italic' : 'normal';
          text.style.textDecoration += node.annotations.strikethrough ? ' line-through' : '';
          text.style.textDecoration += node.annotations.underline ? ' underline' : '';

          paragraph.appendChild(text);
        }
      });
      contentEl.appendChild(paragraph);
    }
  });
};

const getPosts = async count => {
  try {
    const res = await fetch(`https://us-central1-flour-app-services.cloudfunctions.net/notionBlogPosts?count=${count}`);
    const posts = await res.json();

    container.innerHTML = '';
    posts.results.forEach(post => {
      const line = document.createElement('div');
      line.appendChild(document.createTextNode('- '));
      const link = document.createElement('a');
      link.href = `#/blog/${post.id}`;
      link.addEventListener('click', () => showPost(post.id));
      link.appendChild(document.createTextNode(post.properties.Title.title[0].plain_text));
      line.appendChild(link);
      container.appendChild(line);
    });
    if (posts.has_more) {
      const line = document.createElement('div');
      line.appendChild(document.createTextNode('- '));
      const link = document.createElement('a');
      link.href = '#';
      link.addEventListener('click', e => {
        e.preventDefault();
        getPosts(100);
      });
      link.appendChild(document.createTextNode('more...'));
      line.appendChild(link);
      container.appendChild(line);
    }
  } catch (e) {
    container.innerHTML = 'Failed to load';
    console.error(e);
  }
};

getPosts(5);

document.getElementById('close_blog').addEventListener('click', () => {
  document.body.classList.remove('blog');
  window.location.hash = '';
});

// Show blog in url
if (window.location.hash.startsWith('#/blog/')) {
  showPost(window.location.hash.replace('#/blog/', ''));
}
