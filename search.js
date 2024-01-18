$(document).ready(function(){
  $('button[type=submit]').on('click', () => {
  
    const value = $('#search').val();
    if (value === '') {
      alert('No data to proceed!')
    } else {
      window.location.href = 'search.html?query=' + value;
    }
  
  });
})