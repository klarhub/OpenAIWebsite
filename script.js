const input = document.getElementById('input');
const charCount = document.getElementById('charCount');
const pasteBtn = document.getElementById('pasteBtn');
const clearBtn = document.getElementById('clearBtn');
const solveBtn = document.getElementById('solveBtn');
const preview = document.getElementById('preview');
const toast = document.getElementById('toast');

function setCount() {
  charCount.textContent = input.value.length;
}
setCount();
input.addEventListener('input', setCount);

/* --- Paste button (Clipboard API) --- */
pasteBtn.addEventListener('click', async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      input.value += (input.value ? '\n' : '') + text;
      setCount();
      showToast('Pasted text from clipboard.');
    } else {
      showToast('Clipboard is empty.');
    }
  } catch (e) {
    showToast('Clipboard access denied. Press Ctrl/Cmd+V instead.');
  }
});

/* --- Drag & drop images/files into the area --- */
;['dragenter','dragover'].forEach(ev =>
  input.addEventListener(ev, e => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; })
);
input.addEventListener('drop', e => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files || []);
  if (!files.length) return;

  // Show a simple preview grid for images, and list other files
  const frag = document.createDocumentFragment();
  files.forEach(file => {
    const el = document.createElement('div');
    el.className = 'item';
    if (file.type.startsWith('image/')) {
      const img = document.createElement('img');
      img.alt = file.name;
      el.appendChild(img);
      const reader = new FileReader();
      reader.onload = evt => img.src = evt.target.result;
      reader.readAsDataURL(file);
      const cap = document.createElement('div');
      cap.textContent = file.name;
      el.appendChild(cap);
    } else {
      el.textContent = `${file.name} (${Math.round(file.size/1024)} KB)`;
    }
    frag.appendChild(el);
  });
  preview.classList.remove('hidden');
  preview.prepend(frag);

  showToast(`${files.length} file(s) added.`);
});

/* --- Clear --- */
clearBtn.addEventListener('click', () => {
  input.value = '';
  setCount();
  preview.innerHTML = '';
  preview.classList.add('hidden');
});

/* --- Fake "Find Solution" action --- */
solveBtn.addEventListener('click', () => {
  solveBtn.classList.add('loading');
  // simulate work
  setTimeout(() => {
    solveBtn.classList.remove('loading');
    showToast('Pretend we processed your input. Hook your logic here.');
  }, 1200);
});

/* --- Toast helper --- */
let toastHide;
function showToast(msg){
  toast.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastHide);
  toastHide = setTimeout(()=> toast.classList.add('hidden'), 2400);
}

