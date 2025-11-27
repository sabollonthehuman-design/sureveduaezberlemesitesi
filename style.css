/* --- GLOBAL ANİMASYON GEÇİŞLERİ --- */
* {
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f9;
    color: #333;
    line-height: 1.6;
    transition: background-color 0.4s ease; /* Yumuşak arka plan geçişi */
}

/* Tüm buton ve etkileşimli elemanlara yumuşak geçiş ekle */
button, .ayet-kapsayici, .sure-bolum-buton {
    transition: all 0.3s ease-in-out; 
}

header {
    background-color: #4CAF50; 
    color: white;
    text-align: center;
    padding: 1.5em 0 0; 
}

/* --- FOOTER VE ANA YAPILAR --- */
footer {
    background-color: #4CAF50; 
    color: white;
    text-align: center;
    padding: 1em 0;
    margin-top: 20px;
}

#ana-navigasyon {
    display: flex;
    justify-content: center;
    background-color: #388e3c; 
}

#ana-navigasyon button {
    background: none;
    border: none;
    color: white;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;
    border-bottom: 3px solid transparent;
}

#ana-navigasyon button:hover {
    background-color: #4CAF50;
}

#ana-navigasyon button.aktif {
    background-color: #4CAF50;
    border-bottom: 3px solid #FFC107; 
}

main {
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.bolum-icerik.gizli {
    display: none; 
}

/* --- AYET KAPSAYICI VE EZBER ANİMASYONU --- */
.ayet-kapsayici {
    border: 1px solid #ccc;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out; 
    transform: scale(1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

.ezberlendi {
    background-color: #e8f5e9; 
    border-left: 5px solid #4CAF50;
    box-shadow: 0 4px 8px rgba(76, 175, 80, 0.4); 
    animation: ezberOnay 0.6s ease-out; 
}

/* Keyframes: Ezberlenince hafif sarsıntı */
@keyframes ezberOnay {
    0% { transform: scale(1); }
    50% { transform: scale(1.01); } 
    100% { transform: scale(1); }
}

.ayet-baslik {
    font-size: 1.2em;
    font-weight: bold;
    color: #00796B;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
    margin-bottom: 10px;
}

.arapca {
    font-size: 1.8em;
    direction: rtl; 
    text-align: right;
    font-weight: 500;
    margin-bottom: 15px;
}

.ayet-detay {
    font-size: 1em;
    padding: 5px 0;
    border-top: 1px dashed #eee;
    margin-top: 5px;
}

.gizli {
    display: none !important; 
}

/* --- ZİKİR BUTONU HOVER EFECTİ --- */
.ayet-alt-bar { display: flex; gap: 10px; margin-bottom: 15px; }

.goster-btn, .ezberle-btn { border: none; padding: 8px 15px; font-size: 0.9em; cursor: pointer; border-radius: 3px; }

.goster-btn:hover, .ezberle-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }

.goster-btn { background-color: #2196F3; color: white; }
.ezberle-btn { background-color: #FF9800; color: white; }
.ezberle-btn:disabled { background-color: #a5a5a5; cursor: not-allowed; }

.zikir-sayac-kutusu { display: flex; align-items: center; background-color: #f0f0f0; padding: 8px; border-radius: 4px; font-weight: bold; font-size: 1.1em; }

.tekrar-sayisi { color: #4CAF50; font-size: 1.2em; margin-left: 5px; margin-right: 15px; }
.artir-btn { background-color: #03a9f4; color: white; padding: 5px 10px; margin-right: 5px; font-weight: bold; border: none; cursor: pointer; }
.sifirla-btn { background-color: #9e9e9e; color: white; padding: 5px 10px; border: none; cursor: pointer; }

/* Zikir Butonları Hover */
.artir-btn:hover { transform: scale(1.1); box-shadow: 0 2px 5px rgba(3, 169, 244, 0.5); }
.sifirla-btn:hover { transform: scale(1.1); box-shadow: 0 2px 5px rgba(158, 158, 158, 0.5); }


/* --- İLERLEME ÇUBUĞU --- */
#ilerleme-takibi { margin-top: 30px; text-align: center; }
#ilerleme-takibi h3 { border-bottom: 2px solid #ccc; padding-bottom: 10px; }
#ilerleme-cubuk { height: 25px; background-color: #ddd; border-radius: 5px; overflow: hidden; margin: 10px 0 20px; }
#ilerleme-yuzde { height: 100%; background-color: #4CAF50; transition: width 0.5s ease-in-out; }

/* --- HARİTA VE OYUNLAŞTIRMA STİLLERİ --- */
#harita {
    padding: 20px;
    background-color: #e3f2fd; 
    border-radius: 8px;
    border: 2px solid #90caf9;
    text-align: center;
}

#harita button { 
    background-color: #f44336; 
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1em;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 15px;
}

#harita-izleyici {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin: 20px 0;
}

.sure-bolum-buton {
    padding: 15px 25px;
    border: 3px solid;
    border-radius: 10px;
    font-weight: bold;
    font-size: 1.1em;
    min-width: 150px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.sure-bolum-buton:not(.kilitli):hover {
    transform: translateY(-3px) scale(1.05); 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.sure-bolum-buton.kilitli:hover {
    animation: kilitTitresim 0.2s;
}

@keyframes kilitTitresim {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
}

.kilitli { background-color: #90a4ae; border-color: #78909c; color: #424242; cursor: default; }
.aktif-sure { background-color: #ffb74d; border-color: #ff9800; color: #424242; }
.tamamlanmis-sure { background-color: #4caf50; border-color: #388e3c; color: white; }

#harita-bilgi {
    margin-top: 20px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 5px;
    border-left: 5px solid #2196f3;
    text-align: left;
}

#mevcut-bolum-adi { color: #2196f3; font-weight: bold; }
#harita-durum { font-weight: bold; }
