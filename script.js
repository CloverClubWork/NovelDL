$(document).ready(function(){
  
  const urlParam = "data.json";
  
  fetch(urlParam)
  .then(response => {
    if(!response.ok){
      throw new Error('Error to retrieve data from server');
    }
    return response.json();
  })
  .then(data => {
    
    const results = data;
    results.forEach(items => {
      
      const item = `
        <div class='col-md p-3 bg-dark border border-0 rounded-1 item mt-2 mb-2'>
          <div class='container p-0 m-0 rounded-1 cover'>
            <img src='`+items.cover+`' slt='Cover'/>
            <div class='top-badge'>
              <span class='badge bg-danger p-2 rounded-1 m-1'>Updated</span>
              <span class='badge m-1 bg-primary p-2 rounded-1'>`+items.publisher+`</span>
            </div>
          </div>
          <div class='container-fluid p-0'>
            <p id='item-title' class='text-light mt-2'>`+items.title+`</p>
            <button id='downloadBtn' class='btn btn-success align-self-end mt-1' data-src='page.html?id=`+items.id+`'>Download Now</button>
          </div>
        </div>
      `
      $('#post-item').append(item);
      
    });
    
  })
  .catch(error => {
    console.log(error);
  });
  
  // Click function
  $('#post-item').on('click', '#downloadBtn', function(){
    window.location.href = $(this).attr('data-src');
  });
  
});
