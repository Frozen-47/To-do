// Terminal Task Manager Application
class TerminalTodo {
    constructor() {
        this.tasks = [];
        this.initializeStorage();
        
        this.taskList = document.getElementById('taskList');
        this.taskStats = document.getElementById('taskStats');
        this.taskInput = document.getElementById('taskInput');
        this.cursor = document.getElementById('cursor');
        this.emptyMessage = document.getElementById('emptyMessage');
        this.messageContainer = document.getElementById('messageContainer');
        
        this.intervals = [];
        this.init();
    }

    initializeStorage() {
        try {
            if (typeof Storage !== 'undefined') {
                const saved = localStorage.getItem('terminal-todo-tasks');
                if (saved) {
                    this.tasks = JSON.parse(saved);
                }
                
                // Ensure tasks have proper structure
                this.tasks = this.tasks.map(task => ({
                    text: task.text || '',
                    completed: Boolean(task.completed),
                    createdAt: typeof task.createdAt === 'number' ? task.createdAt : Date.now()
                }));
            }
        } catch (error) {
            console.warn('Storage initialization failed:', error);
            this.tasks = [];
        }
    }

    saveTasks() {
        try {
            if (typeof Storage !== 'undefined') {
                localStorage.setItem('terminal-todo-tasks', JSON.stringify(this.tasks));
            }
        } catch (error) {
            console.warn('Failed to save tasks:', error);
            this.showMessage('Failed to save tasks', true);
        }
    }

    init() {
        this.renderTasks();
        this.setupEventListeners();
        this.startIntervals();
        this.showMessage('system ready.');
    }

    setupEventListeners() {
        this.taskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            } else if (e.ctrlKey && e.key === 'c') {
                e.preventDefault();
                this.taskInput.value = '';
                this.showMessage('input cleared.');
            }
        });

        // Prevent form submission
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }

    startIntervals() {
        // Cursor blinking
        const cursorInterval = setInterval(() => {
            if (this.cursor) {
                this.cursor.classList.toggle('hidden');
            }
        }, 500);
        this.intervals.push(cursorInterval);

        // Timestamp updates
        const timestampInterval = setInterval(() => {
            this.updateTimestamps();
        }, 1000);
        this.intervals.push(timestampInterval);
    }

    formatTimeAgo(timestamp) {
        try {
            const seconds = Math.floor((Date.now() - timestamp) / 1000);
            if (seconds < 5) return "just now";
            if (seconds < 60) return `${seconds} sec ago`;
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return `${minutes} min ago`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `${hours} hr ago`;
            const days = Math.floor(hours / 24);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } catch (error) {
            return "unknown";
        }
    }

    updateTimestamps() {
        try {
            const timeSpans = document.querySelectorAll('.task-time');
            timeSpans.forEach(span => {
                const index = parseInt(span.dataset.index);
                if (!isNaN(index) && this.tasks[index]) {
                    span.textContent = `[${this.formatTimeAgo(this.tasks[index].createdAt)}] `;
                }
            });
        } catch (error) {
            console.warn('Timestamp update failed:', error);
        }
    }

    addTask() {
        try {
            const task = this.taskInput.value.trim();
            if (!task) {
                this.showMessage('task cannot be empty', true);
                return;
            }

            if (task.length > 150) {
                this.showMessage('task too long (max 150 characters)', true);
                return;
            }

            const newTask = { 
                text: this.sanitizeInput(task), 
                completed: false, 
                createdAt: Date.now()
            };
            
            this.tasks.push(newTask);
            this.saveTasks();
            this.taskInput.value = '';
            this.renderTasks();
            this.showMessage(`task added: "${newTask.text}"`);
        } catch (error) {
            console.error('Failed to add task:', error);
            this.showMessage('Failed to add task', true);
        }
    }

    sanitizeInput(input) {
        // Basic XSS prevention
        return input.replace(/[<>]/g, '');
    }

    toggleTask(index) {
        try {
            if (this.tasks[index]) {
                this.tasks[index].completed = !this.tasks[index].completed;
                this.saveTasks();
                this.renderTasks();
            } else {
                this.showMessage('task not found', true);
            }
        } catch (error) {
            console.error('Failed to toggle task:', error);
        }
    }

    deleteTask(index) {
        try {
            if (this.tasks[index]) {
                const taskText = this.tasks[index].text;
                this.tasks.splice(index, 1);
                this.saveTasks();
                this.renderTasks();
                this.showMessage(`task deleted: "${taskText}"`);
            } else {
                this.showMessage('task not found for deletion', true);
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    }

    renderTasks() {
        try {
            if (!this.taskList) return;
            
            this.taskList.innerHTML = '';
            
            if (this.tasks.length === 0) {
                if (this.emptyMessage) {
                    this.emptyMessage.style.display = 'block';
                }
            } else {
                if (this.emptyMessage) {
                    this.emptyMessage.style.display = 'none';
                }
            }

            this.tasks.forEach((task, index) => {
                const li = document.createElement('li');
                if (task.completed) li.classList.add('completed');
                
                // Add click handler
                li.addEventListener('click', (e) => {
                    if (e.target.classList.contains('delete-btn')) return;
                    this.toggleTask(index);
                });

                // Create timestamp element
                const timeSpan = document.createElement('span');
                timeSpan.classList.add('task-time');
                timeSpan.dataset.index = index.toString();
                timeSpan.textContent = `[${this.formatTimeAgo(task.createdAt)}] `;

                // Create task text
                const textNode = document.createTextNode(task.text);

                // Create delete button
                const delBtn = document.createElement('span');
                delBtn.textContent = '×';
                delBtn.classList.add('delete-btn');
                delBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deleteTask(index);
                });

                li.appendChild(timeSpan);
                li.appendChild(textNode);
                li.appendChild(delBtn);
                this.taskList.appendChild(li);
                
                // Staggered animation
                setTimeout(() => {
                    li.style.animationDelay = `${index * 0.1}s`;
                }, 10);
            });

            this.updateStats();
        } catch (error) {
            console.error('Failed to render tasks:', error);
        }
    }

    updateStats() {
        try {
            if (!this.taskStats) return;
            
            const total = this.tasks.length;
            const completed = this.tasks.filter(t => t.completed).length;
            const pending = total - completed;
            
            this.taskStats.textContent = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
        } catch (error) {
            console.error('Failed to update stats:', error);
        }
    }

    showMessage(msg, isError = false) {
        try {
            if (!this.messageContainer) return;
            
            // Remove existing messages of the same type
            const existingMsg = this.messageContainer.querySelector(
                isError ? '.error-message' : '.system-message'
            );
            if (existingMsg) {
                existingMsg.remove();
            }

            const sysMsg = document.createElement('div');
            if (isError) {
                sysMsg.classList.add('error-message');
                sysMsg.textContent = `// ERROR: ${msg}`;
            } else {
                sysMsg.classList.add('system-message');
                sysMsg.textContent = `// ${msg}`;
            }
            
            this.messageContainer.appendChild(sysMsg);
            
            setTimeout(() => {
                if (sysMsg.parentNode) {
                    sysMsg.style.opacity = '0';
                    setTimeout(() => {
                        if (sysMsg.parentNode) {
                            sysMsg.remove();
                        }
                    }, 300);
                }
            }, isError ? 4000 : 2500);
        } catch (error) {
            console.error('Failed to show message:', error);
        }
    }

    cleanup() {
        this.intervals.forEach(interval => clearInterval(interval));
        this.intervals = [];
    }
}

// Application initialization
let app = null;

function initializeApp() {
    try {
        app = new TerminalTodo();
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (app) {
                app.cleanup();
            }
        });
        
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
}

// Initialize the app after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
