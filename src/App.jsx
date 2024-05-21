import React, { useState, useEffect } from 'react';
import './App.css';
import hpImage from './hp.png';
import additionalImage1 from './additional1.png';
import additionalImage2 from './additional2.png';

const App = () => {
  const [ceskoText, setCeskoText] = useState(() => {
    const storedCeskoText = localStorage.getItem('ceskoText');
    return storedCeskoText ? JSON.parse(storedCeskoText) : [];
  });

  const [danskoText, setDanskoText] = useState(() => {
    const storedDanskoText = localStorage.getItem('danskoText');
    return storedDanskoText ? JSON.parse(storedDanskoText) : [];
  });

  const [additionalText, setAdditionalText] = useState(() => {
    const storedAdditionalText = localStorage.getItem('additionalText');
    return storedAdditionalText ? JSON.parse(storedAdditionalText) : '';
  });

  const [buttonClicked, setButtonClicked] = useState(() => {
    const storedButtonClicked = localStorage.getItem('buttonClicked');
    return storedButtonClicked ? JSON.parse(storedButtonClicked) : false;
  });

  useEffect(() => {
    localStorage.setItem('ceskoText', JSON.stringify(ceskoText));
    localStorage.setItem('danskoText', JSON.stringify(danskoText));
    localStorage.setItem('additionalText', JSON.stringify(additionalText));
    localStorage.setItem('buttonClicked', JSON.stringify(buttonClicked));
  }, [ceskoText, danskoText, additionalText, buttonClicked]);

  const handleProhlednoutZapas = () => {
    if (!buttonClicked) {
      setCeskoText([
        <strong key="cesko-strong">Sestava:</strong>,
        'Dostál (Mrázek) – Krejčík, Gudas (A), Kempný,',
        'Rutta, Hájek, Kundrátek, Špaček – Červenka (C),',
        'Sedlák, Kaše – Palát (A), Tomášek, Kubalík – Voženílek, ',
        'Kämpf, Stránský – Beránek, Kondelík, Flek',
      ]);
      setDanskoText([
        <strong key="dansko-strong">Sestava:</strong>,
        'Dichow (Seldrup) – Lassen, M. Lauridsen, Jensen,',
        'Bruggisser, Jensen Aabo (C), O. Lauridsen (A),',
        'Larsen – True, Russell (A), Blichfeld – Aagaard,',
        'Mølgaard, Olesen – From, Wejse, Scheel – Storm,',
        'Poulsen, Andersen – Schultz',
      ]);

      setAdditionalText([
        <hr key="hr" />,
        <strong key="strely">Střely na branku: </strong>, '39 - 18',
        <br key="br1" />,
        <strong key="nejlepsi">Nejlepší hráči: </strong>, 'Ondřej Palát (Česko), Patrick Russell (Dánsko)',
        <br key="br2" />,
        <strong key="rozhodci">Rozhodčí: </strong>, 'Hronský (SVK), Schrader (GER) – Briganti (USA), Nyqvist (SWE)',
      ]);
    } else {
      setCeskoText([]);
      setDanskoText([]);
      setAdditionalText('');
    }
    setButtonClicked(!buttonClicked);
  };

  return (
    <div className="App">
      <header className="App-header">
        <a href="/" className="App-title">
          <h1>Hokej Online</h1>
        </a>
        <div className="image-container">
          <img src={additionalImage1} alt="Additional Image 1" className="side-image" />
          <img src={hpImage} alt="Obrázek HP" className="main-image" />
          <img src={additionalImage2} alt="Additional Image 2" className="side-image" />
        </div>
      </header>
      <div className="content-wrapper">
        <div className="main-content">
          <div className="tables-container">
            <table className="info-table">
              <thead>
                <tr>
                  <th className="table-header"><h3>Česko</h3></th>
                </tr>
              </thead>
              <tbody>
                {ceskoText.map((line, index) => (
                  <tr key={index}>
                    <td>{line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {buttonClicked ? (
              <>
                <div className="vs-text">7</div>
                <div className="text">:</div>
                <div className="vs-text2">4</div>
              </>
            ) : (
              <>
                <div className="vs-text">V</div>
                <div className="vs-text2">S</div>
              </>
            )}
            <table className="info-table">
              <thead>
                <tr>
                  <th className="table-header"><h3>Dánsko</h3></th>
                </tr>
              </thead>
              <tbody>
                {danskoText.map((line, index) => (
                  <tr key={index}>
                    <td>{line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="additional-text">
            {additionalText}
          </div>
          <button onClick={handleProhlednoutZapas} className="button">
            <h4>{buttonClicked ? 'Skrýt zápas' : 'Prohlédnout zápas'}</h4>
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
