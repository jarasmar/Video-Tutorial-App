// Call API to get all available JSON data
function downloadAllVideos() {
  $.ajax({
    url: "https://lingumi-take-home-test-server.herokuapp.com/videoTutorials/",
    type: "GET",
    success: function(result) {
      buildResultList(result)
      getAllAvailableTags(result)
    },
    error: function(error) {
      console.log(error);
    }
  })
}

// Build List with API result
function buildResultList(list) {
  var listContainer = $("#result-list")
  // Clear previous results
  listContainer.empty();
  
  list.forEach(function(video) {
    $(listContainer).append(`<li class="list-item" id="${video.id}">\
    <span><a href="${video.videoUrl}" target=blank>${video.videoTitle}</a></span>\
    <span>Tags: ${video.tags}</span>\
    <span>Teacher: ${video.teacherName}</span>\
    </li>`)
  });
}

// Get List of all tags used at the API result
function getAllAvailableTags(list) {
  var tagsArray = [];
  
  list.forEach(function(video) {
    var tags = video.tags;
    tags.forEach(function(tag) {
      if (!tagsArray.includes(tag)) {
        tagsArray.push(tag);
      }
    })
  })
  // addTagOptionsToSelect(tagsArray)
}

// Add tags dynamically to the selector
// function addTagOptionsToSelect(tags) {
//   var tagsSelector = $("#tag-selector");

//   tags.forEach(function(tag) {
//     var option = document.createElement("option");
//     option.text = `${tag}`;
//     option.value = `${tag}`;
//     console.log(option)
//     $(tagsSelector).add(option, null);
//   })
// }

// Filter by tags functionality
function filterByTag(tag) {
  var filteredResults = [];

  $.ajax({
    url: "https://lingumi-take-home-test-server.herokuapp.com/videoTutorials/",
    type: "GET",
    success: function(result) {
      result.forEach(function(video) {
        var videoTags = video.tags;
        if (videoTags.includes(tag)) {
          filteredResults.push(video)
        }
      })
      buildResultList(filteredResults)
    },
    error: function(error) {
      console.log(error);
    }
  })
}