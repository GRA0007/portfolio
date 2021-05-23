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
  //const res = await fetch(`https://us-central1-flour-app-services.cloudfunctions.net/notionBlogPost?page_id=${post_id}`);
  //const post = await res.json();
  const post = {"page": {"object": "page","id": "975e5ca6-0c24-44fc-aa07-19d0365fdcb0","created_time": "2021-05-23T04:31:58.440Z","last_edited_time": "2021-05-23T13:29:00.000Z","parent": {"type": "database_id","database_id": "fc4e160c-dc18-4944-b0db-fe988c1c5249"},"archived": false,"properties": {"Last edited": {"id": "FR:m","type": "last_edited_time","last_edited_time": "2021-05-23T13:29:00.000Z"},"Published": {"id": "\\~iW","type": "date","date": {"start": "2021-05-25","end": null}},"Tags": {"id": "^abW","type": "multi_select","multi_select": [{"id": "8e1b8ab5-9f61-411d-884a-84a6e1fe9115","name": "web","color": "purple"},{"id": "40853e29-f501-44c9-9ceb-696fb1d540b6","name": "api","color": "blue"},{"id": "4eae7635-4dfe-4aab-93e8-6739fe5a9a3d","name": "notion","color": "pink"}]},"Image": {"id": "z>>K","type": "files","files": [{"name": "https://cdn.discordapp.com/attachments/352449754573045763/845950917069111297/photo-1581618048854-b2f6f877cef3.png"}]},"Title": {"id": "title","type": "title","title": [{"type": "text","text": {"content": "blog[1] = \"How this blog works: Notion API\"","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "blog[1] = \"How this blog works: Notion API\"","href": null}]}}},"content": {"object": "list","results": [{"object": "block","id": "fad317b5-69d0-4b57-864f-3b0111b05c49","created_time": "2021-05-23T13:07:00.000Z","last_edited_time": "2021-05-23T13:11:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "The ","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "The ","href": null},{"type": "text","text": {"content": "Notion API","link": {"url": "https://developers.notion.com/"}},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "Notion API","href": "https://developers.notion.com/"},{"type": "text","text": {"content": " was recently released into the wild as a public beta, something that I have been waiting ","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": " was recently released into the wild as a public beta, something that I have been waiting ","href": null},{"type": "text","text": {"content": "years","link": null},"annotations": {"bold": false,"italic": true,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "years","href": null},{"type": "text","text": {"content": " for, since I started using Notion in 2018. It's very exciting, even in it's baby state, and this blog that you're reading now actually uses the Notion API.","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": " for, since I started using Notion in 2018. It's very exciting, even in it's baby state, and this blog that you're reading now actually uses the Notion API.","href": null}]}},{"object": "block","id": "5a837267-c5ca-4309-ba8e-55ff1ebee499","created_time": "2021-05-23T13:10:00.000Z","last_edited_time": "2021-05-23T13:12:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "If you've never used Notion before, I encourage you to take a look over at ","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "If you've never used Notion before, I encourage you to take a look over at ","href": null},{"type": "text","text": {"content": "notion.so","link": {"url": "https://notion.so"}},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "notion.so","href": "https://notion.so"},{"type": "text","text": {"content": ", it's an incredible note-taking, life-organising, and work-simplifying app.","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": ", it's an incredible note-taking, life-organising, and work-simplifying app.","href": null}]}},{"object": "block","id": "e0dd88b7-dd93-427d-9014-61c1c56d801b","created_time": "2021-05-23T13:09:00.000Z","last_edited_time": "2021-05-23T13:25:00.000Z","has_children": false,"type": "heading_2","heading_2": {"text": [{"type": "text","text": {"content": "How it's set up","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "How it's set up","href": null}]}},{"object": "block","id": "d11f220b-a940-4d3a-9bf3-5501bcc13e3c","created_time": "2021-05-23T13:10:00.000Z","last_edited_time": "2021-05-23T13:14:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "I have a Blog database set up in my workspace, which I've invited my integration to. This allows me to programatically access this database using the token I was issued when creating my integration.","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "I have a Blog database set up in my workspace, which I've invited my integration to. This allows me to programatically access this database using the token I was issued when creating my integration.","href": null}]}},{"object": "block","id": "e706770a-1050-4430-b435-c5c9573476b2","created_time": "2021-05-23T13:14:00.000Z","last_edited_time": "2021-05-23T13:19:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "Of course, since this blog is loaded in with client-side javascript, I had to find a way of hiding the secret token, as it also allows anyone with it to edit pages and content. I went with Google Cloud Functions. Using just a bit of code, and Notion's javascript sdk ","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "Of course, since this blog is loaded in with client-side javascript, I had to find a way of hiding the secret token, as it also allows anyone with it to edit pages and content. I went with Google Cloud Functions. Using just a bit of code, and Notion's javascript sdk ","href": null},{"type": "text","text": {"content": "@notionhq/client","link": {"url": "https://www.npmjs.com/package/@notionhq/client"}},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "@notionhq/client","href": "https://www.npmjs.com/package/@notionhq/client"},{"type": "text","text": {"content": ", it's pretty easy to fetch a list of all the blog posts:","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": ", it's pretty easy to fetch a list of all the blog posts:","href": null}]}},{"object": "block","id": "69d35a14-1142-4b97-97b0-1648ed4866d8","created_time": "2021-05-23T13:17:00.000Z","last_edited_time": "2021-05-23T13:21:00.000Z","has_children": false,"type": "unsupported","unsupported": {}},{"object": "block","id": "93e2db03-04d5-48e8-8d16-4c74a4fa9414","created_time": "2021-05-23T13:21:00.000Z","last_edited_time": "2021-05-23T13:22:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "The above code sorts the blog posts by most recently published, and makes sure that posts with a published date in the future are not retrieved.","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "The above code sorts the blog posts by most recently published, and makes sure that posts with a published date in the future are not retrieved.","href": null}]}},{"object": "block","id": "e1a518c7-c8f5-4328-bf4a-b59794df919c","created_time": "2021-05-23T13:22:00.000Z","last_edited_time": "2021-05-23T13:23:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "This cloud function just takes the JSON output of the Notion API call and returns it, ready to be used by my website. All I have to do is ","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "This cloud function just takes the JSON output of the Notion API call and returns it, ready to be used by my website. All I have to do is ","href": null},{"type": "text","text": {"content": "fetch","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": true,"color": "default"},"plain_text": "fetch","href": null},{"type": "text","text": {"content": " the json from the cloud function url.","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": " the json from the cloud function url.","href": null}]}},{"object": "block","id": "7a10cfa1-700a-4a86-9a3c-e19e4ebbaf81","created_time": "2021-05-23T13:24:00.000Z","last_edited_time": "2021-05-23T13:27:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "Retrieving the content of a blog post is similar, but when I fetch it on the client side, it has to be parsed into HTML. Currently, the API doesn't support loading images or other complex blocks, but it's sufficient for a simple text blog.","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "Retrieving the content of a blog post is similar, but when I fetch it on the client side, it has to be parsed into HTML. Currently, the API doesn't support loading images or other complex blocks, but it's sufficient for a simple text blog.","href": null}]}},{"object": "block","id": "a2e6ca01-bc19-4411-8bbd-e43d19139a98","created_time": "2021-05-23T13:25:00.000Z","last_edited_time": "2021-05-23T13:25:00.000Z","has_children": false,"type": "heading_2","heading_2": {"text": [{"type": "text","text": {"content": "Source code","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "Source code","href": null}]}},{"object": "block","id": "fa6e414e-57fe-48b9-8ee5-630d9f96c6c3","created_time": "2021-05-23T13:25:00.000Z","last_edited_time": "2021-05-23T13:26:00.000Z","has_children": false,"type": "paragraph","paragraph": {"text": [{"type": "text","text": {"content": "If you want to see exactly how I got it working, you can take a look at the repository on Github for my personal site here: ","link": null},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "If you want to see exactly how I got it working, you can take a look at the repository on Github for my personal site here: ","href": null},{"type": "text","text": {"content": "https://github.com/GRA0007/portfolio","link": {"url": "https://github.com/GRA0007/portfolio"}},"annotations": {"bold": false,"italic": false,"strikethrough": false,"underline": false,"code": false,"color": "default"},"plain_text": "https://github.com/GRA0007/portfolio","href": "https://github.com/GRA0007/portfolio"}]}}],"next_cursor": null,"has_more": false}};

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
    if (['paragraph', 'heading_2', 'heading_3'].includes(block.type)) {
      const blockElement = document.createElement({
        'paragraph': 'p',
        'heading_2': 'h2',
        'heading_3': 'h3',
      }[block.type]);

      block[block.type].text.forEach(node => {
        if (node.type === 'text') {
          const text = document.createElement(node.text.link === null ? 'span' : 'a');
          if (node.text.link !== null) {
            text.href = node.text.link.url;
            text.target = '_blank';
          }
          text.appendChild(document.createTextNode(node.text.content));
          text.style.fontWeight += node.annotations.bold ? 'bold' : '';
          text.style.fontStyle += node.annotations.italic ? 'italic' : '';
          text.style.textDecoration += node.annotations.strikethrough ? ' line-through' : '';
          text.style.textDecoration += node.annotations.underline ? ' underline' : '';
          if (node.annotations.code) text.classList.add('code');

          blockElement.appendChild(text);
        }
      });
      contentEl.appendChild(blockElement);
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
