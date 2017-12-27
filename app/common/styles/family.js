/* eslint-disable no-shadow */

// Select all children from the first to `num`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
export function first(num, content) {
  return `&:nth-child(-n + ${num}) {
    ${content}
  }`;
}

// Select all children from the last to `num`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
export function last(num, content) {
  return `&:nth-last-child(-n + ${num}) {
    ${content}
  }`;
}

// Select all children after the first to `num`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
export function afterFirst(num, content) {
  return `&:nth-child(n + ${num + 1}) {
    ${content}
  }`;
}

// Select all children before `num` from the last.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
export function fromEnd(num, content) {
  return `&:nth-last-child(${num}) {
   ${content}
 }`;
}

// Select all children between `first` and `last`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function between(first, last, content) {
  return `&:nth-child(n + ${first}):nth-child(-n + ${last}) {
    ${content}
  }`;
}

// Select all even children between `first` and `last`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function pairBetween(first, last, content) {
  return `&:nth-child(even):nth-child(n + ${first}):nth-child(-n + ${last}) {
    ${content}
  }`;
}

// Select all odd children between `first` and `last`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function impairBetween(first, last, content) {
  return `&:nth-child(odd):nth-child(n + ${first}):nth-child(-n + ${last}) {
    ${content}
  }`;
}

// Select all `num` children between `first` and `last`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function nBetween(num, first, last, content) {
  return `&:nth-child(${num}n):nth-child(n + ${first}):nth-child(-n + ${last}) {
    ${content}
  }`;
}


// Select all children but `num`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
export function allBut(num, content) {
  return `&:not(:nth-child(${num})) {
    ${content}
  }`;
}

// Select children each `num`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
// @alias every
export function each(num, content) {
  return `&:nth-child(${num}n) {
    ${content}
  }`;
}

// Select children each `num`.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
export function every(num, content) {
  return `&:nth-child(${num}n) {
    ${content}
  }`;
}

// Select the `num` child from the start and the `num` child from the last.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
export function fromFirstLast(num, content) {
  return `&:nth-child(${num}),
  &:nth-last-child(${num}) {
    ${content}
  }`;
}


// Select the item in the middle of `num` child. Only works with odd number
// chain.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
export function middle(num, content) {
  return `&:nth-child(#{round(num / 2)}){
    ${content}
  }`;
}


// Select all children between the `num` first and the `num` last.
// @group with-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @param {number} num - id of the child
export function allButFirstLast(num, content) {
  return `&:nth-child(n + ${num}):nth-last-child(n + ${num}) {
    ${content}
  }`;
}


// This I/O mixin will only select the first of `$limit` items. It will not
// work if there is not as much as item as you set in `$limit`.
// @group io
// @param {number} $limit
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function firstOf(limit, content) {
  return `&:nth-last-child(${limit}):first-child {
   ${content}
 }`;
}

// This I/O mixin will only select the last of `$limit` items. It will not
// if there is not as much as item as you set in `$limit`.
// @group io
// @param {number} $limit
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function lastOf(limit, content) {
  return `&:nth-of-type(${limit}):nth-last-of-type(1) {
    ${content}
  }`;
}

// Select all even children.
// @group no-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function even(content) {
  return `&:nth-child(even) {
    ${content}
  }`;
}

// Select all odd children.
// @group no-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function odd(content) {
  return `&:nth-child(odd) {
    ${content}
  }`;
}

// Select only the first and last child.
// @group no-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function firstLast(content) {
  return `&:first-child,
  &:last-child {
    ${content}
  }`;
}

// Will only select the child if it’s unique.
// @group no-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
// @alias only
export function unique(content) {
  return `&:only-child {
    ${content}
  }`;
}

// Will only select the child if it’s unique.
// @group no-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function only(content) {
  return `&:only-child {
    ${content}
  }`;
}

// Will only select children if they are not unique. Meaning if there is at
// least 2 children, the style is applied.
// @group no-arguments
// ${content} [Write the style you want to apply to the children, and it will be added within the ${content} directive]
export function notUnique(content) {
  return `&:not(:only-child) {
    ${content}
  }`;
}
