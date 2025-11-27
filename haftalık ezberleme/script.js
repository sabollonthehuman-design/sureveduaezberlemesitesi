// ==========================================================
// SABİT TANIMLAMALAR & VERİ YAPISI
// ==========================================================
const SURE_VERILERI = {
    'fil': { ad: "Fil Suresi", ayet_sayisi: 5, sira: 1, hedef_hafta: "Bu hafta" },
    'tebbet': { ad: "Tebbet Suresi", ayet_sayisi: 5, sira: 2, hedef_hafta: "Gelecek hafta" },
    // Buraya yeni sureler eklenecek...
};
const TOPLAM_SURE_SAYISI = Object.keys(SURE_VERILERI).length;
let ezberlenenAyetSayisi = 0; 
let aktifSureKey = 'fil'; 


// ==========================================================
// BAŞLANGIÇ: Sayfa Yüklendiğinde
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Durumu LocalStorage'dan yükle
    aktifSureKey = localStorage.getItem('aktifSure') || 'fil';
    yukleEzberDurumu(aktifSureKey);
    
    // 2. Haritayı oluştur
    haritaOlustur(); 

    // 3. Başlangıçta haritayı göster ve navigasyonu ayarla
    gosterBolum('harita'); 
    document.getElementById('nav-sure').textContent = `📜 ${SURE_VERILERI[aktifSureKey].ad}`;
});


// ==========================================================
// ANA NAVİGASYON VE GÖRÜNÜM
// ==========================================================

function gosterBolum(bolumId) {
    const tumBolumler = document.querySelectorAll('.bolum-icerik');
    tumBolumler.forEach(bolum => {
        bolum.classList.add('gizli');
        bolum.classList.remove('aktif');
    });

    const aktifNav = document.getElementById(`nav-${bolumId}`);
    const navButonlari = document.querySelectorAll('#ana-navigasyon button');
    navButonlari.forEach(btn => btn.classList.remove('aktif'));
    
    document.getElementById(bolumId).classList.remove('gizli');
    document.getElementById(bolumId).classList.add('aktif');
    
    if (aktifNav) {
        aktifNav.classList.add('aktif');
    }
}


// ==========================================================
// EZBER İLERLEMESİ VE VERİ YÖNETİMİ
// ==========================================================

function yukleEzberDurumu(sureKey) {
    // Aktif sure için ayet sayısını yükle
    const key = `ezberlenenAyet-${sureKey}`;
    ezberlenenAyetSayisi = parseInt(localStorage.getItem(key) || '0', 10);
    
    // Görüntüleri güncelle
    guncelleGostergeleri(SURE_VERILERI[sureKey].ayet_sayisi);
    ezberlenenAyetleriIsaretle(sureKey);
    yukleTekrarSayilari(sureKey);
}

function guncelleGostergeleri(toplamAyet) {
    const yuzde = (ezberlenenAyetSayisi / toplamAyet) * 100;
    
    document.getElementById('ezberlenen-adet').textContent = ezberlenenAyetSayisi;
    document.getElementById('ilerleme-yuzde').style.width = yuzde + '%';
}

function ezberlenenAyetleriIsaretle(sureKey) {
    const ayetler = document.querySelectorAll(`.ayet-kapsayici[data-sure="${sureKey}"]`);
    const toplamAyet = SURE_VERILERI[sureKey].ayet_sayisi;

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
                // Sadece sıradaki ayetin butonu aktif olsun
                ezberleBtn.disabled = (ayetNo !== ezberlenenAyetSayisi + 1);
                ezberleBtn.textContent = 'Ezberledim ✅';
            }
        }
    });

    // Sure tamamlandıysa haritayı ve navigasyon başlığını güncelle
    if (ezberlenenAyetSayisi === toplamAyet) {
        haritaOlustur();
        document.getElementById('nav-sure').textContent = `📜 ${SURE_VERILERI[sureKey].ad} (Tamamlandı!)`;
    } else {
        document.getElementById('nav-sure').textContent = `📜 ${SURE_VERILERI[sureKey].ad}`;
    }
}

function tamamlandiIsaretle(sureKey, ayetNo) {
    const toplamAyet = SURE_VERILERI[sureKey].ayet_sayisi;
    
    if (ayetNo === ezberlenenAyetSayisi + 1) { 
        ezberlenenAyetSayisi = ayetNo;
        localStorage.setItem(`ezberlenenAyet-${sureKey}`, ezberlenenAyetSayisi.toString());
        
        guncelleGostergeleri(toplamAyet);
        ezberlenenAyetleriIsaretle(sureKey); 
        
        if (ezberlenenAyetSayisi === toplamAyet) {
            alert(`Tebrikler! ${SURE_VERILERI[sureKey].ad} ezberiniz tamamlandı! 🥳`);
            
            const sonrakiSure = Object.values(SURE_VERILERI).find(s => s.sira === SURE_VERILERI[sureKey].sira + 1);
            if (sonrakiSure) {
                aktifSureKey = Object.keys(SURE_VERILERI).find(key => SURE_VERILERI[key].sira === sonrakiSure.sira);
                localStorage.setItem('aktifSure', aktifSureKey);
                // Haritaya geri dönüp yeni hedefi gör
                gosterBolum('harita');
            } else {
                gosterBolum('harita');
            }
            haritaOlustur(); 

        } else {
            alert(`${ayetNo}. ayet ezberlendi. Sıradaki hedef: ${ezberlenenAyetSayisi + 1}. ayet.`);
        }
    } else if (ayetNo <= ezberlenenAyetSayisi) {
        alert("Bu ayeti zaten ezberlemişsiniz.");
    } else {
        alert(`Lütfen sıradaki (${ezberlenenAyetSayisi + 1}. ) ayeti ezberleyiniz.`);
    }
}

function sifirlaIlerleme() {
    if (confirm("DİKKAT: TÜM SİTE İlerlemesini ve kayıtlı tüm surelerin ezberini sıfırlamak istediğinize emin misiniz?")) {
        localStorage.clear(); 
        aktifSureKey = 'fil';
        ezberlenenAyetSayisi = 0;
        
        // Yeniden yükle ve haritayı güncelle
        yukleEzberDurumu(aktifSureKey);
        haritaOlustur();
        gosterBolum('harita');
        alert("Tüm ilerleme sıfırlandı.");
    }
}


// ==========================================================
// OKUNUŞ/MEAL GÖSTERİMİ
// ==========================================================

function toggleDetay(button) {
    const kapsayici = button.closest('.ayet-kapsayici');
    const detaylar = kapsayici.querySelectorAll('.ayet-detay');
    
    let isGizli = false; 
    
    detaylar.forEach(detay => {
        detay.classList.toggle('gizli');
        isGizli = detay.classList.contains('gizli');
    });

    button.textContent = isGizli ? 'Okunuş/Meal Göster' : 'Detayları Gizle';
}

// ==========================================================
// ZİKİR SAYACI FONKSİYONLARI
// ==========================================================

function tekrarArtir(sureKey, ayetNo) {
    const key = `tekrar-${sureKey}-${ayetNo}`;
    let sayi = parseInt(localStorage.getItem(key) || '0', 10);
    sayi++;
    
    localStorage.setItem(key, sayi.toString());
    const sayacElement = document.getElementById(`tekrar-${sureKey}-${ayetNo}`);
    if(sayacElement) {
        sayacElement.textContent = sayi;
    }
}

function tekrarSifirla(sureKey, ayetNo) {
    const key = `tekrar-${sureKey}-${ayetNo}`;
    localStorage.setItem(key, '0');
    const sayacElement = document.getElementById(`tekrar-${sureKey}-${ayetNo}`);
    if(sayacElement) {
        sayacElement.textContent = '0';
    }
}

function yukleTekrarSayilari(sureKey) {
    const toplamAyet = SURE_VERILERI[sureKey].ayet_sayisi;

    for (let i = 1; i <= toplamAyet; i++) {
        const key = `tekrar-${sureKey}-${i}`;
        const sayi = parseInt(localStorage.getItem(key) || '0', 10);
        const sayacElement = document.getElementById(`tekrar-${sureKey}-${i}`);
        
        if (sayacElement) {
            sayacElement.textContent = sayi;
        }
    }
}


// ==========================================================
// HARİTA OYUNLAŞTIRMA MANTIKLARI
// ==========================================================

function haritaOlustur() {
    const haritaIzleyici = document.getElementById('harita-izleyici');
    if (!haritaIzleyici) return; 

    haritaIzleyici.innerHTML = ''; 
    let tamamlananSureAdet = 0;
    
    // Genel İlerleme Hesaplaması için değişkenler
    let toplamAyetTamamlandi = 0;
    let toplamAyetSayisi = 0;
    
    Object.keys(SURE_VERILERI).sort((a, b) => SURE_VERILERI[a].sira - SURE_VERILERI[b].sira).forEach(sureKey => {
        const sure = SURE_VERILERI[sureKey];
        const ayetSayisi = sure.ayet_sayisi;
        const ezberlenen = parseInt(localStorage.getItem(`ezberlenenAyet-${sureKey}`) || '0', 10);
        const yuzde = (ezberlenen / ayetSayisi) * 100;
        
        toplamAyetTamamlandi += ezberlenen;
        toplamAyetSayisi += ayetSayisi;
        
        let durumSinifi = 'kilitli';

        if (ezberlenen === ayetSayisi) {
            durumSinifi = 'tamamlanmis-sure';
            tamamlananSureAdet++;
        } else if (sureKey === aktifSureKey) {
            durumSinifi = 'aktif-sure';
        } else if (sure.sira < SURE_VERILERI[aktifSureKey].sira) {
             // Eğer aktif sureden küçük ve tamamlanmamışsa yine kilitli gösterilir
             durumSinifi = 'kilitli'; 
        }
        
        const bolumDiv = document.createElement('div');
        bolumDiv.className = `sure-bolum-buton ${durumSinifi}`;
        bolumDiv.textContent = `${sure.ad} (${Math.round(yuzde)}%)`;
        bolumDiv.title = sure.hedef_hafta ? sure.hedef_hafta : 'Henüz hedef değil';
        
        // Sadece aktif olan veya tamamlanan sureye tıklanabilir
        if (durumSinifi !== 'kilitli') {
            bolumDiv.onclick = () => {
                aktifSureKey = sureKey;
                localStorage.setItem('aktifSure', aktifSureKey);
                gosterBolum('ezber');
                document.getElementById('nav-sure').textContent = `📜 ${sure.ad}`;
                yukleEzberDurumu(sureKey);
            };
        }
        
        haritaIzleyici.appendChild(bolumDiv);
    });

    // Harita Bilgi Güncellemesi
    const genelYuzde = (toplamAyetSayisi > 0) ? (toplamAyetTamamlandi / toplamAyetSayisi) * 100 : 0;

    document.getElementById('aktif-sure-adi').textContent = SURE_VERILERI[aktifSureKey] ? SURE_VERILERI[aktifSureKey].ad : 'Bilinmiyor';
    document.getElementById('tamamlanan-sure-adet').textContent = tamamlananSureAdet;
    document.getElementById('toplam-sure-adet').textContent = TOPLAM_SURE_SAYISI;
    document.getElementById('genel-ilerleme-yuzdesi').textContent = `${Math.round(genelYuzde)}%`;
}