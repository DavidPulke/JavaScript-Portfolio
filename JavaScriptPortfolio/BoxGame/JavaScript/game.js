let platform = document.images.namedItem = '../gallery/Platform.png'
let background = document.images.namedItem = '../gallery/Background-Game.png'
let winingBox = document.createElement('img');
winingBox.src = '../gallery/Mario-Wining-Box.jpg'



const canvas = document.querySelector("canvas")
const c = canvas.getContext('2d')
let winFlag = document.querySelector('.winFlag')
let winButton = document.querySelector('.threeD-link')

canvas.width = 1024;
canvas.height = 576;

const gravity = 0.5;


function openSettings() {
    document.querySelector('.settings').style.display = 'block'
    document.querySelector('.title').style.display = 'none'
}
function closeSettings() {
    document.querySelector('.settings').style.display = 'none'
    document.querySelector('.title').style.display = 'block'
}


function openMap() {
    document.querySelector('.map').style.display = 'block'
    document.querySelector('.title').style.display = 'none'
}


function closeMap() {
    document.querySelector('.map').style.display = 'none'
    document.querySelector('.title').style.display = 'block'
}






class Player {
    constructor() {
        this.speed = 8
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30
        this.height = 30
        this.jumpCount = 0;
        this.maxJumps = 2;
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        this.position.y + this.height + this.velocity.y <= canvas.height ?
            this.velocity.y += gravity : this.velocity.y

    }

    jump() {
        if (this.jumpCount < this.maxJumps && this.position.y < 440) {
            this.velocity.y = -10; // Jump force
            this.jumpCount++;
            document.querySelector('.welcome').style.display = 'none'
        } else if (this.position.y > 435) {
            document.querySelector('.welcome').style.display = 'block'
            this.jumpCount = 0;
            console.log('false jump');
        }
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height


    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

let platformImage = createImage(platform)
let winingBoxImage = createImage(winingBox)
class GenricObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}



let genricObject = [
    new GenricObject({
        x: 0, y: 0, image: createImage(background)
    })]

function createImage(imageSrc) {
    let image = new Image()
    image.src = imageSrc
    return image
}

console.log(platformImage);

let player = new Player()
let platforms = [
    new Platform({ x: -3, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width * 2 + 100, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width * 3 + 300, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width * 4 + 500, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width * 5 + 500, y: 470, image: platformImage }),

    new Platform({ x: platformImage.width * 5 + 370, y: 350, image: winingBoxImage }),

    new Platform({ x: platformImage.width * 5 + 500, y: 350, image: platformImage })
]
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }

}
player.update()

let scrollOffSet = 0

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    genricObject.forEach(genricObject => {
        genricObject.draw()
    })

    platforms.forEach(platforn => {
        platforn.draw()
    })
    player.update()


    // התזוזה של השחקן
    if (keys.right.pressed && player.position.x < 400) { player.velocity.x = player.speed } // בלחיצה על הכפתור הימני
    else if (keys.left.pressed && player.position.x > 100) { player.velocity.x = -player.speed } // בלחיצה על הכפתור השמאלי
    else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffSet += player.speed
            platforms.forEach(platforn => {
                platforn.position.x -= player.speed
            })
            genricObject.forEach(genricObject => {
                genricObject.position.x -= player.speed * 0.66
            })

        }
        else if (keys.left.pressed && scrollOffSet > 0) {
            scrollOffSet -= player.speed
            platforms.forEach(platforn => {
                platforn.position.x += player.speed
            })
            genricObject.forEach(genricObject => {
                genricObject.position.x += player.speed * 0.66
            })
        }
    } // כאשר אני מרים את האצבע מהמקש או לא לוחץ

    // זה בשביל שברגע שהקופסה מגיעה לחפץ מסויים שתתייחס אליו בתור החפץ ולא תעבור דרכו
    platforms.forEach(platforn => {
        if (player.position.y + player.height <= platforn.position.y && player.position.y + player.height + player.velocity.y >= platforn.position.y && player.position.x + player.width + player.velocity.x >= platforn.position.x && player.position.x <= platforn.position.x + platforn.width) {
            player.velocity.y = 0
        }
    })


    //  נקודת ניצחון
    if (scrollOffSet > 2000) {
        player.position.x = 350
        player.position.y = platform.height
        keys.right.pressed = false
        removeEventListener('keydown', (keys))
        document.querySelector(".winFlag").style.display = 'block'
        winButton.style.display = 'block'
        document.querySelector('.welcome').style.display = 'none'
        document.querySelector('.title').classList.add('fade')
        setTimeout(function () {
            document.querySelector('.title').style.display = 'none'
        }, 2000)
    }



    // נקודת הפסד
    if (player.position.y > canvas.height) {
        init()
    }
}
let scrollOffSetLeft = 0
setTimeout(() => {
    animate()
}, 1000)




function init() {
    platformImage = createImage(platform)

    class GenricObject {
        constructor({ x, y, image }) {
            this.position = {
                x,
                y
            }
            this.image = image
            this.width = image.width
            this.height = image.height
        }

        draw() {
            c.drawImage(this.image, this.position.x, this.position.y)
        }
    }



    genricObject = [
        new GenricObject({
            x: 0, y: 0, image: createImage(background)
        })]

    function createImage(imageSrc) {
        const image = new Image()
        image.src = imageSrc
        return image
    }

    console.log(platformImage);
    console.log(platforms[1].y);
    player = new Player()
    platforms = [
        new Platform({ x: -3, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width * 2 + 100, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width * 3 + 300, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width * 4 + 500, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width * 5 + 500, y: 470, image: platformImage }),

        new Platform({ x: platformImage.width * 5 + 370, y: 350, image: winingBoxImage }),

        new Platform({ x: platformImage.width * 5 + 500, y: 350, image: platformImage })
    ]

    scrollOffSet = 0
}








addEventListener('keydown', ({ key }) => {

    switch (key) {
        case 'a':
            console.log('Left');
            keys.left.pressed = true
            scrollOffSetLeft--
            break;
        case 'd':
            console.log('Right');
            keys.right.pressed = true
            scrollOffSetLeft++
            break;
        case ' ':
            console.log('Up');
            keys.up.pressed = true
            player.jump();
            break;
        case 'w':
            console.log('Up');
            keys.up.pressed = true
            player.jump();
            break;

        default:
            break;
    }
})
addEventListener('keyup', ({ key }) => {

    switch (key) {
        case 'a':
            keys.left.pressed = false
            break;
        case 'd':
            keys.right.pressed = false
            break;
        case ' ':
            keys.up.pressed = false;

            break;
        case 'w':
            keys.up.pressed = false;

            break;

        default:
            break;
    }
})

console.log(platform.height);
