const listEl = document.getElementById('highscores-list');
const clearEl = document.getElementById('clear');

initials = localStorage.getItem('initials');
score = localStorage.getItem('score');

// checks if values are null. stops page from loading empty list item
if (initials != null || score != null){
    listItem = document.createElement('li');
    listItem.textContent = initials + '-' + score;
    listItem.classList.add('score')
    listEl.appendChild(listItem);   
}


function clearList() {
    let listItemEl = document.querySelectorAll('.score');
    
    listItemEl.forEach(e => e.remove());
}


clearEl.addEventListener('click', function(event){
    //removes items from local storage
    localStorage.removeItem('initials');
    localStorage.removeItem('score');
    // removes list items from list
    clearList();

    // found this function on w3schools.com 
    // reloads the page
    location.reload();
});