export default class VideoSearchStore {
  constructor() {
    this.state = {
      query: '',
      results: []
    };
  }

  setQuery(value) {
    this.state.query = value;
  }

  setResults(value) {
    this.state.results = value;
  }

};

