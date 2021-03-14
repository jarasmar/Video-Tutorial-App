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
    <span><h3><a href="${video.videoUrl}" target=blank>${video.videoTitle}</a></h3></span>\
    <span class="teacher-name">${video.teacherName}</span>\
    <span class="tags-list">${video.tags}</span>\
    <span class='rating'>${(video.averageUserRating * 10).toFixed(2)}&#9733;</span>\
    </li>`)
  });
}

// Style tags
function styleTags(tags) {
  console.log(tags)
}

// Refresh Search Functionality
function refreshSearch() {
  // Clear Other inputs and messages from previous searches
  $("#search-input").val('')
  $("#search-tag-input").val('')
  $("#info-box").hide();

  downloadAllVideos();
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
}

// Filter by tags functionality
function filterByTagInput() {
  // Clear Other inputs and messages from previous searches
  $("#info-box").hide();
  $("#search-input").val('')

  // Get user search input, remove punctuation and break words into an array
  var inputTags = $("#search-tag-input").val().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(" ");
  
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
      var nonDuplicatesArray = filteredResults.filter((data, index) => {
        return filteredResults.indexOf(data) === index;
      })

      // Get the top 20 ratings for our search result videos
      var ratingsArray = nonDuplicatesArray.map(video => video.averageUserRating)
      var top20RatingsArray = ratingsArray.sort().reverse().slice(0, 20);

      // Get the videos with those 20 higher ratings
      var top20Videos = [];
      top20RatingsArray.forEach(function(rate) {
        top20Videos.push(nonDuplicatesArray.find( video => video.averageUserRating === rate))
      })

      // Build Results or render info message if no results
      if (top20Videos.length > 0) {
        buildResultList(top20Videos);
      } else {
        $("#result-list").empty();
        $("#info-box").show();
      }

    },
    error: function(error) {
      console.log(error);
    }
  })
}


// Search Video Titles and Teachers by user input
function filterBySearchInput() {
  // Clear Other inputs and messages from previous searches
  $("#info-box").hide();
  $("#search-tag-input").val('')
  
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
      
      // Build Results or render info message if no results
      if (filteredResults.length > 0) {
        buildResultList(filteredResults);
      } else {
        $("#result-list").empty();
        $("#info-box").show();
      }
    },
    error: function(error) {
      console.log(error);
    }
  })

}

// Change Search options
function changeToFreeSearch() {
  $("#free-search-container").show()
  $("#tag-search-container").hide()

  $("#tag-nav-btn").removeClass("active");
  $("#free-search-nav-btn").addClass("active");
}
function changeToTagSearch() {
  $("#free-search-container").hide()
  $("#tag-search-container").show()

  $("#tag-nav-btn").addClass("active");
  $("#free-search-nav-btn").removeClass("active");
}
