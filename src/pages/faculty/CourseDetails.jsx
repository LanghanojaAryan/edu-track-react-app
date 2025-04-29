
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '../../components/Layout';

const CourseDetails = () => {
  const { courseId } = useParams();
  const { 
    courses, 
    getEnrolledStudents,
    getAssignmentsForCourse 
  } = useData();
  
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <Layout requiredRole="faculty">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p className="mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/faculty/courses">
            <Button variant="outline">Go back to courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const enrolledStudents = getEnrolledStudents(courseId);
  const assignments = getAssignmentsForCourse(courseId);
  
  return (
    <Layout requiredRole="faculty">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <Link to="/faculty/courses" className="text-blue-600 hover:underline">
              My Courses
            </Link>
            <span>/</span>
            <span className="text-gray-600">{course.name}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
          <p className="text-gray-600">Course Code: {course.code}</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Course Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{course.description}</p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="students">
          <TabsList>
            <TabsTrigger value="students">Students ({enrolledStudents.length})</TabsTrigger>
            <TabsTrigger value="assignments">Assignments ({assignments.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="pt-4">
            <Card>
              <CardContent className="py-4">
                {enrolledStudents.length > 0 ? (
                  <div className="divide-y">
                    {enrolledStudents.map((enrollment, index) => (
                      <div key={enrollment.id} className="py-3 flex items-center justify-between">
                        <div>Student #{index + 1}: {enrollment.studentId}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No students enrolled in this course yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assignments" className="pt-4">
            <div className="flex justify-end mb-4">
              <Link to={`/faculty/course/${courseId}/assignments/create`}>
                <Button>Create Assignment</Button>
              </Link>
            </div>
            
            <Card>
              <CardContent className="py-4">
                {assignments.length > 0 ? (
                  <div className="divide-y">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="py-3">
                        <div className="font-medium">{assignment.title}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          Due: {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No assignments created for this course yet.</p>
                    <Link to={`/faculty/course/${courseId}/assignments/create`}>
                      <Button variant="outline">Create Your First Assignment</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CourseDetails;
