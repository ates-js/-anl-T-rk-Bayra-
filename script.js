
const canvas = document.getElementById("flagCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();


// FLAG PHOTO
const flagImg = new Image();

/*
PUT YOUR OWN PICTURE HERE

Aynı klasördeyse:
img/turk-bayragi.png
*/

flagImg.src =
    "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg";

let time = 0;
const speed = 0.025;

function draw() {

    requestAnimationFrame(draw);

    if (!flagImg.complete) return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    let drawWidth = Math.floor(
        Math.min(canvas.width * 0.9, 800)
    );

    let drawHeight = drawWidth / 1.5;

    let startX =
        (canvas.width - drawWidth) / 2;

    let startY =
        (canvas.height - drawHeight) / 2 +
        (canvas.height * 0.08);


    // DİREK
    const poleWidth =
        Math.max(5, drawWidth * 0.012);

    const poleGrad = ctx.createLinearGradient(
        startX - poleWidth,
        0,
        startX,
        0
    );

    poleGrad.addColorStop(0, "#333");
    poleGrad.addColorStop(0.5, "#bbb");
    poleGrad.addColorStop(1, "#111");

    ctx.fillStyle = poleGrad;

    const poleStartY =
        startY - drawHeight * 0.05;

    const poleEndHeight =
        canvas.height - poleStartY;

    ctx.fillRect(
        startX - poleWidth,
        poleStartY,
        poleWidth,
        poleEndHeight
    );


    // ROD
    ctx.beginPath();

    ctx.arc(
        startX - poleWidth / 2,
        poleStartY - poleWidth,
        poleWidth * 1.5,
        0,
        Math.PI * 2
    );

    const topuzGrad = ctx.createRadialGradient(
        startX - poleWidth / 2 - 2,
        poleStartY - poleWidth - 2,
        2,

        startX - poleWidth / 2,
        poleStartY - poleWidth,
        poleWidth * 1.5
    );

    topuzGrad.addColorStop(0, "#fff6a3");
    topuzGrad.addColorStop(0.5, "#d4af37");
    topuzGrad.addColorStop(1, "#8a6e1c");

    ctx.fillStyle = topuzGrad;
    ctx.fill();


    // FLUCTUATION
    const sliceWidth = 2;

    const freq1 = 10 / drawWidth;
    const freq2 = 18 / drawWidth;

    for (
        let i = 0;
        i < drawWidth;
        i += sliceWidth
    ) {

        let progress = i / drawWidth;

        let amplitude =
            (drawHeight * 0.12) *
            Math.pow(progress, 1.4);

        let wave1 =
            Math.sin(i * freq1 - time);

        let wave2 =
            Math.sin(i * freq2 - time * 1.3);

        let combinedWave =
            wave1 + wave2 * 0.35;

        let yOffset =
            combinedWave * amplitude;

        let slope =
            Math.cos(i * freq1 - time)
            +
            0.35 *
            Math.cos(i * freq2 - time * 1.3);

        let lighting = slope * 40;

        let drawY = startY + yOffset;

        let sourceX =
            (i / drawWidth) * flagImg.width;

        let sourceW =
            (sliceWidth / drawWidth) * flagImg.width;


        ctx.drawImage(
            flagImg,

            sourceX,
            0,
            sourceW,
            flagImg.height,

            startX + i,
            drawY,
            sliceWidth,
            drawHeight
        );


        // LIGHT / SHADOW
        if (lighting > 0) {

            ctx.fillStyle =
                `rgba(255,255,255,${
                    Math.min(lighting / 100, 0.18)
                })`;

        } else {

            ctx.fillStyle =
                `rgba(0,0,0,${
                    Math.min(Math.abs(lighting) / 100, 0.5)
                })`;
        }

        ctx.fillRect(
            startX + i,
            drawY,
            sliceWidth,
            drawHeight
        );
    }

    time += speed;
}

draw();
