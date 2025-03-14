$(function () {
    const colors = [
        "#F4A261", "#E76F51", "#2A9D8F", "#6A4C93",
        "#457B9D", "#E63946", "#F77F00", "#3A86FF", "#FF006E"
    ];

    function runGSAPAnimation() {
        gsap.fromTo(".letter",
            { opacity: 0, y: 50, scale: 0.5, color: "#000" },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 1,
                stagger: 0.1,
                ease: "elastic.out(1, 0.5)"
            }
        );

        gsap.to(".letter", {
            duration: 1.2,
            color: (index) => colors[index],
            stagger: 0.2,
            delay: 1,
            ease: "power2.out"
        });
    }

    function runTypedEffect() {
        const text = "A New Challenge Begins.";
        const subtitle = document.querySelector(".sub_title");
        let index = 0;


        subtitle.innerHTML = "";

        function typeEffect() {
            if (index < text.length) {
                subtitle.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeEffect, 100);
            }
        }

        setTimeout(typeEffect, 1200);
    }

    $('.wrapper').fullpage({
        anchors: ['intro', 'portfolio01', 'portfolio02', 'portfolio03', 'training'],
        fixedElements: '.header, .footer',
        responsiveWidth: 1200,

        onLeave: function (origin, destination, direction) {
            let idx = destination.index;

            if (idx === 0) {
                setTimeout(() => {
                    runGSAPAnimation();
                    runTypedEffect(); // 
                }, 300);
            }

            $('.header .side_nav li').removeClass('on');
            $('.header .side_nav li').eq(idx).addClass('on');
        },

        afterLoad: function (origin, destination, direction) {
            let idx = destination.index;

            $('.section').removeClass('on');
            $('.section').eq(idx).addClass('on');
        }
    });

    $(document).ready(function () {
        runGSAPAnimation();
        runTypedEffect(); // 
    });

    $('.header .btn').on('click', function () {
        $(this).toggleClass('on');
        $('.header .cover_lnk').toggleClass('on');
    });

    $('.header .cover_lnk a').on('click', function (e) {
        let idx = $(this).parent().index();
        $('.header .btn').removeClass('on');
        $('.header .cover_lnk').removeClass('on');
        e.preventDefault();
        fullpage_api.moveTo(idx + 1);
    });
    $('.header .side_nav li a').on('click', function (e) {
        let idx = $(this).parent().index();
        e.preventDefault();
        fullpage_api.moveTo(idx + 1);
    });

    $('.header .cover_lnk').on('wheel', function (e) {
        e.preventDefault();
        return false;
    })

    $('.to_top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    $(window).on('scroll', function () {
        let sct = $(window).scrollTop();
        if (sct > 600) {
            $('.to_top').addClass('on');
        } else {
            $('.to_top').removeClass('on');
        }
    });
});


