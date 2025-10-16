body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: #f5f5f5;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.description {
    text-align: center;
    margin: 10px 0;
    color: #666;
}

.row-container {
    margin: 30px 0;
    padding: 20px;
    background: #fafafa;
    border-radius: 8px;
    border: 2px solid #e0e0e0;
}

.blocks-row {
    display: grid;
    grid-template-columns: repeat(30, 1fr);
    gap: 3px;
    margin-bottom: 10px;
}

.time-block {
    aspect-ratio: 1;
    background: #e0e0e0;
    border: 1px solid #ccc;
    border-radius: 3px;
    transition: all 0.3s ease;
}

.time-block.filled {
    background: #4CAF50;
    border-color: #388E3C;
}

.time-block.current {
    background: #2196F3;
    border-color: #1976D2;
    transform: scale(1.1);
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
}

#reset-btn {
    padding: 10px 20px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
}

#reset-btn:hover {
    background: #cc0000;
}

.stats {
    font-weight: bold;
    font-size: 16px;
}

.hierarchy {
    margin-top: 30px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #2196F3;
}

.hierarchy h3 {
    margin-top: 0;
    color: #333;
}

.hierarchy p {
    margin: 5px 0;
    color: #555;
}
