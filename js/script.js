"use strict";

addEventListener('DOMContentLoaded', function () {

    let message = document.querySelector('.message'),
        bulbOff = document.querySelector('.on'),
        shortSound = document.getElementById('sound'),
        dashDuration = 700,
        dotDuration = 300,
        spaceDuration = 1000,
        keyPressedMilliseconds, 
        characterDashDot = {chars: ''},
        timerId = 0,
        spaceTimerId = 0,
        alphabet = {
            a : '.-',
            b : '-...',
            c : '-.-.',
            d : '-..',
            e : '.',
            f : '..-.',
            g : '--.',
            h : '....',
            i : '..',
            j : '.---',
            k : '-.-',
            l : '.-..',
            m : '--',
            n : '-.',
            o : '---',
            p : '.--.',
            q : '--.-',
            r : '.-.',
            s : '...',
            t : '-',
            u : '..-',
            v : '...-',
            w : '.--',
            x : '-..-',
            y : '-.--',
            z : '--..'
        };

    addEventListener('keydown', (event) => {
        bulbOff.style.display = 'block';

        if(event.repeat === false){
            keyPressedMilliseconds = +(new Date());
        }
        clearTimeout(timerId);
        clearTimeout(spaceTimerId);

    });

    addEventListener('keyup', (event) => {

        bulbOff.style.display = 'none';

        let keyReleasedMilliseconds = +(new Date());
        
        characterDashDot.chars += dotDashRecognizer(keyReleasedMilliseconds, keyPressedMilliseconds);
        timerId = setTimeout(() => {
            let characterAlphabet = alphabetCharacterRecognizer (characterDashDot.chars);
            characterDashDot.chars = '';
            spaceTimerId = setTimeout(() => {
                message.textContent += ' ';
            }, spaceDuration);
        }, 700);
    });

     function dotDashRecognizer (keyReleasedMilliseconds, keyPressedMilliseconds) {
        let keyDuration = (keyReleasedMilliseconds - keyPressedMilliseconds);
        if(keyDuration <= dotDuration) {
           return '.';
        } else if(keyDuration <= dashDuration) {
            return '-';
        }
    }

    function alphabetCharacterRecognizer (characterDashDot) {
        for( var key in alphabet) {
            if(characterDashDot === alphabet[key]) {
                 message.textContent += key;
                 return key;
            }
        }
    }

});