
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '../../components/Layout';

const MyCourses = () => {
  const { user } = useAuth();
  const { getStudentCourses, getAssignmentsForCourse, unenrollStudent } = useData();
  
  const enrolledCourses = getStudentCourses(user.id);
  
  const handleUnenroll = (courseId) => {
    unenrollStudent(user.id, courseId);
  };
  
  return (
    <Layout requiredRole="student">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Courses</h1>
            <p className="text-gray-600">View and manage your enrolled courses</p>
          </div>
          <Link to="/student/browse-courses">
            <Button>Browse More Courses</Button>
          </Link>
        </div>
        
        {enrolledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {enrolledCourses.map(course => {
              const assignments = getAssignmentsForCourse(course.id);
              
              return (
                <Card key={course.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg">{course.name}</h3>
                        <p className="text-sm text-gray-500">Course Code: {course.code}</p>
                        <p className="text-sm text-gray-500 mt-1">Faculty: {course.facultyName}</p>
                      </div>
                      
                      <div className="bg-amber-50 px-3 py-1 rounded-full inline-block text-sm">
                        {assignments.length} Assignments
                      </div>
                      
                      <p className="text-sm line-clamp-2">{course.description}</p>
                      
                      <div className="flex gap-2 pt-2">
                        <Link to={`/student/course/${course.id}`}>
                          <Button variant="outline" size="sm">View Course</Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => handleUnenroll(course.id)}
                        >
                          Unenroll
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
              <Link to="/student/browse-courses">
                <Button>Browse Available Courses</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MyCourses;
