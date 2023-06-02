interface Link {
  title: string
  href: string
  icon: React.ReactNode
}

export const SOCIAL_LINKS: Link[] = [
  {
    title: 'GitHub',
    href: 'https://github.com/GRA0007/',
    icon: <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" /></svg>,
  },
  {
    title: 'Codepen',
    href: 'https://codepen.io/GRA0007',
    icon: <svg viewBox="0 0 24 24"><path d="M15.09,12L12,14.08V14.09L8.91,12L12,9.92V9.92L15.09,12M12,2C11.84,2 11.68,2.06 11.53,2.15L2.5,8.11C2.27,8.22 2.09,8.43 2,8.67V14.92C2,15.33 2,15.33 2.15,15.53L11.53,21.86C11.67,21.96 11.84,22 12,22C12.16,22 12.33,21.95 12.47,21.85L21.85,15.5C22,15.33 22,15.33 22,14.92V8.67C21.91,8.42 21.73,8.22 21.5,8.1L12.47,2.15C12.32,2.05 12.16,2 12,2M16.58,13L19.59,15.04L12.83,19.6V15.53L16.58,13M19.69,8.9L16.58,11L12.83,8.47V4.38L19.69,8.9M20.33,10.47V13.53L18.07,12L20.33,10.47M7.42,13L11.17,15.54V19.6L4.41,15.04L7.42,13M4.31,8.9L11.17,4.39V8.5L7.42,11L4.31,8.9M3.67,10.5L5.93,12L3.67,13.54V10.5Z" /></svg>,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bengrant13/',
    icon: <svg viewBox="0 0 24 24"><path d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" /></svg>,
  },
  {
    title: 'Notion',
    href: 'https://benjibenji.notion.site/',
    icon: <svg viewBox="12 0.18999999999999906 487.619 510.941"><path d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934 100.889 154.171V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z" fillRule="evenodd"/></svg>,
  },
  {
    title: 'Keybase',
    href: 'https://keybase.io/benpai',
    icon: <svg viewBox="0 0 24 24"><path d="M14.758 19.1406C14.5911 19.1406 14.428 19.1901 14.2892 19.2828C14.1505 19.3755 14.0423 19.5073 13.9784 19.6615C13.9146 19.8157 13.8979 19.9853 13.9304 20.149C13.963 20.3127 14.0433 20.463 14.1613 20.581C14.2793 20.699 14.4297 20.7794 14.5934 20.8119C14.757 20.8445 14.9267 20.8278 15.0809 20.7639C15.235 20.7 15.3668 20.5919 15.4595 20.4531C15.5522 20.3144 15.6017 20.1513 15.6017 19.9844C15.6017 19.7606 15.5128 19.546 15.3546 19.3878C15.1964 19.2295 14.9817 19.1406 14.758 19.1406ZM20.0042 12.2219C19.5589 11.5366 18.1587 9.76328 15.9139 8.76672C15.6295 8.63984 15.3423 8.52625 15.0523 8.42594C15.2431 7.95968 15.3359 7.45919 15.3252 6.95554C15.3144 6.4519 15.2003 5.95583 14.9898 5.49813C14.7794 5.04044 14.4771 4.63087 14.1018 4.29486C13.7265 3.95885 13.2861 3.70357 12.808 3.54484C12.2263 3.35266 11.7144 3.26359 11.2887 3.27437C11.2606 3.18062 11.2002 2.75875 11.7294 1.63375L10.6559 1L10.3991 1.35438C9.99172 1.91969 9.60594 2.45828 9.25812 2.98984C9.13042 2.95968 9.00045 2.94008 8.86953 2.93125C6.92281 2.81641 7.04141 2.82203 6.94484 2.82203C4.5725 2.82203 4.56594 5.26516 4.56594 4.97266L4.45531 6.69203C4.37984 7.95766 5.38109 9.04562 6.68797 9.1225L7.10656 9.14781C6.3106 9.60143 5.58053 10.162 4.93672 10.8138C2 13.7809 2 17.0312 2 19.6455V21.2223L3.09312 19.8255C3.23965 20.4406 3.46926 21.0329 3.77562 21.5861C4.04656 22.0609 4.47266 22.0291 4.69625 21.9297C4.89359 21.842 5.165 21.6053 4.87203 20.987C4.49748 20.2005 4.24822 19.3601 4.13328 18.4966L6.32797 15.692L5.17203 19.1659C7.90156 17.1784 12.5492 16.2709 16.2463 17.357C17.8494 17.8281 19.408 17.3894 20.2184 16.2395C20.2522 16.1927 20.2747 16.1383 20.3052 16.0886C20.3896 16.5279 20.4335 16.974 20.4364 17.4212C20.4364 18.5134 20.2634 19.9023 19.7389 21.2481C19.6208 21.5509 19.8214 21.9278 20.142 21.9859C20.4898 22.0595 20.8606 21.8406 21.0031 21.4633C21.4531 20.2656 21.6875 18.9062 21.6875 17.4212C21.6875 15.6128 21.0781 13.7903 20.0042 12.2219ZM8.01734 5.52719L7.28141 5.48359L7.21625 6.505L7.83172 6.54156C7.80444 6.84702 7.80947 7.1545 7.84672 7.45891L6.79766 7.39609C6.72208 7.39296 6.64787 7.37496 6.57926 7.34313C6.51064 7.31129 6.44898 7.26625 6.39778 7.21057C6.34659 7.15489 6.30687 7.08967 6.28089 7.01863C6.25492 6.94759 6.2432 6.87213 6.24641 6.79656L6.35938 5.07812C6.40625 4.50766 7.00953 4.54984 6.98094 4.5475L8.34547 4.62859C8.21503 4.92001 8.10538 5.22029 8.01734 5.52719ZM14.9745 13.5981C14.8752 13.6751 14.7503 13.7112 14.6253 13.6991C14.5002 13.687 14.3846 13.6275 14.3019 13.533L13.8481 12.9944L12.2347 14.26C12.1579 14.3203 12.0609 14.3488 11.9637 14.3393C11.8665 14.3299 11.7767 14.2834 11.713 14.2094L10.9733 13.3356C10.9174 13.263 10.8927 13.1712 10.9044 13.0803C10.9162 12.9894 10.9636 12.9069 11.0361 12.8509L12.6566 11.5769L11.9937 10.7922L11.1927 11.4227C11.1196 11.4797 11.0274 11.5065 10.9351 11.4978C10.8429 11.4891 10.7574 11.4455 10.6962 11.3758C10.6962 11.3758 10.5219 11.1686 10.5181 11.1634C10.4624 11.0906 10.4379 10.9987 10.4499 10.9078C10.462 10.8169 10.5096 10.7345 10.5823 10.6788L11.375 10.0558C11.375 10.0558 10.5073 9.02453 10.5031 9.01797C10.4671 8.97133 10.4407 8.91805 10.4253 8.86118C10.4099 8.8043 10.4059 8.74495 10.4135 8.68652C10.421 8.62809 10.4401 8.57173 10.4694 8.52066C10.4988 8.46959 10.538 8.42482 10.5847 8.38891C10.6831 8.31111 10.8078 8.27436 10.9327 8.28633C11.0577 8.29829 11.1731 8.35805 11.255 8.45312L15.0561 12.9681C15.0921 13.0148 15.1186 13.0682 15.134 13.1251C15.1494 13.1821 15.1534 13.2415 15.1458 13.3C15.1383 13.3585 15.1192 13.415 15.0898 13.4661C15.0605 13.5173 15.0213 13.5621 14.9745 13.5981ZM10.13 19.1406C9.96312 19.1406 9.79999 19.1901 9.66124 19.2828C9.52248 19.3755 9.41434 19.5073 9.35048 19.6615C9.28661 19.8157 9.26991 19.9853 9.30246 20.149C9.33502 20.3127 9.41538 20.463 9.53338 20.581C9.65138 20.699 9.80172 20.7794 9.96539 20.8119C10.1291 20.8445 10.2987 20.8278 10.4529 20.7639C10.6071 20.7 10.7388 20.5919 10.8316 20.4531C10.9243 20.3144 10.9738 20.1513 10.9738 19.9844C10.9738 19.7606 10.8849 19.546 10.7266 19.3878C10.5684 19.2295 10.3538 19.1406 10.13 19.1406Z" /></svg>,
  },
]