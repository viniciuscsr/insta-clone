class SortingMechanism {
  constructor(arrayWithPosts) {
    this.arrayWithPosts = arrayWithPosts;
    this.sortedPosts = [];
  }
  mostRecent() {
    this.sortedPosts = this.arrayWithPosts.sort(function (a, b) {
      return b.date - a.date;
    });
  }
}

module.exports = SortingMechanism;
