//You can build different versions of this file that work with
// localStorage, Cache API, Fetch, IndexedDB, or other data source
//This version is using localStorage

const datasource = {
  key: 'somethingUniqueAsKey',
  storage: localStorage,
  _data: [],
  readAll() {
    //get all the data
    this._data = JSON.parse(this.storage.getItem(this.key));
    return this._data;
  },
  readOne(uid) {
    //get the details of one item
    let all = JSON.parse(this.storage.getItem(this.key));
    let one = all.find((item) => item.uid === uid);
    return one;
  },
  addOne(item) {
    //add a single item
    let all = JSON.parse(this.storage.getItem(this.key));
    all.push(item);
    this.storage.setItem(this.key, JSON.stringify(all));
    //return updated reference to array
    this._data = all;
    return all;
  },
  replaceOne(item) {
    //replace a single item
    let all = JSON.parse(this.storage.getItem(this.key));
    all = all.map((_item) => {
      if (_item.uid === item.uid) {
        return item;
      } else {
        return _item;
      }
    });
    this.storage.setItem(this.key, JSON.stringify(all));
    this._data = all;
    //return updated reference to array
    return all;
  },
  replaceAll(data) {
    //replace all the data with new data
    this.storage.setItem(this.key, JSON.stringify(data));
    this._data = data;
    return true;
  },
  deleteOne(uid) {
    //delete one item
    let all = JSON.parse(this.storage.getItem(this.key));
    all = all.filter((item) => item.uid !== uid);
    this.storage.setItem(this.key, JSON.stringify(all));
    this._data = all;
    //return updated reference to array
    return all;
  },
  deleteAll() {
    //delete everything
    this.storage.removeItem(this.key);
    this._data = [];
    return true;
  },
};

export default datasource;
