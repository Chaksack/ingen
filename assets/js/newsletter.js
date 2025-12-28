/**
 * Newsletter Subscription Handler
 * Handles newsletter form submissions across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get all subscribe forms
    const subscribeForms = document.querySelectorAll('.subscribe-form');
    
    subscribeForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get the email input
            const emailInput = form.querySelector('input[type="email"]');
            const submitBtn = form.querySelector('.subscribe-btn');
            
            if (!emailInput) {
                console.error('Email input not found in form');
                return;
            }
            
            const email = emailInput.value.trim();
            
            // Basic validation
            if (!email) {
                showSubscribeMessage(form, 'Please enter your email address', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showSubscribeMessage(form, 'Please enter a valid email address', 'error');
                return;
            }
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span style="font-size: 12px;">⏳</span>';
            
            // Prepare form data
            const formData = new FormData();
            formData.append('email', email);
            
            // Send AJAX request
            fetch('newsletter.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                if (data.success) {
                    showSubscribeMessage(form, data.message || 'Thank you for subscribing!', 'success');
                    // Clear the input
                    emailInput.value = '';
                } else {
                    showSubscribeMessage(form, data.message || 'Subscription failed. Please try again.', 'error');
                }
            })
            .catch(error => {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                
                showSubscribeMessage(form, 'Network error. Please check your connection and try again.', 'error');
                console.error('Newsletter subscription error:', error);
            });
        });
    });
});

/**
 * Validate email address
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show subscription message
 */
function showSubscribeMessage(form, message, type) {
    // Remove any existing message
    const existingMessage = form.parentElement.querySelector('.subscribe-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'subscribe-message subscribe-message-' + type;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        padding: 12px 15px;
        margin-top: 15px;
        border-radius: 5px;
        font-size: 14px;
        animation: slideDown 0.3s ease-out;
        ${type === 'success' 
            ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
            : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'}
    `;
    
    // Insert message after form
    form.parentElement.insertBefore(messageDiv, form.nextSibling);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentElement) {
                messageDiv.style.animation = 'slideUp 0.3s ease-in';
                setTimeout(() => messageDiv.remove(), 300);
            }
        }, 5000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    
    .subscribe-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);
