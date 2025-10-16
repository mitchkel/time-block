class ThirtySecondTimer {
    constructor() {
        this.blocks = [];
        this.currentSecond = 0;
        this.isRunning = false;
        this.intervalId = null;
        this.totalSeconds = 30; // 30-second row
        
        this.initializeBlocks();
        this.startTimer();
    }
    
    initializeBlocks() {
        const container = document.getElementById('blocks-container');
        container.innerHTML = '';
        
        for (let i = 0; i < this.totalSeconds; i++) {
            const block = document.createElement('div');
            block.className = 'time-block';
            block.dataset.second = i;
            block.title = `Second ${i + 1}`;
            this.blocks.push(block);
            container.appendChild(block);
        }
    }
    
    startTimer() {
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }
    
    updateTimer() {
        // Clear previous current block
        if (this.currentSecond > 0) {
            this.blocks[this.currentSecond - 1].classList.remove('current');
            this.blocks[this.currentSecond - 1].classList.add('filled');
        }
        
        // Update current block
        if (this.currentSecond < this.totalSeconds) {
            this.blocks[this.currentSecond].classList.add('current');
            this.currentSecond++;
        } else {
            // Row completed - start next row automatically
            this.completeRow();
        }
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        const timeDisplay = document.getElementById('time-display');
        const filledCount = document.getElementById('filled-count');
        
        const seconds = this.currentSecond;
        timeDisplay.textContent = `0:${seconds.toString().padStart(2, '0')}`;
        filledCount.textContent = seconds;
        
        // Update row completion status
        if (seconds === this.totalSeconds) {
            timeDisplay.textContent = "Row Complete!";
        }
    }
    
    completeRow() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        console.log('30-second row completed!');
        
        // Visual feedback for completed row
        this.blocks.forEach(block => {
            block.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        // Auto-reset after a moment to simulate continuous flow
        setTimeout(() => {
            this.resetTimer();
            this.startTimer();
        }, 1500);
    }
    
    resetTimer() {
        clearInterval(this.intervalId);
        this.currentSecond = 0;
        this.blocks.forEach(block => {
            block.className = 'time-block';
            block.style.animation = '';
        });
        this.updateDisplay();
    }
}

// Add CSS animation for row completion
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const timer = new ThirtySecondTimer();
    
    document.getElementById('reset-btn').addEventListener('click', () => {
        timer.resetTimer();
        timer.startTimer();
    });
});
