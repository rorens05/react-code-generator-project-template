import React, { useEffect } from 'react';
import ExamCreation from '../../../exam-creation/ExamCreation';
import CourseContent from '../../CourseContent';
import CourseBreadcrumbs from '../../components/CourseBreadcrumbs';
import { useParams } from 'react-router';

export default function CourseExamCreation() {
  const {id} = useParams();

  return (
    <CourseContent>
      <CourseBreadcrumbs title='Exam Information' clicked={() => window.location.replace(`/courses/${id}/exam`)}/>
      <ExamCreation />
    </CourseContent>
  )
}
