import AOS from 'aos';
import { Swiper, Navigation, Parallax, Autoplay } from 'swiper';
Swiper.use([ Navigation, Parallax, Autoplay ]);

document.addEventListener('DOMContentLoaded', () => {
  
    const reviewsSlider = new Swiper('.reviews-slider', {
        speed: 1400,
        slidesPerView: 'auto',
        breakpoints: {
            320: {
                slidesPerView: 'auto',
                spaceBetween: 30,
                centeredSlides: true,
            },
            1200: {
                spaceBetween: 30,
                centeredSlides: false,
                slidesPerView: 2,
            }
        },
        navigation: {
            nextEl: '.reviews-slider__btn-next',
            prevEl: '.reviews-slider__btn-prev',
        }
    });

    const homeSlider = new Swiper('.home-slider', {
        speed: 1700,
        spaceBetween: 100,
        autoplay: {
            delay: 6000,
            pauseOnMouseEnter: true
          },
        autoHeight: true,
        parallax: true,
        breakpoints: {
            1100: {
                autoHeight: false,
            }
        },
        navigation: {
            nextEl: '.home-slider__btn-next',
            prevEl: '.home-slider__btn-prev'
        }
    });


    const accordion = () => {
        const aboutTitles = document.querySelectorAll('.about-accordion__item-title');

        aboutTitles.forEach(title => {
            title.addEventListener('click', () => {
                aboutTitles.forEach(item => item.parentNode.classList.remove('about-accordion__item--active'));
                title.parentNode.classList.add('about-accordion__item--active');
            });
        });
    };

    const removeActiveClass = (elSelector, activeClass) => {
        const elements = document.querySelectorAll(elSelector);

        elements.forEach(el => {
            el.classList.remove(activeClass);
        });
    };

    const tabs = ({ tabSelector, tabActiveClass, contentElSelector, contentActiveClass }) => {
        const tabs = document.querySelectorAll(tabSelector);

        const showContent = (tab) => {
            const tabType = tab.getAttribute('data-tab-type');
            const contentItems = document.querySelectorAll(contentElSelector);

            if (tabType === null) {
                return;
            }

            removeActiveClass(contentElSelector, contentActiveClass);

            contentItems.forEach(item => {
                if (item.classList.contains(tabType)) {
                    item.classList.add(contentActiveClass);
                }
            });
        };

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                removeActiveClass(tabSelector, tabActiveClass);
                tab.classList.add(tabActiveClass);
                showContent(tab);
            });
        });

        showContent(tabs[0]);
    };

    const toggleMenu = () => {
        const menuBtn = document.querySelector('.menu-btn');
        const menuList = document.querySelector('.menu__list');

        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('menu-btn--active');
            menuList.classList.toggle('menu__list--active');
        });
    };

    const bubbles = () => {
        const container = document.querySelector('.home');
        const smallBubbles = container.querySelectorAll('.bubble-small');
        const midBubbles = container.querySelectorAll('.bubble-mid');
        const bigBubbles = container.querySelectorAll('.bubble-big');

        document.addEventListener('mousemove', (e) => {
            const y = e.pageY;
            const x = e.pageX;


            smallBubbles.forEach(bubble => {
                bubble.style.transform = `translate(${x * 0.05}px, -${y * 0.05}px)`;
            });

            midBubbles.forEach(bubble => {
                bubble.style.transform = `translate(-${x * 0.03}px, ${y * 0.06}px)`;
            });

            bigBubbles.forEach(bubble => {
                bubble.style.transform = `translate(-${x * 0.02}px, ${y * 0.03}px)`;
            });

        });
    };

    const swapCurrentTheme = (btn) => {
        const images = document.querySelectorAll('img[data-theme-img]');
        const icons = document.querySelectorAll('img[data-theme-icon]');
        const theme = btn.getAttribute('data-theme');

        document.body.className = `${theme}`;

        localStorage.setItem('theme', theme);

        const changeSrcPath = (images, directory) => {
            images.forEach(img => {
                const filename = img.src.split('/').pop();
                let path = `img/${theme}/${filename}`;

                if (directory) {
                    path = `img/${theme + '/' + directory}/${filename}`;
                }

                img.src = path;
            });
        };

        changeSrcPath(images);
        changeSrcPath(icons, 'icons');
    };

    const changeTheme = () => {
        const currentTheme = localStorage.getItem('theme');
        const themeBtn = document.querySelector('.theme-menu__btn');
        const themeMenu = document.querySelector('.theme-menu');

        if (currentTheme !== null) {
            document.body.className = currentTheme;
            const currentThemeBtn  = document.querySelector(`button[data-theme="${currentTheme}"]`);

            swapCurrentTheme(currentThemeBtn);
            themeBtn.innerHTML = currentThemeBtn.innerHTML;
        }

        themeMenu.addEventListener('click', (e) => {
            const target = e.target;
    
            if (target.classList.contains('theme-menu__btn') || 
            target.parentNode.classList.contains('theme-menu__btn')) {

                themeMenu.classList.toggle('theme-menu--active');
            }
            
            if (target.classList.contains('theme-btn') || target.parentNode.classList.contains('theme-btn')) {
                const btn = target.closest('.theme-btn');
    
                themeBtn.innerHTML = btn.innerHTML;
    
                swapCurrentTheme(btn);
            }
        });
    };


    const modal = (selector) => {
        const modal = document.querySelector(selector);
        const openTriggers = document.querySelectorAll('[data-modal-open]');
        const modalForm = modal.querySelector('form');
        const sendBtn = modal.querySelector('button[type="submit"]');

        openTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();

                modal.classList.add('modal--active');
            });
        });

        modal.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.getAttribute('data-modal-close') !== null) {
                modal.classList.remove('modal--active');
            }
        });

        sendBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const message = document.createElement('div');
            message.classList.add('modal__dialog', 'modal__message');
            message.innerText = 'Thaks for your message, we will contact you as soon as posible';

            modal.firstElementChild.style.display = 'none';
            modal.appendChild(message);

            setTimeout(() => {
                modal.classList.remove('modal--active');
                message.remove();
                modalForm.reset();
            }, 4000);

            setTimeout(() => {
                modal.firstElementChild.style.display = 'block';
            }, 4300);
        });
    };

    tabs({
        tabSelector: '.works__tab',
        tabActiveClass: 'works__tab--active',
        contentElSelector: '.works-item',
        contentActiveClass: 'works-item--active'
    });

    bubbles();
    toggleMenu();
    accordion();
    changeTheme();
    modal('.modal');
    AOS.init();

});