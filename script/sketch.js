let myFont;
let vid;
let mask;
let colores = new Array(55);
let sample;

function preload() {
    vid = createVideo('data/video.mp4');
    myFont = loadFont('fonts/Montserrat-ExtraBold.ttf');
    vid.hide();
    soundFormats('mp3', 'ogg');
    sample = loadSound('data/koster.mp3');
}

function setup() {
    createCanvas(864, 864);
    mask = createGraphics(width, height);
    analyzer = new p5.FFT();
    analyzer.setInput(sample);
}

function draw() {
    background(146, 95, 82);
    let div = width / 8;
    let fft = analyzer.analyze(64);
    for (let i = 0; i < colores.length; i++) {
        let a = map(fft[i * 2], 0, 255, 0, 100);
        let b = map(fft[(i * 2) + 1], 0, 255, 0, 100);
        colores[i] = color(100, b, 100);
    }
    colorMode(HSB, 100);
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let t = i + j;
            // t % 2 == 0 ? fill("#FFFFF") : fill("#FF0000");
            fill(colores[t]);
            noStroke();
            rect(i * div, j * div, div, div);
        }
    }
    mask.fill(255);
    mask.textFont(myFont);
    mask.textStyle(BOLD);
    mask.textAlign(CENTER, CENTER);
    mask.textSize(190);
    mask.text('feliz\nnavidad', width / 2, height / 2);
    vid.mask(mask);
    image(vid, 0, 0);
}

function mouseClicked() {
    console.log('hola');
    vid.loop();
    vid.volume(0);
    sample.loop();
}