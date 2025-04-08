document.addEventListener('DOMContentLoaded', function() {
  // Power button functionality
  const powerButton = document.getElementById('powerButton');
  const powerButtonOverlay = document.getElementById('powerButtonOverlay');
  
  // Start with the Pip-Boy turned off
  document.querySelector('.pip-boy-frame').style.opacity = '0';
  
  // Power on sequence
  powerButton.addEventListener('click', () => {
    // Play power on sound
    playPipBoySound('startup', 0.5);
    
    // Animate power button
    powerButton.classList.add('active');
    
    // Fade out power overlay
    powerButtonOverlay.style.opacity = '0';
    
    setTimeout(() => {
      powerButtonOverlay.style.display = 'none';
      
      // Fade in Pip-Boy
      document.querySelector('.pip-boy-frame').style.opacity = '1';
      document.querySelector('.pip-boy-frame').style.transition = 'opacity 1.5s ease';
      
      // Start boot sequence
      startBootSequence();
    }, 1000);
  });
  
  // Custom cursor and targeting reticle
  const cursor = document.getElementById('pipCursor');
  const targetingReticle = document.getElementById('targetingReticle');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Add glitch effect occasionally
    if (Math.random() < 0.005) {
      cursor.style.transform = `translate(-50%, -50%) translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px)`;
      setTimeout(() => {
        cursor.style.transform = 'translate(-50%, -50%)';
      }, 50);
    }
    
    // Move targeting reticle
    targetingReticle.style.left = `${e.clientX}px`;
    targetingReticle.style.top = `${e.clientY}px`;
  });

  // Hide cursor when leaving the window
  document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
    targetingReticle.style.display = 'none';
  });

  document.addEventListener('mouseover', () => {
    cursor.style.display = 'block';
    targetingReticle.style.display = 'block';
  });
  
  // Screen glitch effect
  const screenGlitch = document.getElementById('screenGlitch');
  
  function triggerGlitch() {
    // Random glitch timing
    if (Math.random() < 0.1) {
      screenGlitch.style.opacity = '0.3';
      screenGlitch.style.backgroundColor = 'rgba(0, 255, 0, 0.05)';
      screenGlitch.style.animation = 'glitch 0.2s ease';
      
      // Play glitch sound
      playPipBoySound('error', 0.1);
      
      setTimeout(() => {
        screenGlitch.style.opacity = '0';
        screenGlitch.style.animation = 'none';
      }, 200);
    }
    
    // Schedule next glitch
    setTimeout(triggerGlitch, Math.random() * 10000 + 5000);
  }
  
  // Start glitch effect after boot
  setTimeout(triggerGlitch, 8000);

  // V.A.T.S.-like targeting system
  const interactiveElements = document.querySelectorAll('.nav-item, .subnav-item, .pip-button, .project-item, .knob, .button');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      // Show targeting reticle
      targetingReticle.classList.add('active');
      
      // Play hover sound
      playPipBoySound('hover');
      
      // Add glitch effect to element
      addGlitchEffect(element);
    });
    
    element.addEventListener('mouseleave', () => {
      // Hide targeting reticle
      targetingReticle.classList.remove('active');
    });
  });
  
  // Navigation functionality
  const navItems = document.querySelectorAll('.nav-item');
  const subNavItems = document.querySelectorAll('.subnav-item');
  const sections = document.querySelectorAll('.section');

  // Main navigation click handler
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Only handle DATA section for this portfolio
      if (this.dataset.section === 'data') {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // Reset sub-navigation to first item
        subNavItems.forEach(subNav => subNav.classList.remove('active'));
        document.querySelector('.subnav-item[data-section="portfolio"]').classList.add('active');

        // Show the portfolio section
        sections.forEach(section => section.classList.remove('active'));
        document.getElementById('portfolio').classList.add('active');

        // Play Pip-Boy sound
        playPipBoySound('select');
        
        // Rotate the top knob
        rotateKnob('knobTop');
      } else {
        // Play error sound for unavailable sections
        playPipBoySound('error');

        // Show temporary message
        const tempMessage = document.createElement('div');
        tempMessage.className = 'temp-message';
        tempMessage.innerHTML = `${this.dataset.section.toUpperCase()} MODULE OFFLINE`;
        tempMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: rgba(0, 10, 0, 0.8);
                    color: var(--pip-text);
                    padding: 20px;
                    border: 1px solid var(--pip-green);
                    box-shadow: 0 0 20px var(--pip-glow);
                    z-index: 100;
                    font-size: 1.5rem;
                    text-align: center;
                    animation: fadeIn 0.3s ease;
                `;

        document.body.appendChild(tempMessage);

        setTimeout(() => {
          tempMessage.style.animation = 'fadeOut 0.3s ease';
          setTimeout(() => {
            document.body.removeChild(tempMessage);
          }, 300);
        }, 2000);
      }
    });
  });

  // Sub-navigation click handler
  subNavItems.forEach(item => {
    item.addEventListener('click', function() {
      subNavItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');

      // Show corresponding section
      const sectionId = this.dataset.section;
      sections.forEach(section => section.classList.remove('active'));
      document.getElementById(sectionId).classList.add('active');

      // Play Pip-Boy sound
      playPipBoySound('select');
      
      // Rotate the middle knob
      rotateKnob('knobMiddle');
    });
  });
  
  // Knob functionality
  const knobTop = document.getElementById('knobTop');
  const knobMiddle = document.getElementById('knobMiddle');
  const knobBottom = document.getElementById('knobBottom');
  
  knobTop.addEventListener('click', () => {
    // Cycle through main nav items
    const activeNavItem = document.querySelector('.nav-item.active');
    const nextNavItem = activeNavItem.nextElementSibling || navItems[0];
    nextNavItem.click();
  });
  
  knobMiddle.addEventListener('click', () => {
    // Cycle through sub nav items
    const activeSubNavItem = document.querySelector('.subnav-item.active');
    const nextSubNavItem = activeSubNavItem.nextElementSibling || subNavItems[0];
    nextSubNavItem.click();
  });
  
  knobBottom.addEventListener('click', () => {
    // Trigger random glitch effect
    triggerGlitch();
    playPipBoySound('select');
    rotateKnob('knobBottom');
  });
  
  // Button functionality
  document.getElementById('buttonA').addEventListener('click', () => {
    playPipBoySound('select');
    showVaultBoyThumbsUp();
  });
  
  document.getElementById('buttonB').addEventListener('click', () => {
    playPipBoySound('select');
    toggleRadiationEffect();
  });
  
  document.getElementById('buttonC').addEventListener('click', () => {
    playPipBoySound('select');
    triggerEasterEgg();
  });

  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Play confirmation sound
      playPipBoySound('confirmation');

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
                <h3>TRANSMISSION SENT</h3>
                <p>YOUR MESSAGE HAS BEEN RECEIVED BY VAULT-TEC</p>
                <p>EXPECTED RESPONSE TIME: 24 HOURS</p>
            `;
      successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(0, 10, 0, 0.9);
                color: var(--pip-text);
                padding: 30px;
                border: 1px solid var(--pip-green);
                box-shadow: 0 0 30px var(--pip-glow);
                z-index: 100;
                font-size: 1.2rem;
                text-align: center;
                animation: fadeIn 0.5s ease;
                max-width: 80%;
            `;

      document.body.appendChild(successMessage);

      // Clear form
      this.reset();

      // Remove message after 3 seconds
      setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
          document.body.removeChild(successMessage);
        }, 500);
      }, 3000);
    });
  }

  // Add ambient radiation counter
  const radiationLevel = document.querySelector('.radiation-level');
  let radiationMode = 'normal';
  
  if (radiationLevel) {
    setInterval(() => {
      if (radiationMode === 'normal') {
        const randomRads = Math.floor(Math.random() * 3);
        radiationLevel.textContent = `RADS ${randomRads}`;
      } else if (radiationMode === 'high') {
        const highRads = Math.floor(Math.random() * 50) + 50;
        radiationLevel.textContent = `RADS ${highRads}`;
        radiationLevel.style.color = '#ff6';
        radiationLevel.style.textShadow = '0 0 10px rgba(255, 255, 0, 0.8)';
      }
    }, 5000);
  }
  
  function toggleRadiationEffect() {
    if (radiationMode === 'normal') {
      radiationMode = 'high';
      document.body.style.animation = 'pulse 2s infinite';
      const highRads = Math.floor(Math.random() * 50) + 50;
      radiationLevel.textContent = `RADS ${highRads}`;
      radiationLevel.style.color = '#ff6';
      radiationLevel.style.textShadow = '0 0 10px rgba(255, 255, 0, 0.8)';
    } else {
      radiationMode = 'normal';
      document.body.style.animation = 'none';
      const randomRads = Math.floor(Math.random() * 3);
      radiationLevel.textContent = `RADS ${randomRads}`;
      radiationLevel.style.color = '';
      radiationLevel.style.textShadow = '';
    }
  }

  // Add terminal typing effect
  const terminalCommands = document.querySelectorAll('.terminal-command');

  terminalCommands.forEach(command => {
    const originalText = command.textContent;
    command.textContent = "";
    let i = 0;

    const typeEffect = setInterval(() => {
      if (i < originalText.length) {
        command.textContent += originalText.charAt(i);
        i++;

        // Occasionally add a typing sound
        if (Math.random() < 0.3) {
          playPipBoySound('typing', 0.1);
        }
      } else {
        clearInterval(typeEffect);

        // After typing finishes, show the response with a slight delay
        const responseElement = command.closest('.terminal-item').querySelector('.terminal-response');
        if (responseElement) {
          setTimeout(() => {
            responseElement.style.display = 'block';
            playPipBoySound('confirmation', 0.2);
          }, 500);
        }
      }
    }, 70);
  });
});

// Boot sequence function
function startBootSequence() {
  // Add initial boot sequence text
  const bootSequence = document.createElement('div');
  bootSequence.className = 'boot-sequence';
  bootSequence.innerHTML = `
          <div>VAULT-TEC PIPBOY 3000</div>
          <div>INITIALIZING...</div>
          <div>LOADING OS...</div>
          <div>BOOT SEQUENCE COMPLETE</div>
          <div>WELCOME TO MOHAMED ATTIG'S PORTFOLIO</div>
      `;
  bootSequence.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #000;
          color: var(--pip-text);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 15px;
          font-size: 1.5rem;
          z-index: 1000;
          font-family: 'Monofonto', monospace;
      `;

  document.body.appendChild(bootSequence);

  // Animate boot sequence
  const bootLines = bootSequence.querySelectorAll('div');
  bootLines.forEach((line, index) => {
    line.style.opacity = '0';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transition = 'opacity 0.5s ease';
      playPipBoySound('typing', 0.2);
    }, index * 800);
  });

  // Remove boot sequence
  setTimeout(() => {
    bootSequence.style.opacity = '0';
    bootSequence.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(bootSequence);
    }, 500);
  }, 5000);
}

// Knob rotation function
function rotateKnob(knobId) {
  const knob = document.getElementById(knobId);
  knob.style.transition = 'transform 0.3s ease';
  knob.style.transform = 'rotate(90deg)';
  
  setTimeout(() => {
    knob.style.transition = 'transform 0.2s ease';
    knob.style.transform = 'rotate(0deg)';
  }, 300);
}

// Vault Boy thumbs up animation
function showVaultBoyThumbsUp() {
  const vaultBoy = document.querySelector('.vault-boy');
  if (vaultBoy) {
    // Store original src
    const originalSrc = vaultBoy.src;
    
    // Create thumbs up overlay
    const thumbsUp = document.createElement('div');
    thumbsUp.className = 'vault-boy-thumbs-up';
    thumbsUp.innerHTML = `<img src="assets/images/vault-boy.png" alt="Vault Boy Thumbs Up" style="filter: brightness(1.2) drop-shadow(0 0 10px var(--pip-glow));">`;
    thumbsUp.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 150px;
      height: 150px;
      z-index: 9999;
      animation: fadeIn 0.5s ease;
    `;
    
    document.body.appendChild(thumbsUp);
    
    // Remove after a few seconds
    setTimeout(() => {
      thumbsUp.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => {
        document.body.removeChild(thumbsUp);
      }, 500);
    }, 3000);
  }
}

// Easter egg function
function triggerEasterEgg() {
  // Create nuka-cola easter egg
  const nukaCola = document.createElement('div');
  nukaCola.className = 'nuka-cola-easter-egg';
  nukaCola.innerHTML = `<img src="assets/cola.png" alt="Nuka-Cola" style="width: 100%; height: 100%; object-fit: contain;">`;
  nukaCola.style.cssText = `
    position: fixed;
    bottom: 50px;
    left: 50px;
    width: 100px;
    height: 150px;
    z-index: 9999;
    animation: fadeIn 0.5s ease;
    cursor: pointer;
  `;
  
  document.body.appendChild(nukaCola);
  
  // Make it clickable
  nukaCola.addEventListener('click', () => {
    playPipBoySound('confirmation');
    nukaCola.style.animation = 'fadeOut 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(nukaCola);
    }, 500);
  });
  
  // Remove after a while if not clicked
  setTimeout(() => {
    if (document.body.contains(nukaCola)) {
      nukaCola.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => {
        if (document.body.contains(nukaCola)) {
          document.body.removeChild(nukaCola);
        }
      }, 500);
    }
  }, 10000);
}

// Sound effects function
function playPipBoySound(type, volume = 0.3) {
  const audio = new Audio();

  switch (type) {
    case 'hover':
      audio.src = 'data:audio/wav;base64,UklGRlwOAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTgOAAAAAAEA/v8CAP//AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
      break;
    case 'select':
      audio.src = 'data:audio/wav;base64,UklGRkQPAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YSAPAACBgIF/gn6Cf4B+gn6CfoF9g3uEe4V6gnqCeYJ4g3mCeIJ3g3iDd4J2gnWCdYN0g3OCcoJyg3GDcYJwgm+Cb4JuBADn5wAA5wDnAAAAAAAAAAAAAAAA5+cAAOfn5wDn5wAAAAAAAAAA5+cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADn5wAA5+cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADn5wAA5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOfnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
      break;
    case 'error':
      audio.src = 'data:audio/wav;base64,UklGRlQQAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAQAAACAgMEAgcDBwMHAwcDBwQGBQUGBAcDBwMHAwcDBwMHAwcDBwMHAgYCBQIEAgMCAQEBAAAAAP/+/v3+/f79/v3+/f79/v3+/f79/v3+/f79/v3+/f79/f78/fv8+/v7+vr5+Pj39/b19PTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY1tbV1NPT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDt6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejp6Ono6ejo=';
      break;
    case 'typing':
      audio.src = 'data:audio/wav;base64,UklGRpQJAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXAJAAAAAAECAgMDAwQEBQUFBQUFBQUFBAQDAwICAQEAAAAA//7//f38/Pv7+/v6+vr6+vr6+/v7+/z8/f3+/v8AAQECAgMEBAUFBgcHCAgJCQoKCgsLCwsMDAwMDAwMCwsLCwsKCgkJCQgIBwcGBgUFBAQDAwIBAQEAAAAA//7+/f39/Pz8+/v7+/r6+vr6+vr6+vr6+vr7+/v7/Pz8/f39/v7+/v8AAAABAQECAgIDAwMEBAQEBAUFBQUFBQUFBQUEBAQEBAMDAwMCAgICAQEBAQAAAAAAAAD//////////////////////////////////////////////////////////////wAAAAEBAQICAgMDAwQEBAQFBQUFBQUFBQUFBQUEBAQEBAMDAwMCAgICAQEBAQAAAAAAAAA=';
      break;
    case 'confirmation':
      audio.src = 'data:audio/wav;base64,UklGRlQJAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YTAJAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQA=';
      break;

  }
}
