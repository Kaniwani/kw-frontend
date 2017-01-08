/* eslint-disable max-len */


// TODO: audit icons and remove unused ones

/**
* All svg paths are for viewBox 0 0 24 24
* Extracted path data from:
* https://docs-05-dot-polymer-project.appspot.com/0.5/components/core-icons/demo.html
*/
export const POLYMER_ICONS = {
  ADD: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z',
  ARROW_DOWN: 'M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z',
  ARROW_LEFT: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z',
  ARROW_RIGHT: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z',
  ARROW_UP: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
  ASSIGNMENT_CHECK: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
  ASSIGNMENT_INBOX: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 15l-5-5h3V9h4v4h3l-5 5z',
  ATTENTION: 'M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z',
  BACK: 'M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z',
  BLOCK: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z',
  CANCEL: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
  CHECK: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
  CHECK_CIRCLE: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  CLOSE: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  EDIT: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  ENTER: 'M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
  EXPAND: 'M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z',
  CONTRACT: 'M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z',
  HELP: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
  LABEL_OUTLINE: 'M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z',
  LINK: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
  LOCK_OPEN: 'M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z',
  LOCK_OUTLINE: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-5.1c1.71 0 3.1 1.39 3.1 3.1v2H9V6h-.1c0-1.71 1.39-3.1 3.1-3.1zM18 20H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z',
  LOCK_SOLID: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
  MORE: 'M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  REFRESH: 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
  REMOVE: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z',
  SETTINGS: 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z',
  SORT: 'M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z',
  SUMMARY: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
  SYNC: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
  SYNC_PROBLEM: 'M3 12c0 2.21.91 4.2 2.36 5.64L3 20h6v-6l-2.24 2.24C5.68 15.15 5 13.66 5 12c0-2.61 1.67-4.83 4-5.65V4.26C5.55 5.15 3 8.27 3 12zm8 5h2v-2h-2v2zM21 4h-6v6l2.24-2.24C18.32 8.85 19 10.34 19 12c0 2.61-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74 0-2.21-.91-4.2-2.36-5.64L21 4zm-10 9h2V7h-2v6z',
  THUMBS_UP: 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z',
};

/**
 * All svg paths are for viewBox 0 0 100 100
 * Extracted path data from:
 * https://thenounproject.com/
 */
export const NOUN_PROJECT_ICONS = {
  WORD_SEARCH: 'M80.53 25.85a2.67 2.67 0 0 0-.49-.05h-11V13.15a2 2 0 0 0-2.11-2L26 13.49a8.15 8.15 0 0 0-8.08 8.12v55.87A11.39 11.39 0 0 0 29.3 88.85h41.4a11.39 11.39 0 0 0 11.37-11.37V27.79a2 2 0 0 0-1.54-1.94zm-54.46-8.36h.11l38.91-2.22v10.52h-39a4.15 4.15 0 0 1 0-8.3zm52 60a7.38 7.38 0 0 1-7.37 7.37H29.3a7.38 7.38 0 0 1-7.37-7.37V28.66a8.09 8.09 0 0 0 4.14 1.13h52zM56 60.64a12.57 12.57 0 1 0-2.83 2.83l10.2 10.2a2 2 0 1 0 2.83-2.83zm-4.12-1.29a8.54 8.54 0 1 1 2.5-6 8.49 8.49 0 0 1-2.54 6z',
};

export const SRS_ICONS = {
  APPRENTICE: 'M10.41 1.125c1.743-.265 3.53-.11 5.185.463 2.096.73 3.972 2.118 5.295 3.906 1.103 1.523 1.83 3.332 2.03 5.208.287 2.295-.176 4.7-1.346 6.708-1.17 2.096-3.023 3.773-5.23 4.7-2.228.97-4.787 1.147-7.148.53-2.36-.62-4.478-2.05-5.956-3.99-1.28-1.66-2.052-3.71-2.206-5.81-.177-2.42.44-4.896 1.787-6.904 1.7-2.582 4.53-4.39 7.6-4.81zM8.598 6.068c-.86.905-1.413 2.052-1.743 3.244-.354 1.388-.376 2.848-.11 4.258.308 1.434.97 2.846 2.03 3.884.727.728 1.676 1.28 2.713 1.39 1.147.176 2.34-.22 3.243-.905 1.33-1.02 2.17-2.56 2.54-4.15.47-2.14.22-4.48-.84-6.42-.48-.8-1.1-1.57-1.87-2.1s-1.7-.82-2.62-.8c-1.28.02-2.47.66-3.332 1.59zm.287 1.964c.662-1.037 1.83-1.677 3.023-1.92-.86.53-1.59 1.258-2.162 2.096-.64.993-1.08 2.074-1.434 3.177l-.088.066c-.11-1.16 0-2.42.66-3.42z',
  GURU: 'M11.97 1h.066c1.412.022 2.802.264 4.104.814 2.184.88 4.082 2.508 5.296 4.532 1.302 2.156 1.81 4.752 1.456 7.238-.287 2.024-1.17 3.96-2.493 5.522-1.62 1.914-3.89 3.256-6.34 3.718-.49.09-1 .14-1.51.18h-1.16c-.91-.07-1.82-.22-2.68-.48-1.68-.53-3.25-1.46-4.48-2.71-1.66-1.63-2.78-3.81-3.11-6.12-.4-2.46.09-5.078 1.37-7.234 1.17-2.002 2.98-3.63 5.14-4.554 1.34-.594 2.84-.88 4.32-.902zm-.42 17.84c.508.066 1.038.044 1.546-.088.11-.022.198-.066.31-.088.043-.022.087-.022.13-.044.067-.022.134-.044.178-.088h.044c.198-.088.375-.198.573-.308l.03-.022h.03c.05-.044.09-.066.13-.11.09-.044.18-.11.27-.176.05-.022.07-.066.11-.088.42-.33.77-.726 1.11-1.166l.02-.022c.16-.22.31-.462.44-.704.02-.044.07-.11.09-.176.02-.022.05-.066.05-.088.07-.11.11-.242.18-.374.09-.198.15-.396.24-.594.18-.506.31-1.034.38-1.562l.02-.044v-.132c.02-.044.02-.088.02-.132v-.088c.02-.044.02-.066.02-.088v-.11c.02-.044.02-.11.05-.176v-.088c-.02-.022-.02-.044-.02-.066s-.02-.022-.02-.044c-.02-.022-.04-.066-.06-.088-.02 0-.02-.022-.04-.022v-.022l-.02-.022c-.11-.11-.22-.198-.33-.308l-.09-.088-.04-.044-.05-.044-.13-.088-.09.088c-.15.176-.33.33-.48.506-.2.198-.38.396-.57.594-.07.066-.11.132-.18.198h-.02v.022c-.02.022-.02.044-.046.066-.02.022-.04.022-.06.044 0 .022-.02.022-.02.022l-.02.022h-.03c-.02-.022-.02-.044-.04-.066-.02 0-.02-.022-.05-.044-.152-.198-.33-.374-.483-.572-.02-.022-.02-.044-.045-.066l-.02-.022-.02-.022c-.09-.088-.175-.198-.263-.33-.04-.044-.09-.088-.11-.132-.02-.022-.04-.022-.04-.044l-.05-.044c-.02-.022-.045-.066-.09-.088v-.022h-.02s-.02-.022-.02-.044h-.02c0-.022-.024-.022-.024-.044-.02 0-.04-.022-.063-.044l-.02-.022-.024-.022-.04.066c-.084.066-.172.154-.26.242-.023.044-.07.066-.11.11-.11.088-.2.198-.31.286l-.31.308-.11.11c-.13.11-.265.22-.375.352-.07.066-.13.11-.2.176l-.045.044c.025-.022.047-.066.07-.11.02-.022.02-.044.046-.044.046-.066.07-.132.11-.198.07-.11.134-.242.2-.352.067-.11.13-.198.2-.308.11-.176.2-.352.29-.528l.11-.176.04-.066c.09-.176.2-.352.31-.55.09-.132.17-.264.26-.396.11.132.22.264.35.396.13.154.27.286.4.44l.287.33c.07.066.13.154.2.22l.07.066c.04.044.082.088.11.132l.04.044.02.01.02.022.02.022.043.044c.02 0 .02 0 .02.022.02 0 .02 0 .04.022h.02l.05-.044.03-.044c.09-.11.2-.242.287-.374.13-.154.24-.308.372-.462.22-.264.44-.55.68-.814 0-.022.02-.044.046-.066.07.11.16.22.25.308l.07.066c.045.066.11.11.155.176v.022s.02 0 .02.022l.03.022c.02.022.02.044.045.044l.046.044s0 .022.028.022l.02.022c.02 0 .02.022.02.022h.04c.02.022.02.022.04.022h.02c0-.088-.02-.154-.02-.22 0-.044 0-.088-.02-.132v-.132c-.023-.242-.07-.462-.11-.704 0-.022-.023-.066-.023-.088 0-.044-.02-.088-.02-.132-.05-.218-.11-.416-.18-.636-.04-.22-.11-.418-.2-.616-.04-.132-.09-.264-.15-.396-.05-.088-.09-.198-.14-.286-.02-.044-.04-.066-.06-.11-.09-.198-.2-.374-.31-.572-.04-.044-.07-.11-.11-.154-.05-.066-.07-.11-.11-.176-.13-.176-.27-.352-.42-.528-.02-.022-.04-.066-.09-.088-.15-.176-.33-.352-.53-.506v-.022L15 5.586l-.27-.198-.04-.022c-.11-.11-.24-.176-.37-.264-.05-.022-.09-.044-.14-.066-.06-.044-.15-.088-.26-.154 0 0-.023 0-.045-.022h-.023l-.023-.022c-.03 0-.07-.022-.11-.044 0 0-.03 0-.05-.022-.02 0-.05 0-.07-.022-.16-.044-.32-.088-.47-.132l-.02-.022h-.07c-.02-.022-.05-.022-.09-.022l-.03-.022h-.09l-.02-.022c-.05 0-.09 0-.16-.022h-.03c-.09-.022-.16-.022-.24-.022-.05 0-.09-.022-.14-.022h-.29c-.09 0-.18 0-.27.022h-.07c-.06 0-.13.022-.2.022-.04 0-.11.022-.15.022-.13.022-.24.044-.35.088-.07.022-.13.022-.2.044 0 0-.02.022-.04.022-.07.022-.11.044-.18.066h-.048c-.085.044-.15.066-.24.088l-.02.022c-.19.088-.37.176-.525.286-.09.066-.2.132-.29.198-.09.066-.18.11-.25.198H9.1l-.02.022c-.13.11-.24.22-.35.33-.045.044-.11.088-.155.132s-.07.088-.11.132c-.047.066-.09.11-.136.154-.06.066-.13.154-.17.22-.07.088-.13.154-.2.242s-.11.176-.18.286c-.04.044-.06.11-.11.154v.022l-.02.022s0 .022-.02.022l-.02.022-.13.264-.11.242-.16.352c-.02.022-.02.066-.04.088 0 .022 0 .022-.02.044-.02.11-.065.198-.11.286V8.6c-.04.154-.11.33-.15.484 0 .044-.02.066-.02.088-.07.22-.11.418-.16.616l-.07.484h-.02v.154c-.02.066-.02.132-.04.198v.154c-.025.044-.025.088-.025.132 0 .066 0 .132-.02.198v.528c0 .242 0 .484.02.726 0 .066 0 .154.02.22 0 .044 0 .11.02.154v.176l.02.022c.02.242.062.462.11.682v.044l.02.044c.02.088.02.154.044.242.02.066.045.132.067.176 0 .066.03.11.05.154 0 .066.02.132.044.198v.022l.02.022c.02.088.07.198.09.286l.03.022v.022c.02.044.05.088.05.132l.02.044c.045.132.11.264.156.374l.07.132.13.264c.02.022.02.044.04.066v.022c.07.132.16.242.22.374.05.044.07.11.11.154l.137.198c.02.044.05.088.09.11v.022c.02.022.05.044.07.088.02 0 .02.022.043.044v.022h.02c.02.044.068.088.09.132.047.044.09.11.135.154.02 0 .02.022.02.022l.026.022.07.066c.02.044.064.066.09.088l.064.066c.04.066.11.11.17.176.04.022.06.066.11.088.02.022.04.044.06.044v.022l.02.022c.02.022.05.022.07.044.044.022.066.044.088.066l.07.066c.07.022.135.066.2.11 0 .022.02.022.045.044.045.022.07.044.09.066.044.022.09.044.11.066.045 0 .07.022.09.044.065.044.13.066.2.11l.02.022c.025 0 .05.022.07.022l.02.022h.02c.02 0 .02.022.02.022h.05c.02.022.04.022.062.044h.02c.09.044.18.066.263.088l.026.022h.02s.02 0 .02.022c.04 0 .09.022.13.022l.04.022h.042c.06.022.13.044.2.044l.33.066h.11z',
  MASTER: 'M10.82 1.054c1.39-.132 2.825-.022 4.17.353 2.56.707 4.812 2.384 6.246 4.59C22.383 7.765 23 9.862 23 11.957c.023 2.055-.55 4.108-1.632 5.83-1.103 1.787-2.714 3.222-4.59 4.127-1.986.97-4.28 1.302-6.466.95-2.404-.35-4.677-1.56-6.332-3.33-1.545-1.63-2.56-3.75-2.87-5.98-.352-2.47.156-5.058 1.458-7.2 1.72-2.935 4.876-4.966 8.254-5.297zm1.324 19.29c.154 0 .287 0 .42-.022 1.08-.088 2.05-.64 2.824-1.37.706-.683 1.236-1.522 1.61-2.427.553-1.37.707-2.87.597-4.326-.022-.07-.044-.11-.066-.18-.45.62-.95 1.17-1.46 1.74l-.05.15c-.67-.66-1.31-1.33-1.97-1.94-.6.64-1.22 1.28-1.81 1.92-.64-.62-1.37-1.2-2.03-1.81-.07-.07-.2-.09-.24-.03-.53.64-1.08 1.21-1.59 1.85-.44-.42-.95-.75-1.41-1.15-.09-.05-.2-.2-.27-.09-.07 1.39.15 2.78.7 4.06.59 1.37 1.63 2.62 3.02 3.24.13.04.24.09.35.13.44.13.88.22 1.32.22h.02zm-3.75-7.174v.022l.02-.022c.133-.132.244-.243.332-.375.022 0 .022-.022.022-.022.022-.022.022-.045.044-.067H8.57c0-.154.022-.33.044-.485v-.04c0-.02 0-.02.022-.04V12c.022-.044.022-.11.044-.176 0-.023 0-.067.022-.09 0-.043 0-.065.022-.11l.066-.33c.09-.287.177-.552.287-.817.044-.154.11-.265.177-.397v-.022l.044-.044c.022-.09.066-.155.11-.243l.022-.02c.044-.06.066-.11.11-.17 0 0 0-.02.023-.04.022-.02.044-.06.066-.09 0-.02.02-.04.02-.04.02-.02.02-.04.04-.04 0-.02.02-.04.04-.06.02-.02.02-.06.04-.08.04.09.09.18.11.27l.06.13.13.29c.04.07.06.11.08.18.02.05.04.09.06.11v.03c.02.04.04.11.06.16l.02.02c.02.07.04.11.09.18.02.04.02.06.04.11.04.09.09.17.11.26v.13c-.02 0-.02.02-.02.02v.04c-.02.02-.04.07-.04.11-.02.07-.07.13-.09.18 0 .05-.02.09-.05.14.04.02.07.05.09.07l.13.13c.02.03.04.03.04.05.02 0 .02.02.02.02.02 0 .04.03.04.03l.02.02h.02s0 .02.02.02.04.02.04.02c.02 0 .02 0 .02.03h.05s.02 0 .02-.02v-.02c0-.03 0-.05.02-.07v-.05c.02-.04.02-.06.02-.08.03-.04.05-.11.07-.15.05-.11.09-.24.13-.35h2.16c0 .03 0 .05.02.05 0 .02.02.04.02.07.05.14.11.25.16.36.02.02.02.07.02.09.02 0 .07 0 .09-.02h.07c.02-.02.04-.06.09-.11v-.02c.02-.02.04-.04.07-.04 0-.02 0-.02.02-.02.04-.04.06-.08.13-.11v-.02H14v-.02c-.024-.07-.07-.13-.09-.2-.02-.02-.02-.04-.02-.06l-.024-.02c0-.02-.02-.06-.02-.08V11c-.02 0-.02-.02 0-.02v-.09h.023v-.02c0-.026 0-.026.02-.026.07-.13.11-.246.18-.356.04-.086.06-.153.11-.22.04-.11.11-.2.15-.31.09-.2.18-.373.29-.57.02.04.04.09.07.15.04.045.09.11.11.177.04.047.06.09.09.11v.02c.04.048.06.09.08.136.02.02.02.05.04.07 0 .02.02.05.05.09.02.02.02.05.04.07v.02c.02.03.02.05.02.05 0 .02.02.02.02.04.02.06.07.13.09.2.02.04.02.08.04.11.04.11.09.22.11.31.02.02.02.06.02.09.02.02.02.04.04.08l.06.27c.08.35.15.7.19 1.06 0 .09.02.15.02.22v.13h-.22c.02.02.02.04.05.04v.02c.02 0 .02.02.04.02 0 .02.02.04.04.07l.02.03c.08.09.17.18.26.29v.02c.02-.02.04-.05.06-.05.02-.04.06-.06.09-.11h.02c0-.02.02-.02.02-.04.02 0 .02-.02.02-.02.02 0 .02-.02.02-.02.06-.09.13-.18.2-.24.02-.02.04-.07.07-.09l.04-.05.07-.06c0-.02.02-.02.02-.02v-.36c-.03-.11-.03-.22-.05-.33 0-.07-.02-.11-.02-.18 0-.02 0-.05-.02-.07v-.07c0-.04-.03-.09-.03-.13-.04-.22-.11-.44-.17-.66-.02-.05-.02-.09-.04-.13 0-.04-.02-.06-.02-.11-.05-.11-.09-.22-.14-.31-.02-.06-.06-.13-.09-.2-.06-.16-.13-.29-.2-.44-.02-.02-.04-.043-.04-.07-.02-.04-.05-.06-.07-.09-.02-.04-.04-.11-.09-.15-.04-.07-.06-.132-.13-.2 0-.023-.02-.05-.04-.07.02.02.04.02.04.02l.02.027c.06.044.15.09.24.11l.02.02h.02c.11.04.22.08.31.15.02 0 .04 0 .06.02l.44.22c.26.09.53.22.81.33.11.04.24.11.37.15.09.05.18.07.29.11.045 0 .09.03.16.05h.02c.02 0 .02.02.05.02.042 0 .09.02.11.02l.042.03c.11.02.22.064.31.09.06.02.13.02.192.04h.13l.02.025h.09c.02 0 .04-.02.06-.02.024-.02.024-.04.024-.06 0-.046-.02-.11-.02-.16v-.04c-.02-.07-.05-.135-.07-.18-.02-.07-.05-.11-.09-.18 0-.02-.02-.063-.046-.085-.02-.04-.04-.065-.067-.11-.02-.02-.04-.04-.04-.065-.087-.11-.176-.22-.24-.31-.02-.02-.02-.048-.046-.07l-.02-.024V9.1c-.02-.02-.02-.04-.04-.06-.07-.07-.11-.134-.18-.2l-.06-.066c-.18-.18-.336-.36-.51-.51l-.02-.02c-.09-.09-.16-.18-.25-.25-.04-.04-.09-.064-.11-.09l-.02-.02-.04-.04-.04-.02c-.07-.07-.16-.13-.22-.18l-.09-.09-.13-.063c0-.02-.02-.02-.02-.04-.05-.02-.07-.04-.11-.07-.02 0-.05-.02-.07-.02V7.3h-.02c-.05-.025-.07-.047-.11-.07-.09-.067-.2-.11-.31-.177-.05-.024-.07-.024-.09-.046-.046-.02-.09-.045-.13-.045 0-.02-.03-.02-.03-.02-.05-.027-.07-.027-.09-.027l-.02-.02h-.09v-.03c-.18-.027-.33-.05-.51-.05l-.02.025h-.2c-.06.02-.11.02-.17.04-.05 0-.09.02-.11.02-.02 0-.02 0-.05.02-.02 0-.07 0-.09.02h-.02c-.06.04-.11.064-.17.11-.09.04-.17.11-.24.175l-.04.05-.05.05c-.07.068-.11.157-.138.245l-.02.02c-.045-.02-.067-.046-.11-.07-.13-.09-.266-.132-.376-.2h-.05c-.02-.02-.04-.02-.06-.042h-.02l-.02-.02c-.05 0-.09-.02-.13-.04.02-.082.02-.15.04-.24 0-.04 0-.09.02-.13v-.09c0-.042 0-.064.02-.11v-.26c.02-.134.02-.266.02-.4-.02-.022-.02-.044-.02-.044V5.7c0-.067 0-.11-.02-.155v-.06c-.02-.02-.02-.02-.02-.048-.02-.11-.06-.2-.11-.31V5.1c-.08-.2-.22-.4-.31-.6 0 0-.02-.02-.02-.043-.09-.09-.15-.22-.22-.33-.04-.046-.06-.068-.09-.11-.02-.024-.02-.046-.04-.068-.02-.03-.05-.07-.09-.09-.07-.11-.15-.24-.29-.27H12v.02c-.02 0-.02 0-.04.02 0 .02 0 .02-.022.02l-.045.04-.065.06-.02.02c0 .02-.02.02-.02.02 0 .02-.02.02-.02.05-.154.2-.286.4-.397.6-.02.04-.06.09-.09.13-.02.07-.06.13-.11.2-.02.09-.06.15-.11.24 0 .02-.02.05-.04.07 0 .02 0 .04-.02.07v.02l-.06.2c-.02.04-.02.11-.02.15 0 .05-.02.11-.02.16v.13c-.02.22 0 .44 0 .66.02.04.02.06.02.11v.11c0 .02.03.04.03.07v.11c.02.11.04.24.06.35-.07.03-.13.05-.2.09-.07.03-.15.07-.24.09-.02.02-.07.05-.11.07-.02.02-.07.02-.09.05-.02.02-.02.02-.05.02 0 .02-.03.02-.03.02-.03 0-.03.02-.03.02h-.02l-.05.04s-.03 0-.03.02h-.02l-.04.04-.07-.16-.02-.03c0-.02-.02-.07-.04-.09 0-.02-.02-.02-.02-.05l-.04-.04c0-.02-.02-.02-.02-.04-.04-.02-.06-.07-.11-.09v-.02c-.02 0-.04-.02-.06-.05l-.02-.02s-.02 0-.02-.02c-.02-.02-.02-.02-.04-.02-.04-.04-.11-.07-.15-.09-.02-.02-.04-.02-.06-.02-.07-.04-.16-.07-.24-.09H9.1v-.02c-.05 0-.09 0-.134-.02H8.9c-.043 0-.087-.03-.154-.03h-.132c-.088 0-.2.03-.287.03h-.022c-.022.02-.022.02-.044.02h-.02c-.09.05-.2.07-.28.11 0 .02-.02.02-.04.02-.11.05-.22.11-.31.16-.06.04-.11.06-.17.09 0 .02 0 .02-.02.02-.02.02-.04.02-.06.04-.02.02-.04.02-.06.04-.02.02-.04.02-.06.04-.04.04-.11.06-.15.11l-.02.03c-.06.04-.11.09-.17.13l-.02.02h-.03l-.13.13c-.04.02-.06.06-.11.09-.22.2-.42.39-.64.61-.06.09-.15.15-.22.22l-.02.02v.02c-.11.11-.2.22-.29.35-.04.04-.07.06-.09.11-.02.02-.02.04-.04.04v.02h-.03c0 .02 0 .04-.02.04 0 .02-.02.05-.02.05-.02.02-.04.04-.06.09 0 0-.02.02-.02.04-.02.04-.06.09-.09.13L5 9.66v.03l-.02.02s-.02.02-.02.043v.026c-.042.04-.064.09-.086.15 0 .02 0 .05-.02.07v.11c-.02.04 0 .11 0 .15l.02.02v.04h.023v.02H5c.153-.05.31-.07.462-.11h.04c.088-.03.154-.05.242-.07.044-.02.09-.05.133-.05.11-.05.198-.07.31-.11.263-.09.506-.2.77-.31H7c.088-.05.177-.07.243-.11.176-.09.353-.16.53-.25.044-.02.066-.02.11-.04.176-.09.353-.16.53-.25.088-.05.198-.09.308-.14.09-.05.2-.09.31-.16l-.02.02-.04.04c-.04.04-.06.09-.11.13l-.13.2H8.7l-.066.13c-.022.04-.066.08-.088.13-.022.06-.067.15-.11.22-.023.06-.067.13-.11.2 0 .04-.023.06-.023.08-.022.02-.022.04-.044.07l-.2.57-.13.46c-.05.11-.07.24-.09.35v.02l-.03.04v.02c0 .09-.03.15-.05.24l-.07.66v.22l.06.06s.04.02.04.04c.04.04.09.06.13.11.08.04.15.11.24.17l.02.02h.02c0 .02.02.02.02.02l.07.06.02.02.02.02h.02zm1.83-4.48c.574-.44 1.258-.794 1.986-.772.75 0 1.412.376 1.964.86-.11.244-.22.487-.353.73-.15.353-.37.684-.5 1.06-.73.022-1.43 0-2.16.022-.31-.64-.62-1.26-.93-1.9z',
  ENLIGHTENED: 'M10.17 8.888c.5294-.4416 1.191-.773 1.919-.7508.7058-.022 1.345.3533 1.897.795-.1985.596-.5735 1.126-.794 1.7-.044.022-.0882.066-.1323.0882-.6617-.022-1.345 0-2.029 0-.2426-.552-.5073-1.104-.772-1.656-.044-.0662-.0662-.1104-.0882-.1767zM8.557 12.71c.022-1.214.441-2.407 1.169-3.379.2206.574.5735 1.104.772 1.678-.0662.265-.1765.53-.2647.773-.1103.309-.2426.6182-.353.9273h-1.323zm5.203-1.9c.1765-.3975.6396-1.325.6617-1.391.3088.4196.5514.8833.728 1.369.022.0663.044.1325.088.2208.1986.552.2427 1.126.309 1.7h-1.059c-.2427-.552-.5295-1.06-.772-1.612-.0442-.0883 0-.1987.044-.287zm-2.735.508c.7058-.0222 1.412-.0443 2.117 0 .2426.4636.4632.9494.7058 1.413.0662.1324.1765.287.0882.4195-.353.552-.728 1.126-1.059 1.7h-1.544c-.1544-.287-.816-1.457-.9484-1.722.0662-.3533.2426-.6404.353-.9716.022-.089.2866-.795.2866-.84zm-2.47 1.987H9.79c.3088.574.6838 1.148.9484 1.744-.2426.4415-.4852.8832-.75 1.303-.7057-.8834-1.279-1.921-1.434-3.047zm4.852 1.811c.353-.6184.772-1.192 1.103-1.811.3308-.0222.6838 0 1.015 0-.044.3974-.1544.7728-.2867 1.148-.2647.6403-.6176 1.259-1.037 1.833-.2426-.3976-.5073-.795-.794-1.17zm-2.184.309c.5514.022 1.125 0 1.698.022.2867.4638.6396.8834.8823 1.347-.4632.4638-.9705 1.016-1.654 1.082-.7058-.0662-1.257-.574-1.742-1.038.2867-.4636.5294-.9273.816-1.413zm-.46-14.36c1.742-.1987 3.551.022 5.205.6625 2.25.8612 4.191 2.495 5.426 4.549 1.213 1.965 1.765 4.328 1.566 6.625-.1544 2.009-.8823 3.953-2.073 5.587-1.213 1.634-2.867 2.959-4.764 3.71-2.051.839-4.389 1.016-6.551.53-2.385-.54-4.569-1.91-6.113-3.81-1.323-1.59-2.161-3.59-2.382-5.65-.2864-2.34.199-4.768 1.39-6.799 1.213-2.076 3.088-3.754 5.315-4.66.949-.397 1.941-.64 2.975-.75zm1.412 17.64h.022c.0662 0 .1545-.022.2427-.022h.044l.022-.0222h.0442c.066-.022.154-.044.242-.0662h.022c.022 0 .044-.022.066-.022.044-.0222.11-.0442.154-.0663.066-.0442.154-.0884.22-.1325h.044v-.022c.022 0 .044 0 .044-.0222.022 0 .022-.022.044-.022.022-.0222.066-.0442.088-.0663h.022c.022-.022.066-.0663.11-.0884l.022-.022h.022c.132-.133.287-.243.419-.376.044-.044.088-.089.132-.155.044-.022.066-.045.088-.067.022-.044.066-.066.11-.111 0-.022.022-.022.022-.044l.088-.089.044-.044c.088-.111.154-.199.242-.287v-.022h.022c0-.022.022-.045.022-.045 0-.022.022-.044.044-.044v-.023l.022-.022s0-.022.022-.022v-.022l.132-.199c0-.022.044-.044.044-.066l.066-.066c.044.132.088.243.11.375.022.022.022.044.044.066l.066.199c0 .022.022.044.022.044 0 .044.022.066.022.088.022.022.022.022.022.044.022.044.044.066.044.11l.022.022.066.132c0 .022.022.044.022.044.022.022.022.044.022.066.022.022.044.044.044.066l.022.022c.044.066.066.11.11.177l.022.022c.022.022.044.066.066.088.022.022.022.044.044.066.088.088.176.177.265.243h.022l.044.044h.022l.022.022h.022c.022.022.044.022.066.044h.044v.022h.089v.022h.352c.044-.022.066-.022.088-.022l.022-.022c.022 0 .045 0 .089-.022.132-.044.242-.11.353-.199l.066-.066c0-.022.022-.044.044-.066.022-.022.022-.044.044-.044v-.044c.022 0 .022-.022.022-.022.022-.044.044-.066.044-.089.022-.089.044-.155.044-.243v-.176c-.022-.067-.022-.133-.044-.177l-.066-.199c0-.022-.022-.044-.022-.066-.022-.022-.022-.044-.022-.067l-.022-.022c-.132-.265-.309-.53-.485-.773-.044-.044-.088-.111-.132-.155-.022-.045-.066-.067-.088-.111-.022-.022-.066-.066-.088-.111h-.022l-.022-.022c-.088-.132-.199-.265-.331-.375l-.066-.066v-.022h-.022c-.088-.088-.199-.198-.309-.287 0 0-.022-.022-.044-.022.044-.088.088-.177.11-.243.022-.044.022-.066.044-.088 0-.044.022-.088.044-.155 0-.022.022-.044.022-.066.066-.199.11-.42.154-.618.022-.022.022-.044.022-.066 0-.044.022-.089.022-.111 0-.066.022-.11.022-.155.022-.287.044-.574.022-.861v-.11c-.044-.751-.242-1.479-.485-2.186l-.044-.066-.132-.331c-.044-.088-.067-.155-.111-.221-.022-.022-.044-.066-.044-.088-.066-.11-.132-.2208-.22-.331 0-.022-.022-.022-.022-.044l-.022-.022-.0224-.022c-.022-.044-.044-.0665-.0663-.1106.044.044.0886.066.1326.088 0 .022.022.022.044.044.133.044.265.11.397.1544.022.022.0667.044.111.0666.066.022.132.067.198.089.1104.067.243.111.353.155.287.133.5514.265.838.376.022 0 .044.022.066.022.11.0446.242.0887.375.133 0 0 .022.022.044.022h.022l.022.022c.044 0 .088.022.11.022.066.022.132.044.176.066.11.022.198.066.308.0884.022 0 .044 0 .066.022.044 0 .066 0 .11.022h.022c.044 0 .11.022.1766.022h.176v-.022c.022-.044.022-.088 0-.132v-.155c-.022-.022-.022-.066-.044-.11s-.0443-.11-.0664-.154c-.022-.0448-.044-.067-.066-.111l-.022-.022c-.022-.022-.022-.045-.044-.067-.022-.044-.044-.066-.0667-.0883l-.022-.067v-.02c-.0665-.066-.1106-.1325-.1548-.1987-.067-.088-.155-.1543-.221-.243-.044-.066-.089-.11-.133-.1763-.022-.022-.0662-.044-.0883-.088l-.088-.088c-.044-.044-.11-.11-.154-.1764-.044-.022-.066-.0665-.11-.1107-.022 0-.022-.022-.044-.044-.044-.022-.066-.0664-.11-.0885l-.111-.111-.066-.066-.044-.044c-.133-.111-.265-.221-.397-.309-.045-.045-.111-.089-.177-.133l-.022-.022c-.1107-.066-.221-.155-.331-.221-.022-.022-.066-.044-.0886-.066-.066-.022-.1327-.066-.177-.089-.022 0-.044-.022-.066-.022h-.022v-.022h-.022c-.022-.022-.066-.022-.088-.044-.044 0-.066-.022-.088-.022h-.044c0-.022-.022-.022-.044-.022-.088-.022-.1542-.044-.2204-.044v-.022h-.154c-.022 0-.044-.022-.044-.022-.1546 0-.309 0-.463.022-.022.022-.066.022-.0886.022l-.022.022c-.044 0-.066 0-.11.022-.088.022-.1767.066-.265.11 0 0-.022.022-.044.022 0 0 0 .022-.022.022h-.022v.022c-.088.044-.1766.1325-.2427.221l-.022.022-.044.044-.088.088c-.022.022-.044.0443-.066.0443v.022c0-.022-.022-.022-.022-.022-.066-.022-.132-.066-.22-.0885-.022-.022-.066-.044-.088-.066-.044 0-.089-.022-.111-.044h-.022c-.088-.022-.155-.066-.243-.0886v-.045l.022-.044v-.04c0-.044 0-.11.022-.154v-.132c.022-.1106.044-.243.044-.353v-.684c-.022-.0446-.022-.0888-.022-.133V5.81c-.022-.0664-.044-.1547-.066-.221 0-.044-.022-.0662-.022-.1103l-.022-.022c0-.044-.022-.066-.044-.11 0-.022 0-.022-.022-.044 0-.022-.022-.044-.022-.066-.022-.022-.022-.044-.044-.066v-.022l-.022-.022v-.022c-.044-.066-.066-.132-.11-.199-.022-.044-.067-.11-.089-.154l-.022-.022c-.023-.022-.045-.066-.067-.088-.022-.044-.044-.066-.044-.088l-.132-.198-.022-.044c-.0442-.022-.0662-.066-.0883-.11-.022 0-.022-.022-.044-.044 0-.022-.022-.022-.022-.044l-.067-.066-.022-.022c-.022-.022-.044-.044-.088-.066-.022-.022-.066-.022-.088-.022h-.044c-.022 0-.066 0-.088.022-.022 0-.022 0-.022.022-.044.022-.088.066-.11.11h-.022v.022c-.0227 0-.0227.022-.0447.022-.022.045-.044.067-.066.111-.132.155-.2423.331-.331.508-.022.044-.044.066-.066.111-.044.067-.066.111-.11.177-.022.066-.066.133-.0884.199-.022.022-.022.045-.044.067 0 .022 0 .044-.022.044 0 .023 0 .045-.022.067 0 .022-.022.066-.022.088-.022.022-.022.022-.022.044s-.022.044-.022.066c-.022.1107-.044.221-.066.3536v.11c-.022.177-.022.376 0 .552.022.111.022.221.044.332 0 .067.022.155.022.221.022.067.022.133.044.199v.088c-.132.045-.243.089-.375.133-.022.022-.044.022-.066.044-.066.022-.132.066-.1986.11-.044.022-.11.067-.154.089l-.044.044c-.044-.066-.066-.1323-.11-.199-.022-.022-.022-.022-.022-.044-.022 0-.022-.022-.022-.022H9.9V7.6l-.0445-.0444c0-.022-.022-.022-.044-.044l-.022-.022c-.066-.0663-.1544-.1325-.2206-.1767-.133-.089-.265-.155-.419-.199-.022 0-.044-.022-.067-.022-.066 0-.11-.022-.154-.022h-.044c-.022 0-.067-.022-.089-.022h-.331v.022h-.11c-.022 0-.044.022-.088.022-.044.022-.11.022-.154.044h-.022c-.067.022-.111.044-.177.066-.022.022-.066.044-.088.044s-.022.022-.044.022l-.132.066c-.044.022-.111.066-.155.088-.044.022-.11.066-.154.088l-.044.022c0 .022-.022.022-.044.044-.044.022-.111.066-.155.11-.133.088-.243.176-.353.265l-.022.044c-.044.022-.067.044-.111.088-.133.11-.265.221-.375.331-.067.066-.133.132-.199.198-.022.022-.066.066-.088.11-.022.022-.044.044-.066.044v.021l-.022.022c-.133.132-.243.265-.353.397-.044.044-.088.11-.133.177-.044.044-.066.088-.11.154-.022 0-.022.022-.044.044-.022.044-.044.066-.066.11-.044.066-.066.11-.088.155-.022 0-.022.022-.022.044-.022 0-.022.022-.044.044-.022.044-.044.11-.066.176-.022.066-.044.132-.044.198v.177h.198c.066 0 .154-.022.221-.044.11-.022.198-.044.308-.066.022-.022.022-.022.044-.022.088-.022.155-.044.243-.066l.022-.022c.044 0 .089-.022.133-.044h.044l.022-.022c.044 0 .111-.022.177-.044.088-.045.176-.067.242-.111.044 0 .066-.022.11-.022L6.678 10c.044-.022.066-.022.1105-.044.198-.089.375-.155.551-.243l.022-.022c.044 0 .088-.022.132-.044.1763-.089.375-.177.5512-.265l.088-.022c.066-.045.11-.067.176-.089.0444-.022.0885-.044.155-.066.11-.0447.22-.111.33-.155h.044l.022-.022c.044-.022.066-.022.088-.044v.022c-.022.022-.066.044-.088.066 0 .022-.022.022-.022.044s-.0226.022-.0226.044-.044.044-.066.066c-.022.044-.066.0884-.088.1546-.022.022-.044.067-.066.089-.066.1102-.132.221-.176.309l-.066.1324-.022.044-.044.0668c0 .022-.022.044-.022.088l-.0226.022c-.022.066-.044.133-.066.177-.022.0885-.066.155-.088.243-.022.066-.044.1326-.066.177v.044S8 10.795 8 10.817s-.022.044-.022.066 0 .044-.022.0663c0 .044-.022.1102-.044.177-.022.088-.044.1763-.044.243-.022.066-.044.132-.044.1982-.022.022-.022.044-.022.066 0 .066-.0226.132-.0226.199v.022h-.02c0 .132-.022.265-.044.397-.022.199-.022.375-.022.574v.375c0 .088.022.1983.022.287 0 .022 0 .044.022.066 0 .1105.022.243.066.3755.044.265.1327.508.243.773v.022c0 .022.022.044.022.044.022.066.044.1106.066.177 0 0 .022 0 .022.022-.242.221-.485.463-.728.706v.022l-.066.0664c-.088.0884-.154.1767-.22.265l-.022.022c-.022.022-.044.0443-.044.0664l-.0445.044c-.022.022-.044.0664-.066.0884s-.022.044-.044.066l-.022.022c0 .022-.022.022-.022.044-.111.1327-.177.265-.265.42-.022.022-.022.044-.022.044-.022.022-.022.022-.022.044l-.023.0223v.022c-.022.022-.022.0663-.044.1104-.022.022-.022.044-.022.066-.044.089-.066.177-.088.265 0 .067 0 .111-.022.155v.089c0 .066.022.155.044.221l.066.133s0 .022.022.022c0 .022 0 .022.022.044l.022.022c.022.022.044.044.066.088.022.022.044.044.066.044v.022H6.7c0 .022.022.022.044.044 0 0 .022 0 .022.022h.022s0 .023.022.023h.022c.022.022.044.044.089.044.088.066.199.088.331.11h.176c.045 0 .089 0 .133-.022h.022c.022 0 .022 0 .044-.022h.0446l.132-.066c.022-.022.022-.022.044-.022l.0667-.067c.022 0 .045-.022.045-.022.044-.044.066-.066.11-.088 0-.022.022-.044.044-.044v-.022h.022c.022-.044.044-.0666.0665-.1107 0 0 .022 0 .022-.022.022-.022.044-.0663.066-.0884.044-.044.066-.088.0883-.132.022-.044.066-.089.088-.155.022-.044.067-.11.089-.177.022-.044.044-.088.066-.154.044-.088.066-.1765.11-.265v-.022l.022-.022c.022-.11.066-.1986.088-.309.022-.066.044-.1546.066-.221 0-.022.022-.022.022-.044v.022c.022 0 .022.022.022.022.022.022.022.044.0448.0664 0 .022.022.044.044.044.022.044.044.066.066.11.154.199.3082.3757.463.574l.088.0887c.2643.287.551.53.86.773.022.022.044.022.066.0444s.044.044.066.044l.022.022c.022.022.044.0446.088.067.0662.044.1544.088.243.1322.022.022.044.022.066.044l.022.022h.022c.044.022.066.0443.11.0443.022.022.044.022.044.022.022.022.044.022.044.022l.133.066c.044 0 .088.022.11.022h.023c.022.022.044.022.066.022.022.022.066.022.088.022h.022c.044.022.088.022.132.022h.022c.044 0 .066.022.1106.022h.155z',
  BURNED: 'M9.206 1.336c1.276-.33 2.596-.397 3.894-.287 1.98.17 3.916.92 5.5 2.14 1.628 1.19 2.882 2.87 3.63 4.74.44 1.04.638 2.14.77 3.242v1.39c-.11 2.186-.88 4.328-2.2 6.07-1.54 2.033-3.784 3.49-6.27 4.064-2.27.54-4.708.36-6.864-.59-3.168-1.35-5.632-4.28-6.38-7.66-.176-.75-.264-1.55-.286-2.32v-.29c.044-2.18.704-4.323 1.958-6.11C4.432 3.59 6.698 2 9.206 1.34zm2.442 2.804c-.308.486-.66.95-.77 1.5-.066.575-.022 1.15.066 1.7-.286.11-.572.266-.836.42-.2-.31-.442-.596-.772-.706-.506-.155-1.056-.133-1.518.11C6.872 7.65 6.08 8.4 5.42 9.24c-.242.353-.55.684-.506 1.13.132 0 .264.022.374 0 1.276-.287 2.42-.95 3.63-1.435-.704.972-1.1 2.163-1.166 3.378-.132.883.088 1.766.418 2.56-.594.553-1.188 1.15-1.562 1.9-.154.31-.264.684-.132 1.037.132.332.506.486.836.552.308.022.616-.132.814-.353.418-.49.66-1.11.814-1.73.528.682 1.1 1.37 1.826 1.83.462.31 1.034.53 1.606.485.814-.11 1.474-.66 2.002-1.236.33-.31.55-.708.836-1.016.22.64.44 1.37 1.012 1.81.44.396 1.144.175 1.43-.31.176-.398.044-.88-.176-1.236-.396-.644-.902-1.17-1.43-1.68-.11-.09 0-.2.022-.31.198-.53.33-1.08.374-1.656 0-1.39-.352-2.803-1.144-3.95 1.056.506 2.134 1.037 3.278 1.324.154.042.286.042.44.02 0-.177 0-.354-.11-.508-.308-.552-.748-1.06-1.188-1.5-.55-.53-1.144-1.016-1.848-1.303-.704-.244-1.606-.067-1.98.617-.242-.132-.506-.243-.748-.353.11-.53.11-1.084.066-1.636-.066-.397-.308-.77-.528-1.125-.154-.24-.308-.53-.55-.73-.22-.11-.374.18-.484.31zm-.198 3.952c.682-.177 1.452-.044 2.046.353.99.618 1.606 1.722 1.892 2.826.176.78.286 1.57.11 2.34-.286 1.06-.836 2.06-1.518 2.9-.44.488-.902.996-1.54 1.19-.396.136-.814-.063-1.144-.262-.58-.38-1.06-.91-1.478-1.44-.506-.7-.946-1.47-1.144-2.34-.154-.57-.11-1.19-.022-1.76.154-1.11.616-2.186 1.404-2.98.396-.376.858-.685 1.386-.817zm.33 1.06c.418.53.616 1.302.308 1.943-.286.596-.99.795-1.43 1.258-.44.574-.484 1.413-.132 2.03.242.42.682.707 1.122.862.506.2 1.056.088 1.54-.11.44-.177.638-.685.66-1.127.022-.596-.176-1.192-.396-1.722-.088-.154-.11-.353-.264-.44.044.485.154 1.06-.176 1.478-.132.2-.418.2-.55 0-.242-.265-.396-.73-.132-1.038.308-.33.726-.596.858-1.06.088-.397.088-.883-.198-1.214-.33-.395-.73-.75-1.21-.86zm-.858 4.923c-.22-.353-.132-.795 0-1.17.022.53.176 1.082.55 1.48.176.176.396.286.594.418-.44-.088-.924-.31-1.144-.728z',
};

const ICONS = Object.assign(POLYMER_ICONS, NOUN_PROJECT_ICONS, SRS_ICONS);
export default ICONS;
