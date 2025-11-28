// Dark mode and BibTeX functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create dark mode toggle button
  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '🌓';
  darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
  document.body.appendChild(darkModeToggle);

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Update toggle button
  updateToggleButton(currentTheme);

  // Toggle theme on button click
  darkModeToggle.addEventListener('click', function() {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleButton(newTheme);
  });

  function updateToggleButton(theme) {
    darkModeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  // Initialize BibTeX functionality (with delay for Jekyll)
  setTimeout(initializeBibtexButtons, 100);
});

// BibTeX citation functionality
function initializeBibtexButtons() {
  const bibtexBtns = document.querySelectorAll('.bibtex-btn');
  
  bibtexBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const citationId = this.getAttribute('data-citation');
      const bibtexContent = document.getElementById(citationId);
      
      if (bibtexContent.style.display === 'none' || bibtexContent.style.display === '') {
        bibtexContent.style.display = 'block';
        this.textContent = 'Hide BibTeX';
      } else {
        bibtexContent.style.display = 'none';
        this.textContent = 'BibTeX';
      }
    });
  });

  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Clone parent element and remove copy button to get clean text
      const container = this.parentElement.cloneNode(true);
      const copyBtn = container.querySelector('.copy-btn');
      if (copyBtn) copyBtn.remove();
      const bibtexText = container.textContent.trim();
      
      navigator.clipboard.writeText(bibtexText).then(() => {
        this.textContent = 'Copied!';
        this.classList.add('copied');
        
        setTimeout(() => {
          this.textContent = 'Copy';
          this.classList.remove('copied');
        }, 2000);
      });
    });
  });
}
