export interface Project {
  name: string
  description: string
  image: {
    /** The filename in the s3 bucket located at `Portfolio/Projects` */
    src: string
    alt: string
  }
  href: string
}

// Note: top 4 will be immediately visible on the homepage

export const PROJECTS: Project[] = [
  {
    name: 'Crab Fit',
    description: 'A modern event planning website',
    image: {
      src: 'crabfit.webp',
      alt: 'Screenshot of the Crab Fit website showing a heatmap of availabilities',
    },
    href: 'https://crab.fit',
  },
  {
    name: 'Stevent',
    description: 'Community event platform',
    image: {
      src: 'stevent.webp',
      alt: 'Screenshot of the Stevent events page with several university events visible',
    },
    href: 'https://stevent.club',
  },
  {
    name: 'Automatarium',
    description: 'Build and simulate complex automata in your browser',
    image: {
      src: 'automatarium.webp',
      alt: 'Screenshot of the Automatarium editor with a sidepanel that reads "Testing Lab"',
    },
    href: 'https://automatarium.tdib.xyz/',
  },
  {
    name: 'Flour - Baker’s Companion',
    description: 'Android and iOS app with baking tools',
    image: {
      src: 'flour.webp',
      alt: 'Several screenshots of the Flour app showing its various features like quantity converter, substitutions, etc.',
    },
    href: 'https://play.google.com/store/apps/details?id=benpai.flour',
  },

  // More projects
  {
    name: 'Era',
    description: 'Simply beautiful countdown timers',
    image: {
      src: 'era.webp',
      alt: 'Screenshot of the Era website showing several countdown timers',
    },
    href: 'https://era-timers.netlify.app/',
  },
  {
    name: 'Hyper Colors',
    description: 'Every named CSS color at your fingertips',
    image: {
      src: 'hyper_colors.webp',
      alt: 'A screenshot of a grid of HTML colors and their hex codes with the caption "Find colors from any tab with the Hyper Colors extension"',
    },
    href: 'https://chrome.google.com/webstore/detail/hyper-colors/ogefbnmdhjekmihajflilhhcjpkjmppc',
  },
  {
    name: 'Our Saviour Popcat',
    description: 'A tribute to the cat of legend',
    image: {
      src: 'popcat.webp',
      alt: 'An image of the popcat meme with text above that reads "Our Saviour Popcat has descended from the heavens to help us find our path and wholesome ways"',
    },
    href: 'https://popcat.faith',
  },
  {
    name: 'Maimai Song List',
    description: 'Browse songs from the popular rhythm game',
    image: {
      src: 'maimai_song_list.webp',
      alt: 'A list of several songs with their jacket images, and metadata about them',
    },
    href: 'https://otohime.rocks',
  },
  {
    name: 'Emoji Menu',
    description: "A catalogue of Google's Emoji Kitchen",
    image: {
      src: 'emoji_menu.webp',
      alt: 'Screenshot of the Emoji Menu site with a search field and several emoji mashups',
    },
    href: 'https://emojikitchen.rocks',
  },
  {
    name: 'Modern Calendar Embed',
    description: 'Embed any iCal on a website beautifully',
    image: {
      src: 'modern_cal_embed.webp',
      alt: 'Screenshot of several events in an agenda view with the title "Test Calendar"',
    },
    href: 'https://github.com/GRA0007/modern-cal-embed',
  },
  {
    name: 'Spectrum Tab Page',
    description: 'A colourful new tab page',
    image: {
      src: 'spectrum_tab_page.webp',
      alt: 'A blue-green gradient with a simplified browser tab interface',
    },
    href: 'https://addons.mozilla.org/en-US/firefox/addon/spectrum-tab-page/',
  },
  {
    name: 'Pixel Display',
    description: 'Tiny JavaScript library for pixels',
    image: {
      src: 'pixel_display.webp',
      alt: 'Screenshot of the test page with several buttons and inputs with the title "Pixel Display Library"',
    },
    href: 'https://github.com/GRA0007/pixel-display',
  },
  {
    name: 'Cookie Cat',
    description: 'A Steven Universe inspired Discord bot',
    image: {
      src: 'cookie_cat.webp',
      alt: 'A large ice-cream sandwich graphic shaped like a cat, with the words "Cookie Cat" below, and a button that reads "Add Cookie Cat to your server"',
    },
    href: 'https://gra0007.github.io/cookiecat-website/',
  },
  {
    name: 'Kaneda',
    description: 'A helpful Discord bot',
    image: {
      src: 'kaneda.webp',
      alt: 'A Discord message from the Kaneda bot with information about itself',
    },
    href: 'https://github.com/GRA0007/kaneda-website',
  },
  {
    name: 'Folder Icon Generator',
    description: 'Generate icons for your media folders',
    image: {
      src: 'folder_icon_generator.webp',
      alt: 'Screenshot of a Windows file explorer window with folder icons that have little anime cover images in them',
    },
    href: 'https://github.com/GRA0007/Folder-Icon-Generator',
  },
  {
    name: 'Blue',
    description: 'Enhanced Scratch 2.0 mod',
    image: {
      src: 'blue.webp',
      alt: 'A list of new Scratch blocks, with comments about their functionality',
    },
    href: 'https://github.com/GRA0007/Blue',
  },
  {
    name: 'MAL Client for Pebble',
    description: 'Manage your anime list from your watch',
    image: {
      src: 'mal_client_for_pebble.webp',
      alt: 'A stylised Pebble smartwatch displaying the app, with a title that reads "MyAnimeList Client"',
    },
    href: 'https://github.com/GRA0007/MAL-Client',
  },
]
