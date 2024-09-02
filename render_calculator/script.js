document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('renderForm');
    const resultContainer = document.getElementById('resultContainer');
    const timeDisplay = document.getElementById('timeDisplay');
    const setTimerCheckbox = document.getElementById('setTimer');
    const timerMessage = document.getElementById('timerMessage');
    const resetTimerButton = document.getElementById('resetTimer');
    const countdownElement = document.getElementById('countdown');

    let countdownInterval;

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

        if (setTimerCheckbox.checked) {
            startTimer(totalTimeSeconds);
        }
    });

    setTimerCheckbox.addEventListener('change', function() {
        if (setTimerCheckbox.checked && timeDisplay.textContent) {
            const totalTimeSeconds = calculateTotalTimeInSeconds();
            startTimer(totalTimeSeconds);
        } else {
            stopTimer();
        }
    });

    resetTimerButton.addEventListener('click', stopTimer);

    function startTimer(duration) {
        let remainingTime = duration;
        countdownElement.classList.remove('hidden');
        resetTimerButton.classList.remove('hidden');

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

        timerMessage.textContent = `Timer is set for ${formatTime(duration)}.`;
        timerMessage.classList.remove('hidden');
    }

    function stopTimer() {
        clearInterval(countdownInterval);
        countdownInterval = null;
        countdownElement.classList.add('hidden');
        resetTimerButton.classList.add('hidden');
        setTimerCheckbox.checked = false;
        timerMessage.classList.add('hidden');
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
