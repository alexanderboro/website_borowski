
// Opening the Menu in mobile view

function openMenu() {
    var element = document.getElementById("id_menu_show");
    element.classList.toggle('top-navigation-links-on')
    /*var element2 = document.getElementsByClassName("top-navigation-links-off");
    element2.classList.toggle('') */
  }

// Closing the Menu in mobile view
function closeMenu() {
    var element = document.getElementById("id_menu_show");
    element.classList.toggle('top-navigation-links-on')
   /* var element2 = document.getElementsByClassName("top-navigation-links-on");
    element2.classList.toggle('')*/
}

// Switching my background color 'dark-mode' on all pages for users
const themeSwitcher = document.querySelector('#theme-switcher');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeSwitcher.textContent = 'go classic';
} else {
  themeSwitcher.textContent = 'go wavvy';
}

themeSwitcher.addEventListener('click', function() {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    themeSwitcher.textContent = 'go wavvy';
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    themeSwitcher.textContent = 'go classic';
  }
});

