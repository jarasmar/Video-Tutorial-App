// Call API to get all available JSON data
function downloadAllVideos() {
  $.ajax({
    url: "https://lingumi-take-home-test-server.herokuapp.com/videoTutorials/",
    type: "GET",
    success: function(result) {
      console.log(result);
    },
    error: function(error) {
      console.log(error);
    }
  })
}