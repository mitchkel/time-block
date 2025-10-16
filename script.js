class MinuteTimer {
    constructor() {
        this.completedMinutes = 0;
        this.currentSecond = 0;
        this.isRunning = false;
        this.intervalId = null;
        
        this.minutesContainer = document.querySelector('.minutes-container');
        this.currentMinuteRow = document.getElementById('current-minute');
        this.minuteFill = document.getElementById('minute-fill');
        
        this.startTimer();
    }
    
    startTimer() {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        this.currentSecond++;
        
        // Update the fill width for current minute
        const fillPercent = (this.currentSecond / 60) * 100;
        this.minuteFill.style.width = `${fillPercent}%`;
        
        // Update time display
        this.updateDisplay();
        
        // Check if minute is complete
        if (this.currentSecond >= 60) {
            this.completeMinute();
        }
    }
    
    completeMinute() {
        // Mark current minute as completed
        this.currentMinuteRow.classList.add('completed');
        
        // Increment counter
        this.completedMinutes++;
        
        // Create a new completed minute row above current
        const completedRow = this.currentMinuteRow.cloneNode(true);
        completedRow.querySelector('.minute-label').textContent = `Minute ${this.completedMinutes}`;
        completedRow.querySelector('.minute-fill').style.width = '100%';
        
        // Insert the completed minute before the current minute
        this.minutesContainer.insertBefore(completedRow, this.currentMinuteRow);
        
        // Reset current minute
        this.resetCurrentMinute();
        
        this.updateDisplay();
    }
    
    resetCurrentMinute() {
        this.currentSecond = 0;
        this.minuteFill.style.width = '0%';
        this.currentMinuteRow.classList.remove('completed');
    }
    
    updateDisplay() {
        const timeDisplay = document.getElementById('time-display');
        const completedCount = document.getElementById('completed-count');
        
        // Format as MM:SS
        const minutes = this.completedMinutes;
        const seconds = this.currentSecond;
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        completedCount.textContent = this.completedMinutes;
    }
    
    resetAll() {
        clearInterval(this.intervalId);
        this.completedMinutes = 0;
        this.currentSecond = 0;
        
        // Remove all completed minutes
        const allRows = this.minutesContainer.querySelectorAll('.minute-row');
        allRows.forEach(row => {
            if (row !== this.currentMinuteRow) {
                row.remove();
            }
        });
        
        // Reset current minute
        this.resetCurrentMinute();
        this.updateDisplay();
        
        // Restart timer
        this.startTimer();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new MinuteTimer();
    
    document.getElementById('reset-btn').addEventListener('click', () => {
        timer.resetAll();
    });
});
