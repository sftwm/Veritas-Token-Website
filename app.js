
        // Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const mobileThemeToggle = document.getElementById('mobileThemeToggle');
        const html = document.documentElement;
        
        // Check for saved theme preference or use preferred color scheme
        const savedTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        function updateThemeIcon(theme) {
            const icon = theme === 'dark' ? 'fa-sun' : 'fa-moon';
            const text = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
            themeToggle.innerHTML = `<i class="fas ${icon}"></i>`;
            if (mobileThemeToggle) {
                mobileThemeToggle.innerHTML = `<i class="fas ${icon}"></i> ${text}`;
            }
        }
        
        function toggleTheme() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        }
        
        themeToggle.addEventListener('click', toggleTheme);
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', toggleTheme);
        }
        
        // Mobile Menu Functionality
        const menuToggle = document.getElementById('menuToggle');
        const mobileNav = document.getElementById('mobileNav');
        const overlay = document.getElementById('overlay');
        const closeMenu = document.getElementById('closeMenu');
        
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        overlay.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close mobile menu when clicking on links
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Close mobile menu on larger screens if resized
        function handleResize() {
            if (window.innerWidth > 768) {
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        window.addEventListener('resize', handleResize);