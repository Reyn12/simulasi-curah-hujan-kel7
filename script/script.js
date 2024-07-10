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

const chbToggle = document.querySelector("#chb-toggle");
const lhbToggle = document.querySelector("#lhb-toggle");

const dataCurahHujanBulanan = document.getElementById("dataCurahHujanBulanan");
const dataLamaHujanBulanan = document.getElementById("dataLamaHujanBulanan");

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

const btnBuatInput = document.getElementById('buatInput')
const jumlahInput = document.getElementById("jumlahInput")

const metodeAngkaAcak = document.getElementsByName('metodeAngkaAcak')

const btnBuatSimulasi = document.getElementById("buatSimulasi");

function tambahkanData(data, parent, tambahkanSatu = true) {
  let input = document.createElement("input");
  input.type = "number";
  input.className = "input input-sm input-bordered text-center p-0";
  input.value = data;
  parent.insertBefore(input, parent.children[parent.children.length - 1]);

  if(tambahkanSatu){
    const curahHujanInputs = [
      ...document.querySelectorAll("#dataCurahHujanBulanan input"),
    ];
    const lamaHujanInputs = [
      ...document.querySelectorAll("#dataLamaHujanBulanan input"),
    ];
  
    curahHujanInputs.pop();
    lamaHujanInputs.pop();
  
    const minimumData = Math.min(curahHujanInputs.length, lamaHujanInputs.length);
  
    jumlahInput.value = minimumData
  }
}

chbLastInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    tambahkanData(chbLastInput.value, dataCurahHujanBulanan);
    chbLastInput.value = "";
    chbToggle.checked = false
  }
});

lhbLastInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    tambahkanData(lhbLastInput.value, dataLamaHujanBulanan);
    lhbLastInput.value = "";
    lhbToggle.checked = false
  }
});


deleteAllCHB.addEventListener("click", () => {
    resetSimulasi(true, false)
    jumlahInput.value = 0
});
deleteAllLHB.addEventListener("click", () => {
  resetSimulasi(false, true)
  jumlahInput.value = 0
});

btnBuatInput.addEventListener("click", () => {
  const banyakInput = document.getElementById('jumlahInput')
  if(banyakInput.value == ""){
    return alert("Banyak input harus diisi")
  }else if(banyakInput.value < 1){
    return alert("Banyak input tidak valid")
  }
  
  resetSimulasi()
  
  for(let i = 0; i < parseInt(banyakInput.value); i++){
    tambahkanData(chbLastInput.value, dataCurahHujanBulanan, false);
    chbLastInput.value = "";

    tambahkanData(lhbLastInput.value, dataLamaHujanBulanan, false);
    lhbLastInput.value = "";
  }
  
})

function resetSimulasi(hapusCHB = true, hapusLHB = true){
  if(hapusCHB){
    hapusData(dataCurahHujanBulanan)
  }
  if(hapusLHB){
    hapusData(dataLamaHujanBulanan)
  }

  chbToggle.checked = false
  lhbToggle.checked = false

  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";

  const ctx = document.getElementById('simulasiChart');
  ctx.innerHTML = ''

  const ctxStatusCuaca = document.getElementById('statusCuacaChart').getContext('2d');
  ctxStatusCuaca.innerHTML = ''
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
  }
  updateData(isCurahHujan ? curahHujan : lamaHujan, parent);
}

chbToggle.addEventListener("change", () => {
  gantiData(chbToggle.checked, dataCurahHujanBulanan, "curahHujan");
});

lhbToggle.addEventListener("change", () => {
  gantiData(lhbToggle.checked, dataLamaHujanBulanan, "lamaHujan");
});

function buatSimulasiIntensitasCurahHujan() {
  let banyakSimulasi = document.getElementById("jumlahSimulasi").value;
  
  if(banyakSimulasi == "" || banyakSimulasi < 1){
    return alert("Banyak simulasi tidak valid")
  }

  let intervalAngkaAcak = getIntervalAngkaAcak();

  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";

  let selectedMetodeAngkaAcak;
  for(const metAA of metodeAngkaAcak){
    if(metAA.checked){
      selectedMetodeAngkaAcak = metAA.value
      break;
    }
  }

  let zTerakhirCH = 10122034;
  let zTerakhirLH = 10122002;

  let semuaStatusCuaca = [];
  let dataHasilSimulasi = []

  for (let i = 0; i < banyakSimulasi; i++) {
    if(selectedMetodeAngkaAcak == "LCG"){
      zTerakhirCH = simulasiAngkaAcakLCG(11, 29, 997, zTerakhirCH);
      zTerakhirLH = simulasiAngkaAcakLCG(19, 31, 811, zTerakhirLH);
    }else if(selectedMetodeAngkaAcak == "Multiplicative"){
      zTerakhirCH = simulasiAngkaAcakMultiplicative(11, 997, zTerakhirCH);
      zTerakhirLH = simulasiAngkaAcakMultiplicative(19, 811, zTerakhirLH);
    }

    angkaAcakCH = (zTerakhirCH / 997) * 100;
    angkaAcakLH = (zTerakhirLH / 811) * 100;

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

    let intensitasCurahHujan = nilaiSimulasiCH / nilaiSimulasiLH;
    let statusCuaca = getStatusCuaca(intensitasCurahHujan);

    let colors = {
      "Hujan Sangat Ringan": '#a7e6ff',
      "Hujan Ringan": "#3abef9",
      "Hujan Sedang": "#3572ef",
      "Hujan Lebat": "#2f36c4",
      "Hujan Sangat Lebat": "#001478",
    };

    dataHasilSimulasi.push({
        nilaiSimulasiCH: Math.round(nilaiSimulasiCH),
        nilaiSimulasiLH: Math.round(nilaiSimulasiLH),
        intensitasCurahHujan: Math.round(intensitasCurahHujan),
        statusCuaca: statusCuaca
    });

    let textCol = "text-black";
    if(statusCuaca == "Hujan Lebat" || statusCuaca == "Hujan Sangat Lebat"){
      textCol = "text-white"
    }

    const row = `<tr>
                    <td>${i + 1}</td>
                    <td>${Math.round(angkaAcakCH)}</td>
                    <td>${Math.round(angkaAcakLH)}</td>
                    <td>${Math.round(nilaiSimulasiCH)}</td>
                    <td>${Math.round(nilaiSimulasiLH)}</td>
                    <td>${Math.round(intensitasCurahHujan)}</td>
                    <td class='bg-[${colors[statusCuaca]}] ${textCol}'>${statusCuaca}</td>
                </tr>`;

    semuaStatusCuaca.push(statusCuaca);
    resultsBody.insertAdjacentHTML("beforeend", row);
  }
  generateChart(semuaStatusCuaca);
  buatChartPerhitunganStatusCuaca(dataHasilSimulasi)
  buatChartHasilSimulasi(dataHasilSimulasi)
}

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

  if(minimumData < 1){
    return alert("Input kosong")
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

    if(curCurahHujanVal < 0 || curLamaHujanVal < 0){
      return alert('Input tidak boleh negatif')
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

  let probKumLastCH = 0;
  for (let i = 0; i < sortedKeysCH.length; i++) {
    const curKey = sortedKeysCH[i];

    let probabilitas = frekuensiCurahHujan[curKey] / curahHujanInputs.length;
    let probabilitasKumulatif = probabilitas + probKumLastCH;
    probKumLastCH = probabilitasKumulatif;
    let intervalAngkaAcakCHVal = probabilitasKumulatif * 100 - 1;
    intervalAngkaAcakCH[intervalAngkaAcakCHVal] = curKey;
  }

  // LH = lama hujan
  let sortedKeysLH = Object.keys(frekuensiLamaHujan).sort((a, b) => a - b);
  let intervalAngkaAcakLH = {};

  if (Object.keys(frekuensiLamaHujan).length < 8) {
    let probKumLastLH = 0;
    for (let i = 0; i < sortedKeysLH.length; i++) {
      const curKey = sortedKeysLH[i];

      let probabilitas = frekuensiLamaHujan[curKey] / curahHujanInputs.length;
      let probKum = probabilitas + probKumLastLH;
      probKumLastLH = probKum;
      let intervalAngkaAcakLHVal = probKum * 100 - 1;
      intervalAngkaAcakLH[intervalAngkaAcakLHVal] = curKey;
    }
  }else{
      let rentang = Object.keys(frekuensiLamaHujan).at(-1) - Object.keys(frekuensiLamaHujan).at(0) 
      let banyakKelas = Math.round(1 + 3.3 * Math.log10(curahHujanInputs.length))
      let panjangKelas = Math.round(rentang / banyakKelas)
      let intervalFrekuensi = []
      let intervalAtasTerakhir = Object.keys(frekuensiLamaHujan).at(0) - 1
      for(let i = 0; i < banyakKelas; i++){
          let intervalAtas = intervalAtasTerakhir + panjangKelas
          intervalFrekuensi.push({[intervalAtas]:0})
          intervalAtasTerakhir = intervalAtas
      }

      let probKumLast = 0
      let j = 0
      for(let i = 0; i < intervalFrekuensi.length; i++){
          let curKey = parseInt(Object.keys(intervalFrekuensi[i])[0])
          while(j <= parseInt(Object.keys(intervalFrekuensi[i])[0])){
              if(String(j) in frekuensiLamaHujan){
                  intervalFrekuensi[i][curKey] += frekuensiLamaHujan[String(j)]
              }
              j += 1
          }
          let nilaiTengah = (curKey + (curKey - panjangKelas + 1)) / 2
          let probabilitas = intervalFrekuensi[i][curKey] / lamaHujanInputs.length
          let probKum = probKumLast + probabilitas
          probKumLast = probKum
          let intervalAngkaAcakLHVal = probKum * 100 - 1
          intervalAngkaAcakLH[intervalAngkaAcakLHVal] = nilaiTengah
      }
  }

  return { curahHujan: intervalAngkaAcakCH, lamaHujan: intervalAngkaAcakLH };
}

function simulasiAngkaAcakLCG(a, c, m, zSebelum) {
  let zi = (zSebelum * a + c) % m;
  return zi;
}

function simulasiAngkaAcakMultiplicative(a, m, zSebelum) {
  let zi = (zSebelum * a) % m;
  return zi;
}


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

function generateChart(intensitas) {
  const ctx = document.getElementById("chart");

  const labels = [...new Set(intensitas)];
  let dataCount = [0,0,0,0,0]
  labels.forEach(
    (label) => {
      let dc = intensitas.filter((item) => item === label).length
      if(label == "Hujan Sangat Ringan"){
        dataCount[0] = dc
      }else if(label == "Hujan Ringan"){
        dataCount[1] = dc
      }else if(label == "Hujan Sedang"){
        dataCount[2] = dc
      }else if(label == "Hujan Lebat"){
        dataCount[3] = dc
      }else if(label == "Hujan Sangat Lebat"){
        dataCount[4] = dc
      }
    }
  );
  const dataObj = labels.reduce((acc, label, index) => {
    acc[label] = dataCount[index];
    return acc;
  }, {});

  if(pieChart){
    pieChart.destroy()
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
            'rgba(167, 230, 255, 0.7)', // Hujan Sangat Ringan
            'rgba(58, 190, 249, 0.7)', // Hujan Ringan
            'rgba(53, 114, 239, 0.7)',  // Hujan Sedang
            'rgba(47, 54, 196, 0.7)',  // Hujan Lebat
            'rgba(0, 20, 120, 0.7)'  // Hujan sangat lebat
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
  const simulasiChartLabel = document.getElementById('label-grafik-simulasi')
  simulasiChartLabel.innerHTML = 'Hasil Simulasi Intensitas Curah Hujan per Bulan'

  const ctx = document.getElementById('simulasiChart');
  ctx.innerHTML = ''

  const intensitasCurahHujan = dataHasilSimulasi.map(data => data.intensitasCurahHujan);

  const data = {
      labels: Array.from({ length: intensitasCurahHujan.length }, (_, i) => i + 1),
      datasets: [{
          label: 'Intensitas Curah Hujan',
          data: intensitasCurahHujan,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
      }]
  };

  if(simulasiChart){
      simulasiChart.destroy()
  }

  simulasiChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
          plugins : {
              legend : false
          },
          scales: {
              x: {
                  title: {
                      display: true,
                      text: 'Bulan ke-'
                  },
              },
              y: {
                  title: {
                      display: true,
                      text: 'Intensitas Curah Hujan'
                  },
                  beginAtZero: true
              }
          }
      }
  });
  
}

function buatChartPerhitunganStatusCuaca(dataHasilSimulasi){
  const cuacaChartLabel = document.getElementById('label-grafik-cuaca')
  cuacaChartLabel.innerHTML = "Jumlah Kemunculan Setiap Intensitas Curah Hujan"

  const ctxStatusCuaca = document.getElementById('statusCuacaChart').getContext('2d');
  ctxStatusCuaca.innerHTML = ''

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
      'Hujan Sangat Ringan',
      'Hujan Ringan',
      'Hujan Sedang',
      'Hujan Lebat',
      'Hujan Sangat Lebat'
  ];

  const statusCuacaData = statusCuacaLabels.map(label => statusCuacaCount[label] || 0);


  const statusCuacaColors = [
      'rgba(167, 230, 255, 0.7)', // Hujan Sangat Ringan
      'rgba(58, 190, 249, 0.7)', // Hujan Ringan
      'rgba(53, 114, 239, 0.7)',  // Hujan Sedang
      'rgba(47, 54, 196, 0.7)',  // Hujan Lebat
      'rgba(0, 20, 120, 0.7)'      // Hujan Sangat Lebat
  ];

  const dataStatusCuaca = {
      labels: statusCuacaLabels,
      datasets: [{
          label: 'Jumlah Kemunculan Status Cuaca',
          data: statusCuacaData,
          backgroundColor: statusCuacaColors,
          borderColor: statusCuacaColors.map(color => color.replace('0.7)', '1)')),
          borderWidth: 2
      }]
  };

  if(cuacaChart){
      cuacaChart.destroy()
  }

  cuacaChart = new Chart(ctxStatusCuaca, {
      type: 'bar',
      data: dataStatusCuaca,
      options: {
          plugins: {
              legend: {
                  display: false
              }
          },
          scales: {
              y: {
                  title: {
                      display : true,
                      text : 'Jumlah Kemunculan'
                  },
                  beginAtZero: true
              }
          }
      }
  });
}

window.onload = () => {
  defaultCurahHujan.forEach((data) =>
    tambahkanData(data, dataCurahHujanBulanan)
  );
  defaultLamaHujan.forEach((data) => tambahkanData(data, dataLamaHujanBulanan));
};
