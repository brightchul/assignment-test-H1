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
    if (this.window === undefined) {
      return;
    }
    const jsonData = localStorage.getItem(key);

    if (typeof jsonData !== 'string') return;
    const data = JSON.parse(jsonData);
    Object.keys(data).forEach((key) => (this.data[key] = data[key]));
  }

  setItem(key: string, item: string) {
    if (this.window !== undefined) {
      localStorage.setItem(key, item);
    }
    this.data[key] = item;
  }

  getItem(key: string) {
    if (this.window !== undefined) {
      return localStorage.getItem(key);
    }
    return this.data[key] ?? null;
  }

  removeItem(key: string) {
    if (this.window !== undefined) {
      localStorage.removeItem(key);
    }
    delete this.data[key];
  }
}

const memoryLocalStorage = new MemoryLocalStorage();
export default memoryLocalStorage;
