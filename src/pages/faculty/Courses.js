
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Layout from '../../components/Layout';

const FacultyCourses = () => {
  const { user } = useAuth();
  const { getFacultyCourses, getEnrolledStudents, getAssignmentsForCourse } = useData();
  
  const courses = getFacultyCourses(user.id);
  
  return (
    <Layout requiredRole="faculty">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Courses</h1>
            <p className="text-gray-600">Manage the courses you are teaching</p>
          </div>
          <Link to="/faculty/create-course">
            <Button>Create New Course</Button>
          </Link>
        </div>
        
        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map(course => {
              const enrolledStudents = getEnrolledStudents(course.id);
              const assignments = getAssignmentsForCourse(course.id);
              
              return (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.name}</CardTitle>
                    <div className="text-sm text-gray-500">Code: {course.code}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p>{course.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="bg-blue-50 px-3 py-1 rounded-full">
                          {enrolledStudents.length} Students
                        </div>
                        <div className="bg-amber-50 px-3 py-1 rounded-full">
                          {assignments.length} Assignments
                        </div>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Link to={`/faculty/course/${course.id}`}>
                          <Button variant="outline" size="sm">View Details</Button>
                        </Link>
                        <Link to={`/faculty/course/${course.id}/assignments/create`}>
                          <Button size="sm">Create Assignment</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500 mb-4">You haven't created any courses yet.</p>
              <Link to="/faculty/create-course">
                <Button>Create Your First Course</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default FacultyCourses;
