window.addEventListener('load', function() {
    const swiper = new Swiper('.swiper', {
        // Опциональные параметры
        direction: 'horizontal',
        loop: true,
      
        // Если нужна пагинация
        pagination: {
          el: '.swiper-pagination',
        },
      
        // Навигационные стрелки
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
        // И если нужен скроллбар
        scrollbar: {
          el: '.swiper-scrollbar',
        },
    });
});
