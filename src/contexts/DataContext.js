
import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  
  // Load data from localStorage on initial render
  useEffect(() => {
    const storedCourses = localStorage.getItem('courses');
    const storedAssignments = localStorage.getItem('assignments');
    const storedEnrollments = localStorage.getItem('enrollments');
    
    if (storedCourses) setCourses(JSON.parse(storedCourses));
    if (storedAssignments) setAssignments(JSON.parse(storedAssignments));
    if (storedEnrollments) setEnrollments(JSON.parse(storedEnrollments));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
    localStorage.setItem('assignments', JSON.stringify(assignments));
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
  }, [courses, assignments, enrollments]);

  const addCourse = (course) => {
    const newCourse = { ...course, id: Date.now().toString() };
    setCourses([...courses, newCourse]);
    toast.success('Course created successfully!');
    return newCourse;
  };

  const addAssignment = (assignment) => {
    const newAssignment = { ...assignment, id: Date.now().toString() };
    setAssignments([...assignments, newAssignment]);
    toast.success('Assignment created successfully!');
    return newAssignment;
  };

  const enrollStudent = (studentId, courseId) => {
    const enrollment = { studentId, courseId, id: Date.now().toString() };
    setEnrollments([...enrollments, enrollment]);
    toast.success('Enrolled successfully!');
    return enrollment;
  };

  const unenrollStudent = (studentId, courseId) => {
    setEnrollments(enrollments.filter(
      e => !(e.studentId === studentId && e.courseId === courseId)
    ));
    toast.success('Unenrolled successfully');
  };

  const getEnrollmentsForStudent = (studentId) => {
    return enrollments.filter(e => e.studentId === studentId);
  };

  const getEnrolledStudents = (courseId) => {
    return enrollments.filter(e => e.courseId === courseId);
  };

  const getStudentCourses = (studentId) => {
    const studentEnrollments = enrollments.filter(e => e.studentId === studentId);
    return courses.filter(course => 
      studentEnrollments.some(e => e.courseId === course.id)
    );
  };

  const getAssignmentsForCourse = (courseId) => {
    return assignments.filter(a => a.courseId === courseId);
  };

  const getFacultyCourses = (facultyId) => {
    return courses.filter(course => course.facultyId === facultyId);
  };

  return (
    <DataContext.Provider value={{
      courses,
      assignments,
      enrollments,
      addCourse,
      addAssignment,
      enrollStudent,
      unenrollStudent,
      getEnrollmentsForStudent,
      getEnrolledStudents,
      getStudentCourses,
      getAssignmentsForCourse,
      getFacultyCourses
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
