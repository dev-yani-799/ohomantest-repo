

function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t, i) => t.classList.toggle('active', (tab==='login'&&i===0)||(tab==='register'&&i===1)));
  document.getElementById('panel-login').classList.toggle('active', tab==='login');
  document.getElementById('panel-register').classList.toggle('active', tab==='register');
}
function togglePass(id, btn) {
  const inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
}
function checkStrength(val) {
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const colors = ['', '#E24B4A', '#EF9F27', '#378ADD', '#1D9E75'];
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  for (let i = 1; i <= 4; i++) {
    document.getElementById('s'+i).style.background = i <= score ? colors[score] : 'var(--color-border-tertiary)';
  }
  document.getElementById('strength-label').textContent = val.length ? labels[score] : '';
  document.getElementById('strength-label').style.color = colors[score] || 'var(--color-text-tertiary)';
}

