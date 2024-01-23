$(document).ready(function() {
  function getQueryParam(key) {
    const urlParams = new URLSearchParams(
      window.location.search
    );
    return urlParams.get(key);
  }
  let novelId = getQueryParam("id");
  
  const urlInfo = "https://api.jikan.moe/v4/manga/" + novelId;

  fetch(urlInfo)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      return response.json();
    })
    .then(data => {

      const results = data.data;

      $('#status').text(results.status);
      $('#type').text(results.type);
      $('#synopsis').html(results.synopsis);
      $('#item-top-link').text(results.title_english);
      $('#title-page').text(results.title_english);
      $('#cover-page').attr('src', results.images.jpg.large_image_url);

      const genres = results.genres;
      genres.forEach(genre => {
        $('#genres').append("<li class='list-group-item bg-dark text-white'>" + genre.name + "</li>")
      })

    })
    .catch(error => {
      console.log(error)
    });

  $('#downloadBtn').click(function() {
    window.location.href = $(this).attr('data-src');
  })


  //   Disqus
  var disqus_config = function() {
    this.page.url = window.location.href;
    this.page.identifier = novelId;
  };
  (function() {
    var d = document,
      s = d.createElement('script');
    s.src = 'https://novel-downloader.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();

});