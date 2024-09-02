function addtime(duration) {
    const timeNow = new Date().getTime();
    const endTime = (timeNow/1000) + duration
    
    return endTime;
}



document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('renderForm');
    const resultContainer = document.getElementById('resultContainer');
    const timeDisplay = document.getElementById('timeDisplay');
    const setTimerButton = document.getElementById('setTimer'); 
    const pauseTimerButton = document.getElementById('pauseTimer');
    const timerMessage = document.getElementById('timerMessage');
    const countdownElement = document.getElementById('countdown');

    let countdownInterval;
    let remainingTime;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const frames = parseInt(document.getElementById('frames').value, 10);
        let timePerFrame = parseFloat(document.getElementById('timePerFrame').value);
        const machines = parseInt(document.getElementById('machines').value, 10);

        if (isNaN(frames) || isNaN(timePerFrame) || isNaN(machines) || frames <= 0 || timePerFrame <= 0 || machines <= 0) {
            alert('Please enter valid positive numbers.');
            return;
        }

        timePerFrame *= 60;

        const totalTimeSeconds = (frames * timePerFrame) / machines;

        const hours = Math.floor(totalTimeSeconds / 3600);
        const minutes = Math.floor((totalTimeSeconds % 3600) / 60);
        const seconds = Math.floor(totalTimeSeconds % 60);

        let timeString = '';
        if (hours > 0) timeString += `${hours}h `;
        if (minutes > 0) timeString += `${minutes}m `;
        timeString += `${seconds}s`;

        timeDisplay.textContent = timeString;
        resultContainer.classList.remove('hidden');
    });

    setTimerButton.addEventListener('click', function() {
        if (countdownInterval) {
            stopTimer(); 
        } else if (timeDisplay.textContent) {
            remainingTime = calculateTotalTimeInSeconds();
            startTimer(remainingTime);
        }
    });

    pauseTimerButton
.addEventListener('change', function() {
        if (pauseTimerButton
.checked) {
            pauseTimer();
        } else {
            resumeTimer();
        }
    });



    function startTimer(duration) {
        remainingTime = duration;
        countdownElement.classList.remove('hidden');
        setTimerButton.textContent = "Reset Timer"; 
        setTimerButton.style.backgroundColor = "#F25C52"; 
        

        updateCountdownDisplay(remainingTime);

        countdownInterval = setInterval(() => {
            remainingTime--;
            updateCountdownDisplay(remainingTime);

            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                countdownInterval = null;
                alert('Render complete!');
                stopTimer();
            }
        }, 1000);

        
        timerMessage.textContent = `Timer is set for ${new Date(addtime(duration)).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short'
        })}`;
        timerMessage.classList.remove('hidden');
        pauseTimerButton
.disabled = false; 
    }

    function stopTimer() {
        clearInterval(countdownInterval);
        countdownInterval = null;
        countdownElement.classList.add('hidden');
        setTimerButton.textContent = "Set Timer"; 
        setTimerButton.style.backgroundColor = ""; 
        timerMessage.classList.add('hidden');
        pauseTimerButton
.checked = false;
        pauseTimerButton
.disabled = true; 
    }

    function pauseTimer() {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    function resumeTimer() {
        if (remainingTime > 0) {
            startTimer(remainingTime);
        }
    }

    function updateCountdownDisplay(time) {
        countdownElement.textContent = formatTime(time);
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function calculateTotalTimeInSeconds() {
        const frames = parseInt(document.getElementById('frames').value, 10);
        let timePerFrame = parseFloat(document.getElementById('timePerFrame').value);
        const machines = parseInt(document.getElementById('machines').value, 10);

        if (isNaN(frames) || isNaN(timePerFrame) || isNaN(machines) || frames <= 0 || timePerFrame <= 0 || machines <= 0) {
            return 0;
        }

        timePerFrame *= 60;

        return (frames * timePerFrame) / machines;
    }
});
