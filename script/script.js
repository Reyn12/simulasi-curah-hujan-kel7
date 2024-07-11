// ================================== Variabel awal ===========================================

const defaultCurahHujan = [
  300, 50, 300, 750, 850, 750, 850, 50, 550, 550, 750, 750, 850, 750, 50, 750,
  300, 50, 300, 150, 850, 150, 300, 50, 50, 150, 850, 300, 300, 550, 150, 150,
  150, 850, 750, 150, 750, 50, 550, 750, 550, 850, 550, 300, 300, 300, 750, 850,
  550, 150, 50, 550, 50, 50, 850, 750, 850, 550, 550, 150, 300, 750, 850, 750,
  850, 50, 550, 550, 300, 50, 150, 300, 50, 50, 150, 850, 150, 750, 750, 750,
  550, 850, 550, 300, 300, 300, 750, 850, 850, 150, 50, 550, 50, 50, 850, 750,
  850, 750, 150, 150,
];

const defaultLamaHujan = [
  11, 20, 13, 19, 19, 6, 18, 15, 18, 25, 18, 2, 19, 19, 25, 6, 27, 22, 31, 3,
  25, 12, 22, 17, 15, 6, 6, 27, 27, 15, 1, 15, 25, 13, 31, 13, 6, 6, 27, 17, 14,
  22, 18, 18, 15, 20, 25, 22, 27, 27, 31, 20, 5, 25, 20, 20, 14, 22, 18, 27, 13,
  31, 13, 6, 6, 27, 17, 5, 19, 19, 18, 18, 15, 20, 25, 22, 27, 27, 19, 25, 5,
  25, 20, 20, 14, 22, 18, 27, 17, 15, 2, 19, 19, 25, 6, 27, 22, 5, 13, 31,
];

let simulasiChart;
let cuacaChart;
let pieChart;

let curahHujan = defaultCurahHujan;
let lamaHujan = defaultLamaHujan;

const driver = window.driver.js.driver;

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: "#tour-example",
      popover: {
        title: "WELCOME TO OUR PROGRAM || SIMULASI INTENSITAS CURAH HUJAN",
        description:
          "Berikut ada TOUR SINGKAT mengenai cara menggunakan program SIMULASI CURAH HUJAN",
        side: "left",
        align: "start",
      },
    },
    {
      element: ".hintBanyakInput",
      popover: {
        title: "Masukkan Banyaknya Data Yang Akan Di input",
        description: "Contoh: 50 Data, 20 Data, Maksimal 100 Data",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: ".hintCurahHujanBulanan",
      popover: {
        title: "Masukkan Data CURAH HUJAN BULANAN sebanyak N Data",
        description:
          "Note: Klik tombol Gunakan Data Default untuk mempersingkat waktu input data (Dari Soal)",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: ".hintLamaHujanBulanan",
      popover: {
        title: "Masukkan Data CURAH LAMA BULANAN sebanyak N Data",
        description:
          "Klik tombol Gunakan Data Default untuk mempersingkat waktu input data (Dari Soal)",
        side: "left",
        align: "start",
      },
    },
    {
      element: ".hintInputVarRNG",
      popover: {
        title: "Masukkan Variabel RNG Yang dibutuhkan",
        description:
          "Bisa pilih LCG atau Multiplicative sesuai keinginan, dan Masukkan Value nya",
        side: "right",
        align: "start",
      },
    },
    {
      element: ".hintBanyakSimulasi",
      popover: {
        title: "Masukkan Banyaknya Simulasi",
        description:
          "Contoh: 50 Simulasi, maka program akan menampilkan sebanyak 50 kali simulasi",
        side: "right",
        align: "start",
      },
    },
    {
      element: ".hintBuatSimulasi",
      popover: {
        title: "Button Buat Simulasi",
        description:
          "Klik untuk menampilkan hasil data simulasi dalam bentk Chart dan Tabel",
        side: "right",
        align: "start",
      },
    },
    {
      element: ".hintHasilTabelSimulasi",
      popover: {
        title: "Tabel Hasil Simulasi",
        description: "Program akan menampilkan hasil tabel Simulasi",
        side: "right",
        align: "center",
      },
    },
    {
      popover: {
        title: "Enjoy The Program...!!!",
        description:
          "Build BY : Muhammad Renaldi Maulana - (10122002) || Dawla Izza Al-Din Noor - (10122034) || Muhamad Raihan Nurzamzam - (10122037)",
      },
    },
  ],
});

// ================================ Get Document Element ========================================

const chbToggle = document.querySelector("#chb-toggle");
const lhbToggle = document.querySelector("#lhb-toggle");

const dataCurahHujanBulanan = document.getElementById("dataCurahHujanBulanan");
const dataLamaHujanBulanan = document.getElementById("dataLamaHujanBulanan");

const tombolBantuan = document.getElementById("helpButton");
tombolBantuan.addEventListener("click", () => driverObj.drive());

const containerCurahHujanBulanan = document.getElementById(
  "containerCurahHujanBulanan"
);
const containerLamaHujanBulanan = document.getElementById(
  "containerLamaHujanBulanan"
);

const chbLastInput = document.getElementById("chb-input-last");
const lhbLastInput = document.getElementById("lhb-input-last");

const deleteAllCHB = document.getElementById("chb-clear");
const deleteAllLHB = document.getElementById("lhb-clear");

const btnBuatInput = document.getElementById("buatInput");
const jumlahInput = document.getElementById("jumlahInput");

const metodeAngkaAcak = document.getElementsByName("metodeAngkaAcak");

metodeAngkaAcak.forEach((maa) => {
  maa.addEventListener("change", () => {
    if (maa.value == "Multiplicative") {
      document.getElementById("cchContainer").classList.add("hidden");
      document.getElementById("clhContainer").classList.add("hidden");
    } else {
      document.getElementById("cchContainer").classList.remove("hidden");
      document.getElementById("clhContainer").classList.remove("hidden");
    }
  });
});

const btnBuatSimulasi = document.getElementById("buatSimulasi");

function tambahkanData(data, parent, tambahkanSatu = true) {
  let input = document.createElement("input");
  input.type = "number";
  input.className = "input input-sm input-bordered text-center p-0";
  input.value = data;
  parent.insertBefore(input, parent.children[parent.children.length - 1]);

  if (tambahkanSatu) {
    const curahHujanInputs = [
      ...document.querySelectorAll("#dataCurahHujanBulanan input"),
    ];
    const lamaHujanInputs = [
      ...document.querySelectorAll("#dataLamaHujanBulanan input"),
    ];

    curahHujanInputs.pop();
    lamaHujanInputs.pop();

    const minimumData = Math.min(
      curahHujanInputs.length,
      lamaHujanInputs.length
    );

    jumlahInput.value = minimumData;
  }
}

chbLastInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    tambahkanData(chbLastInput.value, dataCurahHujanBulanan);
    chbLastInput.value = "";
    chbToggle.checked = false;
  }
});

lhbLastInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    tambahkanData(lhbLastInput.value, dataLamaHujanBulanan);
    lhbLastInput.value = "";
    lhbToggle.checked = false;
  }
});

deleteAllCHB.addEventListener("click", () => {
  resetSimulasi(true, false);
  jumlahInput.value = 0;
});
deleteAllLHB.addEventListener("click", () => {
  resetSimulasi(false, true);
  jumlahInput.value = 0;
});

btnBuatInput.addEventListener("click", buatInput);

function buatInput(ch = true, lh = true) {
  const banyakInput = document.getElementById("jumlahInput");
  if (banyakInput.value == "") {
    banyakInput.value = 1;
  } else if (banyakInput.value < 1) {
    return alert("Banyak input tidak valid");
  }

  if (!lh) {
    resetSimulasi(true, false);
  } else if (!ch) {
    resetSimulasi(false, true);
  } else if (lh && ch) {
    resetSimulasi();
  }

  for (let i = 0; i < parseInt(banyakInput.value); i++) {
    if (ch) {
      tambahkanData(chbLastInput.value, dataCurahHujanBulanan, false);
      chbLastInput.value = "";
    }

    if (lh) {
      tambahkanData(lhbLastInput.value, dataLamaHujanBulanan, false);
      lhbLastInput.value = "";
    }
  }
}

function resetSimulasi(hapusCHB = true, hapusLHB = true, resetInput = true) {
  if(resetInput){
    if (hapusCHB) {
      hapusData(dataCurahHujanBulanan);
      chbToggle.checked = false;
    }
    if (hapusLHB) {
      hapusData(dataLamaHujanBulanan);
      lhbToggle.checked = false;
    }
  }

  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";

  if (pieChart) {
    pieChart.destroy();
  }

  if (cuacaChart) {
    cuacaChart.destroy();
  }

  if (simulasiChart) {
    simulasiChart.destroy();
  }
}

btnBuatSimulasi.addEventListener("click", () => {
  buatSimulasiIntensitasCurahHujan();
});

function hapusData(parent) {
  while (parent.children.length > 1) {
    parent.removeChild(parent.children[0]);
  }
}

function updateData(dataArray, parent) {
  hapusData(parent);
  dataArray.forEach((data) => tambahkanData(data, parent));
}

function gantiData(useDefaultData, parent, type) {
  const isCurahHujan = type === "curahHujan";

  if (useDefaultData) {
    if (isCurahHujan) {
      curahHujan = [...defaultCurahHujan];
    } else {
      lamaHujan = [...defaultLamaHujan];
    }
    updateData(isCurahHujan ? curahHujan : lamaHujan, parent);
  } else {
    if (isCurahHujan) {
      buatInput(true, false);
    } else {
      buatInput(false, true);
    }
  }
}

chbToggle.addEventListener("change", () => {
  gantiData(chbToggle.checked, dataCurahHujanBulanan, "curahHujan");
});

lhbToggle.addEventListener("change", () => {
  gantiData(lhbToggle.checked, dataLamaHujanBulanan, "lamaHujan");
});

// ============================= FUNGSIONALITAS SIMULASI ===========================================

function buatSimulasiIntensitasCurahHujan() {
  let banyakSimulasi = document.getElementById("jumlahSimulasi").value;

  if (banyakSimulasi == "" || banyakSimulasi < 1) {
    return alert("Banyak simulasi tidak valid");
  }

  let intervalAngkaAcak = getIntervalAngkaAcak();

  const peringatanPengulanganCH = document.getElementById('peringatanPengulanganCH')
  peringatanPengulanganCH.classList.add('hidden')

  const peringatanPengulanganLH = document.getElementById('peringatanPengulanganLH')
  peringatanPengulanganLH.classList.add('hidden')

  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";

  let selectedMetodeAngkaAcak;
  for (const metAA of metodeAngkaAcak) {
    if (metAA.checked) {
      selectedMetodeAngkaAcak = metAA.value;
      break;
    }
  }

  // Variabel awal angka acak
  const z0ch = parseInt(document.getElementById("z0ch").value);
  const ach = parseInt(document.getElementById("ach").value);
  const cch = parseInt(document.getElementById("cch").value);
  const mch = parseInt(document.getElementById("mch").value);

  const z0lh = parseInt(document.getElementById("z0lh").value);
  const alh = parseInt(document.getElementById("alh").value);
  const clh = parseInt(document.getElementById("clh").value);
  const mlh = parseInt(document.getElementById("mlh").value);

  validasiInputAwalAngkaAcak(
    z0ch,
    ach,
    cch,
    mch,
    z0lh,
    alh,
    clh,
    mlh,
    selectedMetodeAngkaAcak
  );

  let colors = {
    "Hujan Sangat Ringan": "#a7e6ff",
    "Hujan Ringan": "#3abef9",
    "Hujan Sedang": "#3572ef",
    "Hujan Lebat": "#2f36c4",
    "Hujan Sangat Lebat": "#001478",
  };

  let zTerakhirCH = z0ch;
  let zTerakhirLH = z0lh;

  let semuaStatusCuaca = [];
  let dataHasilSimulasi = [];
  let dataAngkaAcakCH = [];
  let dataAngkaAcakLH = [];

  for (let i = 0; i < banyakSimulasi; i++) {
    if (selectedMetodeAngkaAcak == "LCG") {
      zTerakhirCH = simulasiAngkaAcakLCG(ach, cch, mch, zTerakhirCH);
      zTerakhirLH = simulasiAngkaAcakLCG(alh, clh, mlh, zTerakhirLH);
    } else if (selectedMetodeAngkaAcak == "Multiplicative") {
      zTerakhirCH = simulasiAngkaAcakMultiplicative(ach, mch, zTerakhirCH);
      zTerakhirLH = simulasiAngkaAcakMultiplicative(alh, mlh, zTerakhirLH);
    }

    angkaAcakCH = (zTerakhirCH / mch) * 100;
    angkaAcakLH = (zTerakhirLH / mlh) * 100;

    let nilaiSimulasiCH;
    let lastIntervalCH;
    let intervalAngkaAcakCH = intervalAngkaAcak["curahHujan"];
    for (let interval in intervalAngkaAcakCH) {
      if (angkaAcakCH <= interval) {
        nilaiSimulasiCH = intervalAngkaAcakCH[interval];
        break;
      }
      lastIntervalCH = interval;
    }
    if (nilaiSimulasiCH == undefined) {
      nilaiSimulasiCH = intervalAngkaAcakCH[lastIntervalCH];
    }

    let nilaiSimulasiLH;
    let lastIntervalLH;
    let intervalAngkaAcakLH = intervalAngkaAcak["lamaHujan"];
    for (let interval in intervalAngkaAcakLH) {
      if (angkaAcakLH < interval) {
        nilaiSimulasiLH = intervalAngkaAcakLH[interval];
        break;
      }
      lastIntervalLH = interval;
    }
    if (nilaiSimulasiLH == undefined) {
      nilaiSimulasiLH = intervalAngkaAcakLH[lastIntervalLH];
    }

    let intensitasCurahHujan = Math.round(nilaiSimulasiCH) / Math.round(nilaiSimulasiLH);
    let statusCuaca = getStatusCuaca(intensitasCurahHujan);

    dataHasilSimulasi.push({
      nilaiSimulasiCH: Math.round(nilaiSimulasiCH),
      nilaiSimulasiLH: Math.round(nilaiSimulasiLH),
      intensitasCurahHujan: Math.round(intensitasCurahHujan),
      statusCuaca: statusCuaca,
    });

    dataAngkaAcakCH.push(angkaAcakCH)
    dataAngkaAcakLH.push(angkaAcakLH)

    let textCol = "text-black";
    if (statusCuaca == "Hujan Lebat" || statusCuaca == "Hujan Sangat Lebat") {
      textCol = "text-white";
    }

    const row = `<tr>
                    <td>${i + 1}</td>
                    <td>${Math.round(angkaAcakCH)}</td>
                    <td>${Math.round(angkaAcakLH)}</td>
                    <td>${Math.round(nilaiSimulasiCH)}</td>
                    <td>${Math.round(nilaiSimulasiLH)}</td>
                    <td>${intensitasCurahHujan.toFixed(2)}</td>
                    <td class='bg-[${
                      colors[statusCuaca]
                    }] ${textCol}'>${statusCuaca}</td>
                </tr>`;

    semuaStatusCuaca.push(statusCuaca);
    resultsBody.insertAdjacentHTML("beforeend", row);
  }

  generateChart(semuaStatusCuaca);
  buatChartPerhitunganStatusCuaca(dataHasilSimulasi);
  buatChartHasilSimulasi(dataHasilSimulasi);

  // Cek bila ada pengulangan
  const pengulanganCH = cekPengulanganAngkaAcak(dataAngkaAcakCH)
  const pengulanganLH = cekPengulanganAngkaAcak(dataAngkaAcakLH)
  if(pengulanganCH){
    const peringatanPengulanganCH = document.getElementById('peringatanPengulanganCH')
    peringatanPengulanganCH.classList.remove('hidden')
    alert("PERINGATAN : terdapat pengulangan deret angka acak pada pembangkit angka acak untuk simulasi curah hujan. Mohon ganti nilai variabel awal pembangkit acak untuk simulasi tersebut.")
  }
  if(pengulanganLH){
    const peringatanPengulanganLH = document.getElementById('peringatanPengulanganLH')
    peringatanPengulanganLH.classList.remove('hidden')
    alert("PERINGATAN : terdapat pengulangan deret angka acak pada pembangkit angka acak untuk simulasi lama hujan. Mohon ganti nilai variabel awal pembangkit acak untuk simulasi tersebut.")
  }
}

// ================================== PENGOLAHAN DATA ===========================================

function getIntervalAngkaAcak() {
  const curahHujanInputs = [
    ...document.querySelectorAll("#dataCurahHujanBulanan input"),
  ];
  const lamaHujanInputs = [
    ...document.querySelectorAll("#dataLamaHujanBulanan input"),
  ];

  curahHujanInputs.pop();
  lamaHujanInputs.pop();

  const minimumData = Math.min(curahHujanInputs.length, lamaHujanInputs.length);

  if (minimumData < 1) {
    return alert("Input kosong");
  }

  let frekuensiCurahHujan = {};
  let frekuensiLamaHujan = {};

  for (let i = 0; i < minimumData; i++) {
    let curCurahHujanVal = curahHujanInputs[i].value;
    let curLamaHujanVal = lamaHujanInputs[i].value;

    if (curLamaHujanVal > 31) {
      return alert("Input lama hujan tidak boleh lebih dari 31");
    }

    if (curCurahHujanVal == "") {
      const index =
        Array.prototype.indexOf.call(
          curahHujanInputs[i].parentElement.children,
          curahHujanInputs[i]
        ) + 1;
      return alert(
        `Input curah hujan tidak valid di kolom ${Math.round(
          index / 10
        )} baris ${index % 10}`
      );
    }

    if (curLamaHujanVal == "") {
      const index =
        Array.prototype.indexOf.call(
          lamaHujanInputs[i].parentElement.children,
          lamaHujanInputs[i]
        ) + 1;
      alert(
        `Input curah hujan tidak valid di kolom ${Math.round(
          index / 10
        )} baris ${index % 10}`
      );
    }

    if (curCurahHujanVal < 0 || curLamaHujanVal < 0) {
      return alert("Input tidak boleh negatif");
    }

    if (String(curCurahHujanVal) in frekuensiCurahHujan) {
      frekuensiCurahHujan[String(curCurahHujanVal)] += 1;
    } else {
      frekuensiCurahHujan[String(curCurahHujanVal)] = 1;
    }

    if (String(curLamaHujanVal) in frekuensiLamaHujan) {
      frekuensiLamaHujan[String(curLamaHujanVal)] += 1;
    } else {
      frekuensiLamaHujan[String(curLamaHujanVal)] = 1;
    }
  }

  // CH = curah hujan
  let sortedKeysCH = Object.keys(frekuensiCurahHujan).sort((a, b) => a - b);
  let intervalAngkaAcakCH = {};

  if(Object.keys(frekuensiCurahHujan).length < 8){
    let probKumLastCH = 0;
    for (let i = 0; i < sortedKeysCH.length; i++) {
      const curKey = sortedKeysCH[i];
  
      let probabilitas = frekuensiCurahHujan[curKey] / curahHujanInputs.length;
      let probabilitasKumulatif = probabilitas + probKumLastCH;
      probKumLastCH = probabilitasKumulatif;
      let intervalAngkaAcakCHVal = probabilitasKumulatif * 100 - 1;
      intervalAngkaAcakCH[intervalAngkaAcakCHVal] = curKey;
    }
  }else{
    let rentang =
      Object.keys(frekuensiCurahHujan).at(-1) -
      Object.keys(frekuensiCurahHujan).at(0);
    let banyakKelas = Math.round(1 + 3.3 * Math.log10(curahHujanInputs.length));
    let panjangKelas = Math.round(rentang / banyakKelas);
    let intervalFrekuensi = [];
    let intervalAtasTerakhir = Object.keys(frekuensiCurahHujan).at(0) - 1;
    for (let i = 0; i < banyakKelas; i++) {
      let intervalAtas = intervalAtasTerakhir + panjangKelas;
      intervalFrekuensi.push({ [intervalAtas]: 0 });
      intervalAtasTerakhir = intervalAtas;
    }

    let probKumLast = 0;
    let j = 0;
    for (let i = 0; i < intervalFrekuensi.length; i++) {
      let curKey = parseInt(Object.keys(intervalFrekuensi[i])[0]);
      while (j <= parseInt(Object.keys(intervalFrekuensi[i])[0])) {
        if (String(j) in frekuensiCurahHujan) {
          intervalFrekuensi[i][curKey] += frekuensiCurahHujan[String(j)];
        }
        j += 1;
      }
      let nilaiTengah = (curKey + (curKey - panjangKelas + 1)) / 2;
      let probabilitas = intervalFrekuensi[i][curKey] / curahHujanInputs.length;
      let probKum = probKumLast + probabilitas;
      probKumLast = probKum;
      let intervalAngkaAcakCHVal = probKum * 100 - 1;
      intervalAngkaAcakCH[intervalAngkaAcakCHVal] = nilaiTengah;
    }
  }

  // LH = lama hujan
  let sortedKeysLH = Object.keys(frekuensiLamaHujan).sort((a, b) => a - b);
  let intervalAngkaAcakLH = {};

  if (Object.keys(frekuensiLamaHujan).length < 8) {
    let probKumLastLH = 0;
    for (let i = 0; i < sortedKeysLH.length; i++) {
      const curKey = sortedKeysLH[i];

      let probabilitas = frekuensiLamaHujan[curKey] / lamaHujanInputs.length;
      let probKum = probabilitas + probKumLastLH;
      probKumLastLH = probKum;
      let intervalAngkaAcakLHVal = probKum * 100 - 1;
      intervalAngkaAcakLH[intervalAngkaAcakLHVal] = curKey;
    }
  } else {
    let rentang =
      Object.keys(frekuensiLamaHujan).at(-1) -
      Object.keys(frekuensiLamaHujan).at(0);
    let banyakKelas = Math.round(1 + 3.3 * Math.log10(lamaHujanInputs.length));
    let panjangKelas = Math.round(rentang / banyakKelas);
    let intervalFrekuensi = [];
    let intervalAtasTerakhir = Object.keys(frekuensiLamaHujan).at(0) - 1;
    for (let i = 0; i < banyakKelas; i++) {
      let intervalAtas = intervalAtasTerakhir + panjangKelas;
      intervalFrekuensi.push({ [intervalAtas]: 0 });
      intervalAtasTerakhir = intervalAtas;
    }

    let probKumLast = 0;
    let j = 0;
    for (let i = 0; i < intervalFrekuensi.length; i++) {
      let curKey = parseInt(Object.keys(intervalFrekuensi[i])[0]);
      while (j <= parseInt(Object.keys(intervalFrekuensi[i])[0])) {
        if (String(j) in frekuensiLamaHujan) {
          intervalFrekuensi[i][curKey] += frekuensiLamaHujan[String(j)];
        }
        j += 1;
      }
      let nilaiTengah = (curKey + (curKey - panjangKelas + 1)) / 2;
      let probabilitas = intervalFrekuensi[i][curKey] / lamaHujanInputs.length;
      let probKum = probKumLast + probabilitas;
      probKumLast = probKum;
      let intervalAngkaAcakLHVal = probKum * 100 - 1;
      intervalAngkaAcakLH[intervalAngkaAcakLHVal] = nilaiTengah;
    }
  }

  return { curahHujan: intervalAngkaAcakCH, lamaHujan: intervalAngkaAcakLH };
}

// =============================== SIMULASI ANGKA ACAK ===========================================

function simulasiAngkaAcakLCG(a, c, m, zSebelum) {
  let zi = (zSebelum * a + c) % m;
  return zi;
}

function simulasiAngkaAcakMultiplicative(a, m, zSebelum) {
  let zi = (zSebelum * a) % m;
  return zi;
}

function validasiInputAwalAngkaAcak(
  z0ch,
  ach,
  cch,
  mch,
  z0lh,
  alh,
  clh,
  mlh,
  metode
) {
  if (isNaN(z0ch) || isNaN(ach) || isNaN(mch)) {
    return alert("Input variabel awal RNG simulasi curah hujan harus diisi");
  }
  if (z0ch < 0 || ach < 0 || mch < 0) {
    return alert("Input variabel awal RNG simulasi curah hujan tidak valid");
  }
  if (isNaN(z0lh) || isNaN(alh) || isNaN(mlh)) {
    return alert("Input variabel awal RNG simulasi lama hujan harus diisi");
  }
  if (z0lh < 0 || alh < 0 || mlh < 0) {
    return alert("Input variabel awal RNG simulasi lama hujan tidak valid");
  }

  if (metode == "LCG") {
    if (isNaN(cch)) {
      return alert("Input variabel awal RNG simulasi curah hujan harus diisi");
    }
    if (cch < 0) {
      return alert("Input variabel awal RNG simulasi curah hujan tidak valid");
    }
    if (isNaN(clh)) {
      return alert("Input variabel awal RNG simulasi lama hujan harus diisi");
    }
    if (clh < 0) {
      return alert("Input variabel awal RNG simulasi lama hujan tidak valid");
    }
  }
}

function cekPengulanganAngkaAcak(arr){
  const len = arr.length;

  for (let panjangSeq = 1; panjangSeq <= Math.floor(len / 2); panjangSeq++) {
    for (let awal = 0; awal <= len - 2 * panjangSeq; awal++) {
      let isRepetition = true;

      for (let i = 0; i < panjangSeq; i++) {
        if (arr[awal + i] !== arr[awal + panjangSeq + i]) {
          isRepetition = false;
          break;
        }
      }

      if (isRepetition) {
        return true;
      }
    }
  }

  return false;
}

// ============================ PENGOLAHAN STATUS CUACA ===========================================

function getStatusCuaca(intensitasCH) {
  if (intensitasCH < 6) {
    return "Hujan Sangat Ringan";
  } else if (intensitasCH < 20) {
    return "Hujan Ringan";
  } else if (intensitasCH < 50) {
    return "Hujan Sedang";
  } else if (intensitasCH < 100) {
    return "Hujan Lebat";
  } else {
    return "Hujan Sangat Lebat";
  }
}

// ============================================== CHART ===========================================

function generateChart(intensitas) {
  const ctx = document.getElementById("chart");

  const labels = [...new Set(intensitas)];
  let dataCount = [0, 0, 0, 0, 0];
  labels.forEach((label) => {
    let dc = intensitas.filter((item) => item === label).length;
    if (label == "Hujan Sangat Ringan") {
      dataCount[0] = dc;
    } else if (label == "Hujan Ringan") {
      dataCount[1] = dc;
    } else if (label == "Hujan Sedang") {
      dataCount[2] = dc;
    } else if (label == "Hujan Lebat") {
      dataCount[3] = dc;
    } else if (label == "Hujan Sangat Lebat") {
      dataCount[4] = dc;
    }
  });
  const dataObj = labels.reduce((acc, label, index) => {
    acc[label] = dataCount[index];
    return acc;
  }, {});

  if (pieChart) {
    pieChart.destroy();
  }

  pieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: [
        "Hujan Sangat Ringan",
        "Hujan Ringan",
        "Hujan Sedang",
        "Hujan Lebat",
        "Hujan Sangat Lebat",
      ],
      datasets: [
        {
          label: "Intensitas",
          data: dataCount,
          backgroundColor: [
            "rgba(167, 230, 255, 0.7)", // Hujan Sangat Ringan
            "rgba(58, 190, 249, 0.7)", // Hujan Ringan
            "rgba(53, 114, 239, 0.7)", // Hujan Sedang
            "rgba(47, 54, 196, 0.7)", // Hujan Lebat
            "rgba(0, 20, 120, 0.7)", // Hujan sangat lebat
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Hasil Simulasi",
        },
      },
    },
  });
}

function buatChartHasilSimulasi(dataHasilSimulasi) {
  const simulasiChartLabel = document.getElementById("label-grafik-simulasi");
  simulasiChartLabel.innerHTML =
    "<b>Hasil Simulasi Intensitas Curah Hujan per Bulan</b>";

  const ctx = document.getElementById("simulasiChart");
  ctx.innerHTML = "";

  const intensitasCurahHujan = dataHasilSimulasi.map(
    (data) => data.intensitasCurahHujan
  );

  const data = {
    labels: Array.from(
      { length: intensitasCurahHujan.length },
      (_, i) => i + 1
    ),
    datasets: [
      {
        label: "Intensitas Curah Hujan",
        data: intensitasCurahHujan,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (simulasiChart) {
    simulasiChart.destroy();
  }

  simulasiChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      plugins: {
        legend: false,
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Bulan ke-",
          },
        },
        y: {
          title: {
            display: true,
            text: "Intensitas Curah Hujan",
          },
          beginAtZero: true,
        },
      },
    },
  });
}

function buatChartPerhitunganStatusCuaca(dataHasilSimulasi) {
  const cuacaChartLabel = document.getElementById("label-grafik-cuaca");
  cuacaChartLabel.innerHTML =
    "<b>Jumlah Kemunculan Setiap Intensitas Curah Hujan</b>";

  const ctxStatusCuaca = document
    .getElementById("statusCuacaChart")
    .getContext("2d");
  ctxStatusCuaca.innerHTML = "";

  // Hitung jumlah kemunculan setiap status cuaca
  const statusCuacaCount = dataHasilSimulasi.reduce((acc, data) => {
    if (acc[data.statusCuaca]) {
      acc[data.statusCuaca]++;
    } else {
      acc[data.statusCuaca] = 1;
    }
    return acc;
  }, {});

  const statusCuacaLabels = [
    "Hujan Sangat Ringan",
    "Hujan Ringan",
    "Hujan Sedang",
    "Hujan Lebat",
    "Hujan Sangat Lebat",
  ];

  const statusCuacaData = statusCuacaLabels.map(
    (label) => statusCuacaCount[label] || 0
  );

  const statusCuacaColors = [
    "rgba(167, 230, 255, 0.7)", // Hujan Sangat Ringan
    "rgba(58, 190, 249, 0.7)", // Hujan Ringan
    "rgba(53, 114, 239, 0.7)", // Hujan Sedang
    "rgba(47, 54, 196, 0.7)", // Hujan Lebat
    "rgba(0, 20, 120, 0.7)", // Hujan Sangat Lebat
  ];

  const dataStatusCuaca = {
    labels: statusCuacaLabels,
    datasets: [
      {
        label: "Jumlah Kemunculan Status Cuaca",
        data: statusCuacaData,
        backgroundColor: statusCuacaColors,
        borderColor: statusCuacaColors.map((color) =>
          color.replace("0.7)", "1)")
        ),
        borderWidth: 2,
      },
    ],
  };

  if (cuacaChart) {
    cuacaChart.destroy();
  }

  cuacaChart = new Chart(ctxStatusCuaca, {
    type: "bar",
    data: dataStatusCuaca,
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          title: {
            display: true,
            text: "Jumlah Kemunculan",
          },
          beginAtZero: true,
        },
      },
    },
  });
}

// =========================================== ON LOAD ===========================================

window.onload = () => {
  defaultCurahHujan.forEach((data) =>
    tambahkanData(data, dataCurahHujanBulanan)
  );
  defaultLamaHujan.forEach((data) => tambahkanData(data, dataLamaHujanBulanan));
};
