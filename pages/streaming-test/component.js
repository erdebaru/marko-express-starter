module.exports = {
  onCreate(){
    console.log("streaming-test: onCreate is called");
    this.state = {
      stateful: "I have became stateful",
      search: ""
    }
  }
}