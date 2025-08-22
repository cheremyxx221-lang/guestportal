
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
// === Добавить контакт (vCard) ===
// Отредактируй данные один раз — они попадут в карточку контакта
const CONTACT = {
  lastName: "",                    // Фамилия (можно пусто)
  firstName: "Как дома",           // Имя/название
  org: "Как дома — квартиры",
  title: "Администратор",
  phone: "+7 923 659-73-92",
  whatsapp: "https://wa.me/79236597392",
  telegram: "https://t.me/username",
  email: "hello@kakdoma.example",  // можно удалить строку EMAIL
  site: "https://cheremyxx221-lang.github.io/guestportal/",
  note: "Кваритиры посуточно."
};

function buildVCard(c) {
  // vCard 3.0, с UTF-8
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N;CHARSET=UTF-8:${c.lastName};${c.firstName};;;`,
    `FN;CHARSET=UTF-8:${c.firstName}`,
    `ORG;CHARSET=UTF-8:${c.org}`,
    `TITLE;CHARSET=UTF-8:${c.title}`,
    `TEL;TYPE=CELL,VOICE:${c.phone}`,
    c.email ? `EMAIL;TYPE=INTERNET:${c.email}` : "",
    c.site ? `URL:${c.site}` : "",
    // Эти поля поддерживаются не везде, но полезны (iOS понимает X-SOCIALPROFILE)
    c.telegram ? `X-SOCIALPROFILE;type=telegram:${c.telegram}` : "",
    c.whatsapp ? `X-SOCIALPROFILE;type=whatsapp:${c.whatsapp}` : "",
    c.note ? `NOTE;CHARSET=UTF-8:${c.note}` : "",
    "END:VCARD"
  ].filter(Boolean).join("\r\n");
}

document.getElementById("add-contact")?.addEventListener("click", () => {
  const vcf = buildVCard(CONTACT);
  const blob = new Blob([vcf], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "KakDoma.vcf"; // имя файла контакта
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
