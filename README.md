# To-Do App 📝

An interactive terminal-style To-Do list application built with HTML, CSS, and JavaScript. Designed to give a command-line experience inside the browser for managing tasks.

![To-Do App](https://img.shields.io/badge/version-4.7-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **Terminal-Style UI**: Retro command-line interface with a modern twist
- **Task Management**: Add, complete, and delete tasks effortlessly
- **Keyboard Shortcuts**: Quick actions using Enter, Click, and X keys
- **Live Statistics**: Real-time tracking of total, completed, and pending tasks
- **Responsive Design**: Fully optimized for both desktop and mobile devices
- **Smooth Animations**: Elegant fade-in effects and hover interactions
- **Persistent Storage**: Tasks are saved in browser localStorage (coming soon)

## 🚀 Demo

**[Live Demo](https://frozen-47.github.io/To-do/)** - Try it now!

## 🎯 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/Frozen-47/To-do.git
```

2. Navigate to the project directory:
```bash
cd To-do
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

4. Visit `http://localhost:8000` in your browser

## 📖 Usage

### Adding Tasks
- Type your task in the input field
- Press **Enter** to add the task to your list

### Managing Tasks
- **Click** on a task to mark it as complete/incomplete
- **Click the X button** to delete a task
- View live statistics at the bottom-left corner

### Keyboard Shortcuts
- `Enter` - Add new task
- `Click` - Toggle task completion
- `X` - Delete task

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with custom animations
- **JavaScript (ES6)** - Interactive functionality
- **JetBrains Mono** - Monospace font for terminal aesthetic

## 📁 Project Structure

```
To-do/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript logic
└── README.md           # Project documentation
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
/* Background */
background: #000;

/* Text colors */
color: #fff;

/* Border colors */
border: 2px solid #333;
```

### Modifying Terminal Header
Change the terminal dots and title in the HTML:
```html
<div class="terminal-header">
    <div class="terminal-dots">
        <div class="dot red"></div>
        <div class="dot yellow"></div>
        <div class="dot green"></div>
    </div>
    <div class="terminal-title">todo.exe</div>
</div>
```

## 📱 Mobile Responsive

The app is fully responsive and optimized for mobile devices with:
- Touch-friendly interface
- Adjusted font sizes
- Optimized layout for smaller screens
- Always-visible delete buttons on mobile

## 🔮 Upcoming Features

- [ ] Task persistence with localStorage
- [ ] Task categories/tags
- [ ] Priority levels
- [ ] Due dates
- [ ] Dark/Light theme toggle
- [ ] Export tasks to JSON/CSV
- [ ] Keyboard navigation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Frozen-47**
- GitHub: [@Frozen-47](https://github.com/Frozen-47)

## 🙏 Acknowledgments

- Inspired by terminal-based applications
- Font: [JetBrains Mono](https://www.jetbrains.com/lp/mono/)
- Icons: Unicode characters

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

⭐ Star this repo if you find it helpful!

Made with ❤️ by Frozen-47
