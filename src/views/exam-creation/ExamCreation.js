import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ExamAPI from "../../api/ExamAPI";
import MainContainer from "../../components/layouts/MainContainer";
import { UserContext } from "../../context/UserContext";
import AddPartModal from "./components/AddPartModal";
import ExamCreationDetails from "./components/ExamCreationDetails";

export default function ExamCreation() {
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [instructions, setInstructions] = useState("")
  const [typeId, setTypeId] = useState(1)
  const userContext = useContext(UserContext);
  const { user } = userContext.data;
  const { id, class_id } = useParams();
  const [noAssigned, setNoAssigned] = useState(false)
  const [selectedPart, setSelectedPart] = useState(null);

  const getExamInformation = async () => {
    setLoading(true);
    let response = await new ExamAPI().getExamInformation(id);
    if (response.ok) {
      let tempExam = response.data
      response = await new ExamAPI().getParts(id)
      console.log({response, tempExam})
      response.data.forEach(item => {
        if(!tempExam.questionPartDto.map(temp_part => temp_part.questionPart.id).includes(item.id)){
          tempExam.questionPartDto.push({questionPart: item, questionDtos: []})
        }
      })
      tempExam = await getClassTest(tempExam)
      setExam(tempExam);
    } else {
      alert("Something went wrong while fetching exam information");
    }
    setLoading(false);
  };

  const getClassTest = async (tempExam) => {
    console.log({tempExam})
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const classId = tempExam.test.classId || params.class_id
    if(classId){
      let response = await new ExamAPI().getExams(classId);
      if (response.ok) {
        console.log({response})
        let foundExam = response.data.find(item => item.test.id === tempExam.test.id)
        if(foundExam){
          tempExam.classTest = foundExam.classTest
        }else{
          alert("Class test not found")
        }
      }
    }else{
      setNoAssigned(true)
    }
    return tempExam
  }
  
  const submitPartForm = async (e) => {
    if(selectedPart != null){
      updatePart(e)
    }else{
      addPart(e)
    }
  }

  const updatePart = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      instructions
    }
    let response = await new ExamAPI().editPart(selectedPart.questionPart.id, data)
    if(response.ok){
      toast.success("Part updated")
      setShowModal(false)
      getExamInformation()
      setTypeId('1')
      setSelectedPart(null)
    }else{
      toast.error(response.data?.errorMessage || "Something went wrong while creating the part")
      setLoading(false)
    }
  }

  const addPart = async(e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      instructions
    }
    let response = await new ExamAPI().addPart(id, typeId, data)
    if(response.ok){
      toast.success("Part created")
      setShowModal(false)
      getExamInformation()
      setTypeId('1')
      setSelectedPart(null)
    }else{
      toast.error(response.data?.errorMessage || "Something went wrong while creating the part")
      setLoading(false)
    }
  }

  const deletePart = async(e, part) => {
    e.preventDefault()
    setLoading(true)
    let response = await new ExamAPI().deletePart(part.questionPart.id)
    if(response.ok){
      toast.success("Part deleted")
      getExamInformation()
    }
    else{
      toast.error(response.data?.errorMessage || "Something went wrong while deleting the part")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user.isStudent) return (window.location.href = "/404");
    getExamInformation();
  }, []);

  useEffect(() => {
    if(selectedPart != null){
      setTypeId(selectedPart.questionPart.questionTypeId)
      setInstructions(selectedPart.questionPart.instructions)
    }else{
      setTypeId(1)
      setInstructions("")
    }
  
  }, [selectedPart]);
  

  return (
    <MainContainer title='Exam Information' loading={loading}>
      <div className='page-container exam-information-container'>
        <div className='containerpages'>
          <ExamCreationDetails
            getExamInformation={getExamInformation}
            setLoading={setLoading}
            exam={exam}
            loading={loading}
            setShowModal={setShowModal}
            deletePart={deletePart}
            selectedPart={selectedPart}
            setSelectedPart={setSelectedPart}
            noAssigned={noAssigned}
          />
        </div>
      </div>
      <AddPartModal 
        setShowModal={setShowModal}
        showModal={showModal}
        setTypeId={setTypeId}
        typeId={typeId}
        setInstructions={setInstructions}
        instructions={instructions}
        selectedPart={selectedPart}
        addPart={submitPartForm}/>
    </MainContainer>
  );
}
