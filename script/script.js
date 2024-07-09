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

const btnBuatSimulasi = document.getElementById("buatSimulasi");

function tambahkanData(data, parent) {
  let input = document.createElement("input");
  input.type = "number";
  input.className = "input input-sm input-bordered text-center p-0";
  input.value = data;
  parent.insertBefore(input, parent.children[parent.children.length - 1]);
}

chbLastInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    tambahkanData(chbLastInput.value, dataCurahHujanBulanan);
    chbLastInput.value = "";
  }
});

lhbLastInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    tambahkanData(lhbLastInput.value, dataLamaHujanBulanan);
    lhbLastInput.value = "";
  }
});

deleteAllCHB.addEventListener("click", () => hapusData(dataCurahHujanBulanan));
deleteAllLHB.addEventListener("click", () => hapusData(dataLamaHujanBulanan));

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
  } else {
    if (isCurahHujan) {
      curahHujan = [];
    } else {
      lamaHujan = [];
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
  let intervalAngkaAcak = getIntervalAngkaAcak();

  const resultsBody = document.getElementById("resultsBody");
  resultsBody.innerHTML = "";

  let zTerakhirCH = 10122034;
  let zTerakhirLH = 10122002;

  let banyakSimulasi = 100;
  let semuaStatusCuaca = [];

  for (let i = 0; i < banyakSimulasi; i++) {
    zTerakhirCH = simulasiAngkaAcak(11, 29, 997, zTerakhirCH);
    angkaAcakCH = (zTerakhirCH / 997) * 100;

    zTerakhirLH = simulasiAngkaAcak(19, 31, 811, zTerakhirLH);
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
      "Hujan Sangat Ringan": "#59bebe",
      "Hujan Ringan": "#48a0e9",
      "Hujan Sedang": "#fbcf60",
      "Hujan Lebat": "#f9a34b",
      "Hujan Sangat Lebat": "#f96e86",
    };

    const row = `<tr>
                    <td>${i + 1}</td>
                    <td>${Math.round(angkaAcakCH)}</td>
                    <td>${Math.round(angkaAcakLH)}</td>
                    <td>${Math.round(nilaiSimulasiCH)}</td>
                    <td>${Math.round(nilaiSimulasiLH)}</td>
                    <td>${Math.round(intensitasCurahHujan)}</td>
                    <td class='bg-[${colors[statusCuaca]}]'>${statusCuaca}</td>
                </tr>`;

    semuaStatusCuaca.push(statusCuaca);
    resultsBody.insertAdjacentHTML("beforeend", row);
  }
  generateChart(semuaStatusCuaca);
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
      alert(
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

  console.log(frekuensiCurahHujan);

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

  if (Object.keys(frekuensiLamaHujan).length < 100) {
    let probKumLastLH = 0;
    for (let i = 0; i < sortedKeysLH.length; i++) {
      const curKey = sortedKeysLH[i];

      let probabilitas = frekuensiLamaHujan[curKey] / curahHujanInputs.length;
      let probKum = probabilitas + probKumLastLH;
      probKumLastLH = probKum;
      let intervalAngkaAcakLHVal = probKum * 100 - 1;
      intervalAngkaAcakLH[intervalAngkaAcakLHVal] = curKey;
    }
  }

  return { curahHujan: intervalAngkaAcakCH, lamaHujan: intervalAngkaAcakLH };
}

function simulasiAngkaAcak(a, c, m, zSebelum) {
  let zi = (zSebelum * a + c) % m;
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
  const dataCount = labels.map(
    (label) => intensitas.filter((item) => item === label).length
  );
  const dataObj = labels.reduce((acc, label, index) => {
    acc[label] = dataCount[index];
    return acc;
  }, {});

  new Chart(ctx, {
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
            "#59bebe",
            "#48a0e9",
            "#fbcf60",
            "#f9a34b",
            "#f96e86",
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

window.onload = () => {
  defaultCurahHujan.forEach((data) =>
    tambahkanData(data, dataCurahHujanBulanan)
  );
  defaultLamaHujan.forEach((data) => tambahkanData(data, dataLamaHujanBulanan));
};
