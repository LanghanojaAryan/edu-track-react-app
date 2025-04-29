
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '../../components/Layout';

const StudentCourseDetails = () => {
  const { courseId } = useParams();
  const { courses, getAssignmentsForCourse } = useData();
  
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <Layout requiredRole="student">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p className="mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <Link to="/student/courses">
            <Button variant="outline">Go back to my courses</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const assignments = getAssignmentsForCourse(courseId);
  
  return (
    <Layout requiredRole="student">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm mb-2">
            <Link to="/student/courses" className="text-blue-600 hover:underline">
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
            <p className="mt-4 text-sm text-gray-500">Faculty: {course.facultyName}</p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="assignments">
          <TabsList>
            <TabsTrigger value="assignments">Assignments ({assignments.length})</TabsTrigger>
            <TabsTrigger value="materials">Course Materials</TabsTrigger>
          </TabsList>
          
          <TabsContent value="assignments" className="pt-4">
            <Card>
              <CardContent className="py-4">
                {assignments.length > 0 ? (
                  <div className="divide-y">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="py-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h3 className="font-medium">{assignment.title}</h3>
                            <div className="text-sm text-gray-500 mt-1">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <Link to={`/student/assignment/${assignment.id}`}>
                              <Button size="sm">View Details</Button>
                            </Link>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-sm">
                          <p className="line-clamp-2">{assignment.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No assignments for this course yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="materials" className="pt-4">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-500">No course materials available yet.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default StudentCourseDetails;
