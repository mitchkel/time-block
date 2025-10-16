class MinuteTimer {
    constructor() {
        this.completedMinutes = 0;
        this.currentSecond = 0;
        this.isRunning = false;
        this.intervalId = null;
        
        this.minutesContainer = document.querySelector('.minutes-container');
        this.currentMinuteRow = document.getElementById('current-minute');
        this.currentBlocksContainer = document.getElementById('current-blocks');
        
        this.initializeCurrentMinute();
        this.startTimer();
    }
    
    initializeCurrentMinute() {
        this.currentBlocksContainer.innerHTML = '';
        
        // Create 60 blocks for the current minute
        for (let i = 0; i < 60; i++) {
            const block = document.createElement('div');
            block.className = 'time-block';
            block.dataset.second = i;
            this.currentBlocksContainer.appendChild(block);
        }
    }
    
    startTimer() {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        // Update the visual state of blocks
        this.updateBlocks();
        
        this.currentSecond++;
        this.updateDisplay();
        
        // Check if minute is complete
        if (this.currentSecond >= 60) {
            this.completeMinute();
        }
    }
    
    updateBlocks() {
        const blocks = this.currentBlocksContainer.querySelectorAll('.time-block');
        
        // Reset all blocks to default state first
        blocks.forEach(block => {
            block.classList.remove('current', 'filled');
        });
        
        // Set filled blocks (seconds that have passed)
        for (let i = 0; i < this.currentSecond; i++) {
            if (blocks[i]) {
                blocks[i].classList.add('filled');
            }
        }
        
        // Set current block (the second happening now)
        if (blocks[this.currentSecond]) {
            blocks[this.currentSecond].classList.add('current');
        }
    }
    
    completeMinute() {
        // Mark current minute as completed
        this.currentMinuteRow.classList.add('completed');
        this.currentMinuteRow.querySelector('.minute-label').textContent = `Minute ${this.completedMinutes + 1}`;
        
        // Increment counter
        this.completedMinutes++;
        
        // Create a new completed minute row above current
        const completedRow = this.currentMinuteRow.cloneNode(true);
        completedRow.id = ''; // Remove ID so we don't have duplicates
        completedRow.classList.remove('completed'); // Will be re-added below
        
        // Make all blocks in the completed row green
        const completedBlocks = completedRow.querySelectorAll('.time-block');
        completedBlocks.forEach(block => {
            block.classList.remove('current');
            block.classList.add('filled');
        });
        
        completedRow.classList.add('completed');
        
        // Insert the completed minute before the current minute
        this.minutesContainer.insertBefore(completedRow, this.currentMinuteRow);
        
        // Reset current minute
        this.resetCurrentMinute();
        
        this.updateDisplay();
    }
    
    resetCurrentMinute() {
        this.currentSecond = 0;
        this.initializeCurrentMinute();
        this.currentMinuteRow.classList.remove('completed');
        this.currentMinuteRow.querySelector('.minute-label').textContent = 'Current Minute';
    }
    
    updateDisplay() {
        const timeDisplay = document.getElementById('time-display');
        const completedCount = document.getElementById('completed-count');
        
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
