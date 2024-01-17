$(document).ready(function(){
      function getQueryParam(key) {
                    const urlParams = new URLSearchParams(
                        window.location.search
                    );
                    return urlParams.get(key);
                }
                let novelId = getQueryParam("id");
      fetch('data.json')
      .then(response => {
        if(!response.ok){
          throw new Error('Failed to load data');
        }
        return response.json();
      })
      .then(data => {
        let novel = data.find(item => item.id === novelId);
        
        if(novel){
        
          $('#item-top-link').text(novel.title);
          $('#title-page').text(novel.title);
          $('#cover-page').attr('src', novel.cover);
          $('#downloadBtn').attr('data-src', novel.link);
        }
                        
      })
      .catch(error => {
        console.log(error)
      });
      
  const urlParams = "https://api.jikan.moe/v4/manga/"+novelId;
  
  fetch(urlParams)
  .then(response => {
    if(!response.ok){
       throw new Error('Failed to load data');
    }
    return response.json();
  })
  .then(data => {
    
    const results = data.data;
    
    $('#status').text(results.status);
    $('#type').text(results.type);
    $('#synopsis').html(results.synopsis);
    
    const genres = results.genres;
    genres.forEach(genre => {
      $('#genres').append("<li class='list-group-item bg-dark text-white'>"+genre.name+"</li>")
    })
    
  })
  .catch(error => {
    console.log(error)
  });
  
  $('#downloadBtn').click(function(){
    window.location.href = $(this).attr('data-src');
  })
   
   
   //   Disqus
   var disqus_config = function () { 
   this.page.url = window.location.href; 
   this.page.identifier = novelId;
   };
    (function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://EXAMPLE.disqus.com/embed.js'; s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s); })();
   
});