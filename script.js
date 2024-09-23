document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const searchHistoryList = document.getElementById("search-history");
    const clearBtn = document.getElementById("clear-btn");
    

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];


    const renderHistory = () => {
        searchHistoryList.innerHTML = ''; 
        searchHistory.forEach((search) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = search;
            searchHistoryList.appendChild(li);
        });
    };


    if (searchHistory.length === 0) {
        fetch('search_history.json')
            .then(response => response.json())
            .then(data => {
                searchHistory = data.searches || [];
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); 
                renderHistory(); 
            })
            .catch(error => console.error('Error fetching search history:', error));
    } else {

        renderHistory();
    }

  
    searchBtn.addEventListener("click", function () {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            searchHistory.push(searchTerm);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory)); 
            renderHistory();
            searchInput.value = '';
        }
    });

    clearBtn.addEventListener("click", function () {
        searchHistory = [];
        localStorage.removeItem("searchHistory");
        renderHistory();
    });
});
