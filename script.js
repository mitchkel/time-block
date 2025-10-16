class MinuteTimer {
    constructor() {
        this.blocks = [];
        this.currentSecond = 0;
        this.isRunning = false;
        this.intervalId = null;
        
        this.initializeBlocks();
        this.startTimer();
    }
    
    initializeBlocks() {
        const container = document.getElementById('blocks-container');
        container.innerHTML = '';
        
        for (let i = 0; i < 60; i++) {
            const block = document.createElement('div');
            block.className = 'time-block';
            block.dataset.second = i;
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
        if (this.currentSecond > 0) {
            this.blocks[this.currentSecond - 1].classList.remove('current');
            this.blocks[this.currentSecond - 1].classList.add('filled');
        }
        
        if (this.currentSecond < 60) {
            this.blocks[this.currentSecond].classList.add('current');
            this.currentSecond++;
        } else {
            this.completeMinute();
        }
        
        this.updateDisplay();
    }
    
    updateDisplay() {
        const timeDisplay = document.getElementById('time-display');
        const filledCount = document.getElementById('filled-count');
        
        const seconds = this.currentSecond;
        timeDisplay.textContent = `0:${seconds.toString().padStart(2, '0')}`;
        filledCount.textContent = seconds;
    }
    
    completeMinute() {
        clearInterval(this.intervalId);
        this.isRunning = false;
        console.log('Minute completed!');
        setTimeout(() => {
            this.resetTimer();
            this.startTimer();
        }, 1000);
    }
    
    resetTimer() {
        clearInterval(this.intervalId);
        this.currentSecond = 0;
        this.blocks.forEach(block => {
            block.className = 'time-block';
        });
        this.updateDisplay();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const timer = new MinuteTimer();
    document.getElementById('reset-btn').addEventListener('click', () => {
        timer.resetTimer();
        timer.startTimer();
    });
});
