const container = document.getElementById('blog_posts')

const ytid = url => {
  const match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/)
  return (match && match[7].length == 11) ? match[7] : false
}

const showPost = async post_id => {
  const imageEl = document.querySelector('#blog_post .image')
  const titleEl = document.querySelector('#blog_post h1')
  const publishedEl = document.querySelector('#blog_post .published')
  const contentEl = document.querySelector('#blog_post .content')
  const editedEl = document.querySelector('#blog_post .edited')

  // Clear previous post
  imageEl.removeAttribute('src')
  titleEl.innerHTML = 'loading...'
  publishedEl.innerHTML = ''
  contentEl.innerHTML = ''
  editedEl.innerHTML = ''

  document.body.classList.add('blog')

  // Fetch post
  try {
    const res = await fetch(`https://us-central1-flour-app-services.cloudfunctions.net/notionBlogPost?page_id=${post_id}`)
    const post = await res.json()

    // Set metadata
    imageEl.src = post.page.cover?.external?.url ?? post.page.cover?.file?.url ?? '#'
    titleEl.innerHTML = post.page.properties.Title.title[0].plain_text
    publishedEl.innerHTML = (new Date(post.page.properties.Published.date.start)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    editedEl.innerHTML = (new Date(post.page.properties['Last edited'].last_edited_time)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Parse and set content
    let prevItemType = null
    let listContainer = null
    post.content.results.forEach(block => {
      // Handle lists
      if (
        ['bulleted_list_item', 'numbered_list_item'].includes(block.type)
        && !['bulleted_list_item', 'numbered_list_item'].includes(prevItemType)
      ) {
        listContainer = document.createElement(block.type === 'bulleted_list_item' ? 'ul' : 'ol')
      } else if (
        ['bulleted_list_item', 'numbered_list_item'].includes(prevItemType)
        && !['bulleted_list_item', 'numbered_list_item'].includes(block.type)
      ) {
        contentEl.appendChild(listContainer)
        listContainer = null
      }

      if ([
        'paragraph',
        'heading_1',
        'heading_2',
        'heading_3',
        'bulleted_list_item',
        'numbered_list_item',
        'quote',
      ].includes(block.type)) {
        const blockElement = document.createElement({
          'paragraph': 'p',
          'heading_1': 'h2',
          'heading_2': 'h3',
          'heading_3': 'h4',
          'bulleted_list_item': 'li',
          'numbered_list_item': 'li',
          'quote': 'blockquote',
        }[block.type])

        block[block.type].text.forEach(node => {
          if (node.type === 'text') {
            const text = document.createElement(node.text.link === null ? 'span' : 'a')
            if (node.text.link !== null) {
              text.href = node.text.link.url
              text.target = '_blank'
            }
            text.appendChild(document.createTextNode(node.text.content))
            text.style.fontWeight += node.annotations.bold ? 'bold' : ''
            text.style.fontStyle += node.annotations.italic ? 'italic' : ''
            text.style.textDecoration += node.annotations.strikethrough ? ' line-through' : ''
            text.style.textDecoration += node.annotations.underline ? ' underline' : ''
            if (node.annotations.code) text.classList.add('code')

            blockElement.appendChild(text)
          }
        })
        if (['bulleted_list_item', 'numbered_list_item'].includes(block.type)) {
          listContainer.appendChild(blockElement)
        } else {
          contentEl.appendChild(blockElement)
        }
      } else if (block.type === 'code') {
        const blockElement = document.createElement('code')
        blockElement.appendChild(document.createTextNode(block.code.text[0].text.content))
        blockElement.className = `language-${block.code.language}`
        const wrapperElement = document.createElement('pre')
        wrapperElement.appendChild(blockElement)
        contentEl.appendChild(wrapperElement)
      } else if (block.type === 'image') {
        const blockElement = document.createElement('figure')
        const image = document.createElement('img')

        image.src = block.image.external?.url ?? block.image.file?.url ?? '#'
        blockElement.appendChild(image)

        if (block.image.caption.length > 0) {
          const caption = document.createElement('figcaption')
          caption.appendChild(document.createTextNode(block.image.caption[0].text.content))
          image.alt = block.image.caption[0].text.content
          blockElement.appendChild(caption)
        }

        contentEl.appendChild(blockElement)
      } else if (block.type === 'divider') {
        contentEl.appendChild(document.createElement('hr'))
      } else if (block.type === 'video' && block.video.external?.url.includes('you')) {
        const blockElement = document.createElement('figure')
        const video = document.createElement('iframe')

        video.width = 560
        video.height = 315
        video.frameborder = 'no'
        video.title = 'Youtube video player'
        video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        video.allowfullscreen = true
        video.src = `https://www.youtube.com/embed/${ytid(block.video.external?.url)}`
        blockElement.appendChild(video)

        if (block.video.caption.length > 0) {
          const caption = document.createElement('figcaption')
          caption.appendChild(document.createTextNode(block.video.caption[0].text.content))
          video.title = block.video.caption[0].text.content
          blockElement.appendChild(caption)
        }

        contentEl.appendChild(blockElement)
      } else if (block.type === 'embed') {
        const blockElement = document.createElement('figure')

        if (block.embed.url.includes('codepen')) {
          const frame = document.createElement('iframe')

          frame.height = 300
          frame.style = 'width: 100%'
          frame.frameborder = 'no'
          frame.scrolling = 'no'
          frame.title = 'Codepen embed'
          frame.allowfullscreen = true
          frame.allowtransparency = true
          frame.loading = 'lazy'
          frame.src = block.embed.url.replace('/pen/', '/embed/')
          blockElement.appendChild(frame)
        }

        if (block.embed.caption.length > 0) {
          const caption = document.createElement('figcaption')
          caption.appendChild(document.createTextNode(block.embed.caption[0].text.content))
          blockElement.appendChild(caption)
        }

        contentEl.appendChild(blockElement)
      }

      prevItemType = block.type
    })

    Prism.highlightAll() // Highlight code blocks
  } catch (e) {
    console.error(e)
    titleEl.innerHTML = 'Failed to load'
  }
}

const getPosts = async count => {
  try {
    const res = await fetch(`https://us-central1-flour-app-services.cloudfunctions.net/notionBlogPosts?count=${count}`)
    const posts = await res.json()

    container.innerHTML = ''
    posts.results.forEach(post => {
      const line = document.createElement('div')
      line.appendChild(document.createTextNode('- '))
      const link = document.createElement('a')
      link.href = `#/blog/${post.id}`
      link.addEventListener('click', () => showPost(post.id))
      link.appendChild(document.createTextNode(post.properties.Title.title[0].plain_text))
      line.appendChild(link)
      container.appendChild(line)
    })
    if (posts.has_more) {
      const line = document.createElement('div')
      line.appendChild(document.createTextNode('- '))
      const link = document.createElement('a')
      link.href = '#'
      link.addEventListener('click', e => {
        e.preventDefault()
        getPosts(100)
      })
      link.appendChild(document.createTextNode('more...'))
      line.appendChild(link)
      container.appendChild(line)
    }
  } catch (e) {
    container.innerHTML = 'Failed to load'
    console.error(e)
  }
}

getPosts(5)

document.getElementById('close_blog').addEventListener('click', () => {
  document.body.classList.remove('blog')
  window.location.hash = ''
})

// Show blog in url
if (window.location.hash.startsWith('#/blog/')) {
  showPost(window.location.hash.replace('#/blog/', ''))
}
