const container = document.getElementById('blog_posts');

const showPost = post_id => {
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
  // const res = fetch(`https://us-central1-flour-app-services.cloudfunctions.net/notionBlogPost?page_id=${post_id}`);
  // const post = res.json();
  const post = {"page": {"object": "page","id": "ff5a5716-c473-40a8-9773-dd5caf405f96","created_time": "2021-05-23T04:31:58.440Z","last_edited_time": "2021-05-23T08:25:00.000Z","parent": {"type": "database_id","database_id": "fc4e160c-dc18-4944-b0db-fe988c1c5249"},"archived": false,"properties": {"Last edited": {"id": "FR:m","type": "last_edited_time","last_edited_time": "2021-05-23T08:25:00.000Z"},"Published": {"id": "\\~iW","type": "date","date": {"start": "2021-05-23","end": null}},"Tags": {"id": "^abW","type": "multi_select","multi_select": [{"id": "e5d532e8-bdbc-4278-a425-f173155406e8","name": "thoughts","color": "yellow"}]},"Image": {"id": "z>>K","type": "files","files": [{"name": "https://media.discordapp.net/attachments/352449754573045763/845940511655460874/photo-1489981424607-45c58daf0581.png"}]},"Title": {"id": "title","type": "title","title": [{"type": "text","text": {"content": "blog[0] = \"Starting a blog\"","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "blog[0] = \"Starting a blog\"","href": null}]}}},"content": {"object": "list","results": [{"object": "block","id": "6ee8f571-eba0-4e77-aa47-073a881ddbe6","created_time": "2021-05-23T04:37:00.000Z","last_edited_time": "2021-05-23T04:38:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "I remember trying to start blogs years ago, always petering out after a month or two, due to a lack of content, failings in the platform I was using, or just plain forgetting about it.","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "I remember trying to start blogs years ago, always petering out after a month or two, due to a lack of content, failings in the platform I was using, or just plain forgetting about it.","href": null}]}},{"object": "block","id": "4bb3f2bb-1a0e-49db-a9ed-6adf9d70fbef","created_time": "2021-05-23T04:38:00.000Z","last_edited_time": "2021-05-23T04:40:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "This time I'm not going to make myself post here at any regular interval, it's just gonna be a place where I can show off what I've been working on, how I did it, and other cool stuff I'm interested in.","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "This time I'm not going to make myself post here at any regular interval, it's just gonna be a place where I can show off what I've been working on, how I did it, and other cool stuff I'm interested in.","href": null}]}},{"object": "block","id": "28b83777-4814-4fbd-8676-e25dc565abb0","created_time": "2021-05-23T04:40:00.000Z","last_edited_time": "2021-05-23T04:41:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "With my latest project ","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "With my latest project ","href": null},{"type": "text","text": {"content": "Crab Fit","link": {"url": "https://crab.fit"}},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "Crab Fit","href": "https://crab.fit"},{"type": "text","text": {"content": " ramping up, I'm excited to share my methods and features I've built into it.","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": " ramping up, I'm excited to share my methods and features I've built into it.","href": null}]}},{"object": "block","id": "c0a076a9-3bf2-42f8-8158-22f23cf897ba","created_time": "2021-05-23T04:41:00.000Z","last_edited_time": "2021-05-23T04:43:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "Anyway, you've just read my obligatory \"first post\" post which honestly is more just for me so I have a reason to post more stuff here. Now go, make the world a better place ✨","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "Anyway, you've just read my obligatory \"first post\" post which honestly is more just for me so I have a reason to post more stuff here. Now go, make the world a better place ✨","href": null}]}}],"next_cursor": null,"has_more": false}};

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
    // const res = fetch(`https://us-central1-flour-app-services.cloudfunctions.net/notionBlogPosts?count=${count}`);
    // const posts = res.json();
    const posts = {"object": "list","results": [{"object": "page","id": "ff5a5716-c473-40a8-9773-dd5caf405f96","created_time": "2021-05-23T04:31:58.440Z","last_edited_time": "2021-05-23T04:45:00.000Z","parent": {"type": "database_id","database_id": "fc4e160c-dc18-4944-b0db-fe988c1c5249"},"archived": false,"properties": {"Last edited": {"id": "FR:m","type": "last_edited_time","last_edited_time": "2021-05-23T04:45:00.000Z"},"Image": {"id": "S{Sg","type": "files","files": []},"Published": {"id": "\\~iW","type": "date","date": {"start": "2021-05-23","end": null}},"Tags": {"id": "^abW","type": "multi_select","multi_select": [{"id": "e5d532e8-bdbc-4278-a425-f173155406e8","name": "thoughts","color": "yellow"}]},"Title": {"id": "title","type": "title","title": [{"type": "text","text": {"content": "blog[0] = \"Starting a blog\"","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "blog[0] = \"Starting a blog\"","href": null}]}}}],"next_cursor": null,"has_more": false};

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
