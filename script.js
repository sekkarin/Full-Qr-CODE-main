function generateQRCode() {
  let name = document.getElementById("name").value;
  let typeMed = document.getElementById("typeMed").value;
  var radio = document.querySelector('input[name="time"]:checked'); 
  let nummedic = document.getElementById("num").value;
  // let dropdown = document.getElementById("dropdown").value;
  let numday = document.getElementById("numday").value;
  var array =  document.querySelector("input[name='day']:checked")

  // console.log(name)
  // console.log(radio.value)
  // console.log(nummedic)
  // // console.log(dropdown)
  console.log(numday)
  // console.log(array.value)
  // const medRec_endDate= new Date().setDate(new Date().getDate()+numday).toString()

const date = new Date(Date.now())

function addDays(date, days) {
  date.setDate(date.getDate() + days)
  return date;
}
// console.log(date.toISOString())
  // if (name && radio && nummedic && dropdown != "" && numday && array) {
  if (name && radio && nummedic  && numday && array&&typeMed) {
      let fusion = nummedic ;
      const data = { 
        Med_name: name, 
        Med_type:typeMed,
        medRec_BefAft: radio.value,
        medRecNotiTime: array.value,
        medRec_dose: fusion,
        medRec_startDate:new Date(Date.now()),
        medRec_endDate:addDays(date, Number.parseInt(numday))
      };
      console.log(data);
      let qrcodeContainer = document.getElementById("qrcode");
      qrcodeContainer.innerHTML = "";

      new QRCode(qrcodeContainer, {
        text: JSON.stringify(data),
        //ห้ามเปลี่ยนขนาดลดลงเนื่องจากข้อมูลมีจำนวนมากต้องใช้ขนาดที่เหมาะสม
        width: 350,
        height: 350,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : 3
    });

      
      let download = document.createElement("button");
      qrcodeContainer.appendChild(download);

      let download_link = document.createElement("a");
      download_link.setAttribute("download", "qr_code.png");
      download_link.innerHTML = `Download <i class="fa-solid fa-download"></i>`;

      download.appendChild(download_link);

      let qr_code_img = document.getElementById("qrcode");
      let qr_code_canvas = document.querySelector("canvas");

      if (qr_code_img.getAttribute("src") == null) {
        setTimeout(() => {
          download_link.setAttribute("href", `${qr_code_canvas.toDataURL()}`);
        }, 300);
      } else {
        setTimeout(() => {
          download_link.setAttribute("href", `${qr_code_img.getAttribute("src")}`);
        }, 300);
      }

      document.getElementById("qrcode-container").style.display = "block";
    } else {
      alert("กรุณากรอกข้อมูลทุกอย่างให้ครบ!!");
    }
}