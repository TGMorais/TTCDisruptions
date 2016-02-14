export default class Cache {

  _cache = {}

  get(key) {
    return this._cache[key];
  }

  set(key, value, lifetime) {
    this._cache[key] = value;
    return true;
  }

  has(k) {
    return this._cache[k] != null;
  }
}
