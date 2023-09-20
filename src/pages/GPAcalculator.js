import React, { useState } from 'react';
import "../css/GPAcal.css";

function GPAcalculator(){
 const [HighDistinction, setHighDistinction] = useState('');
  const [Distinction, setDistinction] = useState('');
  const [Credit, setCredit] = useState('');
  const [Pass, setPass] = useState('');
  const [Fail3, setFail3] = useState('');
  const [Fail2, setFail2] = useState('');
  const [Fail1, setFail1] = useState('');
  const [CalculatorResult, setCalculatorResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !isNaN(HighDistinction) &&
      !isNaN(Distinction) &&
      !isNaN(Credit) &&
      !isNaN(Pass) &&
      !isNaN(Fail3) &&
      !isNaN(Fail2) &&
      !isNaN(Fail1)
    ) {
      let result =
        (HighDistinction * 7 +
          Distinction * 6 +
          Credit * 5 +
          Pass * 4 +
          Fail3 * 3 +
          Fail2 * 2 +
          Fail1 * 1) /
        (HighDistinction +
          Distinction +
          Credit +
          Pass +
          Fail3 +
          Fail2 +
          Fail1);

      setCalculatorResult(result);
    }
  };
    return (
        <div>
        <div className="header">
          <h1>GPA Calculator</h1>
        </div>
  
        <div className="container">
          <div className="card">
            <div className="divider"></div>
            <div className="content">
              <b>Grade Point Average: </b>
              <p>{CalculatorResult}</p>
            </div>
            <div className="divider"></div>
          </div>
          <form onSubmit={handleSubmit} id="quiz-form">
            <div className="container">
              <div className="box">
                <p>
                  <br />
                  High Distinction
                </p>
                <input
                  type="number"
                  name="HighDistinction"
                  id="HighDistinction"
                  required
                  value={HighDistinction}
                  onChange={(e) => setHighDistinction(e.target.value)}
                />
              </div>
              <div className="box">
                <p>
                  <br />
                  Distinction
                </p>
                <input
                  type="number"
                  name="Distinction"
                  id="Distinction"
                  required
                  value={Distinction}
                  onChange={(e) => setDistinction(e.target.value)}
                />
              </div>
              <div className="box">
                <p>
                  <br />
                  Credit
                </p>
                <input
                  type="number"
                  name="Credit"
                  id="Credit"
                  required
                  value={Credit}
                  onChange={(e) => setCredit(e.target.value)}
                />
              </div>
              <div className="box">
                <p>
                  <br />
                  Pass
                </p>
                <input
                  type="number"
                  name="Pass"
                  id="Pass"
                  required
                  value={Pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div className="box">
                <p>
                  <br />
                  Fail (3)
                </p>
                <input
                  type="number"
                  name="Fail3"
                  id="Fail3"
                  required
                  value={Fail3}
                  onChange={(e) => setFail3(e.target.value)}
                />
              </div>
              <div className="box">
                <p>
                  <br />
                  Fail (2)
                </p>
                <input
                  type="number"
                  name="Fail2"
                  id="Fail2"
                  required
                  value={Fail2}
                  onChange={(e) => setFail2(e.target.value)}
                />
              </div>
              <div className="box">
                <p>
                  <br />
                  Fail (1)
                </p>
                <input
                  type="number"
                  name="Fail1"
                  id="Fail1"
                  required
                  value={Fail1}
                  onChange={(e) => setFail1(e.target.value)}
                />
              </div>
            </div>
            <input type="submit" name="operator" value="Sum" />
          </form>
          <p>
            The GPA Calculator is based on a seven-point scale and assumes each
            course is weighted equally (i.e., 10 credits/course). If you want to
            input the grade for a 20-credit course, simply double the entry.
          </p>
          <p>
            If you have any issues, inquiries, or suggestions, please contact us
            via feedback@griffithinsider.com or gi@ventures.mcintoshsydney.com.
          </p>
        </div>
      </div>
    )
}

export default GPAcalculator;