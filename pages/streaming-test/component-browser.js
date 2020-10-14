module.exports = {
  onMount() {
    console.log("streaming-test: onMount is called");
  },
  onSearchChange(value){
    console.log(value);
    this.state.search = value;
  }
};