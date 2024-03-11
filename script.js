document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const options = ['Vaihtoehto 1', 'Vaihtoehto 2', 'Vaihtoehto 3', 'Vaihtoehto 4', 'Vaihtoehto 5'];
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF8333'];
    const radius = canvas.width / 2;
    let spinAngleStart = 10;
    let startAngle = 0;
    const arc = Math.PI * 2 / options.length;

    // Piirrä nuoli
    function drawArrow() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(radius - 5, 20); // vasen sivu
        ctx.lineTo(radius + 5, 20); // oikea sivu
        ctx.lineTo(radius, 5); // kärki
        ctx.closePath();
        ctx.fill();
    }

    function drawWheel() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < options.length; i++) {
            const angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.arc(radius, radius, radius - 20, angle, angle + arc);
            ctx.lineTo(radius, radius);
            ctx.fill();

            ctx.save();
            ctx.fillStyle = 'black';
            ctx.translate(radius + Math.cos(angle + arc / 2) * (radius - 40), radius + Math.sin(angle + arc / 2) * (radius - 40));
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            const text = options[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }
        
        // Piirrä nuoli jokaisen päivityksen yhteydessä
        drawArrow();
    }

    function spin() {
        spinAngleStart = Math.random() * 10 + 10; // Asetetaan satunnainen pyörimiskulma
        const spinTimeTotal = Math.random() * 3000 + 2000; // Asetetaan satunnainen pyörimisaika

        function rotateWheel() {
            const spinAngle = spinAngleStart - easeOut((Date.now() - spinTimeStart), 0, spinAngleStart, spinTimeTotal);
            startAngle += (spinAngle * Math.PI / 180);
            drawWheel();
            if ((Date.now() - spinTimeStart) < spinTimeTotal) {
                requestAnimationFrame(rotateWheel);
            } else {
                const degrees = startAngle * 180 / Math.PI + 90;
                const arcd = arc * 180 / Math.PI;
                const index = Math.floor((360 - degrees % 360) / arcd);
                const winnerText = `Voittaja on: ${options[index]}`;
                console.log(winnerText);
                alert(winnerText); // Voittavan kohteen teksti
            }
        }

        const spinTimeStart = Date.now();
        rotateWheel();
    }

    function easeOut(t, b, c, d) {
        const ts = (t /= d) * t;
        const tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }

    document.getElementById('spin').addEventListener('click', spin);

    drawWheel();
});
