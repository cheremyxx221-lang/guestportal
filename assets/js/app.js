
// Copy Wi-Fi password
document.querySelectorAll('.copy').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-copy');
    const text = document.getElementById(id).textContent.trim();
    navigator.clipboard.writeText(text).then(()=>{
      btn.innerHTML='<i class="bi bi-clipboard-check"></i>';
      setTimeout(()=> btn.innerHTML='<i class="bi bi-clipboard"></i>', 1000);
    });
  });
});
// 2GIS deeplink fallback
document.querySelectorAll('[data-fallback]').forEach(a=>{
  a.addEventListener('click', ()=>{
    const url=a.getAttribute('data-fallback');
    setTimeout(()=>{window.open(url, '_blank');}, 500);
  });
});
