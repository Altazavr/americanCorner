document.addEventListener('DOMContentLoaded', function() {
    let navLinks = document.querySelectorAll('.nav-item');
    var currentPath = window.location.pathname;
    navLinks.forEach(function(navLink) {
        let linkPath = navLink.getAttribute('href');
        if (currentPath === linkPath) {
            navLink.classList.add('active');
        }
    })
    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function(event) {
            event.preventDefault(); // Отменяем стандартное действие перехода по ссылке
            let url = this.getAttribute('href'); // Получаем адрес ссылки
            this.classList.add('clicked'); // Добавляем класс для анимации
            setTimeout(function() {
                window.location.href = url; // Переходим по адресу ссылки после завершения анимации
            }, 300); // Время анимации в миллисекундах
        });
    });
});