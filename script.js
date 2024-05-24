function generarContraseña() {
    const alfabetos = {
        ascii: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        cirílico: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
        griego: 'αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ',
        hebreo: 'אבגדהוזחטיכלמנסעפצקרשתאבגדהוזחטיכלמנסעפצקרשת',
        árabe: 'أبتثجحخدذرزسشصضطظعغفقكلمنهوياًءآأبپتثجحخدذرزسشصضطظعغفقكلمنهوياًءآ',
        devanagari: 'अआइईउऊऋऌएऐऑओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशसहक्षज्ञअआइईउऊऋऌएऐऑओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशसह',
        hiragana: 'ぁあぃいぅうぇえぉおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんぁあぃいぅうぇえぉおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん',
        katakana: 'ァアィイゥウェエォオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンァアィイゥウェエォオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン',
        tamil: 'அஆஇஈஉ஌எஏஐஒஓஔகஙசஜஞணதநனபமயரலவஶஸஹகஷஜஞடணதநனபமயரலவஶஸஹ'
    };

    let alfabeto = '';
    for (const key in alfabetos) {
        if (document.getElementById(key).checked) {
            alfabeto += alfabetos[key];
        }
    }

    const longitud = parseInt(document.getElementById('longitud-contraseña').value, 10);
    let contraseña = '';
    for (let i = 0; i < longitud; i++) {
        contraseña += alfabeto.charAt(Math.floor(Math.random() * alfabeto.length));
    }

    document.getElementById('contraseña-generada').innerText = contraseña;
}

function copiarContraseña() {
    const contraseña = document.getElementById('contraseña-generada').innerText;
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
