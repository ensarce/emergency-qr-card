/**
 * Emergency QR Card - Main Application Logic
 * Handles form updates, QR generation, and card download
 */

(function () {
    'use strict';

    // ===================================
    // DOM Elements
    // ===================================

    const elements = {
        // Form inputs
        fullName: document.getElementById('fullName'),
        birthDate: document.getElementById('birthDate'),
        bloodType: document.getElementById('bloodType'),
        allergies: document.getElementById('allergies'),
        diseases: document.getElementById('diseases'),
        medications: document.getElementById('medications'),
        emergencyContact: document.getElementById('emergencyContact'),
        emergencyPhone: document.getElementById('emergencyPhone'),
        notes: document.getElementById('notes'),

        // Preview elements
        previewName: document.getElementById('previewName'),
        previewBirthDate: document.getElementById('previewBirthDate'),
        previewBloodType: document.getElementById('previewBloodType'),
        previewAllergies: document.getElementById('previewAllergies'),
        previewEmergency: document.getElementById('previewEmergency'),

        // QR and actions
        qrCodeContainer: document.getElementById('qrCode'),
        downloadBtn: document.getElementById('downloadBtn'),
        emergencyCard: document.getElementById('emergencyCard')
    };

    let qrCodeInstance = null;

    // ===================================
    // Initialization
    // ===================================

    function init() {
        setupEventListeners();
        loadSavedData();
        updatePreview();
        generateQRCode();
        updateDownloadButton();
    }

    // ===================================
    // Event Listeners
    // ===================================

    function setupEventListeners() {
        // Input change handlers
        const formInputs = [
            'fullName', 'birthDate', 'bloodType', 'allergies',
            'diseases', 'medications', 'emergencyContact', 'emergencyPhone', 'notes'
        ];

        formInputs.forEach(inputId => {
            const element = elements[inputId];
            if (element) {
                element.addEventListener('input', debounce(handleInputChange, 300));
                element.addEventListener('change', handleInputChange);
            }
        });

        // Download button
        if (elements.downloadBtn) {
            elements.downloadBtn.addEventListener('click', downloadCard);
        }
    }

    // ===================================
    // Input Handling
    // ===================================

    function handleInputChange() {
        saveData();
        updatePreview();
        generateQRCode();
        updateDownloadButton();
    }

    function updateDownloadButton() {
        // Require at least name or emergency contact to enable download
        const hasData = elements.fullName.value.trim() ||
            elements.emergencyPhone.value.trim() ||
            elements.bloodType.value;

        if (elements.downloadBtn) {
            if (hasData) {
                elements.downloadBtn.disabled = false;
                elements.downloadBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                elements.downloadBtn.title = '';
            } else {
                elements.downloadBtn.disabled = true;
                elements.downloadBtn.classList.add('opacity-50', 'cursor-not-allowed');
                elements.downloadBtn.title = 'Lütfen en az bir bilgi girin';
            }
        }
    }

    // ===================================
    // Preview Updates
    // ===================================

    function updatePreview() {
        // Name
        elements.previewName.textContent = elements.fullName.value || '-';

        // Birth Date
        if (elements.birthDate.value) {
            const date = new Date(elements.birthDate.value);
            elements.previewBirthDate.textContent = formatDate(date);
        } else {
            elements.previewBirthDate.textContent = '-';
        }

        // Blood Type
        elements.previewBloodType.textContent = elements.bloodType.value || '-';

        // Allergies
        elements.previewAllergies.textContent = elements.allergies.value || '-';

        // Emergency Contact
        const contact = elements.emergencyContact.value;
        const phone = elements.emergencyPhone.value;
        if (contact || phone) {
            elements.previewEmergency.textContent = [contact, phone].filter(Boolean).join(' - ');
        } else {
            elements.previewEmergency.textContent = '-';
        }
    }

    // ===================================
    // QR Code Generation
    // ===================================

    function generateQRCode() {
        const data = collectFormData();
        const qrText = formatQRData(data);

        // Clear previous QR code
        elements.qrCodeContainer.innerHTML = '';

        // Generate new QR code as image (not canvas) for html2canvas compatibility
        try {
            qrCodeInstance = new QRCode(elements.qrCodeContainer, {
                text: qrText || 'Acil Durum Kartı',
                width: 80,
                height: 80,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.L
            });

            // Wait for QR to render, then ensure it's an img element
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const canvas = elements.qrCodeContainer.querySelector('canvas');
                    const existingImg = elements.qrCodeContainer.querySelector('img');

                    // If there's a canvas but no image, convert it
                    if (canvas && !existingImg) {
                        try {
                            const dataUrl = canvas.toDataURL('image/png');
                            const img = document.createElement('img');
                            img.src = dataUrl;
                            img.alt = 'QR Code';
                            img.style.cssText = 'width:100%;height:100%;display:block;';
                            // Replace canvas with img
                            canvas.style.display = 'none';
                            elements.qrCodeContainer.appendChild(img);
                        } catch (e) {
                            console.warn('QR canvas conversion failed:', e);
                        }
                    }
                }, 50);
            });
        } catch (e) {
            console.error('QR generation failed:', e);
        }
    }

    function collectFormData() {
        return {
            name: elements.fullName.value.trim(),
            birthDate: elements.birthDate.value,
            bloodType: elements.bloodType.value,
            allergies: elements.allergies.value.trim(),
            diseases: elements.diseases.value.trim(),
            medications: elements.medications.value.trim(),
            emergencyContact: elements.emergencyContact.value.trim(),
            emergencyPhone: elements.emergencyPhone.value.trim(),
            notes: elements.notes.value.trim()
        };
    }

    function formatQRData(data) {
        // Generate URL that opens beautiful emergency info page
        // Use current origin or a default base URL
        const baseUrl = window.location.origin + window.location.pathname.replace('index.html', '');
        const viewUrl = baseUrl + 'view.html';

        // Build URL parameters (short keys to save space)
        const params = new URLSearchParams();

        if (data.name) params.set('n', data.name);
        if (data.bloodType) params.set('b', data.bloodType);
        if (data.birthDate) params.set('bd', formatDate(new Date(data.birthDate)));
        if (data.allergies) params.set('a', data.allergies.substring(0, 50));
        if (data.diseases) params.set('d', data.diseases.substring(0, 40));
        if (data.medications) params.set('m', data.medications.substring(0, 40));
        if (data.emergencyContact) params.set('ec', data.emergencyContact.substring(0, 30));
        if (data.emergencyPhone) params.set('p', data.emergencyPhone);
        if (data.notes) params.set('nt', data.notes.substring(0, 40));

        return viewUrl + '?' + params.toString();
    }

    // ===================================
    // Card Download
    // ===================================

    async function downloadCard() {
        const btn = elements.downloadBtn;
        const originalContent = btn.innerHTML;

        try {
            // Show loading state
            btn.disabled = true;
            btn.innerHTML = `
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                İndiriliyor...
            `;

            // Wait a moment for any pending renders
            await new Promise(resolve => setTimeout(resolve, 200));

            // Generate canvas from card with fixed dimensions
            const cardWidth = 450; // Fixed card width
            const cardHeight = elements.emergencyCard.offsetHeight;

            const canvas = await html2canvas(elements.emergencyCard, {
                scale: 3,
                width: cardWidth,
                height: cardHeight,
                backgroundColor: '#1a1a2e',
                logging: false,
                useCORS: true,
                allowTaint: true,
                imageTimeout: 0,
                scrollX: 0,
                scrollY: 0,
                windowWidth: cardWidth + 100,
                windowHeight: cardHeight + 100,
                onclone: function (clonedDoc) {
                    const clonedCard = clonedDoc.getElementById('emergencyCard');
                    if (clonedCard) {
                        // Fix card size and styling for clean export
                        clonedCard.style.transform = 'none';
                        clonedCard.style.animation = 'none';
                        clonedCard.style.width = cardWidth + 'px';
                        clonedCard.style.maxWidth = cardWidth + 'px';
                        clonedCard.style.margin = '0';
                        clonedCard.style.boxShadow = 'none';
                        clonedCard.style.border = '2px solid rgba(255,255,255,0.2)';
                        clonedCard.style.borderRadius = '16px';

                        // Ensure QR is visible
                        const qr = clonedDoc.getElementById('qrCode');
                        if (qr) {
                            qr.style.width = '80px';
                            qr.style.height = '80px';
                            qr.style.maxWidth = '80px';
                            qr.style.maxHeight = '80px';
                        }
                    }
                }
            });

            // Generate file name
            const name = elements.fullName.value.trim() || 'acil-kart';
            const safeName = name.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ\s]/g, '').replace(/\s+/g, '-');
            const fileName = `${safeName}-acil-kart.png`;

            // iOS Safari compatible download
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

            if (isIOS) {
                // For iOS: Open image in new tab (user can long-press to save)
                const dataUrl = canvas.toDataURL('image/png', 1.0);
                const newTab = window.open();
                if (newTab) {
                    newTab.document.write(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <title>${fileName}</title>
                            <style>
                                body { margin: 0; background: #1a1a2e; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui; }
                                img { max-width: 100%; height: auto; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
                                p { color: white; margin-top: 20px; text-align: center; padding: 0 20px; }
                            </style>
                        </head>
                        <body>
                            <img src="${dataUrl}" alt="Acil Kart">
                            <p>📱 Resmi kaydetmek için basılı tutun ve "Resmi Kaydet" seçin</p>
                        </body>
                        </html>
                    `);
                    newTab.document.close();
                }
            } else {
                // For other browsers: Use blob for reliable download
                canvas.toBlob(function (blob) {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = fileName;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                    }
                }, 'image/png', 1.0);
            }

            // Show success
            btn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                ${isIOS ? 'Açıldı!' : 'İndirildi!'}
            `;

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }, 2000);

        } catch (error) {
            console.error('Download failed:', error);
            btn.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Hata oluştu
            `;

            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
            }, 2000);
        }
    }

    // ===================================
    // Local Storage
    // ===================================

    function saveData() {
        const data = collectFormData();
        try {
            localStorage.setItem('emergencyCardData', JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
    }

    function loadSavedData() {
        try {
            const saved = localStorage.getItem('emergencyCardData');
            if (saved) {
                const data = JSON.parse(saved);

                if (data.name) elements.fullName.value = data.name;
                if (data.birthDate) elements.birthDate.value = data.birthDate;
                if (data.bloodType) elements.bloodType.value = data.bloodType;
                if (data.allergies) elements.allergies.value = data.allergies;
                if (data.diseases) elements.diseases.value = data.diseases;
                if (data.medications) elements.medications.value = data.medications;
                if (data.emergencyContact) elements.emergencyContact.value = data.emergencyContact;
                if (data.emergencyPhone) elements.emergencyPhone.value = data.emergencyPhone;
                if (data.notes) elements.notes.value = data.notes;
            }
        } catch (e) {
            console.warn('Could not load from localStorage:', e);
        }
    }

    // ===================================
    // Utility Functions
    // ===================================

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===================================
    // Start Application
    // ===================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
