
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '../../components/Layout';
import { toast } from 'sonner';

const BrowseCourses = () => {
  const { user } = useAuth();
  const { courses, getStudentCourses, enrollStudent } = useData();
  
  const enrolledCourses = getStudentCourses(user.id);
  const availableCourses = courses.filter(course => 
    !enrolledCourses.some(ec => ec.id === course.id)
  );
  
  const handleEnroll = (courseId) => {
    enrollStudent(user.id, courseId);
    toast.success('Successfully enrolled in the course!');
  };
  
  return (
    <Layout requiredRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browse Courses</h1>
          <p className="text-gray-600">Explore and enroll in available courses</p>
        </div>
        
        {availableCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {availableCourses.map(course => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-lg">{course.name}</h3>
                      <p className="text-sm text-gray-500">Course Code: {course.code}</p>
                      <p className="text-sm text-gray-500 mt-1">Faculty: {course.facultyName}</p>
                    </div>
                    
                    <p className="text-sm line-clamp-3">{course.description}</p>
                    
                    <Button 
                      onClick={() => handleEnroll(course.id)}
                      className="w-full"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">
                No available courses to enroll in. You've enrolled in all available courses.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default BrowseCourses;
