function updateChips() {
  const w = window.innerWidth;
  document.getElementById('chip-mobile').classList.toggle('active', w < 600);
  document.getElementById('chip-tablet').classList.toggle('active', w >= 600 && w < 900);
  document.getElementById('chip-desktop').classList.toggle('active', w >= 900);
}

updateChips();
window.addEventListener('resize', updateChips);
