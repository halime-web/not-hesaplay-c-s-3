var devamDurumu = false;
var genelSinav = false;

let sinavNotu = 0;
let basariNotu = 0;

let vizeNotu = 0;
let yilIciNotu = 0;
let finalNotu = 0;
let butunlemeNotu = 0;

let butunlemeGirdi = false;

var harfNotu = "";
let durum = false; // False : Kaldı, True : Geçti
var aciklama = "";

function butunlemeKontrol() {
  if (document.getElementById("butunleme").value != "") {
    document.getElementById("finallabel").style.display = "none";
    document.getElementById("final").style.display = "none";
    document.getElementById("final").value = "";
    butunlemeGirdi = true;
  } else {
    document.getElementById("finallabel").style.display = "flex";
    document.getElementById("final").style.display = "flex";
    butunlemeGirdi = false;
  }
}

function hesapla() {
  document.getElementById("basariNotu").style.display = "flex";
  document.getElementById("toplamNot").style.display = "flex";
  document.getElementById("durum").style.display = "flex";
  document.getElementById("aciklama").style.display = "flex";
  document.getElementById("uyari").style.display = "none";

  devamDurumu = document.getElementById("devam").checked;
  genelSinav = document.getElementById("sinavgirdin").checked;

  if (devamDurumu && genelSinav) {
    vizeNotu = parseFloat(document.getElementById("vize").value) || 0;
    finalNotu = parseFloat(document.getElementById("final").value) || 0;
    butunlemeNotu = parseFloat(document.getElementById("butunleme").value) || 0;
    yilIciNotu = parseFloat(document.getElementById("yilici").value) || 0;

    if (yilIciNotu == 0) {
      yilIciNotu = vizeNotu;
    }

    donemSonuNotu = butunlemeNotu > 0 ? butunlemeNotu : finalNotu;
    basariNotu = yilIciNotu * 0.4 + donemSonuNotu * 0.6;

    if (vizeNotu == 0) {
      document.getElementById("uyari").style.display = "flex";
      document.getElementById("uyari").innerText =
        "Uyarı : Vize Notu Girininiz (Yıl İçi için gerekli)";
      sonucGizle();
      return;
    } else if (finalNotu == 0 && !butunlemeGirdi) {
      document.getElementById("uyari").style.display = "flex";
      document.getElementById("uyari").innerText =
        "Uyarı : Final Notu Girininiz";
      sonucGizle();
      return;
    } else if (
      yilIciNotu < 0 ||
      finalNotu < 0 ||
      butunlemeNotu < 0 ||
      vizeNotu < 0
    ) {
      document.getElementById("uyari").style.display = "flex";
      document.getElementById("uyari").innerText =
        "Uyarı : Notlar 0'dan Küçük Olamaz";
      sonucGizle();
      return;
    } else {
      if (
        vizeNotu > 100 ||
        finalNotu > 100 ||
        butunlemeNotu > 100 ||
        yilIciNotu > 100
      ) {
        document.getElementById("uyari").style.display = "flex";
        document.getElementById("uyari").innerText =
          "Uyarı : Geçersiz Not Girdiniz";
        sonucGizle();
        return;
      }

      if (sinavNotu < 50) {
        harfNotu = "F3";
        durum = false;
        aciklama = "Sinav Notu 50'nin Altında";
      } else if (basariNotu < 60) {
        harfNotu = "F3";
        durum = false;
        aciklama = "Başarı Notu 60'ın Altında";
      } else if (basariNotu >= 60 && basariNotu <= 64) {
        harfNotu = "C2 (2.50)";
        aciklama = "Başarı Notu 60 ve Üstü";
        durum = true;
      } else if (basariNotu >= 65 && basariNotu <= 69) {
        harfNotu = "B2 (2.75)";
        aciklama = "Başarı Notu 65 ve Üstü";
        durum = true;
      } else if (basariNotu >= 70 && basariNotu <= 79) {
        harfNotu = "B1 (3.00)";
        aciklama = "Başarı Notu 70 ve Üstü";
        durum = true;
      } else if (basariNotu >= 80 && basariNotu <= 89) {
        harfNotu = "A2 (3.50)";
        aciklama = "Başarı Notu 80 ve Üstü";
        durum = true;
      } else if (basariNotu >= 90 && basariNotu < 100) {
        harfNotu = "A1 (4.00)";
        aciklama = "Başarı Notu 90 ve Üstü";
        durum = true;
      } else if (basariNotu >= 100) {
        harfNotu = "C (5.00)";
        aciklama = "Başarı Notu 100";
        durum = true;
      } else {
        harfNotu = "-";
        aciklama = "Not Hesaplanamadı";
      }
    }
  } else if (!devamDurumu) {
    harfNotu = "F1";
    aciklama = "Devamsızlıktan Kaldın";
    durum = false;
    document.getElementById("basariNotu").style.display = "none";
  } else {
    harfNotu = "F2";
    aciklama = "Sınava Girmediğin İçin Kaldın";
    durum = false;
    document.getElementById("basariNotu").style.display = "none";
  }

  document.getElementById("basariNotu").innerText =
    "Başarı Notunuz : " + basariNotu.toFixed(2);
  document.getElementById("toplamNot").innerText =
    "Sınav Notunuz : " + harfNotu;
  document.getElementById("durum").innerText =
    "Durum : " + (durum ? "Geçti" : "Kaldı");
  document.getElementById("aciklama").innerText = "Açıklama : " + aciklama;
}

function resetForm() {
  document.getElementById("sinavgirdin").checked = false;
  document.getElementById("devam").checked = false;
  document.getElementById("vize").value = "";
  document.getElementById("final").value = "";
  document.getElementById("butunleme").value = "";
  document.getElementById("yilici").value = "";
  document.getElementById("finallabel").style.display = "flex";
  document.getElementById("final").style.display = "flex";
  butunlemeGirdi = false;
  sinavNotu = 0;
  basariNotu = 0;
  vizeNotu = 0;
  yilIciNotu = 0;
  finalNotu = 0;
  butunlemeNotu = 0;
  butunlemeGirdi = false;
  harfNotu = "";
  durum = false;
  aciklama = "";
  sonucGizle();
}

function sonucGizle() {
  document.getElementById("basariNotu").style.display = "none";
  document.getElementById("toplamNot").style.display = "none";
  document.getElementById("durum").style.display = "none";
  document.getElementById("aciklama").style.display = "none";
}