function search() {
  const query = prompt('Enter your search query:');
  const apiUrl = '/api.json';

  if (query !== null) {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const results = performSearch(data, query);

        if (results.length === 0) {
          alert('No results found for your search query.');
        } else if (results.length === 1) {
          window.location.href = "/post/" + stringToSlug(results[0].file) + ".html"
        } else {
          displayResults(results);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
}

function performSearch(data, query) {
  const results = [];

  for (const key in data.post) {
    const post = data.post[key];
    const title = post.title || '';
    const body = post.body || '';

    if (title.toLowerCase().includes(query.toLowerCase()) || body.toLowerCase().includes(query.toLowerCase())) {
      results.push(post);
    }
  }

  return results;
}

function displayResults(results) {
  const resultsContainer = document.getElementById("search-result-container");
  resultsContainer.classList.add('search-results');
  resultsContainer.innerHTML += "<h3>Search Results</h3>"
  const resultList = document.createElement('ul');
  results.forEach((result) => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = "/post/" + stringToSlug(result.file) + ".html";
    link.textContent = result.title;
    listItem.appendChild(link);
    resultList.appendChild(listItem);
  });

  resultsContainer.appendChild(resultList);
}

function stringToSlug(input) {
  return input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
