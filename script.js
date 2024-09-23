document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const searchHistoryList = document.getElementById("search-history");
    const clearBtn = document.getElementById("clear-btn");
    
    // Initialize search history from localStorage or fall back to an empty array
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Function to render search history
    const renderHistory = () => {
        searchHistoryList.innerHTML = ''; // Clear current history
        searchHistory.forEach((search) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = search;
            searchHistoryList.appendChild(li);
        });
    };

    // Fetch search history from search_history.json if localStorage is empty
    if (searchHistory.length === 0) {
        fetch('search_history.json')
            .then(response => response.json())
            .then(data => {
                searchHistory = data.searches || [];
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); // Save to localStorage
                renderHistory(); // Render the initial search history
            })
            .catch(error => console.error('Error fetching search history:', error));
    } else {
        // If there is history in localStorage, render it directly
        renderHistory();
    }

    // Add search term to history, update localStorage and re-render
    searchBtn.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            searchHistory.push(searchTerm);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); // Save to localStorage
            renderHistory();
            searchInput.value = '';  // Clear input
        }
    });

    // Clear search history from both UI and localStorage
    clearBtn.addEventListener("click", function () {
        searchHistory = [];
        localStorage.removeItem("searchHistory"); // Remove from localStorage
        renderHistory();
    });
});
