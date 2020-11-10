$(document).ready(function () {
  /**
   * Testing that the URL bar should always contains a # value
   */
  QUnit.module("Initial Document Load", function () {
    QUnit.test("The URL bar should always contain a # value", function (
      assert
    ) {
      assert.true(
        window.location.hash.includes("#"),
        "window.location.hash includes a hash value"
      );
    });
  });
  /**
   * Testing the sort dropdown contains 3 items
   */
  QUnit.module("Sort Select Setup", function () {
    QUnit.test("Sort Select should contain 3 items", function (assert) {
      assert.equal(
        $("#sort-data").children().length,
        3,
        "The sort select should contain 3 items"
      );
    });
  });
  /**
   * Testing the auth connection with spotify
   */
  QUnit.module("Initial Spotify Auth Request", function () {
    QUnit.test("User should have been granted an auth token", function (
      assert
    ) {
      assert.true(
        JSON.parse(sessionStorage.getItem("token")) !== null,
        "The user has been granted an access token"
      );
    });
  });
  /**
   * Testing subsequent spotify data requests
   */
  QUnit.module("Subsequent Spotify Data Request", function () {
    QUnit.test("Populate container with data (Waits 1000 ms)", function (
      assert
    ) {
      // console.log("running!", $("#data-container #item-list").children());
      var done = assert.async();
      setTimeout(() => {
        assert.true(
          $("#data-container #item-list").children().length > 0,
          "The data container has been populated with data"
        );
        done();
      }, 1000);
    });
  });
});
