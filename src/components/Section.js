export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems() {
        this.clear();
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }

    clear() {
        this._container.innerHTML = "";
    }
    appendItem(element) {
        this._container.append(element);
    }
    prependItem(element) {
        this._container.prepend(element);
    }
}