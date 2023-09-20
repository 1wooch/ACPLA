import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../css/StudyPlanner.css";


const YourComponent = () => {
  //const [courseCode, setCourseCode] = useState('');
  const courseCode='';
  const [courseData, setCourseData] = useState(null);
  const [degreeData, setDegreeData] = useState(null);
  const [cellCourseData, setCellCourseData] = useState({});

  let semesterCode = '';

  const [selectSemester, setSelectSemester] = useState('');
  const [selectYear, setSelectYear] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedUniversity, setSelectedUni] = useState('');

  //const [RequisiteList, setRequisiteList] = useState([]);
  const RequisiteList=[];
  const [showAddRowButton, setShowAddRowButton] = useState(false); // Add state to control the visibility of the button

  const testValue = () => {
    console.log('testing ongoing');
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://degrees.griffith.edu.au/rest-api/v3/course/${courseCode}`
      );

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const changeSemesterCode = () => {
    if (selectYear === '2024' && selectSemester === '1') {
      semesterCode = '3241';
    } else if (selectYear === '2024' && selectSemester === '2') {
      semesterCode = '3245';
    }
  };

  const getDegreeData = async () => {
    try {
      changeSemesterCode();
      const response = await fetch(
        `https://degrees.griffith.edu.au/rest-api/v3/program/${selectedDegree}/allCourseLists/${semesterCode}`
      );

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const dgData = await response.json();
      setDegreeData(dgData);
      setRows([
        {
          Year: selectYear,
          Semester: selectSemester,
          cells: [
            { id: 1, value: 'Course 1',CP:0},
            { id: 2, value: 'Course 2',CP:0 },
            { id: 3, value: 'Course 3',CP:0},
            { id: 4, value: 'Course 4',CP:0 },
          ],
        },
      ]);
      setShowAddRowButton(true);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    testValue();
  }, [setSelectedDegree]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('test this working');
  //   fetchData();

  //   // Create JSON object
  //   const jsonObject = {
  //     courseCode,
  //     selectYear,
  //     selectSemester,
  //     selectedDegree,
  //     courseData,
  //     degreeData,
  //   };
  //   console.log('JSON Object:', jsonObject);
  // };

  const coreCourses = degreeData
    ? degreeData.programCourseLists.coreCourseLists.courseListTables
        .filter((table) => table.courseListTyp === 'Core Course List')
        .flatMap((table) => table.courses)
        .filter((course) => course.courseCode.trim() !== '')
    : [];

  const otherCourses = degreeData
    ? degreeData.programCourseLists.electiveCourseLists.flatMap((list) =>
        list.courseListTables.flatMap((table) => table.courses)
      )
    : [];

  const [rows, setRows] = useState([]);

  const handleDragStart = (e, rowIndex, cellIndex) => {
    e.dataTransfer.setData('text/plain', `${rowIndex}-${cellIndex}`);
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetCellId, rowIndex) => {
    e.preventDefault();
    const sourceData = e.dataTransfer.getData('text/plain').split('-');
    const sourceRowIndex = Number(sourceData[0]);
    const sourceCellIndex = Number(sourceData[1])%4;
    const updatedRows = [...rows];
    
    if (sourceCellIndex%4===0){
      if (targetCellId%4===0){
        const temp = updatedRows[sourceRowIndex].cells[3]; //drag object
     
     updatedRows[sourceRowIndex].cells[3]=updatedRows[rowIndex].cells[3];
     updatedRows[rowIndex].cells[3]=temp;
     setRows(updatedRows);
      }else{
        const temp = updatedRows[sourceRowIndex].cells[3]; //drag object
     
        updatedRows[sourceRowIndex].cells[3]=updatedRows[rowIndex].cells[targetCellId%4-1];
        updatedRows[rowIndex].cells[targetCellId%4-1]=temp;
        setRows(updatedRows);
      }

    }else if (targetCellId%4===0){
      if (sourceCellIndex%4===0){
        const temp = updatedRows[sourceRowIndex].cells[3]; //drag object
       
       updatedRows[sourceRowIndex].cells[3]=updatedRows[rowIndex].cells[3];
       updatedRows[rowIndex].cells[3]=temp;
       setRows(updatedRows);
  
      }else{
        const temp = updatedRows[sourceRowIndex].cells[sourceCellIndex-1]; //drag object
     
        updatedRows[sourceRowIndex].cells[sourceCellIndex-1]=updatedRows[rowIndex].cells[3];
        updatedRows[rowIndex].cells[3]=temp;
        setRows(updatedRows);
      }
    }else{
      const temp = updatedRows[sourceRowIndex].cells[sourceCellIndex-1]; //drag object
     
      updatedRows[sourceRowIndex].cells[sourceCellIndex-1]=updatedRows[rowIndex].cells[targetCellId%4-1];
      updatedRows[rowIndex].cells[targetCellId%4-1]=temp;
      setRows(updatedRows);
    }
  };
  
  const deleteRow = (rowIndex) => {
    const updatedRows = [...rows];
    updatedRows.splice(rowIndex, 1);
    setRows(updatedRows);
  };

  const addRow = () => {
    if (rows.length === 0) {
      // If rows array is empty, initialize with the first row
      const newRow = {
        Year: selectYear,
        Semester: selectSemester,
        cells: [
          { id: 1, value: 'Course 1', CP: 0 },
          { id: 2, value: 'Course 2', CP: 0 },
          { id: 3, value: 'Course 3', CP: 0 },
          { id: 4, value: 'Course 4', CP: 0 },
        ],
      };
      setRows([newRow]);
      setShowAddRowButton(true);
      return;
    }
  
    const lastRowIndex = rows.length - 1;
    const lastRow = rows[lastRowIndex];
    const lastRowCells = lastRow.cells;
    let lastYear = parseInt(lastRow.Year, 10);
    let lastSemester = parseInt(lastRow.Semester, 10);
  
    if (lastSemester === 2) {
      lastYear += 1;
      lastSemester = 1;
    } else {
      lastSemester += 1;
    }
  
    if (lastRowCells.length === 4) {
      const newRow = {
        Year: lastYear.toString(),
        Semester: lastSemester.toString(),
        cells: [
          { id: lastRowCells[0].id + 4, value: `Course ${lastRowCells[0].id + 4}`, CP: 0 },
          { id: lastRowCells[1].id + 4, value: `Course ${lastRowCells[1].id + 4}`, CP: 0 },
          { id: lastRowCells[2].id + 4, value: `Course ${lastRowCells[2].id + 4}`, CP: 0 },
          { id: lastRowCells[3].id + 4, value: `Course ${lastRowCells[3].id + 4}`, CP: 0 },
        ],
      };
  
      const updatedRows = [...rows, newRow];
      setRows(updatedRows);
  
      // Initialize JSON data for the added row
      setCellCourseData((prevData) => ({
        ...prevData,
        [newRow.cells[0].id]: null,
        [newRow.cells[1].id]: null,
        [newRow.cells[2].id]: null,
        [newRow.cells[3].id]: null,
      }));
    }
  };
  
  
  //modal//////

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);


  const handleCellClick = (cell) => {
    setSelectedCell(cell);
    setShowPopup(true);

    // Fetch course data for the selected course code
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          `https://degrees.griffith.edu.au/rest-api/v3/course/${cell.value}`
        );

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const data = await response.json();

        // Update the course data for the clicked cell
        setCellCourseData((prevData) => ({
          ...prevData,
          [cell.id]: data,
        }));
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchCourseData();
  };


  const handlePopupClose = () => {
    resetModalData();

    setShowPopup(false);
  };

  const handlePopupSave = () => {
    const isCourseExist = rows.some((row) =>
      row.cells.some((cell) => cell.value === selectedCourse)
    );
  
    if (isCourseExist) {
      alert('Course already exists');
    } else {
      const updatedRows = rows.map((row) => ({
        ...row,
        cells: row.cells.map((cell) =>
          cell.id === selectedCell.id
            ? { ...cell, value: selectedCourse, CP: courseData?.creditPoints || 0 }
            : cell
        ),
      }));
      setCellCourseData((prevData) => ({
        ...prevData,
        [selectedCell.id]: courseData,
      }));
      setRows(updatedRows);
    }
  
    resetModalData();
    setShowPopup(false);
  
    // Fetch course data for the selected course code
    const fetchCourseData = async () => {
      try {
        const response = await fetch(
          `https://degrees.griffith.edu.au/rest-api/v3/course/${selectedCourse}`
        );
  
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
  
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    if (courseData) {
      const prerequisite = extractPrerequisite(courseData.description);
      console.log(prerequisite);
      if (prerequisite !== "N/A" && !RequisiteList.includes(extractProgramCode(prerequisite))) {
        alert(`Prerequisite program code: ${extractProgramCode(prerequisite)} needed`);
      }
    }
  
    fetchCourseData();
  };
  
  const clearCell = (cellId) => {
    const updatedRows = rows.map((row) => ({
      ...row,
      cells: row.cells.map((cell) =>
        cell.id === cellId ? { ...cell, value: 'Course', CP: 0 } : cell
      ),
    }));
    setRows(updatedRows);
  };
  //////////
  useEffect(() => {
    console.log('RequisiteList:', RequisiteList);
  }, [RequisiteList]);


  ///Combining both non-core and core in one dropdown//////

  const [selectedCourse, setSelectedCourse] = useState('');
  const allCourses = [
    { label: 'Core Courses', options: coreCourses },
    { label: 'Other Courses', options: otherCourses },
  ];

  //////////////CHANGE CELL NAME FROM COURSE LIST MODAL//////////////

  //////////////CHANGE CELL NAME FROM COURSE LIST MODALEND//////////////

//////////////Prerequusite check///////////////////////////////
const extractPrerequisite = (description) => {
  const prerequisiteRegex = /(Pre-Requisite|Prerequisite):\s(.+?)(?=(\.|$))/;
  const prerequisiteMatch = description.match(prerequisiteRegex);

  if (prerequisiteMatch) {
    const prerequisite = prerequisiteMatch[2];
    const courses = prerequisite.split('/');
    return courses.join(', ');
  }

  return 'N/A';
};




// Render course detail and prerequisite
const renderCourseDetail = () => {
  if (selectedCell && cellCourseData[selectedCell.id]) {
    const prerequisite = extractPrerequisite(cellCourseData[selectedCell.id].description);
    const incompatible = extractIncompatible(cellCourseData[selectedCell.id].description);

   
    
    return (
      <div>
        <h4>Course Detail</h4>
        <p>{cellCourseData[selectedCell.id].description}</p>

        <h4>Prerequisite</h4>
        <p>{prerequisite}</p>

        <h4>Incompatible</h4>
        <p>{incompatible}</p>
      </div>
    );
  }

  return null;
};
const extractIncompatible = (description) => {
  const incompatibleRegex = /.*?(incompatible[^.]+\.)/i;
  const incompatibleMatch = description.match(incompatibleRegex);

  if (incompatibleMatch) {
    return incompatibleMatch[1].trim();
  }

  return 'N/A';
};
const extractProgramCode = (sentence) => {
  const programCodeRegex = /([A-Za-z0-9]+ICT)\b/;
  const programCodeMatch = sentence.match(programCodeRegex);

  if (programCodeMatch) {
    return programCodeMatch[1];
  }

  return 'N/A';
};
//////////////Prerequusite check///////////////////////////////
const resetModalData = () => {
  setSelectedCourse('');
  setCourseData(null);

};

  return (
    <div className='row'>
      <div className='sidecolor col-1'></div>
      <div className='optionPart col-2'>
      <div>

      <div>
        <label htmlFor="dropdown">Select a Your Uni:</label>
        <select
          id="dropdown"
          value={selectedUniversity}
          onChange={(e) => setSelectedUni(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="UQ">UQ</option>
          <option value="QUT">QUT</option>
          <option value="GU">GU</option>
        </select>
      </div>


        <label htmlFor="dropdown">Select a Year:</label>
        <select id="dropdown" value={selectYear} onChange={(e) => setSelectYear(e.target.value)}>
          <option value="">Select...</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
        <p>Selected option: {selectYear}</p>
      </div>

      <div>
        <label htmlFor="dropdown">Select a Semester:</label>
        <select
          id="dropdown"
          value={selectSemester}
          onChange={(e) => setSelectSemester(e.target.value)}
        >          <option value="">Select...</option>

          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>
        <p>Selected option: {selectSemester === '1' ? 'Semester 1' : 'Semester 2'}</p>
      </div>

      <div>
        <label htmlFor="dropdown">Select a Degree:</label>
        <select
          id="dropdown"
          value={selectedDegree}
          onChange={(e) => setSelectedDegree(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="1534">Computer Science</option>
          <option value="1538">IT</option>
          <option value="1632">Business</option>
        </select>
        <p>Selected option: {selectedDegree}</p>
      </div>

      <div>
        <div className='button row'>
          <div className='col-2'>
            <button className='submitButton' onClick={getDegreeData}>Submit</button>
            </div>
          <div>{showAddRowButton &&
          <div className=' col-4'> <button className='AddRowButton' onClick={addRow}>Add Row</button> {/* Render the button conditionally */}</div>
           } </div>
        </div>
      </div>
      </div>
      
      <div className="grid col-8">
      {rows.map((row, rowIndex) => (
  <div className="row" key={rowIndex}>
    <div className="semester-info">
      {row.Year} Semester {row.Semester}
    </div>
    <div className="cell-row">
      {row.cells.map((cell, cellIndex) => (
        <div
          className="cell"
          key={`${rowIndex}-${cell.id}`} // Update key to include the row index
          onDragStart={(e) => handleDragStart(e, rowIndex, cell.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, cell.id, rowIndex)}
          draggable
          onClick={() => handleCellClick(cell)}
        >
          <span>{cell.value}</span>
          <span> | CP: {cell.CP}</span>
          <button className="clear button btn-clear" onClick={() => clearCell(cell.id)}>Clear</button>
        </div>
      ))}
    </div>
    <div className='col-11'></div>
    <button className="col-1  btn btn-danger btn-sm delete-button"  onClick={() => deleteRow(rowIndex)}>Delete</button>
  </div>
))}

      </div>

      {/* Popup */}
      
      <Modal show={showPopup} onHide={handlePopupClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Course Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
      <div className="col-3">
    <div>
      <select
        id="dropdown"
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select...</option>
        {allCourses.map((category) => (
          <>
            <optgroup label={category.label} style={{ borderBottom: '1px solid black' }}>
              {category.options.map((course) => (
                <option key={course.entryId} value={course.courseCode}>
                  {course.courseCode}
                </option>
              ))}
            </optgroup>
          </>
        ))}
      </select>

      {courseData && <p> Code: {courseData.code}</p>}
      {courseData && <p> Name: {courseData.name}</p>}
      {courseData && <p>Credit Points: {courseData.creditPoints}</p>}

    </div>
    </div>
    <div className="col-7">
    {courseData && renderCourseDetail()}
      </div>
    </div>
        </Modal.Body>
        <Modal.Footer>
         
          <Button variant="secondary" onClick={handlePopupClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePopupSave}>
            Save
          </Button>    
        </Modal.Footer>
      </Modal>
      <div className='col-1'></div>

    </div>
    
  );
};

export default YourComponent;

// // showing diff between core and non0-core
//  {/* <form>
//             {degreeData ? (
//               <div>
//                 <h2>Core Courses:</h2>
//                 <select
//                   value={selectedCoreCourse}
//                   onChange={(e) => setSelectedCoreCourse(e.target.value)}
//                 >
//                   {coreCourses.map((course) => (
//                     <option key={course.entryId} value={course.courseCode}>
//                       {course.courseCode}
//                     </option>
//                   ))}
//                 </select>

//                 <h2>Other Courses:</h2>
//                 <select
//                   value={selectedNonCoreCourse}
//                   onChange={(e) => setSelectedNonCoreCourse(e.target.value)}
//                 >
//                   {otherCourses.map((course) => (
//                     <option key={course.entryId} value={course.courseCode}>
//                       {course.courseCode}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             ) : (
//               <p>Enter a course code and click Submit to get course data.</p>
//             )}
//           </form> */}