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
function filterByTagInput() {
  // Get user search input, remove punctuation and break words
  var inputTags = $("#search-tag-input").val().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
  console.log(inputTags)
  
  var filteredResults = [];

  $.ajax({
    url: "https://lingumi-take-home-test-server.herokuapp.com/videoTutorials/",
    type: "GET",
    success: function(result) {
      result.forEach(function(video) {
        var videoTags = video.tags;
        inputTags.forEach(function(tag) {
          // Capitalise input tag to match API response
          var capitalisedTag = tag.charAt(0).toUpperCase() + tag.slice(1)
          
          if (videoTags.includes(capitalisedTag)) {
            filteredResults.push(video)
          }
        })
      })
      // Remove Duplicates from filteredResults Array
      var finalResult = filteredResults.filter((data, index) => {
        return filteredResults.indexOf(data) === index;
      })
      buildResultList(finalResult)
    },
    error: function(error) {
      console.log(error);
    }
  })
}

// Search Video Titles and Teachers by user input
function filterBySearchInput() {
  // Get user search input
  var input = $("#search-input").val();
  
  var filteredResults = [];

  $.ajax({
    url: "https://lingumi-take-home-test-server.herokuapp.com/videoTutorials/",
    type: "GET",
    success: function(result) {
      result.forEach(function(video) {
        var videoTitle = video.videoTitle.toLowerCase();
        var teacher = video.teacherName.toLowerCase()       
        if (videoTitle.match(input.toLowerCase())) {
          filteredResults.push(video)
        }
        if (teacher.match(input.toLowerCase())) {
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