import movies from "./movies.js";

const searchBar = document.querySelector(".search-bar");
const searchResult = document.querySelector(".search-results");
const searchContent = document.querySelector(".search-content");

// movie details access
const movieBox = document.querySelector(".movie-box");
const movieImage = document.querySelector(".movie-image");
const movieTitle = document.querySelector(".movie-title");
const publishDate = document.querySelector(".publish-date");
const runTime = document.querySelector(".run-time");
const movieDescription = document.querySelector(".movie-description");
const category = document.querySelector(".category");
const categoriesBox = document.querySelector(".categories-box");


searchBar.addEventListener("input", refreshResults);

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("search-content")) {
        fillSearchBar(event.target.textContent);
    } else if (event.target.classList.contains("search-button")) {
        handleMovieSearch(searchBar.value);
    }
})

// a function that clears the results on input ^ from userso that the field constantly updates based on input!
function refreshResults() {
    searchResult.innerHTML = '';
    fetchSearchContentResults();
}

function clearResults() {
    searchResult.innerHTML = '';
}

// a function to fetch search results for adaptive typing
function fetchSearchContentResults() {

    // getting the current user query
    const query = searchBar.value.toLowerCase();

    // counter to help minimize movie overflow
    let counter = 0;

    for(let i = 0; i < movies.length; i++) {
        if (movies[i].title.toLowerCase().includes(searchBar.value) == true && query.length >= 2 &&  counter <= 4) {
            // creating a new search-content element
            const titleElement = document.createElement("a");

            // adding the search-content class for appending
            titleElement.classList.add("search-content");

            // giving the search-content some content ;)
            titleElement.textContent = movies[i].title;

            // appending the search-content a tag to the search-result parent div
            searchResult.appendChild(titleElement);

            // increment the counter to prevent movie list overflow
            counter++;
        }
    }
}

function fillSearchBar(searchContentResult) {
    searchBar.value = searchContentResult;
    clearResults();
}

function handleMovieSearch(_movieTitle) {
    for(let i = 0; i < movies.length; i++) {
        if (movies[i].title == _movieTitle) {
            // clearing any other posters that may reside already
            movieImage.innerHTML = '';

            // declaring a new img tag to be appended to a parent
            let poster = document.createElement("img");

            // adding the pre-made poster class defined in css
            poster.classList.add("movie-poster");

            // making the source for the poster match the corresponding movie title
            poster.src = movies[i].poster;

            // appending the poster to be displayed within the parent div
            movieImage.appendChild(poster);

            // making the movie details visible, and applying corresponding values
            movieBox.style.visibility = 'visible';
            movieTitle.textContent = movies[i].title;
            publishDate.textContent = movies[i].year;
            runTime.textContent = movies[i].runningTime;
            movieDescription.textContent = movies[i].description;
            
            for (let j = 0; j < movies[i].genre.length; j++) {
                // clearing any other genre tags that may reside already
                categoriesBox.innerHTML = '';

                // declaring a new a tag to be appended to a parent
                let genre = document.createElement("a");

                // adding the premade category class defined in css
                genre.classList.add("category");

                // adding text content so it doesn't append and end up blank
                genre.textContent = movies[i].genre[j];

                // appending the tag to be displayed within the parent div
                categoriesBox.appendChild(genre);
            }

            
            return true;
        }
    }
    return false;
}

