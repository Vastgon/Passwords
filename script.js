const alfabetos = {
    ascii: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
    cirílico: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
    griego: 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
    hebreo: 'אבגדהוזחטיכלמנסעפצקרשת',
    árabe: 'أبتثجحخدذرزسشصضطظعغفقكلمنهوي',
    devanagari: 'अआइईउऊऋऌएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह',
    hiragana: 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
    katakana: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
    tamil: 'அஆஇஈஉஊஎஏஐஒஓஔகஙசஜஞடணதநனபமயரலவழளறனஸஷஸஹ',
    chino: '的一是不了人我在有他这为之大来以个中上们',
    coreano: '가나다라마바사아자차카타파하',
    tailandés: 'กขฃคฅฆงจฉชซฌญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอฮ'
};

function generarContraseña() {
    let alfabetoSeleccionado = '';
    for (const key in alfabetos) {
        if (document.getElementById(key).checked) {
            alfabetoSeleccionado += alfabetos[key];
        }
    }

    if (alfabetoSeleccionado === '') {
        alert('Por favor, seleccione al menos un tipo de caracteres.');
        return;
    }

    const longitud = parseInt(document.getElementById('longitud-contraseña').value, 10);
    let contraseña = '';
    for (let i = 0; i < longitud; i++) {
        contraseña += alfabetoSeleccionado.charAt(Math.floor(Math.random() * alfabetoSeleccionado.length));
    }

    document.getElementById('contraseña-texto').value = contraseña;
    evaluarFortaleza(contraseña);
}

function copiarContraseña() {
    const contraseña = document.getElementById('contraseña-texto').value;
    if (!contraseña) {
        alert('No hay ninguna contraseña generada para copiar.');
        return;
    }

    navigator.clipboard.writeText(contraseña).then(() => {
        alert('Contraseña copiada al portapapeles');
    }).catch(err => {
        console.error('Error al copiar la contraseña: ', err);
        fallbackCopyTextToClipboard(contraseña);
    });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert('Contraseña copiada al portapapeles (método alternativo)');
    } catch (err) {
        console.error('Método alternativo de copia falló: ', err);
    }
    document.body.removeChild(textArea);
}

function deseleccionarTodos() {
    document.getElementById('todos').checked = false;
}

function seleccionarTodos() {
    document.querySelectorAll('.alfabeto input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
}

function actualizarLongitud() {
    const longitud = document.getElementById('longitud-contraseña').value;
    document.getElementById('longitud-contraseña-texto').innerText = longitud;
}

function evaluarFortaleza(contraseña) {
    let puntuacion = 0;
    const longitud = contraseña.length;

    puntuacion += Math.min(longitud, 100) / 8;

    if (/[a-z]/.test(contraseña)) puntuacion += 10;
    if (/[A-Z]/.test(contraseña)) puntuacion += 10;
    if (/\d/.test(contraseña)) puntuacion += 10;
    if (/[^a-zA-Z0-9]/.test(contraseña)) puntuacion += 15;

    const caracteresUnicos = new Set(contraseña).size;
    puntuacion += Math.min(caracteresUnicos, 50);

    puntuacion = Math.min(puntuacion, 100);

    const fortalezaElement = document.getElementById('fortaleza-contraseña');
    let fortalezaTexto;
    let color;

    if (puntuacion >= 80) {
        fortalezaTexto = 'Muy Fuerte';
        color = '#4CAF50';
    } else if (puntuacion >= 60) {
        fortalezaTexto = 'Fuerte';
        color = '#8BC34A';
    } else if (puntuacion >= 40) {
        fortalezaTexto = 'Moderada';
        color = '#FFC107';
    } else if (puntuacion >= 20) {
        fortalezaTexto = 'Débil';
        color = '#FF9800';
    } else {
        fortalezaTexto = 'Muy Débil';
        color = '#F44336';
    }

    fortalezaElement.innerHTML = `
        <div class="barra-fortaleza">
            <div class="barra-progreso" style="width: ${puntuacion}%; background-color: ${color};"></div>
        </div>
        <p class="texto-fortaleza" style="color: ${color};">${fortalezaTexto}</p>
    `;
}

window.onload = function() {
    generarContraseña();
}
