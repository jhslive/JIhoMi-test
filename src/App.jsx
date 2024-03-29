import React, { useState, useEffect } from "react";
import "./App.css";
import bgLong from "./bg_long.png";
import bgShort from "./bg_short.png";
import tanguPic from "./tangu.png";
import html2canvas from "html2canvas";

function App() {
  const [coin, setCoin] = useState("BTCUSDT");
  const [entryPrice, setEntryPrice] = useState("20868");
  const [closingPrice, setClosingPrice] = useState("20681");
  const [isLong, setIsLong] = useState(true);
  const [numsLoc, setNumsLoc] = useState([0, 0, 0]);
  const [numLocLR, setNumLocLR] = useState(0);
  const [leverage, setLeverage] = useState("30");
  const [phone, setphone] = useState("12341234");
  const [code, setcode] = useState("12341234");
  const [date, setdate] = useState(new Date().toLocaleString('en-EU', { hour12: false,}));
  const [result, setResult] = useState(
    ((closingPrice / entryPrice - 1) * 75 * 100).toFixed(2)
  );
  const [tangu, setTangu] = useState(false);
  
  useEffect(() => {
    const calculated = (
      (closingPrice / entryPrice - 1) *
      leverage *
      100
    ).toFixed(2);
    if (!isLong && calculated < 0) {
      setResult(-calculated);
    } else {
      setResult(calculated);
    }
  }, [entryPrice, closingPrice, coin, isLong, leverage]);

  function downLoad() {
    console.log("download started!");
    const name =
      (isLong ? "Long-" : "Short-") +
      coin +
      "-" +
      entryPrice +
      "-" +
      closingPrice;

    const image = document.getElementById("image");
    html2canvas(image).then((canvas) => {
      onSaveAs(canvas.toDataURL("image/png"), name + ".png");
    });
  }

  function down() {
    const one = numsLoc[0] + 1;
    const two = numsLoc[1] + 1;
    const three = numsLoc[2] + 1;
    setNumsLoc([one, two, three]);
  }
  function up() {
    const one = numsLoc[0] - 1;
    const two = numsLoc[1] - 1;
    const three = numsLoc[2] - 1;
    setNumsLoc([one, two, three]);
  }
  function left() {
    setNumLocLR(numLocLR - 1);
  }
  function right() {
    setNumLocLR(numLocLR + 1);
  }


  const onSaveAs = (uri, filename) => {
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <span>
        롱(체크)/숏(미체크) &nbsp;
        <input
          type="checkbox"
          checked={isLong}
          onChange={(e) => setIsLong(!isLong)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        코인종류 &nbsp;
        <input value={coin} onChange={(e) => setCoin(e.target.value)} />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        Leverage &nbsp;
        <input value={leverage} onChange={(e) => setLeverage(e.target.value)} />
      </span>
      <br />
      <br />
          <span>
        전화번호 &nbsp;
        <input value={phone} onChange={(e) => setphone(e.target.value)} />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
        <span>
        초대코드 &nbsp;
        <input value={code} onChange={(e) => setcode(e.target.value)} />
      </span>
      <br />
      <br />
      <span>
        매수금액 &nbsp;
        <input
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
        />
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span>
        매도금액 &nbsp;
        <input
          value={closingPrice}
          onChange={(e) => setClosingPrice(e.target.value)}
        />
      </span>
      <br />
      <br />
      <span>
        날짜시간 &nbsp;
        <input
         value={date}
         onChange={(e) => setdate(e.target.value)}
         />
      </span>  
      <br />
      <br />
      <button onClick={up}>이름 위로</button>
      <br />
      <br />
      <button onClick={left}>이름 좌로</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={right}>이름 우로</button>
      <br />
      <br />
      <button onClick={down}>이름 아래로</button>
      <br />
      <br />
      <button onClick={downLoad}>다운로드</button>
      <br />
      <br />
      <div
        id="image"
        style={{
          backgroundImage: `url(${tangu ? tanguPic : (isLong ? bgLong : bgShort)})`,
          backgroundSize: "cover",
          height: "840px",
          width: "1346px",
          margin: "0 auto",
          position: "relative",
        }}
      >

          <div
            style={{
              position: "absolute",
              left: numLocLR + 57 + "px",
              top: numsLoc[0] + 315 + "px",
              fontSize:"42px",
              color: "rgb(254,254,254)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {coin}
          </div>
         
          <div
            style={{
              position: "absolute",
              left: "130px",
              top: "389px",
              fontSize: "19px",
              color: "RGB(126,126,126)",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {Number(leverage).toFixed(2)}X
          </div>
          <div
            style={{
              position: "absolute",
              left:"60px",
              top: "746px",
              fontSize: "27px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",
              wordSpacing: "-6px",

            }}
          >
            ₮ {(Number(entryPrice)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              left: "248px",
              top: "746px",
              fontSize: "27px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",
              wordSpacing: "-6px",

            }}
          >
            ₮ {(Number(closingPrice)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div
            style={{
              position: "absolute",
              left: "918px",
              top: "766px",
              fontSize: "23px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {date}
          </div>
          <div
            style={{
              position: "absolute",
              left: "152px",
              top: "191px",
              fontSize: "23px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
           10{(phone.substring(0, 1)+'***'+phone.substring(5, 8))}
          </div>
          <div
            style={{
              position: "absolute",
              left: "936px",
              top: "706px",
              fontSize: "44px",
              color: "white",
              fontFamily: "HarmonyOS Sans",
              fontWeight: "500",

            }}
          >
            {code}
          </div>
           <div
            style={{
              position: "relative",
            }}
          >
                <div
              style={{
                position: "absolute",
                left: "58px",
                top: "514px",
                fontSize: "101px",
                color: "rgb(34, 166, 82)",
                fontFamily: "HarmonyOS Sans",
                fontWeight: "350",

              }}
            >
              {result > 0 ? (
                <span
                  style={{
                    fontSize: "101px",
                    fontWeight: "350",
                  }}
                >
                  +
                </span>
              ) : (
              ""
              )}
              {result}
              <span
                style={{
                    fontSize: "101px",
                    fontWeight: "350",
                }}
              >
                %
              </span>
            </div>
          </div> 
      </div>
      <br />
      <br />
      <div>
        <i>Made By</i> <b>Jung Ji </b><span onClick={() => setTangu(!tangu)}><b>Ho</b></span>
      </div>
    </div>
  );
}

export default App;
