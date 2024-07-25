// scroll Movement
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else (
            entry.target.classList.remove('show')
        )
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el))


// dark Mode
let darkMode = () => {
    document.querySelector('body').style.backgroundColor = '#666';
    document.getElementById('darkBtn').style.display = 'none';
    document.getElementById('lightBtn').style.display = 'block';
    let links = document.querySelectorAll(".link-border");
    links.forEach(link => {
        link.style.color = '#fff'
    })
    localStorage.setItem("Mode", "darkMode")
}
let lightMode = () => {
    document.querySelector('body').style.backgroundColor = '#fff';
    document.getElementById('darkBtn').style.display = 'block';
    document.getElementById('lightBtn').style.display = 'none';
    let links = document.querySelectorAll(".link-border");
    links.forEach(link => {
        link.style.color = '#000'
    })
    localStorage.setItem("Mode", "lightMode")
}

if (localStorage.getItem("Mode") == 'darkMode') {
    darkMode()
} else (
    lightMode()
)

// video play
const videos = document.querySelectorAll('.video');

videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
        video.play();
    });

    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });
});


// phone navbar
let navCounter = 1
let openNav = () => {
    if (navCounter == 1) {
        document.querySelector('.phoneLinks').style.display = "block";
        return navCounter = 0
    } if (navCounter == 0) {
        document.querySelector('.phoneLinks').style.display = "none";
        navCounter = 1
    }
}
