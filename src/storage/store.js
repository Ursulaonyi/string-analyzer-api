const stringStore = new Map();

const store = {
  set(id, data) {
    stringStore.set(id, data);
  },

  get(id) {
    return stringStore.get(id);
  },

  getAll() {
    return Array.from(stringStore.values());
  },

  exists(id) {
    return stringStore.has(id);
  },

  delete(id) {
    return stringStore.delete(id);
  },

  clear() {
    stringStore.clear();
  }
};

module.exports = store;