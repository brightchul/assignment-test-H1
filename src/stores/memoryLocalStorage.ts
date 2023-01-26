class MemoryLocalStorage {
  data: Record<string, string>;
  window: Window | undefined;

  constructor() {
    this.window = undefined;
    this.data = Object.create(null);
  }

  setWindow() {
    if (typeof window === 'undefined') {
      return;
    }
    this.window = window;
  }
  sync(key: string) {
    if (!this.checkMemoryWindow()) {
      return;
    }

    const jsonData = localStorage.getItem(key);
    if (typeof jsonData !== 'string') return;
    const data = JSON.parse(jsonData);
    Object.keys(data).forEach((key) => (this.data[key] = data[key]));
  }

  checkMemoryWindow() {
    return this.window !== undefined;
  }

  hasItem(key: string) {
    if (!this.checkMemoryWindow()) {
      return false;
    }
    const item = this.getItem(key);
    return !!item;
  }

  setItem(key: string, item: string) {
    if (this.checkMemoryWindow()) {
      localStorage.setItem(key, item);
    }
    this.data[key] = item;
  }

  getItem(key: string) {
    if (this.checkMemoryWindow()) {
      return localStorage.getItem(key);
    }
    return this.data[key] ?? null;
  }

  removeItem(key: string) {
    if (this.checkMemoryWindow()) {
      localStorage.removeItem(key);
    }
    delete this.data[key];
  }
}

const memoryLocalStorage = new MemoryLocalStorage();
export default memoryLocalStorage;
