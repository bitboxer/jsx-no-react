function appendChild(elem, children) {
  if(!children || children === undefined)
    return;

  if(children instanceof Array) {
    children.map((child) => appendChild(elem, child));
    return;
  }

  let child = children;

  if (!(child instanceof Node)) {
    child = document.createTextNode(child.toString());
  }

  elem.appendChild(child);
}

function splitCamelCase(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function createElement(elem, attrs) {
  if(typeof elem.render === 'function')
    return elem.render();

  if(elem instanceof Function)
    return elem(attrs);

  if(elem instanceof HTMLElement)
    return elem;

  return document.createElement(elem);
}

export function render(elem, parent) {
  parent.insertAdjacentElement('afterbegin', elem);
}

export default function(tag, attrs, ...children) {
  const elem = createElement(tag, attrs);

  if (attrs === null || attrs === undefined) attrs = {};
  for (let [attr, value] of Object.entries(attrs)) {
    if (value === true) elem.setAttribute(attr, attr);
    else if(attr.startsWith('on') && typeof value === 'function') {
      elem.addEventListener(attr.substr(2).toLowerCase(), value);
    }
    else if (value !== false && value !== null && value !== undefined) {
      if(value instanceof Object) {
        const modifier = attr === 'style' ?
          splitCamelCase :
          (str) => str.toLowerCase();

        value = Object.entries(value).map(
          ([key, val]) => `${modifier(key)}: ${val}`
        ).join('; ');
      }

      if(attr === 'className' && value !== '')
        elem.classList.add(...value.toString().trim().split(' '));
      else
        elem.setAttribute(attr, value.toString());
    }
  }

  for (const child of children) {
    appendChild(elem, child);
  }

  return elem;
}
