// Sayfa yüklendiğinde çalışacaklar
document.addEventListener('DOMContentLoaded', () => {
    verileriYukle();
    genelIstatistikleriGuncelle();
});

// --- NAVİGASYON FONKSİYONLARI ---

function gosterBolum(bolumId) {
    // 1. Tüm içerik bölümlerini gizle
    const bolumler = document.querySelectorAll('.bolum-icerik');
    bolumler.forEach(bolum => {
        bolum.classList.remove('aktif');
        bolum.classList.add('gizli');
    });

    // 2. İstenen bölümü göster
    const secilenBolum = document.getElementById(bolumId);
    if (secilenBolum) {
        secilenBolum.classList.remove('gizli');
        secilenBolum.classList.add('aktif');
    }

    // 3. Navigasyon butonlarının aktifliğini ayarla
    const navButonlar = document.querySelectorAll('#ana-navigasyon button');
    navButonlar.forEach(btn => btn.classList.remove('aktif'));

    // Hangi butona basıldıysa onu aktif yap
    let aktifButonId = '';
    if (bolumId === 'harita') aktifButonId = 'nav-harita';
    else if (bolumId === 'fil-suresi') aktifButonId = 'nav-fil';
    else if (bolumId === 'tebbet-suresi') aktifButonId = 'nav-tebbet';
    else if (bolumId === 'dua') aktifButonId = 'nav-dua';

    if (aktifButonId) {
        document.getElementById(aktifButonId).classList.add('aktif');
    }

    // Harita bilgisi güncelle (Eğer haritaya dönüldüyse)
    if (bolumId === 'harita') {
        genelIstatistikleriGuncelle();
    }
}

function toggleDetay(btn) {
    // Tıklanan butonun olduğu ayet kutusunu bul
    const kapsayici = btn.closest('.ayet-kapsayici');
    
    // İçindeki gizli detayları (okunuş ve meal) bul
    const detaylar = kapsayici.querySelectorAll('.ayet-detay');
    
    // Görünürlüklerini değiştir (Toggle)
    detaylar.forEach(detay => {
        if (detay.classList.contains('gizli')) {
            detay.classList.remove('gizli');
        } else {
            detay.classList.add('gizli');
        }
    });

    // Buton metnini güncelle
    if (detaylar[0].classList.contains('gizli')) {
        btn.textContent = "Okunuş/Meal Göster";
    } else {
        btn.textContent = "Gizle";
    }
}

// --- EZBER VE İLERLEME FONKSİYONLARI ---

// Surelerin toplam ayet sayıları (İleride yeni sure eklerken buraya ekleme yapacaksın)
const SURE_AYET_SAYILARI = {
    'fil': 5,
    'tebbet': 5
};

function tamamlandiIsaretle(sureAdi, ayetNo) {
    // Örnek key: ezber_fil_1
    const storageKey = `ezber_${sureAdi}_${ayetNo}`;
    const btn = document.querySelector(`.ayet-kapsayici[data-sure="${sureAdi}"][data-ayet="${ayetNo}"] .ezberle-btn`);
    
    // Şu anki durumu kontrol et (Ezberlenmiş mi?)
    const ezberlendiMi = localStorage.getItem(storageKey) === 'true';

    if (!ezberlendiMi) {
        // Ezberlendi olarak işaretle
        localStorage.setItem(storageKey, 'true');
        btn.textContent = "Ezberlendi! 🌟";
        btn.classList.add('tamamlandi');
        konfetiEfekti(btn); // Ufak bir görsel ödül (opsiyonel)
    } else {
        // Geri al
        localStorage.removeItem(storageKey);
        btn.textContent = "Ezberledim ✅";
        btn.classList.remove('tamamlandi');
    }

    // İlerlemeyi güncelle
    sureIlerlemesiniGuncelle(sureAdi);
}

function sureIlerlemesiniGuncelle(sureAdi) {
    const toplamAyet = SURE_AYET_SAYILARI[sureAdi];
    let ezberlenenSayisi = 0;

    // Kaç ayet ezberlenmiş say
    for (let i = 1; i <= toplamAyet; i++) {
        if (localStorage.getItem(`ezber_${sureAdi}_${i}`) === 'true') {
            ezberlenenSayisi++;
            // Sayfa yüklenirken butonları da boyamak için:
            const btn = document.querySelector(`.ayet-kapsayici[data-sure="${sureAdi}"][data-ayet="${i}"] .ezberle-btn`);
            if (btn) {
                btn.textContent = "Ezberlendi! 🌟";
                btn.classList.add('tamamlandi');
            }
        }
    }

    // Yüzdeyi hesapla
    const yuzde = Math.floor((ezberlenenSayisi / toplamAyet) * 100);

    // HTML'i güncelle
    const sayacElem = document.getElementById(`ezberlenen-adet-${sureAdi}`);
    const barElem = document.getElementById(`ilerleme-yuzde-${sureAdi}`);

    if (sayacElem) sayacElem.textContent = ezberlenenSayisi;
    if (barElem) {
        barElem.style.width = `${yuzde}%`;
        // Renk değişimi: Tamamlanınca altın rengi olsun
        if (yuzde === 100) barElem.style.backgroundColor = "#FFD700";
        else barElem.style.backgroundColor = "#4CAF50";
    }
}

// --- ZİKİRMATİK FONKSİYONLARI ---

function tekrarArtir(sureAdi, ayetNo) {
    const spanId = `tekrar-${sureAdi}-${ayetNo}`;
    const span = document.getElementById(spanId);
    let sayi = parseInt(span.textContent);
    sayi++;
    span.textContent = sayi;
    
    // Zikir sayısını da kaydetmek istersen (Opsiyonel)
    localStorage.setItem(`zikir_${sureAdi}_${ayetNo}`, sayi);
}

function tekrarSifirla(sureAdi, ayetNo) {
    const spanId = `tekrar-${sureAdi}-${ayetNo}`;
    document.getElementById(spanId).textContent = "0";
    localStorage.removeItem(`zikir_${sureAdi}_${ayetNo}`);
}

// --- GENEL SİSTEM FONKSİYONLARI ---

function verileriYukle() {
    // Sayfa açıldığında tüm surelerin durumunu kontrol et
    Object.keys(SURE_AYET_SAYILARI).forEach(sure => {
        sureIlerlemesiniGuncelle(sure);
        
        // Zikir sayaçlarını geri yükle
        const toplamAyet = SURE_AYET_SAYILARI[sure];
        for(let i=1; i<=toplamAyet; i++) {
            const kayitliZikir = localStorage.getItem(`zikir_${sure}_${i}`);
            if(kayitliZikir) {
                const span = document.getElementById(`tekrar-${sure}-${i}`);
                if(span) span.textContent = kayitliZikir;
            }
        }
    });
}

function genelIstatistikleriGuncelle() {
    let toplamTamamlananSure = 0;
    const toplamSureSayisi = Object.keys(SURE_AYET_SAYILARI).length;
    let toplamEzberlenenAyet = 0;
    let toplamAyetSayisi = 0;

    Object.keys(SURE_AYET_SAYILARI).forEach(sure => {
        const buSureninAyeti = SURE_AYET_SAYILARI[sure];
        toplamAyetSayisi += buSureninAyeti;
        
        let buSureTamamMi = true;
        for(let i=1; i<=buSureninAyeti; i++) {
            if(localStorage.getItem(`ezber_${sure}_${i}`) === 'true') {
                toplamEzberlenenAyet++;
            } else {
                buSureTamamMi = false;
            }
        }
        
        if(buSureTamamMi) toplamTamamlananSure++;
    });

    // Harita sayfasındaki verileri güncelle
    const genelYuzde = Math.floor((toplamEzberlenenAyet / toplamAyetSayisi) * 100);
    
    const genelYuzdeElem = document.getElementById('genel-ilerleme-yuzdesi');
    const tamamlananSureElem = document.getElementById('tamamlanan-sure-adet');
    const toplamSureElem = document.getElementById('toplam-sure-adet');
    const aktifHedefElem = document.getElementById('aktif-sure-adi');

    if(genelYuzdeElem) genelYuzdeElem.textContent = `%${genelYuzde}`;
    if(tamamlananSureElem) tamamlananSureElem.textContent = toplamTamamlananSure;
    if(toplamSureElem) toplamSureElem.textContent = toplamSureSayisi;
    
    // Aktif hedefi belirle (İlk bitmemiş sure)
    if(aktifHedefElem) {
        if(toplamTamamlananSure === toplamSureSayisi) {
            aktifHedefElem.textContent = "Tebrikler! Hepsi Bitti 🎉";
        } else {
            // Basit mantık: Sırayla bak, hangisi bitmemişse onu yaz
            if(!isSureTamam('fil')) aktifHedefElem.textContent = "Fil Suresi";
            else if(!isSureTamam('tebbet')) aktifHedefElem.textContent = "Tebbet Suresi";
        }
    }
}

// Yardımcı fonksiyon: Bir surenin tamamlanıp tamamlanmadığını kontrol eder
function isSureTamam(sureAdi) {
    const adet = SURE_AYET_SAYILARI[sureAdi];
    for(let i=1; i<=adet; i++) {
        if(localStorage.getItem(`ezber_${sureAdi}_${i}`) !== 'true') return false;
    }
    return true;
}

function sifirlaIlerleme() {
    if(confirm("Tüm ezber ilerlemeni ve zikirlerini silmek istediğine emin misin?")) {
        localStorage.clear();
        location.reload(); // Sayfayı yenile
    }
}

function konfetiEfekti(btn) {
    // Basit bir görsel geri bildirim için buton rengini anlık değiştirip geri alır
    btn.style.transform = "scale(1.1)";
    setTimeout(() => {
        btn.style.transform = "scale(1)";
    }, 200);
}