/* ══════════════════════════════════════════
   NEUROSEMOS — Marketplace / Upload Handler
   ══════════════════════════════════════════ */

export function initMarketplace() {
    // ── Copy CLABE ──
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.dataset.copy;
            try {
                await navigator.clipboard.writeText(text);
                btn.textContent = '✓';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copiar';
                    btn.classList.remove('copied');
                }, 2000);
            } catch {
                // Fallback
                const textarea = document.createElement('textarea');
                textarea.value = text;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                btn.textContent = '✓';
                btn.classList.add('copied');
                setTimeout(() => {
                    btn.textContent = 'Copiar';
                    btn.classList.remove('copied');
                }, 2000);
            }
        });
    });

    // ── File Upload ──
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    const fileNameEl = document.getElementById('fileName');
    const fileSizeEl = document.getElementById('fileSize');
    const uploadForm = document.getElementById('uploadForm');
    const confirmationMsg = document.getElementById('confirmationMsg');

    if (!uploadZone || !fileInput) return;

    // Click to upload
    uploadZone.addEventListener('click', () => fileInput.click());

    // Drag & Drop
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });
    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('drag-over');
    });
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    });

    function handleFile(file) {
        // Validate size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('El archivo es demasiado grande. Máximo 5MB.');
            return;
        }

        // Show preview
        fileNameEl.textContent = file.name;
        fileSizeEl.textContent = formatSize(file.size);

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.style.display = 'none';
        }

        uploadPreview.classList.add('visible');
        uploadZone.style.display = 'none';
    }

    function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    // ── Form submission ──
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // In a real app, this would send data to a backend
        // For now, show confirmation
        uploadForm.style.display = 'none';
        confirmationMsg.classList.add('visible');

        // Send WhatsApp notification
        const name = document.getElementById('payerName').value;
        const concept = document.getElementById('payerConcept').value;

        // Open WhatsApp with payment details
        const waMsg = encodeURIComponent(
            `Hola, soy ${name}. Acabo de realizar una transferencia para: ${concept}. Ya subí mi comprobante en la página.`
        );

        setTimeout(() => {
            const openWA = confirm('¿Quieres notificar por WhatsApp que realizaste tu pago?');
            if (openWA) {
                window.open(`https://wa.me/5215542945205?text=${waMsg}`, '_blank');
            }
        }, 1500);
    });

    // ── Taller inscription buttons scroll to marketplace ──
    const inscribirBtns = document.querySelectorAll('[data-taller]');
    inscribirBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tallerName = btn.dataset.taller;
            // Pre-select concept if possible
            const conceptSelect = document.getElementById('payerConcept');
            if (conceptSelect) {
                // Try to match
                const options = conceptSelect.options;
                for (let i = 0; i < options.length; i++) {
                    if (options[i].text.toLowerCase().includes(tallerName.toLowerCase().substring(0, 10))) {
                        conceptSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });
}
