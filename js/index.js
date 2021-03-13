// Call API to get all available JSON data
function downloadAllVideos() {
  $.ajax({
    url: "https://lingumi-take-home-test-server.herokuapp.com/videoTutorials/",
    type: "GET",
    success: function(result) {
      buildResultList(result)
    },
    error: function(error) {
      console.log(error);
    }
  })
}

// Build List with API result
function buildResultList(list) {
  var listContainer = $("#result-list")
  
  list.forEach(function(video) {
    $(listContainer).append(`<li class="list-item" id="${video.id}">\
    <span><a href="${video.videoUrl}" target=blank>${video.videoTitle}</a></span>\
    <span>Tags: ${video.tags}</span>\
    <span>Teacher: ${video.teacherName}</span>\
    </li>`)
  });
}
