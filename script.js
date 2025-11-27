// ==========================================================
// SABİT TANIMLAMALAR
// ==========================================================
const TOPLAM_AYET_SAYISI = 5;
let ezberlenenAyetSayisi = 0;

// ==========================================================
// BAŞLANGIÇ: Sayfa Yüklendiğinde
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ezber ilerlemesini LocalStorage'dan yükle
    ezberlenenAyetSayisi = parseInt(localStorage.getItem('ezberlenenAyet') || '0', 10);
    
    // 2. Sayfadaki göstergeleri ve ayet işaretlerini güncelle
    guncelleGostergeleri();
    ezberlenenAyetleriIsaretle();
    
    // 3. Zikir sayaçlarını yükle
    yukleTekrarSayilari();
});

// ==========================================================
// EZBER TAKİP FONKSİYONLARI
// ==========================================================

/**
 * Ezberlenen ayet sayısına göre ilerleme çubuğunu ve metni günceller.
 */
function guncelleGostergeleri() {
    const yuzde = (ezberlenenAyetSayisi / TOPLAM_AYET_SAYISI) * 100;
    
    document.getElementById('ezberlenen-adet').textContent = ezberlenenAyetSayisi;
    document.getElementById('ilerleme-yuzde').style.width = yuzde + '%';
}

/**
 * Ezberlenen ayet sayısına kadar olan ayetlere "ezberlendi" sınıfını ekler.
 */
function ezberlenenAyetleriIsaretle() {
    const ayetler = document.querySelectorAll('.ayet-kapsayici');
    ayetler.forEach((ayetElement) => {
        const ayetNo = parseInt(ayetElement.dataset.ayet, 10);
        const ezberleBtn = ayetElement.querySelector('.ezberle-btn');
        
        if (ayetNo <= ezberlenenAyetSayisi) {
            ayetElement.classList.add('ezberlendi');
            if (ezberleBtn) {
                ezberleBtn.disabled = true;
                ezberleBtn.textContent = 'Ezberlendi ✅';
            }
        } else {
            ayetElement.classList.remove('ezberlendi'); 
            if (ezberleBtn) {
                ezberleBtn.disabled = false;
                ezberleBtn.textContent = 'Ezberledim ✅';
            }
        }
    });
}

/**
 * Belirtilen ayeti ezberlendi olarak işaretler ve ilerlemeyi günceller.
 * @param {number} ayetNo - Ezberlenen ayetin numarası
 */
function tamamlandiIsaretle(ayetNo) {
    if (ayetNo > TOPLAM_AYET_SAYISI) return; 

    // Ayetleri sırayla işaretlemeyi zorlamak için kontrol
    if (ayetNo === ezberlenenAyetSayisi + 1 || ayetNo === 1) { 
        ezberlenenAyetSayisi = ayetNo;
        localStorage.setItem('ezberlenenAyet', ezberlenenAyetSayisi.toString());
        
        guncelleGostergeleri();
        ezberlenenAyetleriIsaretle(); 

        if (ezberlenenAyetSayisi === TOPLAM_AYET_SAYISI) {
            alert("Tebrikler! Fil Suresi ezberiniz tamamlandı! 🥳");
        } else {
            alert(`${ayetNo}. ayet ezberlendi. Sıradaki hedef: ${ezberlenenAyetSayisi + 1}. ayet.`);
        }
    } else if (ayetNo <= ezberlenenAyetSayisi) {
        alert("Bu ayeti zaten ezberlemişsiniz.");
    } else {
        alert(`Lütfen sıradaki (${ezberlenenAyetSayisi + 1}. ) ayeti ezberleyiniz.`);
    }
}

/**
 * Tüm ilerlemeyi sıfırlar (Hem ezber hem de tekrar sayısı).
 */
function sifirlaIlerleme() {
    if (confirm("Tüm ezber ve tekrar ilerlemesini sıfırlamak istediğinize emin misiniz?")) {
        ezberlenenAyetSayisi = 0;
        localStorage.clear(); // Tüm LocalStorage verisini temizle
        
        guncelleGostergeleri();
        ezberlenenAyetleriIsaretle();
        yukleTekrarSayilari(); // Sayaçları da sıfırlayıp yükler
        alert("Ezber ve tekrar ilerlemesi sıfırlandı.");
    }
}

// ==========================================================
// OKUNUŞ/MEAL GÖSTERİMİ
// ==========================================================

/**
 * Ayetlerin okunuş ve mealini gösterir/gizler.
 * @param {HTMLButtonElement} button - Tıklanan buton elementi
 */
function toggleDetay(button) {
    const kapsayici = button.closest('.ayet-kapsayici');
    // Okunuş ve Meal elementlerini bul
    const detaylar = kapsayici.querySelectorAll('.ayet-detay');
    
    let isGizli = false; // Tüm detayların gizli olup olmadığını kontrol etmek için
    
    detaylar.forEach(detay => {
        detay.classList.toggle('gizli');
        isGizli = detay.classList.contains('gizli');
    });

    // Buton metnini değiştir
    button.textContent = isGizli ? 'Okunuş/Meal Göster' : 'Detayları Gizle';
}

// ==========================================================
// ZİKİR SAYACI FONKSİYONLARI
// ==========================================================

/**
 * Belirtilen ayetin tekrar sayısını bir artırır.
 * @param {number} ayetNo - Tekrarı artırılacak ayetin numarası.
 */
function tekrarArtir(ayetNo) {
    const key = `tekrar-${ayetNo}`;
    let sayi = parseInt(localStorage.getItem(key) || '0', 10);
    sayi++;
    
    localStorage.setItem(key, sayi.toString());
    const sayacElement = document.getElementById(key);
    if(sayacElement) {
        sayacElement.textContent = sayi;
    }
}

/**
 * Belirtilen ayetin tekrar sayısını sıfırlar.
 * @param {number} ayetNo - Tekrarı sıfırlanacak ayetin numarası.
 */
function tekrarSifirla(ayetNo) {
    const key = `tekrar-${ayetNo}`;
    localStorage.setItem(key, '0');
    const sayacElement = document.getElementById(key);
    if(sayacElement) {
        sayacElement.textContent = '0';
    }
}

/**
 * Sayfa yüklendiğinde tüm ayetlerin kayıtlı tekrar sayılarını göstergeye yansıtır.
 */
function yukleTekrarSayilari() {
    for (let i = 1; i <= TOPLAM_AYET_SAYISI; i++) {
        const key = `tekrar-${i}`;
        const sayi = parseInt(localStorage.getItem(key) || '0', 10);
        const sayacElement = document.getElementById(key);
        
        if (sayacElement) {
            sayacElement.textContent = sayi;
        }
    }
}