/* ============================================
   PRIVACY POPUP & SIMPLE AUTH VALIDATION
   Add this code to the END of your ai.js file (before init())
   ============================================ */

// ============================================
// PRIVACY POPUP FUNCTIONS
// ============================================

// Check if user has seen privacy popup
function hasSeenPrivacyPopup() {
    return localStorage.getItem('wellness_privacy_popup_seen') === 'true';
}

// Show privacy popup on first visit
function showPrivacyPopup() {
    const overlay = document.getElementById('privacyPopupOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Hide privacy popup
function hidePrivacyPopup() {
    const overlay = document.getElementById('privacyPopupOverlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Accept privacy policy
function acceptPrivacyPolicy() {
    // Store acceptance
    localStorage.setItem('wellness_privacy_popup_seen', 'true');
    localStorage.setItem('wellness_privacy_accepted', 'true');
    localStorage.setItem('wellness_cookies_accepted', 'true');
    localStorage.setItem('wellness_privacy_acceptance_date', new Date().toISOString());
    
    // Hide popup
    hidePrivacyPopup();
    
    // Show success toast
    showToast('✅ Privacy preferences saved. Welcome to Wellness Oracle!', 'success');
    
    console.log('Privacy policy accepted');
}

// Decline privacy policy
function declinePrivacyPolicy() {
    // Store decline
    localStorage.setItem('wellness_privacy_popup_seen', 'true');
    localStorage.setItem('wellness_privacy_declined', 'true');
    localStorage.setItem('wellness_privacy_decline_date', new Date().toISOString());
    
    // Hide popup
    hidePrivacyPopup();
    
    // Show warning
    showToast('⚠️ To use Wellness Oracle, you must accept our Privacy Policy and Cookie Policy.', 'warning');
}

// Check privacy popup on page load
function checkPrivacyPopup() {
    // Only show on first visit
    if (!hasSeenPrivacyPopup()) {
        // Small delay for better UX
        setTimeout(() => {
            showPrivacyPopup();
        }, 1000);
    }
}

// ============================================
// ENHANCED AUTH FUNCTIONS (Simplified)
// ============================================

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show auth error message
function showAuthError(message) {
    let errorDiv = document.querySelector('.auth-error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'auth-error-message';
        
        const activeForm = document.querySelector('.auth-form.active');
        if (activeForm) {
            activeForm.insertBefore(errorDiv, activeForm.firstChild);
        }
    }
    
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        background: #fee;
        color: #c33;
        padding: 12px 16px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 13px;
        border-left: 4px solid #c33;
        animation: slideInDown 0.3s ease;
    `;
    
    setTimeout(() => {
        if (errorDiv && errorDiv.parentElement) {
            errorDiv.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => errorDiv.remove(), 300);
        }
    }, 5000);
}

// Clear error message
function clearAuthError() {
    const errorDiv = document.querySelector('.auth-error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Enhanced signIn function with validation
function signIn() {
    const email = document.getElementById('signinEmail').value.trim();
    const password = document.getElementById('signinPassword').value;
    
    // Clear any previous errors
    clearAuthError();
    
    // Validate email
    if (!email) {
        showAuthError('Please enter your email address');
        document.getElementById('signinEmail').focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showAuthError('Please enter a valid email address');
        document.getElementById('signinEmail').focus();
        return;
    }
    
    // Validate password
    if (!password) {
        showAuthError('Please enter your password');
        document.getElementById('signinPassword').focus();
        return;
    }
    
    // Store terms acceptance (user accepted by continuing)
    localStorage.setItem('wellness_terms_accepted_signin', 'true');
    localStorage.setItem('wellness_terms_acceptance_date_signin', new Date().toISOString());
    
    // Continue with sign-in logic
    performSignIn(email, password);
}

// Enhanced signUp function with validation
function signUp() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    
    // Clear any previous errors
    clearAuthError();
    
    // Validate name
    if (!name) {
        showAuthError('Please enter your full name');
        document.getElementById('signupName').focus();
        return;
    }
    
    if (name.length < 2) {
        showAuthError('Please enter a valid name');
        document.getElementById('signupName').focus();
        return;
    }
    
    // Validate email
    if (!email) {
        showAuthError('Please enter your email address');
        document.getElementById('signupEmail').focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showAuthError('Please enter a valid email address');
        document.getElementById('signupEmail').focus();
        return;
    }
    
    // Validate password
    if (!password) {
        showAuthError('Please create a password');
        document.getElementById('signupPassword').focus();
        return;
    }
    
    if (password.length < 8) {
        showAuthError('Password must be at least 8 characters long');
        document.getElementById('signupPassword').focus();
        return;
    }
    
    // Store terms acceptance (user accepted by continuing)
    localStorage.setItem('wellness_terms_accepted_signup', 'true');
    localStorage.setItem('wellness_privacy_accepted_signup', 'true');
    localStorage.setItem('wellness_medical_disclaimer_accepted', 'true');
    localStorage.setItem('wellness_terms_acceptance_date_signup', new Date().toISOString());
    
    // Continue with sign-up logic
    performSignUp(name, email, password);
}

// Placeholder sign-in function (replace with your actual implementation)
function performSignIn(email, password) {
    console.log('Signing in with:', email);
    
    // Simulate API call
    showToast('✅ Signing in...', 'success');
    
    setTimeout(() => {
        // Update authentication state
        isAuthenticated = true;
        currentUser = {
            email: email,
            name: email.split('@')[0]
        };
        
        // Update UI
        updateAuthUI();
        closeAuthModal();
        
        showToast('✅ Successfully signed in!', 'success');
    }, 1000);
}

// Placeholder sign-up function (replace with your actual implementation)
function performSignUp(name, email, password) {
    console.log('Signing up with:', { name, email });
    
    // Simulate API call
    showToast('✅ Creating your account...', 'success');
    
    setTimeout(() => {
        // Update authentication state
        isAuthenticated = true;
        currentUser = {
            email: email,
            name: name
        };
        
        // Update UI
        updateAuthUI();
        closeAuthModal();
        
        showToast('✅ Account created successfully!', 'success');
    }, 1000);
}

// Update authentication UI
function updateAuthUI() {
    const authSection = document.getElementById('authSection');
    const userSection = document.getElementById('userSection');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');
    
    if (isAuthenticated && currentUser) {
        authSection.style.display = 'none';
        userSection.style.display = 'block';
        
        userName.textContent = currentUser.name || 'User';
        userEmail.textContent = currentUser.email || 'user@example.com';
        userAvatar.textContent = (currentUser.name || 'U')[0].toUpperCase();
    } else {
        authSection.style.display = 'block';
        userSection.style.display = 'none';
    }
}

// Modified switchAuthTab function
function switchAuthTab(tab) {
    clearAuthError();
    
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    if (tab === 'signin') {
        signinForm?.classList.add('active');
        signupForm?.classList.remove('active');
        tabs[0]?.classList.add('active');
        tabs[1]?.classList.remove('active');
    } else {
        signinForm?.classList.remove('active');
        signupForm?.classList.add('active');
        tabs[0]?.classList.remove('active');
        tabs[1]?.classList.add('active');
    }
}

// Modified closeAuthModal function
function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'none';
    }
    
    // Reset forms
    document.getElementById('signinEmail').value = '';
    document.getElementById('signinPassword').value = '';
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    
    clearAuthError();
}

// Modified showAuthModal function
function showAuthModal(tab) {
    const authModal = document.getElementById('authModal');
    if (authModal) {
        authModal.style.display = 'flex';
        switchAuthTab(tab || 'signin');
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        isAuthenticated = false;
        currentUser = null;
        
        updateAuthUI();
        showToast('👋 Logged out successfully', 'info');
    }
}

// Delete account function
function deleteAccount() {
    const confirmed = confirm(
        '⚠️ Are you sure you want to delete your account?\n\n' +
        'This action cannot be undone and will permanently delete:\n' +
        '• Your account information\n' +
        '• All your chat history\n' +
        '• Your preferences and settings'
    );
    
    if (confirmed) {
        const doubleConfirm = confirm('This is your last chance. Delete account permanently?');
        
        if (doubleConfirm) {
            console.log('Deleting account...');
            
            showToast('🗑️ Deleting account...', 'warning');
            
            setTimeout(() => {
                isAuthenticated = false;
                currentUser = null;
                chatSessions = [];
                currentSessionId = null;
                conversationHistory = [];
                
                localStorage.clear();
                
                updateAuthUI();
                document.getElementById('chatHistory').innerHTML = '<div class="empty-history">No chat history yet</div>';
                
                showToast('✅ Account deleted successfully', 'success');
            }, 1500);
        }
    }
}

// Toast notification function
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#20a898' : type === 'warning' ? '#ff9800' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10001;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// INITIALIZATION
// ============================================

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Privacy & Auth module loaded');
    
    // Check and show privacy popup
    checkPrivacyPopup();
    
    // Update auth UI based on current state
    updateAuthUI();
});

// Add CSS for animations
const authAnimationStyles = document.createElement('style');
authAnimationStyles.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(authAnimationStyles);

console.log('✅ Privacy & Auth module initialized');
